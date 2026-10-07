<!-- Creado: 2026-09-27 · Actualizado: 2026-09-27 · Creador: company-cycle-os -->
# Company Cycle OS

**Una forma de operar tu empresa en Markdown, con Claude Code como copiloto.**

No es software. Es una estructura de carpetas que se autodescribe, un ciclo de trabajo de cuatro pasos y una
bitácora de decisiones. El asistente aprende cómo está organizada tu empresa leyendo la carpeta, y actúa como un
gestor de proyectos ordenado: cada archivo que produce tiene un solo hogar, decidido antes de escribirlo.

Todo en español. Sin instalación, sin dependencias, sin integraciones obligatorias.

## Arrancar en 3 pasos (desde la app de escritorio de Claude)

1. **Descarga esta carpeta** («Use this template» o «Download ZIP») y descomprímela donde guardes tu trabajo.
2. **Ábrela en la app de escritorio de Claude, en la pestaña *Code***: nueva sesión → entorno *Local* → carpeta de
   proyecto = esta carpeta, **sin marcar la opción *worktree*** (trabajaría sobre una copia aislada y no verías los
   archivos en tu carpeta). La primera vez la app pregunta si confías en la carpeta: acepta, o nada del framework
   carga. **Solo la pestaña *Code* sirve**: *Chat* y *Cowork* no leen los comandos del repo aunque les des acceso a la
   carpeta. También funciona desde la terminal con `claude` dentro de la carpeta, pero no hace falta.
3. Escribe **`/proyecto:setup`**. Te pregunta el nombre de tu empresa, sus áreas y temas, borra la empresa de ejemplo y
   deja el repo listo. Después, **`/proyecto:explorar`** con el primer problema que quieras resolver.

Tres avisos para la primera vez. Si al escribir `/proyecto:` no aparecen los comandos, comprueba que estás en la
pestaña *Code* y que la sesión está abierta **sobre esta carpeta** (no sobre una carpeta que la contiene); si sigue sin
aparecer, pídeselo en palabras: *«ejecuta el comando setup de proyecto»*. Durante `setup` la app te pedirá permiso
varias veces para borrar y escribir archivos: es normal, borra solo la empresa de ejemplo y escribe la tuya. Y los
permisos que el repo trae declarados solo aplican después de aceptar el diálogo de confianza de la carpeta.

La carpeta viene con una empresa inventada, **Taller Norte**, para que veas el framework en uso antes de correr
`setup`: tres áreas con sus temas, un proyecto en curso, uno archivado con su resultado ya guardado en el área que
le tocaba, y una tarea pendiente. Léela como ejemplo; `setup` la borra por completo.

## La idea en cuatro frases

1. **Cada carpeta se autodescribe.** Tres archivos con subguion la explican: `_context.md` (qué vive aquí y qué no),
   `_rules.md` (cómo se documenta y cómo se crea un proyecto de esta área) y `_enlaces.md` (documentos y tableros
   externos). Es lo único que hace que un asistente sin memoria entienda una carpeta que no escribió.
2. **Todo trabajo tiene un solo hogar y pasa por el ciclo.** `/proyecto:explorar → proponer → aplicar → archivar` lo
   lleva de idea a archivo, siempre en `Proyectos/`. Un trabajo chico es una **tarea** (un archivo); uno grande es un
   **proyecto** (carpeta con propuesta, exploración, solución y tareas).
3. **Los resultados viven en su área y su tema, no en el proyecto.** Cada área declara sus temas (subcarpetas), y el
   asistente nombra el destino de cada archivo antes de escribirlo. Al archivar, siempre pregunta dónde queda el
   resultado.
4. **El validador exige lo que la disciplina olvida.** `bun validar.ts` comprueba descriptores, tablas contra carpetas,
   cabeceras, tope de líneas, índice de referencias y trabajos con estado. Sin `bun`, `/proyecto:validar` hace lo
   mismo a mano.

## Qué trae

| Comando | Para qué |
|---|---|
| `/proyecto:setup` | Primera vez: nombra la empresa, declara áreas y temas, borra el ejemplo, primer commit |
| `/proyecto:explorar` | Pensar una idea sin compromiso. No escribe archivos salvo que se lo pidas |
| `/proyecto:proponer` | Entrevista en vivo → propuesta, solución y plan de tareas, con área y resultado esperado |
| `/proyecto:aplicar` | **Ejecuta** el plan; cada resultado nace en `<Área>/<tema>/` |
| `/proyecto:archivar` | Confirma dónde queda el resultado, archiva y registra el hito |
| `/proyecto:validar` | El validador a mano, para máquinas sin `bun` |

Y además: `_Templates/` (moldes de descriptores, proyecto, tarea y bitácora), `_Referencias/` (archivos de afuera
que se consultan, con índice), `Decisiones/` (bitácora por quarter), `CHANGELOG.md` (historia del framework) y
`validar.ts`.

## Qué NO trae, a propósito

- **Ninguna integración.** El repo es la única fuente de verdad. No publica a ninguna herramienta.
- **Ningún agente, skill, MCP ni hook.** Funciona con Claude Code estándar, también desde la app de escritorio.
- **Ningún catálogo de áreas impuesto.** Hay uno sugerido; tu empresa lo recorta. Una sola área es válida.
- **Ninguna bandeja que haya que vaciar.** `_Referencias/` es un estante: lo que está ahí se consulta, no se procesa.

## Estructura

```
CLAUDE.md                          reglas del framework (lo que el asistente lee siempre)
_context.md _rules.md _enlaces.md  tu empresa: ficha, tabla de áreas, reglas, enlaces
<Área>/_context.md …               cada área, con su tabla de temas y sus tres descriptores
<Área>/<tema>/*.md                 los documentos, siempre dentro de un tema
Proyectos/<slug>/                  un proyecto: propuesta · exploracion · solucion · tareas
Proyectos/Tareas/<slug>.md         una tarea
Proyectos/Archivados/              lo cerrado, con `Resultado:` en su estado
_Referencias/_index.md             el estante
Decisiones/Q3-2026.md              la bitácora
_Templates/  validar.ts  .ccos/   moldes, validador y sus patrones
```

Las reglas completas están en `CLAUDE.md`, que es lo que el asistente lee al abrir cada sesión.

## Antes de compartir una copia

Si vas a pasar tu repo a alguien más, o hacerlo público, corre la higiene:

```
bun validar.ts --publicar
```

Busca los patrones de `.ccos/higiene.txt` (rutas de tu máquina, correos, claves) y los de
`.ccos/higiene.local.txt`, que **no se versiona** y donde pones lo tuyo: tu marca, nombres propios, dominios
internos. El objetivo son **cero coincidencias**, también en el historial de git. Y `Plans/` queda fuera del repo
por defecto: son borradores de sesión con rutas locales.

## Licencia

MIT. Úsalo, cámbialo, compártelo.
