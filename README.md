<!-- Creado: 2026-09-27 · Actualizado: 2026-10-07 · Creador: company-cycle-os -->
# Company Cycle OS

**Una forma de operar tu empresa en Markdown, con Claude como copiloto, desde la pestaña *Code* de la app de
escritorio de Claude.**

No es software. Es una estructura de carpetas que se autodescribe, un ciclo de trabajo de cuatro pasos y una
bitácora de decisiones. El asistente aprende cómo está organizada tu empresa leyendo la carpeta, y actúa como un
gestor de proyectos ordenado: cada archivo que produce tiene un solo hogar, decidido antes de escribirlo.

**Está pensado para usarse en la pestaña *Code* de la app de escritorio de Claude**, no en una terminal: no hay que
instalar nada ni escribir comandos de sistema. Todo en español, sin dependencias ni integraciones obligatorias.
**Tampoco necesitas saber git:** el asistente guarda y sube tu trabajo por ti, y si tiene que preguntarte algo lo hace
en lenguaje de negocio.

## Instalar en 3 pasos (desde la pestaña *Code* de la app de escritorio de Claude)

1. **Crea un repositorio vacío en GitHub.** Entra a github.com (si no tienes cuenta, créala: es gratis) → botón
   **New** (o ve a github.com/new) → ponle nombre, por ejemplo el de tu empresa → marca **Private** → **no marques**
   «Add a README», «Add .gitignore» ni «Choose a license»: tiene que quedar vacío de verdad → **Create repository**.
2. **Abre ese repositorio en la app de escritorio de Claude, pestaña *Code*.** Nueva sesión → elige el repositorio
   que acabas de crear. La primera vez la app te pedirá conectar tu cuenta de GitHub y autorizar el acceso a ese
   repositorio: acepta. **Solo la pestaña *Code* sirve**: *Chat* y *Cowork* no leen los comandos del repo.
3. **Pega este mensaje tal cual y espera a que termine:**

   ```
   Clona el proyecto https://github.com/emmanuelbarturen/company-repo-template en este repositorio, en la rama main,
   conservando todo su historial, y súbelo. Cuando termines, confírmame que quedó listo y recuérdame que debo abrir
   una sesión nueva sobre este repositorio y escribir /proyecto:setup.
   ```

   Cuando confirme, **cierra esa sesión y abre una nueva** sobre el mismo repositorio (los comandos del framework se
   cargan al abrir la sesión) y escribe **`/proyecto:setup`**: te pregunta por tu empresa y deja todo listo; no te
   pide áreas ni temas. Después, **`/proyecto:nuevo`** con el primer problema que quieras resolver: ahí eliges área y
   tema, entre lo que ya existe y un catálogo sugerido, y la carpeta se crea en ese momento.

Dos avisos para la primera vez. Si al escribir `/proyecto:` no aparecen los comandos, es que la sesión se abrió antes
de que el framework estuviera en el repositorio: ciérrala y abre una nueva; si sigue sin aparecer, pídelo en palabras:
*«ejecuta el comando setup de proyecto»*. Y la app te pedirá permiso varias veces para escribir archivos y guardar:
es normal, acepta.

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
   carpetas, cabeceras, tope de líneas, índice de referencias y trabajos con estado. Sin `bun`, `/proyecto:validar`
   hace lo mismo a mano. El asistente lo corre por ti; tú no tienes que ejecutar nada.

## Qué trae

| Comando | Para qué |
|---|---|
| `/proyecto:setup` | Primera vez: nombra la empresa y hace el primer commit; sin áreas ni temas |
| `/proyecto:nuevo` | Pensar una idea sin compromiso. No escribe archivos salvo que se lo pidas |
| `/proyecto:proponer` | Entrevista en vivo → propuesta, solución y plan de tareas; elige área y tema, y los crea si no existen |
| `/proyecto:aplicar` | **Ejecuta** el plan; cada resultado nace en `<Área>/<tema>/` |
| `/proyecto:archivar` | Escribe la documentación resultante en su área, decide y confirma la carpeta, archiva y registra el hito |
| `/proyecto:validar` | El validador a mano, para máquinas sin `bun` |
| `/update-framework` | Trae la versión más nueva del framework desde su plantilla; solo toca lo del framework y pregunta ante conflictos |

Y además: `_Referencias/` (archivos de afuera que se consultan, con índice), `Decisiones/` (bitácora por quarter),
`CHANGELOG.md` (historia del framework) y, dentro de `.claude/`, la maquinaria que no hace falta mirar: los comandos,
los moldes (`templates/`), el catálogo sugerido de áreas y el validador (`validar.ts`).

## Qué NO trae, a propósito

- **Ninguna integración.** El repo es la única fuente de verdad. No publica a ninguna herramienta.
- **Ningún agente, skill, MCP ni hook.** Funciona con la app de escritorio de Claude tal como viene, en su pestaña
  *Code*, sin instalar nada más.
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
