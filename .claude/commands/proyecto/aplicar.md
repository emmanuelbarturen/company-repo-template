---
description: Sesión de ejecución sobre el plan de tareas de un trabajo — EJECUTA las tareas (no solo las trackea), escribe cada resultado directamente en su área y tema, y marca progreso verificado
argument-hint: [trabajo]
---

Conduces una **sesión de ejecución**: tomas el plan de un trabajo (`tareas.md`, o el checklist `## Tareas` de una
tarea) y **lo ejecutas**. Este comando hace las tareas, no las anota para que alguien más las haga. Y actúa como un
gestor de proyectos ordenado: **cada archivo que produce el trabajo nace ya en su destino** `<Área>/<tema>/`, nunca
en la carpeta del proyecto.

Trabajo (opcional): $ARGUMENTS

## 0. Contexto mínimo

**Sincroniza primero**, sin decir nada técnico: si hay remoto, `git pull --rebase --autostash`; si falla, sigue en
local y avísalo en una línea (regla «Git» de `CLAUDE.md`). Lee `_context.md` y `_rules.md` de la raíz y `Proyectos/_context.md`. Cuando sepas el área del trabajo, lee su
`_context.md` (tabla de temas) y su `_rules.md`.

## 1. ¿Qué ejecutamos?

El nombre puede venir en $ARGUMENTS. **Si no viene**, lista los trabajos con plan (carpetas de
`Proyectos/Regulares/` con `tareas.md` y archivos de `Proyectos/Tareas/`, sin mirar dentro de `Archivados/`) y
preséntalos con `AskUserQuestion` (header "Trabajo"). Si no hay ninguno, dilo — los planes se crean con `/proyecto:proponer` — y
detente.

## 2. Cargar el estado

Lee el plan y el bloque `## Estado`; en un proyecto, también `propuesta.md` y `solucion.md` como contexto de qué se
construye y cómo. Resume en 3-5 líneas: **N de M tareas hechas · bloqueos · próximo paso · dónde queda el
resultado** (`Resultado esperado:`).

## 3. Loop de ejecución

Trabaja las tareas **en orden de numeración** (respeta dependencias), o la que el usuario elija. Por cada tanda:

- **Gate en una línea** («¿hago la 03 y la 04?») y a trabajar. No conviertas en pregunta lo que ya está decidido
  en la propuesta o la solución.
- **Destino antes de escribir.** Antes de crear un archivo, nombra su ruta `<Área>/<tema>/<archivo>.md`. Si la
  tarea no lo dice, decídelo con la tabla de temas del área; si ningún tema encaja, pregunta con
  `AskUserQuestion` ofreciendo los temas del área, los sugeridos para esa área en `.claude/templates/catalogo-areas.md` y
  «otro» — **nunca crees un tema en silencio ni dejes el archivo en la carpeta del proyecto «por ahora»**. Al crear
  un tema con permiso, agrega su fila en el `_context.md` del área (procedimiento en `CLAUDE.md`, «Áreas y temas»).
- **Documental / operativa:** la ejecutas tú, aquí. **Técnica en otro repo o herramienta:** pide la ruta o el
  acceso y ejecútala ahí; si el usuario decide hacerla él, déjala asignada con su bloqueo anotado — no la simules
  ni la marques.
- **Verifica antes de marcar:** una tarea se marca solo cuando su resultado existe y lo comprobaste (el archivo
  está en su destino, con cabecera; la acción ocurrió). Marca `- [x] ... (hecha: AAAA-MM-DD)`. Los bloqueos van en
  la línea de la tarea y en la sección Bloqueos.
- Tras cada tanda: actualiza `## Estado` (`Fase: aplicar`, fecha, próximo paso) y la fecha `Actualizado:` de la
  cabecera del plan, y **guarda la tanda** (regla «Git» de `CLAUDE.md`): commit `<slug>: tareas 03-04 — <qué quedó>`
  y push si hay remoto. Así nada se pierde si la sesión se corta.

Respeta lo decidido en `solucion.md`. Si al ejecutar descubres que una decisión no se sostiene, no la cambies en
silencio: decláralo y redirige a `/proyecto:proponer <slug>` (modo cambio).

## 4. Cierre

Cuando el usuario cierre la sesión, ofrece con `AskUserQuestion` (header "Cierre"): **Seguir en otra sesión** (solo
actualizar `## Estado`) / **Pausar** (`Fase: pausado` con el motivo). Si tocaste la estructura (temas o áreas
nuevas), corre `bun .claude/validar.ts` (o `/proyecto:validar`) y corrige antes de guardar. Cierra siempre **guardando y
subiendo** lo que quede (commit y push, regla «Git» de `CLAUDE.md`) y dilo en una línea sin jerga.

Si el plan quedó al **100 %**, dilo y sugiere `/proyecto:archivar <slug>`: ahí se confirma dónde quedó cada resultado.

Todo `.md` lleva la cabecera de metadatos con el creador por defecto de la ficha. Respeta lo que `_rules.md` de la
raíz declare que no entra en el repo.

Idioma: español siempre. Directo, breve, cero relleno.
