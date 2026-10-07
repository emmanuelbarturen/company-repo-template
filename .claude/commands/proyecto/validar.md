---
description: Revisa la estructura del repo a mano cuando no hay bun — los mismos chequeos que .claude/validar.ts (descriptores, tablas contra carpetas, cabeceras, tope de líneas, índice de referencias, trabajos con Estado, bitácora)
argument-hint: (sin argumentos)
---

Ejecutas el validador **a mano**, con Read, Glob y Grep, porque en esta máquina no hay `bun` (o el usuario prefiere
no instalarlo). El contrato es el mismo que el de `.claude/validar.ts`: mismos chequeos, misma severidad, mismo reporte. Si
`which bun` sí devuelve una ruta, no hagas nada de esto: corre `bun .claude/validar.ts` y muestra su salida.

## Nombres reservados

Raíz (no son áreas): `Proyectos`, `Decisiones`, `_Referencias`, `Plans`, `.claude`, `.git`.
`Proyectos/` tiene estructura fija: `Regulares/` (una carpeta por proyecto) y `Tareas/` (un `.md` por tarea), cada
una con su `Archivados/`. Nada más vive en su primer nivel salvo `_context.md`.

## Chequeos (E = error · A = aviso)

1. **V1 Descriptores.** `_context.md` en la raíz y en `Proyectos/` (E); `_rules.md` y `_links.md` en la raíz (A).
   Existen `Proyectos/Regulares/`, `Proyectos/Tareas/` y el `Archivados/` de cada una (E).
   En cada área (carpeta de la raíz no reservada): `_context.md`, `_rules.md` y `_links.md` (E cada uno).
2. **V2 Áreas.** Las filas de la tabla «Áreas» de `_context.md` raíz (columna Carpeta, entre acentos graves) contra
   las carpetas reales de la raíz menos las reservadas, en ambos sentidos: declarada sin carpeta (E), carpeta sin
   fila (E).
3. **V3 Temas.** Por área: las filas de la tabla «Temas» de su `_context.md` contra sus subcarpetas, en ambos
   sentidos (E). Un `.md` suelto en el área que no sea uno de los tres descriptores (E).
4. **V4 Cabecera.** Primera línea de todo `.md` = `<!-- Creado: AAAA-MM-DD · Actualizado: AAAA-MM-DD · Creador: … -->`
   con fechas reales (E). Los marcadores `AAAA-MM-DD` valen solo bajo `.claude/templates/`. Fuera de alcance: el
   resto de `.claude/`,
   `_Referencias/**` salvo `_index.md`, `Plans/`.
5. **V5 Tope de 120 líneas** contando fuera de bloques de código y sin filas de tabla (E). Exentos: `Decisiones/`,
   `_Referencias/_index.md`, `.claude/` salvo `templates/`.
6. **V6 Slug de plan-mode** fuera de `Plans/`: `.md` con nombre kebab de tres o más palabras, sin cabecera, fuera de
   `Proyectos/`, `_Referencias/` y `.claude/` (A).
7. **V7 Referencias.** `_Referencias/` con un solo nivel de subcarpetas (E); cada archivo listado en `_index.md` por
   su ruta relativa y sin filas que apunten a archivos inexistentes (E).
8. **V8 Trabajos.** Cada `Proyectos/Regulares/<slug>/propuesta.md` y `Proyectos/Tareas/<slug>.md` (y los de sus
   `Archivados/`) con `## Estado`, `Fase:` en `explorar | proponer | aplicar | pausado | archivado`, y `Área:` que exista en la tabla
   de áreas (E). Un trabajo en `Archivados/` sin `Resultado:` (A; `ninguno — …` cuenta como presente).
9. **V9 Bitácora.** Solo archivos `Q[1-4]-AAAA.md` en `Decisiones/` (E). Desde la primera línea que empieza con
   fecha en adelante, toda línea no vacía empieza con `AAAA-MM-DD ·` (E).
10. **V10 Carpetas vacías.** Toda carpeta sin ningún archivo dentro (ni `.gitkeep`) fuera de `.git/` (A): git no la
    versionará.

Detalles de V8 que también aplican a mano: los slugs (carpetas de trabajo, archivos de tarea, `Id` raíz) van en
kebab-case; un proyecto en fase `aplicar` o `archivado` tiene los cuatro documentos; `Fase: archivado` fuera de
`Archivados/` es E; una carpeta en el primer nivel de `Proyectos/` que no sea `Regulares/` ni `Tareas/`, un `.md`
suelto en `Regulares/` o una carpeta en `Tareas/` que no sea `Archivados/` son E; las rutas de `Resultado:` son relativas a la raíz, sin `..`, y deben existir. Las fechas de
cabeceras y bitácora deben existir en el calendario.

## Reporte

Agrupa por chequeo, una línea por hallazgo: `✗ [V3] Ventas/resumen.md — .md suelto fuera de un tema`. Cierra con
`N errores · M avisos` y el veredicto: **limpio** (0 errores) o **estructura** (hay errores). No corrijas nada sin
que el usuario lo pida: este comando informa.

Idioma: español siempre. Directo, breve, cero relleno.
