#!/usr/bin/env bun
/**
 * validar.ts — validador de estructura de Company Cycle OS.
 *
 * Uso:  bun validar.ts [--publicar] [--json] [--raiz <dir>]
 *
 * Un solo archivo, sin dependencias: solo node:fs y node:path.
 * Salida: 0 limpio · 1 errores de estructura (V1-V10) · 2 solo higiene (V11, con --publicar) · 3 uso.
 * Si conviven errores de estructura e higiene, gana 1.
 */
import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { basename, dirname, join, relative, resolve, sep } from "node:path";

// ── Constantes ─────────────────────────────────────────────────────────────
const RESERVADAS_RAIZ = new Set(["Proyectos", "Decisiones", "_Referencias", "_Templates", "Plans", ".claude", ".ccos", ".git", "node_modules"]);
const RESERVADAS_PROYECTOS = new Set(["Tareas", "Archivados", "adjuntos"]);
const DESCRIPTORES = ["_context.md", "_rules.md", "_links.md"];
const CANONICOS = new Set(["propuesta.md", "exploracion.md", "solucion.md", "tareas.md"]);
const FASES = new Set(["explorar", "proponer", "aplicar", "pausado", "archivado"]);
const TOPE_LINEAS = 120;
const EXENTOS_TOPE = [/^Decisiones\//, /^_Referencias\/_index\.md$/, /^\.claude\//];
const FUERA_CABECERA = [/^\.claude\//, /^Plans\//, /^_Referencias\/(?!_index\.md$)/];
const IGNORAR_HIGIENE = [/^\.git\//, /^Plans\//, /^\.ccos\//, /^validar\.ts$/, /^LICENSE$/, /^node_modules\//];
const RE_CABECERA = /^<!-- Creado: (\d{4}-\d{2}-\d{2}|AAAA-MM-DD) · Actualizado: (\d{4}-\d{2}-\d{2}|AAAA-MM-DD) · Creador: .+ -->\s*$/;
const RE_FECHA = /^\d{4}-\d{2}-\d{2} · /;

type Sev = "E" | "A";
interface Hallazgo { chequeo: string; sev: Sev; ruta: string; detalle: string }

// ── Argumentos ─────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
let raiz = process.cwd();
let publicar = false;
let json = false;
for (let i = 0; i < args.length; i++) {
  const a = args[i];
  if (a === "--publicar") publicar = true;
  else if (a === "--json") json = true;
  else if (a === "--raiz") { raiz = args[++i] ?? ""; if (!raiz) uso(); }
  else uso();
}
function uso(): never {
  console.error("Uso: bun validar.ts [--publicar] [--json] [--raiz <dir>]");
  process.exit(3);
}
if (!existsSync(join(raiz, "_context.md"))) {
  console.error(`No encuentro _context.md en ${raiz}. ¿Estás en la raíz del repo? (usa --raiz)`);
  process.exit(3);
}

// ── Utilidades ─────────────────────────────────────────────────────────────
const hallazgos: Hallazgo[] = [];
const err = (chequeo: string, ruta: string, detalle: string) => hallazgos.push({ chequeo, sev: "E", ruta, detalle });
const aviso = (chequeo: string, ruta: string, detalle: string) => hallazgos.push({ chequeo, sev: "A", ruta, detalle });
const rel = (p: string) => relative(raiz, p).split(sep).join("/");
const esDir = (p: string) => existsSync(p) && statSync(p).isDirectory();
const leer = (p: string) => readFileSync(p, "utf8");
// Los archivos y carpetas ocultos (.DS_Store, .gitkeep, .git) no cuentan para la estructura.
const subdirs = (p: string) => (esDir(p) ? readdirSync(p).filter((n) => !n.startsWith(".") && esDir(join(p, n))) : []);
const archivos = (p: string) => (esDir(p) ? readdirSync(p).filter((n) => !n.startsWith(".") && !esDir(join(p, n))) : []);
const coincide = (r: string, lista: RegExp[]) => lista.some((re) => re.test(r));

function caminar(dir: string, salida: string[] = []): string[] {
  for (const n of readdirSync(dir)) {
    const p = join(dir, n);
    const r = rel(p);
    if (/^(\.git|node_modules)(\/|$)/.test(r)) continue;
    if (esDir(p)) caminar(p, salida); else salida.push(p);
  }
  return salida;
}
const todos = caminar(raiz);
const mds = todos.filter((p) => p.endsWith(".md"));

/** Filas de la tabla bajo un encabezado `## <titulo>`: devuelve los nombres entre acentos graves de la 1.ª columna. */
function filasTabla(texto: string, titulo: string): string[] {
  const lineas = texto.split("\n");
  const ini = lineas.findIndex((l) => new RegExp(`^##\\s+${titulo}\\b`).test(l));
  if (ini < 0) return [];
  const out: string[] = [];
  for (let i = ini + 1; i < lineas.length; i++) {
    const l = lineas[i];
    if (/^##\s/.test(l)) break;
    const m = l.match(/^\|\s*`([^`]+)`\s*\|/);
    if (m) out.push(m[1].replace(/\/$/, ""));
  }
  return out;
}
/** Solo el bloque `## Estado` (hasta el siguiente encabezado `## `). */
function bloqueEstado(texto: string): string | null {
  const m = texto.match(/^## Estado\s*$\n([\s\S]*?)(?=^## |\n*$(?![\s\S]))/m);
  return m ? m[1] : null;
}
/** Campo del bloque Estado. Acepta `- **Campo:** valor`, `- Campo: valor` y `**Campo:** valor`; quita acentos graves. */
function campoEstado(texto: string, campo: string): string | null {
  const bloque = bloqueEstado(texto);
  if (bloque === null) return null;
  const m = bloque.match(new RegExp(`^(?:-\\s*)?(?:\\*\\*)?${campo}:(?:\\*\\*)?\\s*(.+)$`, "m"));
  return m ? m[1].replace(/`/g, "").replace(/\s*<!--.*?-->\s*$/, "").trim() : null;
}
const RE_KEBAB = /^[a-z0-9]+(-[a-z0-9]+)*$/;
function fechaReal(s: string): boolean {
  if (s === "AAAA-MM-DD") return true;
  const [y, m, d] = s.split("-").map(Number);
  const f = new Date(Date.UTC(y, m - 1, d));
  return f.getUTCFullYear() === y && f.getUTCMonth() === m - 1 && f.getUTCDate() === d;
}
function lineasContadas(texto: string): number {
  let n = 0, enFence = false;
  for (const l of texto.split("\n")) {
    if (/^\s*```/.test(l)) { enFence = !enFence; continue; }
    if (enFence) continue;
    if (/^\s*\|/.test(l)) continue;
    n++;
  }
  return n;
}

// ── Contexto raíz ──────────────────────────────────────────────────────────
const ctxRaiz = leer(join(raiz, "_context.md"));
const idRaiz = (ctxRaiz.match(/^\|\s*Id\s*\|\s*`([^`]+)`/m) ?? [])[1] ?? "";
const areasDeclaradas = filasTabla(ctxRaiz, "Áreas");
const areasReales = subdirs(raiz).filter((n) => !RESERVADAS_RAIZ.has(n) && !n.startsWith("."));

// ── V1 Descriptores ────────────────────────────────────────────────────────
if (!existsSync(join(raiz, "Proyectos", "_context.md"))) err("V1", "Proyectos/_context.md", "falta el descriptor");
for (const d of ["_rules.md", "_links.md"]) if (!existsSync(join(raiz, d))) aviso("V1", d, "falta en la raíz");
for (const a of areasReales) for (const d of DESCRIPTORES) {
  if (!existsSync(join(raiz, a, d))) err("V1", `${a}/${d}`, "falta el descriptor del área");
}

// ── V2 Áreas: tabla ↔ carpetas ─────────────────────────────────────────────
for (const a of areasDeclaradas) if (!areasReales.includes(a)) err("V2", `${a}/`, "declarada en la tabla de áreas pero la carpeta no existe");
for (const a of areasReales) if (!areasDeclaradas.includes(a)) err("V2", `${a}/`, "carpeta de área sin fila en la tabla de áreas de _context.md raíz");

// ── V3 Temas: tabla ↔ subcarpetas; .md sueltos ─────────────────────────────
for (const a of areasReales) {
  const ctxPath = join(raiz, a, "_context.md");
  const temasDecl = existsSync(ctxPath) ? filasTabla(leer(ctxPath), "Temas") : [];
  const temasReales = subdirs(join(raiz, a));
  for (const t of temasDecl) if (!temasReales.includes(t)) err("V3", `${a}/${t}/`, "tema declarado sin carpeta");
  for (const t of temasReales) if (!temasDecl.includes(t)) err("V3", `${a}/${t}/`, "subcarpeta sin fila en la tabla de temas del área");
  for (const f of archivos(join(raiz, a))) {
    if (f.endsWith(".md") && !DESCRIPTORES.includes(f)) err("V3", `${a}/${f}`, ".md suelto en el área: debe vivir dentro de un tema");
  }
}

// ── V4 Cabecera · V5 Tope · V6 Slug plan-mode ──────────────────────────────
for (const p of mds) {
  const r = rel(p);
  const texto = leer(p);
  const primera = texto.split("\n")[0] ?? "";
  const enTemplates = r.startsWith("_Templates/");
  if (!coincide(r, FUERA_CABECERA)) {
    const m = primera.match(RE_CABECERA);
    if (!m) err("V4", r, "sin cabecera de metadatos en la primera línea");
    else if (!enTemplates && (m[1] === "AAAA-MM-DD" || m[2] === "AAAA-MM-DD")) err("V4", r, "cabecera con fecha sin rellenar");
    else if (!fechaReal(m[1]) || !fechaReal(m[2])) err("V4", r, `cabecera con una fecha que no existe en el calendario (${m[1]} / ${m[2]})`);
  }
  if (!coincide(r, EXENTOS_TOPE)) {
    const n = lineasContadas(texto);
    if (n > TOPE_LINEAS) err("V5", r, `${n} líneas contadas (tope ${TOPE_LINEAS}); parte el documento`);
  }
  const nombre = basename(r, ".md");
  const fueraDeZonas = !/^(Proyectos|_Referencias|_Templates|\.claude|Plans)\//.test(r);
  if (fueraDeZonas && /^[a-z0-9]+(-[a-z0-9]+){2,}$/.test(nombre) && !RE_CABECERA.test(primera)) {
    aviso("V6", r, "parece un plan de sesión (slug largo sin cabecera) fuera de Plans/");
  }
}

// ── V7 Referencias ─────────────────────────────────────────────────────────
{
  const base = join(raiz, "_Referencias");
  if (esDir(base)) {
    const idxPath = join(base, "_index.md");
    const idx = existsSync(idxPath) ? leer(idxPath) : "";
    if (!existsSync(idxPath)) err("V7", "_Referencias/_index.md", "falta el índice");
    const listados = new Set([...idx.matchAll(/^\|\s*`([^`]+)`\s*\|/gm)].map((m) => m[1]));
    const reales = new Set<string>();
    for (const cat of subdirs(base)) {
      for (const sub of subdirs(join(base, cat))) err("V7", `_Referencias/${cat}/${sub}/`, "segundo nivel de subcarpeta: solo se permite uno");
      for (const f of archivos(join(base, cat))) reales.add(`${cat}/${f}`);
    }
    for (const f of archivos(base)) if (f !== "_index.md") reales.add(f);
    for (const f of reales) if (!listados.has(f)) err("V7", `_Referencias/${f}`, "archivo sin fila en _index.md");
    for (const f of listados) if (!reales.has(f)) err("V7", `_Referencias/${f}`, "fila en _index.md que apunta a un archivo inexistente");
  }
}

// ── V8 Trabajos ────────────────────────────────────────────────────────────
function revisarTrabajo(p: string, archivado: boolean, esProyecto: boolean) {
  const r = rel(p);
  const slug = esProyecto ? basename(dirname(p)) : basename(p, ".md");
  if (!RE_KEBAB.test(slug)) err("V8", r, `slug «${slug}» no está en kebab-case`);
  if (!existsSync(p)) { err("V8", r, "falta propuesta.md"); return; }
  const t = leer(p);
  if (!/^## Estado\s*$/m.test(t)) { err("V8", r, "sin bloque ## Estado"); return; }
  const fase = campoEstado(t, "Fase")?.split(/\s+/)[0] ?? "";
  if (!FASES.has(fase)) err("V8", r, `Fase inválida o ausente: «${fase}»`);
  if (archivado && fase !== "archivado") err("V8", r, `está en Archivados/ pero su Fase es «${fase}»`);
  if (!archivado && fase === "archivado") err("V8", r, "Fase archivado pero sigue fuera de Proyectos/Archivados/");
  if (esProyecto && (fase === "aplicar" || fase === "archivado")) {
    for (const f of CANONICOS) if (!existsSync(join(dirname(p), f))) err("V8", `${rel(dirname(p))}/${f}`, `falta en un proyecto en fase ${fase} (los cuatro documentos son obligatorios desde aplicar)`);
  }
  const area = campoEstado(t, "Área");
  if (!area) err("V8", r, "sin campo Área en el Estado");
  else if (!areasDeclaradas.includes(area.replace(/`/g, "").replace(/\/$/, ""))) err("V8", r, `Área «${area}» no está en la tabla de áreas`);
  if (!campoEstado(t, "Resultado esperado")) err("V8", r, "sin campo Resultado esperado en el Estado");
  if (archivado) {
    const res = campoEstado(t, "Resultado");
    if (!res) aviso("V8", r, "archivado sin línea Resultado: en el Estado");
    else if (!/^ninguno\b/i.test(res)) {
      for (const ruta of res.split(",").map((s) => s.trim()).filter(Boolean)) {
        const abs = resolve(raiz, ruta);
        if (ruta.startsWith("/") || !abs.startsWith(resolve(raiz) + sep)) err("V8", r, `Resultado con ruta fuera de la raíz: ${ruta}`);
        else if (!existsSync(abs)) err("V8", r, `Resultado apunta a una ruta que no existe: ${ruta}`);
      }
    }
  }
}
{
  const base = join(raiz, "Proyectos");
  for (const d of subdirs(base)) if (!RESERVADAS_PROYECTOS.has(d)) revisarTrabajo(join(base, d, "propuesta.md"), false, true);
  for (const f of archivos(join(base, "Tareas"))) if (f.endsWith(".md")) revisarTrabajo(join(base, "Tareas", f), false, false);
  const arch = join(base, "Archivados");
  for (const d of subdirs(arch)) if (d !== "Tareas") revisarTrabajo(join(arch, d, "propuesta.md"), true, true);
  for (const f of archivos(join(arch, "Tareas"))) if (f.endsWith(".md")) revisarTrabajo(join(arch, "Tareas", f), true, false);
  if (idRaiz && !RE_KEBAB.test(idRaiz)) aviso("V8", "_context.md", `el Id «${idRaiz}» no está en kebab-case`);
}

// ── V9 Bitácora ────────────────────────────────────────────────────────────
{
  const base = join(raiz, "Decisiones");
  for (const f of archivos(base)) {
    const r = `Decisiones/${f}`;
    if (f === ".gitkeep") continue;
    if (!/^Q[1-4]-\d{4}\.md$/.test(f)) { err("V9", r, "nombre fuera del patrón Q<N>-<AAAA>.md"); continue; }
    const lineas = leer(join(base, f)).split("\n");
    let dentro = false;
    lineas.forEach((l, i) => {
      if (!l.trim()) return;
      if (RE_FECHA.test(l)) { dentro = true; if (!fechaReal(l.slice(0, 10))) err("V9", `${r}:${i + 1}`, `fecha que no existe en el calendario: ${l.slice(0, 10)}`); return; }
      if (/^(#|<!--)/.test(l.trim())) return; // encabezados y comentarios sí se permiten
      if (dentro) err("V9", `${r}:${i + 1}`, "línea de la bitácora sin fecha al inicio (una entrada = una línea)");
    });
  }
}

// ── V10 Manifiesto del ejemplo ─────────────────────────────────────────────
{
  const man = join(raiz, ".ccos", "ejemplo.txt");
  if (idRaiz !== "ejemplo" && existsSync(man)) {
    for (const l of leer(man).split("\n")) {
      const ruta = l.trim();
      if (!ruta || ruta.startsWith("#")) continue;
      if (existsSync(join(raiz, ruta))) err("V10", ruta, "ruta de la empresa de ejemplo que sigue existiendo tras el setup");
    }
    // Residuo textual del ejemplo en archivos que setup debía reescribir.
    for (const p of mds) {
      const r = rel(p);
      if (/^(\.claude|_Templates|Plans)\//.test(r) || r === "README.md" || r === "CHANGELOG.md") continue;
      if (/Taller Norte/.test(leer(p))) err("V10", r, "menciona a la empresa de ejemplo (Taller Norte) con un Id distinto de `ejemplo`");
    }
  }
}

// ── V11 Higiene (solo --publicar) ──────────────────────────────────────────
let erroresHigiene = 0;
if (publicar) {
  const patrones: RegExp[] = [];
  for (const f of ["higiene.txt", "higiene.local.txt"]) {
    const p = join(raiz, ".ccos", f);
    if (!existsSync(p)) continue;
    for (const l of leer(p).split("\n")) {
      const s = l.trim();
      if (!s || s.startsWith("#")) continue;
      try { patrones.push(new RegExp(s, "i")); } catch { err("V11", `.ccos/${f}`, `patrón inválido: ${s}`); erroresHigiene++; }
    }
  }
  // El archivo de patrones privados nunca puede viajar en el repo.
  try {
    const seguidos = execFileSync("git", ["ls-files", "--", ".ccos/higiene.local.txt"], { cwd: raiz, stdio: ["ignore", "pipe", "ignore"] }).toString().trim();
    if (seguidos) { err("V11", ".ccos/higiene.local.txt", "está versionado en git: contiene tus patrones privados, sácalo del índice"); erroresHigiene++; }
  } catch { /* sin git: nada que comprobar */ }
  for (const p of todos) {
    const r = rel(p);
    if (coincide(r, IGNORAR_HIGIENE)) continue;
    let texto: string;
    try { texto = leer(p); } catch { continue; }
    if (texto.includes("\u0000")) continue;
    texto.split("\n").forEach((l, i) => {
      for (const re of patrones) if (re.test(l)) { err("V11", `${r}:${i + 1}`, `coincide con ${re.source}`); erroresHigiene++; break; }
    });
  }
}

// ── Reporte ────────────────────────────────────────────────────────────────
const errores = hallazgos.filter((h) => h.sev === "E");
const avisos = hallazgos.filter((h) => h.sev === "A");
const erroresEstructura = errores.length - erroresHigiene;
const veredicto = errores.length === 0 ? "limpio" : erroresEstructura > 0 ? "estructura" : "higiene";
const codigo = errores.length === 0 ? 0 : erroresEstructura > 0 ? 1 : 2;

if (json) {
  console.log(JSON.stringify({ raiz, id: idRaiz, publicar, veredicto, errores: errores.length, avisos: avisos.length, hallazgos }, null, 2));
} else {
  const porChequeo = new Map<string, Hallazgo[]>();
  for (const h of hallazgos) porChequeo.set(h.chequeo, [...(porChequeo.get(h.chequeo) ?? []), h]);
  for (const [c, lista] of [...porChequeo.entries()].sort()) {
    console.log(`\n[${c}]`);
    for (const h of lista) console.log(`  ${h.sev === "E" ? "✗" : "△"} ${h.ruta} — ${h.detalle}`);
  }
  console.log(`\n${errores.length} errores · ${avisos.length} avisos · veredicto: ${veredicto}${publicar ? " (con higiene)" : ""}`);
}
process.exit(codigo);
