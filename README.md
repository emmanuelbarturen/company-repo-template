<!-- Creado: 2026-09-27 · Actualizado: 2026-10-07 · Creador: company-cycle-os -->
# Company Cycle OS

**Una forma de operar tu empresa en Markdown, con Claude Code como copiloto.**

No es software. Es una estructura de carpetas que se autodescribe, un ciclo de trabajo de cuatro pasos y una
bitácora de decisiones. El asistente aprende cómo está organizada tu empresa leyendo la carpeta, y actúa como un
gestor de proyectos ordenado: cada archivo que produce tiene un solo hogar, decidido antes de escribirlo.

Todo en español. Sin instalación, sin dependencias, sin integraciones obligatorias. **No necesitas saber git:** el
asistente guarda y sube tu trabajo por ti, y si tiene que preguntarte algo lo hace en lenguaje de negocio.

## Arrancar en 3 pasos (desde la app de escritorio de Claude)

1. **Descarga esta carpeta** («Use this template» o «Download ZIP») y descomprímela donde guardes tu trabajo.
2. **Ábrela en la app de escritorio de Claude, en la pestaña *Code***: nueva sesión → entorno *Local* → carpeta de
   proyecto = esta carpeta, **sin marcar la opción *worktree*** (trabajaría sobre una copia aislada y no verías los
   archivos en tu carpeta). La primera vez la app pregunta si confías en la carpeta: acepta, o nada del framework
   carga. **Solo la pestaña *Code* sirve**: *Chat* y *Cowork* no leen los comandos del repo aunque les des acceso a la
   carpeta. También funciona desde la terminal con `claude` dentro de la carpeta, pero no hace falta.
3. Escribe **`/proyecto:setup`**. Te pregunta por tu empresa y deja el repo listo; no te pide áreas ni temas. Al
   final te ofrece guardar una copia en la nube (GitHub) y te guía si no sabes cómo.
   Después, **`/proyecto:nuevo`** con el primer problema que quieras resolver: ahí eliges en qué área (carpeta) y
   en qué tema va, entre lo que ya existe y un catálogo sugerido, y la carpeta se crea en ese momento.

Dos avisos para la primera vez. Si al escribir `/proyecto:` no aparecen los comandos, comprueba que estás en la
pestaña *Code* y que la sesión está abierta **sobre esta carpeta** (no sobre una carpeta que la contiene); si sigue sin
aparecer, pídeselo en palabras: *«ejecuta el comando setup de proyecto»*. Durante `setup` la app te pedirá permiso
varias veces para escribir archivos: es normal. Y los permisos que el repo trae declarados solo aplican después de
aceptar el diálogo de confianza de la carpeta.

## La idea en cuatro frases

1. **Cada carpeta se autodescribe.** Tres archivos con subguion la explican: `_context.md` (qué vive aquí y qué no),
   `_rules.md` (cómo se documenta y cómo se crea un proyecto de esta área) y `_links.md` (documentos y tableros
   externos). Es lo único que hace que un asistente sin memoria entienda una carpeta que no escribió.
2. **Todo trabajo tiene un solo hogar y pasa por el ciclo.** `/proyecto:nuevo → proponer → aplicar → archivar` lo
   lleva de idea a archivo, siempre en `Proyectos/`. Un trabajo chico es una **tarea** (un archivo); uno grande es un
   **proyecto** (carpeta con propuesta, exploración, solución y tareas).
3. **Los resultados viven en su área y su tema, no en el proyecto.** Las áreas y sus temas (subcarpetas) nacen con
   el primer trabajo que los necesita, elegidos por ti; el asistente nombra el destino de cada archivo antes de
   escribirlo. Al archivar, escribe los documentos que el trabajo deja, propone la carpeta con criterio de
   organización y te lo confirma antes de mover nada.
4. **El validador exige lo que la disciplina olvida.** `bun .claude/validar.ts` comprueba descriptores, tablas contra
   carpetas,
   cabeceras, tope de líneas, índice de referencias y trabajos con estado. Sin `bun`, `/proyecto:validar` hace lo
   mismo a mano.

## Qué trae

| Comando | Para qué |
|---|---|
| `/proyecto:setup` | Primera vez: nombra la empresa y hace el primer commit; sin áreas ni temas |
| `/proyecto:nuevo` | Pensar una idea sin compromiso. No escribe archivos salvo que se lo pidas |
| `/proyecto:proponer` | Entrevista en vivo → propuesta, solución y plan de tareas; elige área y tema, y los crea si no existen |
| `/proyecto:aplicar` | **Ejecuta** el plan; cada resultado nace en `<Área>/<tema>/` |
| `/proyecto:archivar` | Escribe la documentación resultante en su área, decide y confirma la carpeta, archiva y registra el hito |
| `/proyecto:validar` | El validador a mano, para máquinas sin `bun` |

Y además: `_Referencias/` (archivos de afuera que se consultan, con índice), `Decisiones/` (bitácora por quarter),
`CHANGELOG.md` (historia del framework) y, dentro de `.claude/`, la maquinaria que no hace falta mirar: los comandos,
los moldes (`templates/`), el catálogo sugerido de áreas y el validador (`validar.ts`).

## Qué NO trae, a propósito

- **Ninguna integración.** El repo es la única fuente de verdad. No publica a ninguna herramienta.
- **Ningún agente, skill, MCP ni hook.** Funciona con Claude Code estándar, también desde la app de escritorio.
- **Ningún catálogo de áreas impuesto.** Hay uno sugerido en `.claude/templates/catalogo-areas.md`, que se ofrece
  como alternativa cuando un trabajo necesita un área o un tema nuevo. Una sola área es válida.
- **Ninguna bandeja que haya que vaciar.** `_Referencias/` es un estante: lo que está ahí se consulta, no se procesa.

## Estructura

```
CLAUDE.md                          reglas del framework (lo que el asistente lee siempre)
_context.md _rules.md _links.md  tu empresa: ficha, tabla de áreas, reglas, enlaces
<Área>/_context.md …               cada área, con su tabla de temas y sus tres descriptores
<Área>/<tema>/*.md                 los documentos, siempre dentro de un tema
Proyectos/Regulares/<slug>/        un proyecto: propuesta · exploracion · solucion · tareas
Proyectos/Regulares/Archivados/    proyectos cerrados, con `Resultado:` en su estado
Proyectos/Tareas/<slug>.md         una tarea
Proyectos/Tareas/Archivados/       tareas cerradas
_Referencias/_index.md             el estante
Decisiones/Q<N>-<AAAA>.md          la bitácora
.claude/                           la maquinaria: comandos, moldes, catálogo de áreas y validador
```

Las reglas completas están en `CLAUDE.md`, que es lo que el asistente lee al abrir cada sesión.

## Antes de compartir una copia

Si vas a pasar tu repo a alguien más, o hacerlo público, revisa que no viajen rutas de tu máquina, correos, claves
ni datos de clientes, también en el historial de git. `Plans/` queda fuera del repo por defecto: son borradores de
sesión con rutas locales.

## Licencia

MIT. Úsalo, cámbialo, compártelo.
