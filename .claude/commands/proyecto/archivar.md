---
description: Cierra un trabajo terminado — confirma dónde queda su resultado (pregunta siempre), lo mueve a Proyectos/Archivados/ y registra el hito en Decisiones. También pausa un trabajo sin archivarlo
argument-hint: [trabajo]
---

Cierras un trabajo: verificas su plan, **confirmas con el usuario dónde queda cada resultado**, mueves el trabajo a
`Proyectos/Archivados/` y dejas el hito en la bitácora. Es el final del ciclo.

Trabajo (opcional): $ARGUMENTS

## 0. Contexto mínimo

Lee `_context.md` de la raíz y `Proyectos/_context.md`. Cuando sepas el área del trabajo, lee su `_context.md`
(tabla de temas).

## 1. ¿Qué archivamos?

El nombre puede venir en $ARGUMENTS. **Si no viene**, lista los trabajos activos (carpetas de `Proyectos/` sin
`Tareas/`, `Archivados/` ni `adjuntos/`; y los archivos de `Proyectos/Tareas/`) y preséntalos con `AskUserQuestion`
(header "Trabajo"; con más de 4, los 4 más recientes y el resto por nombre en texto libre). Si no hay nada, dilo y
detente.

## 2. Pre-chequeo

Lee el plan (`tareas.md` o el checklist de la tarea) y el bloque `## Estado`.

- **Plan al 100 %** → sigue al paso 3.
- **Con pendientes** → pregunta con `AskUserQuestion` (header "Pendientes"): **Archivar igual** (anota en
  `## Estado` por qué se cierra con pendientes y cuáles son) / **Pausar** (`Fase: pausado` con el motivo; no se
  mueve nada; termina aquí) / **Cancelar** (vuelve con `/proyecto:aplicar <slug>`).

## 3. Resultado — se pregunta SIEMPRE

Reúne los candidatos a resultado del trabajo:

1. Lo que declara `Resultado esperado:` en el Estado.
2. Los archivos que `tareas.md` nombra como resultado (`resultado: <ruta>`) y que existen en su `<Área>/<tema>/`.
3. **Cualquier archivo en la carpeta del trabajo que no sea** `propuesta.md`, `exploracion.md`, `solucion.md`,
   `tareas.md` ni `adjuntos/`: eso es un resultado que quedó fuera de su hogar.

Preséntalos con `AskUserQuestion` (header "Resultado", `multiSelect: true`): por cada candidato, la ruta propuesta
en `<Área>/<tema>/` (para los que ya están ahí, «confirmar»; para los sueltos, el destino que corresponde por la
tabla de temas del área; si ningún tema encaja, «crear tema» como opción explícita). `AskUserQuestion` admite hasta
4 opciones: con más de 4 candidatos, haz **una pregunta por candidato**. **No muevas nada sin esta confirmación**,
aunque el destino parezca obvio. Si el trabajo no dejó archivos (una decisión, un trámite), la opción es
**«ninguno»** y pides el motivo en una línea.

Con la respuesta: mueve lo que falte (con `mv`, conservando el nombre), agrega la fila de un tema nuevo en el
`_context.md` del área si lo creó, y escribe en `## Estado` la viñeta literal **`- **Resultado:** <ruta1>, <ruta2>`**
o **`- **Resultado:** ninguno — <motivo>`** (rutas relativas a la raíz, sin `..`; el validador comprueba que existan).
Si un resultado reemplaza un documento anterior del área, no lo borres: deja en el anterior, justo debajo de su
cabecera, una línea `> Reemplazado el AAAA-MM-DD por \`<ruta nueva>\`.` y actualiza su fecha `Actualizado:`.

## 4. Mover a Archivados/

1. Actualiza `## Estado`: la viñeta **`- **Fase:** archivado`**, fecha de hoy, y la fecha `Actualizado:` de la
   cabecera.
2. Proyecto: `mv Proyectos/<slug> Proyectos/Archivados/<slug>`. Tarea: `mv Proyectos/Tareas/<slug>.md
   Proyectos/Archivados/Tareas/<slug>.md` (crea `Archivados/Tareas/` si no existe). No renombres con fecha: la
   fecha vive en el Estado y en la bitácora.
3. Si `_context.md` de la raíz tiene «Trabajos activos», quita la línea del trabajo.

## 5. Bitácora

Añade al archivo del quarter actual `Decisiones/Q<N>-<AAAA>.md` (Q1 ene-mar · Q2 abr-jun · Q3 jul-sep · Q4 oct-dic;
créalo desde `_Templates/decisiones-quarter.md` si no existe):

```
AAAA-MM-DD · [proyecto] Archivado <slug> — <resultado en una línea>; resultado en `<ruta>`
```

## 6. Confirmar

Devuelve: la ruta final en `Archivados/`, la línea `Resultado:` tal como quedó, la línea escrita en la bitácora, y
las pendientes documentadas si las hubo. Sugiere `bun validar.ts` (o `/proyecto:validar`) si creaste un tema.

Respeta lo que `_rules.md` de la raíz declare que no entra en el repo.

Idioma: español siempre. Directo, breve, cero relleno.
