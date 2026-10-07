<!-- Creado: 2026-09-27 · Actualizado: 2026-10-07 · Creador: Emmanuel -->

# Company Cycle OS

Guía para Claude Code en este repo. **La empresa está en `_context.md` de la raíz: léelo primero, siempre.** Si en
esta sesión no existen los comandos `/proyecto:*`, dile al usuario que abra la carpeta en la pestaña _Code_ de la app
de escritorio (o con `claude` en la terminal): en _Chat_ y _Cowork_ el ciclo no está disponible.

## Regla #1 — clasifica antes de ejecutar

En la **primera respuesta de cada sesión**, antes de hacer nada, pregunta con `AskUserQuestion` si lo que viene es
**(a) un trabajo nuevo**, que arranca con `/proyecto:nuevo`, o **(b) una pregunta suelta**. Nada se ejecuta hasta
que responda. Se salta solo si el primer mensaje ya lo dice: invoca un comando `/proyecto:*`, retoma un trabajo por su
nombre, o pide leer un archivo concreto. En la duda, pregunta. Sin esta clasificación, el trabajo que merecía entrar
al ciclo termina como conversación suelta y se pierde.

## Qué es este repo

Un sistema operativo de **una empresa** en Markdown: carpetas por área de negocio que se autodescriben, un ciclo de
trabajo de cuatro pasos y una bitácora de decisiones. No es software: **el producto son los `.md`**. Todo en español.
Sin build ni dependencias. El repo es la única fuente de verdad; no publica a ninguna herramienta externa.

## Los descriptores mandan en su carpeta

Cada carpeta con contenido lleva archivos con subguion que la describen. **Léelos antes de crear, mover o editar
nada dentro de ella.**

| Archivo       | Dónde                         | Qué dice                                                                                    |
| ------------- | ----------------------------- | ------------------------------------------------------------------------------------------- |
| `_context.md` | raíz, cada área, `Proyectos/` | qué vive aquí, qué no; en la raíz la **tabla de áreas**, en cada área la **tabla de temas** |
| `_rules.md`   | raíz, cada área               | reglas: cómo se documenta aquí y cómo se crea un proyecto de esta área                      |
| `_links.md` | raíz, cada área               | enlaces externos: documentos, tableros, carpetas compartidas                                |

**Las áreas viven en la tabla de `_context.md` raíz, y los temas en la tabla de cada área.** El ruteo se hace
contra esas tablas, nunca contra un catálogo asumido. Si una carpeta existe sin descriptor, pregunta qué es antes de
escribirle uno.

## Áreas y temas — se crean con el primer trabajo, nunca por adelantado

`setup` no declara áreas ni temas: **la tabla de áreas nace vacía** y crece una fila por vez cuando un trabajo lo
necesita; igual la tabla de temas de cada área. Quien elige es siempre el usuario, con `AskUserQuestion`:

- **Área:** al clasificar un trabajo nuevo (`explorar`, `proponer`). Hasta 4 opciones: primero las filas que ya
  tiene la tabla, luego las de `_Templates/catalogo-areas.md` más probables por el tema; cualquier otro nombre, por
  texto libre.
- **Tema:** al fijar dónde queda el resultado (`proponer`; también `aplicar` y `archivar` si un archivo no encaja en
  ningún tema). Primero los temas de la tabla del área, luego los sugeridos en el catálogo para esa área, más «otro».
- **Al crear:** un área es su carpeta, sus tres descriptores desde `_Templates/area/` con la responsabilidad
  redactada, y su fila en la tabla de la raíz. Un tema es su carpeta (con `.gitkeep` mientras va vacía; se borra al
  llegar el primer archivo) y su fila en la tabla del área. Carpetas sin tildes ni espacios: la carpeta es el
  identificador. Un tema se nombra por el tipo de documentos que vivirán ahí, nunca por el proyecto que los produjo.
- **Nunca** crees un área o un tema que el usuario no haya elegido, ni dejes una carpeta sin su fila: el validador
  lo marca.

## Gestor de proyectos — todo archivo tiene un solo hogar

Actúas como un gestor de proyectos muy ordenado. **Antes de escribir cualquier archivo que sea resultado de un
trabajo, nombra su destino** en la forma `<Área>/<tema>/<archivo>.md` y confírmalo si hay duda. Dentro de un área,
los archivos van siempre en la subcarpeta de su tema; sueltos solo quedan los tres descriptores. Nada se deja en la
carpeta del proyecto «por ahora»: la carpeta del proyecto guarda el plan, no los entregables.

## Estructura

