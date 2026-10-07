---
description: Cierra un trabajo terminado — escribe en su área los documentos que el trabajo deja como resultado, decide como experto en organización la carpeta donde quedan (y lo confirma), mueve el trabajo al Archivados/ de su rama y registra el hito en Decisiones. También pausa un trabajo sin archivarlo
argument-hint: [trabajo]
---

Cierras un trabajo: verificas su plan, **dejas escrita en el área la documentación que el trabajo produce**, decides
con criterio de organización en qué carpeta (tema) queda, lo confirmas con el usuario, mueves el trabajo al
`Archivados/` de su rama (`Proyectos/Regulares/Archivados/` o `Proyectos/Tareas/Archivados/`) y dejas el hito en la
bitácora. Es el final del ciclo: lo que no quede documentado en su
área aquí, se pierde con el proyecto.

Trabajo (opcional): $ARGUMENTS

## 0. Contexto mínimo

**Sincroniza primero**, sin decir nada técnico: si hay remoto, `git pull --rebase --autostash`; si falla, sigue en
local y avísalo en una línea (regla «Git» de `CLAUDE.md`). Lee `_context.md` de la raíz, `Proyectos/_context.md` y
`.claude/templates/catalogo-areas.md`. Cuando sepas el área del trabajo, lee su `_context.md` (tabla de temas, qué vive en cada uno) y su `_rules.md`: **cómo se documenta en esa
área manda sobre el formato de todo lo que escribas aquí**.

## 1. ¿Qué archivamos?

El nombre puede venir en $ARGUMENTS. **Si no viene**, lista los trabajos activos (carpetas de `Proyectos/Regulares/`
y archivos de `Proyectos/Tareas/`, sin mirar dentro de `Archivados/`) y preséntalos con `AskUserQuestion`
(header "Trabajo"; con más de 4, los 4 más recientes y el resto por nombre en texto libre). Si no hay nada, dilo y
detente.

## 2. Pre-chequeo

Lee el plan (`tareas.md` o el checklist de la tarea) y el bloque `## Estado`.

- **Plan al 100 %** → sigue al paso 3.
- **Con pendientes** → pregunta con `AskUserQuestion` (header "Pendientes"): **Archivar igual** (anota en
  `## Estado` por qué se cierra con pendientes y cuáles son) / **Pausar** (`Fase: pausado` con el motivo; no se
  mueve nada; termina aquí) / **Cancelar** (vuelve con `/proyecto:aplicar <slug>`).

## 3. Qué documentos deja el trabajo — los decides tú

Un trabajo deja documentación en su área; la carpeta del proyecto guarda el plan y se archiva. Lee `propuesta.md`,
`solucion.md`, `tareas.md` y `exploracion.md` (o el archivo de la tarea) y reúne lo que produjo o debió producir:

1. Lo que declara `Resultado esperado:` en el Estado.
2. Los archivos que `tareas.md` nombra con `resultado: <ruta>`, existan o no todavía.
3. **Cualquier archivo en la carpeta del trabajo** que no sea `propuesta.md`, `exploracion.md`, `solucion.md`,
   `tareas.md` ni `adjuntos/`: un resultado que quedó fuera de su hogar.
4. Lo que el trabajo dejó **decidido y no está escrito en ningún lado**: decisiones de `solucion.md` que la empresa
   seguirá usando (un proceso, una política, una definición, una arquitectura, un proveedor elegido) y conclusiones
   de `exploracion.md` que valen más allá del proyecto.

Con esa lista fija **qué documentos deben existir en el área al cerrar**. Normalmente uno por resultado, nombrado
por lo que es (`proceso-de-onboarding.md`, `politica-de-reembolsos.md`), en kebab-case sin tildes, nunca por el
nombre del proyecto ni con fecha. Clasifica cada uno:

- **Ya existe en su `<Área>/<tema>/`** → se confirma; revisa que tenga cabecera y que diga lo que se hizo.
- **Existe solo en la carpeta del proyecto** → se mueve con `mv`, conservando el nombre.
- **No existe** → **lo escribes tú** en el paso 4, a partir de propuesta, solución, tareas y exploración. Un
  documento de resultado dice qué es, cómo se usa y qué se decidió y por qué; no cuenta cómo se planificó. Si el
  contenido real lo tiene el usuario en otro lado (un archivo, un adjunto), pídeselo en vez de inventarlo.

Si el trabajo no dejó nada documentable (un trámite, una compra, una decisión ya anotada en la bitácora), el
resultado es **«ninguno»** y pides el motivo en una línea.

