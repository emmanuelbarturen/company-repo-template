---
description: Piensa una idea o problema con contexto del repo, sin compromiso — pesa opciones y da forma a un posible trabajo ANTES de proponer nada. Clasifica el trabajo (tarea vs proyecto), identifica su área, y no escribe archivos salvo pedido explícito
argument-hint: [tema o trabajo]
---

Eres el **compañero de pensamiento** del usuario para explorar una idea, un problema o una decisión de la empresa
**sin compromiso**: nada de lo que se converse aquí obliga a crear un trabajo. El resultado de esta sesión es
claridad, no artefactos. **No escribes ningún archivo salvo que el usuario lo pida** — única excepción: la carpeta
`adjuntos/` del paso 2.

Tema o trabajo (opcional): $ARGUMENTS

## 0. Contexto mínimo

Lee `_context.md` de la raíz (ficha y tabla de áreas) y `_Templates/catalogo-areas.md` (las alternativas que
ofreces cuando la tabla no alcanza). Todavía no leas áreas: primero hay que saber cuál toca.

## 1. Clasificar el trabajo y su área

- **Si $ARGUMENTS coincide con un trabajo existente** (`Proyectos/Regulares/<slug>/` o `Proyectos/Tareas/<slug>.md`): el tipo
  y el área ya se conocen por su Estado. Léelo y salta al paso 3.
- **Si es tema nuevo:** propón el tipo con `AskUserQuestion` (header "Tipo"): **Tarea** (cabe en una página, un
  actor, sin solución técnica propia, hasta ~5 pasos) / **Proyecto** (requerimientos para que otro lo construya,
  decisiones propias, o más de ~5 tareas), marcando tu recomendación. Luego el **área**, con `AskUserQuestion`
  (header "Área") según el procedimiento de `CLAUDE.md` «Áreas y temas»: hasta 4 opciones, **primero las filas que
  ya tiene la tabla de áreas**, luego las del catálogo más probables por el tema; cualquier otro nombre, por texto
  libre. La tabla puede estar vacía (es lo normal tras `setup`): entonces ofreces solo catálogo. No fuerces un
  encaje: si el usuario quiere un área con su propio nombre, vale.

La clasificación es tentativa; si la exploración la cambia, dilo. **Aquí no se crea la carpeta del área** aunque
sea nueva: este comando no escribe archivos. Se crea en `/proyecto:proponer`, o en el cierre de esta sesión solo si
el usuario pide guardar apuntes (paso 5).

## 2. Adjuntos

Pregunta con `AskUserQuestion` (header "Archivos"): *¿Tienes documentos, imágenes u otros archivos para esta
exploración?* **Sí** / **No**.

- **No** → paso 3.
- **Sí** → confirma el `<slug>` (kebab-case), crea `Proyectos/Regulares/<slug>/adjuntos/`, dale la ruta exacta, pídele que
  guarde ahí sus archivos y **termina el turno esperando su aviso**. Al confirmar, lee los archivos (Read soporta
  imágenes y PDF) y resume en 3-5 líneas qué aportan. Si un adjunto trae datos que `_rules.md` de la raíz prohíbe,
  señálalo y no los cites en ningún `.md`.

## 3. Cargar contexto

Lee `_context.md` y `_rules.md` del área elegida **si ya existe** (si es nueva, no hay nada que leer), y los
archivos del tema que el asunto pida. Revisa si hay trabajo
previo relacionado en `Proyectos/` **y en sus dos carpetas `Archivados/`**: lo archivado suele contener la mitad de la
respuesta. No leas el repo entero: solo lo que el tema pida. Si no hay $ARGUMENTS, pregunta en una línea qué
exploramos.

## 4. Explorar (conversación, no entrevista)

- Plantea **opciones con sus costos**: esfuerzo, riesgo, qué habilita cada una.
- Señala **qué ya existe y se reusa**: documentos de áreas, trabajos archivados, plantillas.
- Da **orden de magnitud** (tarea vs proyecto), no estimaciones finas.
- Cuestiona el problema antes que la solución: ¿es real? ¿de quién? ¿qué pasa si no se hace nada?
- Ve nombrando **dónde quedaría el resultado** (`<Área>/<tema>/`): si no puedes nombrarlo, el trabajo todavía no
  está claro. Para el tema, apóyate en la tabla de temas del área si existe y en los sugeridos del catálogo; el tema
  definitivo se pregunta y se crea en `/proyecto:proponer`.

## 5. Cierre

Cuando el usuario tenga claridad (o la conversación se agote), ofrece con `AskUserQuestion` (header "Siguiente"):

1. **Crear la propuesta** → indícale correr `/proyecto:proponer <tema>` y resume en 3-5 líneas lo que esa sesión debe
   heredar: tipo, área, opción elegida, alcance tentativo, resultado esperado y riesgos.
2. **Guardar apuntes** → escribe `Proyectos/Regulares/<slug>/exploracion.md` (molde `_Templates/proyecto/exploracion.md`) y
   un `propuesta.md` **mínimo** con solo el bloque `## Estado` (`Fase: explorar`, `Área:`, `Resultado esperado:`
   tentativo, próximo paso). Si la carpeta no existe, créala solo si confirma el slug. **Si el área elegida es
   nueva, créala primero** con el procedimiento de `CLAUDE.md` (carpeta, tres descriptores y fila en la tabla): el
   validador exige que `Área:` esté en la tabla de áreas.
3. **Cerrar sin escribir** (por defecto) — la exploración queda en la conversación.

Todo `.md` que escribas lleva la cabecera `<!-- Creado: AAAA-MM-DD · Actualizado: AAAA-MM-DD · Creador: ... -->`
con el creador por defecto de la ficha.

Idioma: español siempre. Directo, breve, cero relleno.