```
_context.md · _rules.md · _links.md      la empresa: ficha, tabla de áreas, reglas, enlaces
<Área>/_context.md _rules.md _links.md   cada área declarada, con su tabla de temas
<Área>/<tema>/*.md                         los documentos, siempre dentro de un tema
Proyectos/Regulares/<slug>/                proyecto: propuesta.md · exploracion.md · solucion.md · tareas.md
Proyectos/Regulares/Archivados/<slug>/     proyectos cerrados, con su `Resultado:` en el Estado
Proyectos/Tareas/<slug>.md                 tarea (mini-proyecto): un solo archivo
Proyectos/Tareas/Archivados/<slug>.md      tareas cerradas
_Referencias/_index.md                     archivos de afuera que se consultan; un nivel de subcarpetas por tipo
Decisiones/Q<N>-<AAAA>.md                  bitácora de la empresa, una línea por evento
_Templates/                                moldes de descriptores, proyecto, tarea y bitácora; catálogo de áreas
validar.ts                                 validador de estructura
```

## El ciclo — el ciclo de vida de todo trabajo

| Situación                                                                             | Comando              |
| ------------------------------------------------------------------------------------- | -------------------- |
| Primera vez en el repo: nombrar la empresa y dejarla versionada (sin áreas ni temas)  | `/proyecto:setup`    |
| Pensar una idea o problema sin compromiso, antes de crear nada                        | `/proyecto:nuevo`    |
| Crear o modificar un trabajo hasta tener su plan de tareas                            | `/proyecto:proponer` |
| Ejecutar el plan y dejar cada resultado en su área y tema                             | `/proyecto:aplicar`  |
| Cerrar un trabajo: escribir sus documentos en el área, archivar, registrar en bitácora | `/proyecto:archivar` |
| Revisar la estructura cuando no hay `bun`                                             | `/proyecto:validar`  |

Dos tamaños de trabajo. **Tarea** (cabe en una página, un actor, sin solución técnica propia, hasta ~5 pasos):
un archivo `Proyectos/Tareas/<slug>.md`. **Proyecto**: carpeta `Proyectos/Regulares/<slug>/` con los cuatro
documentos. Ambos llevan `Área:` y `Resultado esperado:`, y un bloque `## Estado` con `Fase:` (`explorar | proponer |
aplicar | pausado | archivado`) que hace la sesión retomable. **Al archivar, el asistente escribe los documentos de
resultado que falten, decide el tema con criterio de organización y lo confirma siempre**; el Estado conserva
`Resultado: <rutas>` (o `ninguno — <motivo>`) y el trabajo pasa al `Archivados/` de su rama. Reglas completas en
`Proyectos/_context.md`.

## Convenciones

- **Cabecera de metadatos** en la primera línea de todo `.md`: `<!-- Creado: 2026-10-07 · Actualizado: 2026-10-07 ·
Creador: System -->`. El creador por defecto es `System` (fijo en la ficha; no se pregunta). Al editar, actualiza la
  fecha. Excepciones: comandos (frontmatter YAML) y archivos ajenos en `_Referencias/`.
- **Tope de 120 líneas** por archivo, sin contar tablas ni bloques de código. Si se pasa, es otro documento.
  Exentos: `Decisiones/`, `_Referencias/_index.md`, `.claude/`.
- **Bitácora:** toda decisión importante, cambio de definición o hito va a `Decisiones/Q<N>-<AAAA>.md` como
  `2026-10-07 · [tipo] texto`. Solo lo que cambia el rumbo, no el trabajo rutinario. Q1 ene-mar · Q2 abr-jun ·
  Q3 jul-sep · Q4 oct-dic.
- **`_Referencias/`** es un estante, no una bandeja: lo de afuera se guarda para consultarse, con su fila en
  `_index.md`. Nada espera ser «procesado». Lo que concluyas leyendo algo de ahí va a su área y cita la fuente.
- **`Plans/`** es scratch de sesión y no se versiona. Un plan de proyecto vive en
  `Proyectos/Regulares/<slug>/solucion.md`.
- **`.gitkeep` en toda carpeta vacía que deba verse:** git no versiona carpetas vacías. Toda carpeta que nace sin
  archivos (un tema nuevo, los `Archivados/` de `Proyectos/`) lleva un `.gitkeep`, que se borra al llegar el primer
  archivo. El validador avisa de las carpetas vacías que no lo tienen (V10).
- **Confidencialidad:** respeta lo que `_rules.md` de la raíz declare que no entra en el repo.

## Validar

`bun validar.ts` comprueba la estructura (descriptores, tablas contra carpetas, cabeceras, tope de líneas, índice
de referencias, trabajos con Estado, bitácora). Si `bun` no está, `/proyecto:validar` hace lo mismo a mano. Córrelo
después de `setup`, al cerrar un trabajo y antes de compartir el repo.

## Notas

- No hay agentes, skills, MCPs ni hooks a propósito: funciona con Claude Code estándar, también desde la app de
  escritorio. Si alguien los agrega, es suyo, no del framework.
- La carpeta es el identificador: no se renombran áreas ni temas. El nombre para mostrar vive en su `_context.md`.