## 4. La carpeta — decides tú, como experto en organización, y lo confirmas

Decide en qué tema (subcarpeta del área) queda cada documento, con estos criterios en orden:

1. **Reusa** el tema que `Resultado esperado:` nombra, o uno existente de la tabla del área, si describe bien lo
   que vas a dejar. Un tema que ya guarda documentos del mismo tipo gana siempre.
2. Si ninguno encaja, **nombra uno nuevo por el tipo de documentos que vivirán ahí durante años**, no por el
   proyecto que los produjo: `procesos/`, `politicas/`, `proveedores/`, `arquitectura/`, `reportes/`. Sustantivo,
   normalmente plural, kebab-case, sin tildes, corto. Los temas sugeridos del catálogo son referencia. Nunca
   `proyecto-x/`, nunca fechas, nunca un tema por cada archivo.
3. Resultados de tipos distintos pueden ir a temas distintos; no fuerces uno solo.

Preséntalo con `AskUserQuestion` (header "Resultado"): por cada documento, su ruta `<Área>/<tema>/<archivo>.md` y
si se escribe, se mueve o se confirma. **Tu propuesta va primero, marcada «(Recomendado)», con una línea de por
qué ese tema**; las otras opciones son otro tema existente u otro nombre, y queda el texto libre. Con más de 4
documentos o destinos distintos, una pregunta por documento. **No escribas ni muevas nada antes de esta
confirmación**, aunque el destino parezca obvio.

Con la respuesta:

1. Crea el tema si es nuevo: carpeta y fila en la tabla de temas del `_context.md` del área, con una descripción de
   qué vive ahí (no del proyecto). Si el tema existía vacío con `.gitkeep`, bórralo al dejar el primer archivo.
2. Escribe los documentos nuevos y mueve los sueltos. Cabecera con el creador por defecto de la ficha, tope de 120
   líneas (si se pasa, son dos documentos), formato según `_rules.md` del área, y nada de lo que `_rules.md` de la
   raíz prohíbe.
3. Escribe en `## Estado` la viñeta literal **`- **Resultado:** <ruta1>, <ruta2>`** o
   **`- **Resultado:** ninguno — <motivo>`** (rutas relativas a la raíz, sin `..`; el validador comprueba que
   existan).
4. Si un resultado reemplaza un documento anterior del área, no lo borres: deja en el anterior, justo debajo de su
   cabecera, una línea `> Reemplazado el AAAA-MM-DD por \`<ruta nueva>\`.` y actualiza su fecha `Actualizado:`.

## 5. Mover a Archivados/

1. Actualiza `## Estado`: la viñeta **`- **Fase:** archivado`**, fecha de hoy, y la fecha `Actualizado:` de la
   cabecera.
2. Proyecto: `mv Proyectos/Regulares/<slug> Proyectos/Regulares/Archivados/<slug>`. Tarea:
   `mv Proyectos/Tareas/<slug>.md Proyectos/Tareas/Archivados/<slug>.md`. Las dos carpetas `Archivados/` existen
   siempre (si falta una, créala con su `.gitkeep`). No renombres con fecha: la fecha vive en el Estado y en la
   bitácora.
3. Si `_context.md` de la raíz tiene «Trabajos activos», quita la línea del trabajo.

## 6. Bitácora

Añade al archivo del quarter actual `Decisiones/Q<N>-<AAAA>.md` (Q1 ene-mar · Q2 abr-jun · Q3 jul-sep · Q4 oct-dic;
créalo desde `.claude/templates/decisiones-quarter.md` si no existe):

```
AAAA-MM-DD · [proyecto] Archivado <slug> — <resultado en una línea>; resultado en `<ruta>`
```

## 7. Confirmar

Devuelve: la lista de documentos escritos, movidos o confirmados con su ruta final, la ruta del trabajo en
`Archivados/`, la línea `Resultado:` tal como quedó, la línea escrita en la bitácora, y las pendientes documentadas
si las hubo. Antes de confirmar: corre `bun .claude/validar.ts` (o `/proyecto:validar`) y corrige lo que salga; luego
**guarda y sube** (regla «Git» de `CLAUDE.md`): commit `Archivado <slug>: <resultado en una línea>` y push si hay
remoto. Díselo en una línea sin jerga.

Respeta lo que `_rules.md` de la raíz declare que no entra en el repo.

Idioma: español siempre. Directo, breve, cero relleno.
