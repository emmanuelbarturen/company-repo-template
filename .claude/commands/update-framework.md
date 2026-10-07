---
description: Trae a este repo la versión más nueva del framework Company Cycle OS desde su plantilla en GitHub. Solo toca los archivos del framework, nunca los de la empresa; ante cualquier conflicto pregunta antes de ejecutar
argument-hint: (sin argumentos)
---

Actualizas **el framework**, no la empresa. La fuente es la plantilla pública
`https://github.com/emmanuelbarturen/company-repo-template` (rama `main`). El usuario no es técnico: cero jerga, y
**ante cualquier conflicto preguntas antes de ejecutar** (reglas «Git» y «Preguntas al usuario» de `CLAUDE.md`).
Nunca narres comandos: cuenta qué cambia en su día a día.

## Qué es del framework y qué es de la empresa

| Del framework — se actualiza | De la empresa — no se toca nunca |
|---|---|
| `.claude/**` (salvo `settings.local.json`), `CLAUDE.md`, `README.md`, `CHANGELOG.md`, `LICENSE`, `.gitignore`, `Proyectos/_context.md`, los `.gitkeep` de la estructura | `_context.md`, `_rules.md` y `_links.md` de la raíz; las carpetas de área; `Proyectos/**` salvo `_context.md`; `Decisiones/`; `_Referencias/` |

`_context.md` raíz y `_Referencias/_index.md` nacen de un molde pero son de la empresa: solo se tocan si una entrada
«Migración» del CHANGELOG lo pide, y entonces se pregunta.

## 0. Preparar

1. Sincroniza según la regla «Git» (`git pull --rebase --autostash` si hay remoto). Si hay cambios sin guardar,
   guárdalos primero con su propio commit: la actualización va aparte.
2. Remoto de la plantilla: `git remote get-url framework`; si no existe, `git remote add framework <url>`. Luego
   `git fetch framework main`. Si falla por red, di en una línea que no se pudo consultar la plantilla y termina.
3. Compara versiones: la primera línea `## vX.Y` de `CHANGELOG.md` local contra la de
   `git show framework/main:CHANGELOG.md`. Igual → «El framework ya está al día (vX.Y)», termina. Local mayor →
   «Esta copia va por delante de la plantilla (vA aquí, vB allá); no hay nada que traer», termina. Plantilla mayor →
   sigue.

## 1. Leer qué cambió

- Lee en el CHANGELOG de la plantilla las entradas entre la versión local y la nueva. Anota cada línea
  **«Migración:»**: son pasos de estructura (mover carpetas, quitar filas) que los archivos no traen solos.
- `git diff --stat HEAD framework/main -- <rutas del framework>` para ver qué archivos cambian.
- Cuenta al usuario en 3-6 líneas, sin jerga: qué versión llega, qué cambia para él (comandos nuevos o renombrados,
  reglas nuevas, carpetas que se mueven) y si algo requiere su decisión. Todavía no toques nada.

## 2. Detectar conflictos — antes de ejecutar

Un conflicto es un archivo del framework que **cambió aquí y también en la plantilla**, o una migración que
**tocaría algo con contenido de la empresa**. Decide el camino con `git merge-base HEAD framework/main`:

- **Hay historia común** → `git merge --no-commit --no-ff framework/main`. Después, deshaz cualquier cambio que el
  merge haya metido en archivos de la empresa (`git checkout HEAD -- <ruta>`; un conflicto ahí se resuelve siempre
  con la versión local). Los conflictos que queden en archivos del framework (`git diff --name-only
  --diff-filter=U`) son los que se preguntan.
- **Sin historia común** → archivo por archivo del framework: igual → nada; solo en la plantilla → se copia; distinto
  → sin base para saber quién lo cambió, cuenta como conflicto.

Con conflictos, pregunta **una sola vez** con `AskUserQuestion` (header "Conflictos"): *Hay N archivos del framework
que se cambiaron en esta carpeta y también en la versión nueva. ¿Qué hacemos?* **Usar la versión nueva en todos
(Recomendado)** (se pierde lo que se cambió aquí en esos archivos) / **Revisar uno por uno** (te muestro cada
diferencia en texto plano y eliges: la nueva, la de aquí, o juntar las dos) / **No actualizar** (todo queda como
estaba). Si elige revisar, una pregunta por archivo, con los dos fragmentos en palabras llanas, nunca un diff crudo.
Si elige no actualizar: `git merge --abort` (o descarta las copias) y termina sin tocar nada.

Resuelve según lo elegido (`git checkout --theirs|--ours -- <ruta>` o edición manual al juntar) y `git add`.

## 3. Migraciones

Por cada línea «Migración:» pendiente, en orden de versión: explica en una frase qué hace («mover la carpeta de
moldes dentro de `.claude`»), comprueba si ya está aplicada (el destino existe, la fila ya no está) y ejecútala. Si
el paso borra, mueve o reescribe algo que tiene contenido de la empresa, **pregunta antes** con `AskUserQuestion`
(header "Migración"): qué se mueve, a dónde, y las opciones **Hacerlo (Recomendado)** / **Saltar este paso**.

## 4. Verificar y guardar

1. Corre el validador en la ruta que indique el `CLAUDE.md` recién actualizado (hoy `bun .claude/validar.ts`, o
   `/proyecto:validar` sin `bun`) y corrige lo que la actualización haya dejado fuera de regla.
2. Guarda y sube según la regla «Git»: commit `Framework actualizado a vX.Y` (cierra el merge si lo hubo) y push si
   hay remoto.
3. Devuelve en pocas líneas: la versión nueva, qué cambia en su día a día, qué eligió en los conflictos (si hubo) y
   «Guardé y subí los cambios».

## Nunca

- Tocar archivos de la empresa fuera de una migración declarada, y nunca sin preguntar.
- Dejar un merge a medias: si algo falla o el usuario cancela, `git merge --abort` y la carpeta queda como estaba.
- Forzar un push, reescribir historial ni tocar `.claude/settings.local.json`.

Idioma: español siempre. Directo, breve, cero relleno.
