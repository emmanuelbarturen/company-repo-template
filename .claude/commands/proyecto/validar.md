---
description: Revisa la estructura del repo a mano cuando no hay bun — los mismos chequeos que validar.ts (descriptores, tablas contra carpetas, cabeceras, tope de líneas, índice de referencias, trabajos con Estado, manifiesto del ejemplo) y, si se pide, la higiene previa a publicar
argument-hint: [--publicar]
---

Ejecutas el validador **a mano**, con Read, Glob y Grep, porque en esta máquina no hay `bun` (o el usuario prefiere
no instalarlo). El contrato es el mismo que el de `validar.ts`: mismos chequeos, misma severidad, mismo reporte. Si
`which bun` sí devuelve una ruta, no hagas nada de esto: corre `bun validar.ts` con los mismos argumentos y muestra
su salida.

Argumentos: $ARGUMENTS (`--publicar` activa el chequeo V11).

## Nombres reservados

Raíz (no son áreas): `Proyectos`, `Decisiones`, `_Referencias`, `_Templates`, `Plans`, `.claude`, `.ccos`, `.git`.
Dentro de `Proyectos/` (no son trabajos): `Tareas`, `Archivados`, `adjuntos`.

## Chequeos (E = error · A = aviso)

1. **V1 Descriptores.** `_context.md` en la raíz y en `Proyectos/` (E); `_rules.md` y `_enlaces.md` en la raíz (A).
   En cada área (carpeta de la raíz no reservada): `_context.md`, `_rules.md` y `_enlaces.md` (E cada uno).
2. **V2 Áreas.** Las filas de la tabla «Áreas» de `_context.md` raíz (columna Carpeta, entre acentos graves) contra
   las carpetas reales de la raíz menos las reservadas, en ambos sentidos: declarada sin carpeta (E), carpeta sin
   fila (E).
3. **V3 Temas.** Por área: las filas de la tabla «Temas» de su `_context.md` contra sus subcarpetas, en ambos
   sentidos (E). Un `.md` suelto en el área que no sea uno de los tres descriptores (E).
4. **V4 Cabecera.** Primera línea de todo `.md` = `<!-- Creado: AAAA-MM-DD · Actualizado: AAAA-MM-DD · Creador: … -->`
   con fechas reales (E). Los marcadores `AAAA-MM-DD` valen solo bajo `_Templates/`. Fuera de alcance: `.claude/`,
   `_Referencias/**` salvo `_index.md`, `Plans/`.
5. **V5 Tope de 120 líneas** contando fuera de bloques de código y sin filas de tabla (E). Exentos: `Decisiones/`,
   `_Referencias/_index.md`, `.claude/`.
6. **V6 Slug de plan-mode** fuera de `Plans/`: `.md` con nombre kebab de tres o más palabras, sin cabecera, fuera de
   `Proyectos/`, `_Referencias/`, `_Templates/` y `.claude/` (A).
7. **V7 Referencias.** `_Referencias/` con un solo nivel de subcarpetas (E); cada archivo listado en `_index.md` por
   su ruta relativa y sin filas que apunten a archivos inexistentes (E).
8. **V8 Trabajos.** Cada `Proyectos/<slug>/propuesta.md` y `Proyectos/Tareas/<slug>.md` (y los de `Archivados/`)
   con `## Estado`, `Fase:` en `explorar | proponer | aplicar | pausado | archivado`, y `Área:` que exista en la tabla
   de áreas (E). Un trabajo en `Archivados/` sin `Resultado:` (A; `ninguno — …` cuenta como presente).
9. **V9 Bitácora.** Solo archivos `Q[1-4]-AAAA.md` en `Decisiones/` (E). Desde la primera línea que empieza con
   fecha en adelante, toda línea no vacía empieza con `AAAA-MM-DD ·` (E).
10. **V10 Manifiesto del ejemplo.** Si el `Id` de la ficha raíz no es `ejemplo`, ninguna ruta de `.ccos/ejemplo.txt`
    debe existir (E por ruta).
11. **V11 Higiene** (solo con `--publicar`). Cada patrón de `.ccos/higiene.txt` y de `.ccos/higiene.local.txt` (si
    existe) buscado con Grep en todo el árbol menos `.git`, `Plans/`, `.ccos/`, `validar.ts` y `LICENSE`. Cada
    coincidencia es E, con archivo y línea. Además, si el repo tiene git, `git ls-files .ccos/higiene.local.txt` debe
    devolver vacío: ese archivo versionado es E (publica justo lo que debía proteger).

Detalles de V8 que también aplican a mano: los slugs (carpetas de trabajo, archivos de tarea, `Id` raíz) van en
kebab-case; un proyecto en fase `aplicar` o `archivado` tiene los cuatro documentos; `Fase: archivado` fuera de
`Archivados/` es E; las rutas de `Resultado:` son relativas a la raíz, sin `..`, y deben existir. Las fechas de
cabeceras y bitácora deben existir en el calendario.

## Reporte

Agrupa por chequeo, una línea por hallazgo: `✗ [V3] Ventas/resumen.md — .md suelto fuera de un tema`. Cierra con
`N errores · M avisos` y el veredicto: **limpio** (0 errores), **estructura** (hay errores de V1-V10), **higiene**
(solo V11 falló). No corrijas nada sin que el usuario lo pida: este comando informa.

Idioma: español siempre. Directo, breve, cero relleno.
