<!-- Creado: 2026-09-27 · Actualizado: 2026-10-07 · Creador: company-cycle-os -->
# Historia del framework

Qué cambió en **Company Cycle OS** y qué debe migrar quien ya lo usa. La bitácora de tu empresa es otra cosa: vive en
`Decisiones/`.

## v1.3 — 2026-10-07

- **Git lo lleva el asistente.** El usuario del repo no es técnico: nueva sección «Git» en `CLAUDE.md`. Cada comando
  trae lo último al empezar, y al cerrar (y `aplicar` tras cada tanda) guarda y sube con un mensaje que nombra el
  trabajo. Sin jerga: nunca se dice commit, push, rama ni conflicto; si hay que elegir entre dos versiones, la
  pregunta es de negocio. Nunca se fuerza un push ni se reescribe historial; siempre en `main`.
- `setup` pregunta en lenguaje llano si quiere una copia en la nube (GitHub) y guía la creación del repositorio
  privado paso a paso.
- `.claude/settings.json` preautoriza las operaciones de git que esto requiere (pull, push, fetch, remote, mv, rm,
  stash, rebase, merge, checkout, branch, restore) para que la app no interrumpa al usuario con permisos.
- Migración: nada que hacer; aplica en la siguiente sesión.

## v1.2 — 2026-10-07

- `/proyecto:explorar` pasa a llamarse **`/proyecto:nuevo`**: es el comando con el que arranca todo trabajo. El
  archivo es `.claude/commands/proyecto/nuevo.md`; la fase `explorar` del bloque Estado no cambia.
- `setup` ya no pregunta áreas ni temas: la tabla de áreas de `_context.md` raíz nace vacía. Un área se crea cuando
  un trabajo la necesita, desde `/proyecto:nuevo` o `/proyecto:proponer`, que preguntan en qué carpeta va
  ofreciendo lo que ya existe más el catálogo de `_Templates/catalogo-areas.md` (nuevo). Los temas igual: se eligen
  al proponer el trabajo, con los de la tabla del área y los sugeridos del catálogo como alternativas.
- El creador por defecto de las cabeceras es `System`, fijo en la ficha; `setup` ya no lo pregunta.
- `archivar` deja escrita la documentación del trabajo: escribe en el área los documentos de resultado que falten
  (a partir de propuesta, solución, tareas y exploración), decide con criterio de organización el tema donde quedan
  (por tipo de documento, nunca por proyecto) y lo confirma antes de escribir o mover.
- `Proyectos/` adopta una estructura fija: `Regulares/` (proyectos) y `Tareas/` (tareas), cada una con su
  `Archivados/`. `validar.ts` exige la estructura (V1, V8).
- Toda carpeta vacía que deba verse lleva un `.gitkeep`; el validador lo avisa (nuevo chequeo V10).
- Migración: las áreas existentes siguen valiendo. Para `Proyectos/`: `mv Proyectos/<slug> Proyectos/Regulares/<slug>`,
  `mv Proyectos/Archivados/<slug> Proyectos/Regulares/Archivados/<slug>` y
  `mv Proyectos/Archivados/Tareas/*.md Proyectos/Tareas/Archivados/`; borra `Proyectos/Archivados/` al quedar vacía.

## v1.1 — 2026-10-07

- Se retira la empresa de ejemplo (Taller Norte) y la carpeta `.ccos/`: la copia viene con la raíz en blanco
  (`Id` = `mi-empresa`) y `setup` solo escribe, no borra nada.
- `validar.ts` pierde `--publicar` y los chequeos V10 (manifiesto) y V11 (higiene). Quedan V1-V9; códigos de
  salida 0 / 1 / 3.

## v1 — 2026-09-27

- Creación del framework. Mono-empresa, en español, para Claude Code (también desde la app de escritorio).
- Descriptores con subguion por carpeta: `_context.md`, `_rules.md`, `_links.md`. Áreas declaradas en la raíz,
  temas declarados en cada área; nada se crea sin preguntar.
- Ciclo de trabajo `/proyecto:nuevo → proponer → aplicar → archivar`, más `/proyecto:setup` (adopción) y
  `/proyecto:validar` (respaldo del validador cuando no hay `bun`).
- Todo trabajo en `Proyectos/`: proyecto (carpeta de cuatro documentos) o tarea (un archivo). Campos `Área:` y
  `Resultado esperado:`; al archivar se pregunta dónde queda el resultado.
- `_Referencias/` como estante con `_index.md`. `Decisiones/` por quarter. Cabecera de metadatos y tope de 120
  líneas por archivo.
- `validar.ts`: un archivo, sin dependencias, con `--publicar` para la higiene previa a compartir.
- Empresa de ejemplo en la raíz, listada en `.ccos/ejemplo.txt`; `setup` la borra por manifiesto.
