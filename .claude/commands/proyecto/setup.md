---
description: Primera sesión en el repo — nombra tu empresa, escribe los descriptores de la raíz y deja el repo versionado. Las áreas y los temas no se declaran aquí; nacen con el primer trabajo. Se corre una sola vez
argument-hint: (sin argumentos)
---

Pones **Company Cycle OS** a punto para la empresa del usuario, **una sola vez**. Al terminar, la raíz describe su
empresa real y el repo tiene su primer commit. **Aquí no se declara ninguna área ni ningún tema**: la tabla de áreas
nace vacía y cada carpeta se crea cuando el primer trabajo la necesita, desde `/proyecto:nuevo` o
`/proyecto:proponer`, que preguntan en qué área y en qué tema va (procedimiento en `CLAUDE.md`, «Áreas y temas»).
El usuario puede estar en la app de escritorio sin terminal: todo lo que haya que ejecutar lo ejecutas tú, pidiendo
permiso cuando la herramienta lo pida.

## 0. Reconocer el terreno

Lee `_context.md` de la raíz y mira el campo `Id` de la ficha.

- **`Id` = `mi-empresa`** (el valor con el que viene la plantilla) → copia recién descargada. Sigue al paso 1.
- **Cualquier otro valor** → el repo ya está en uso. Dilo y pregunta con `AskUserQuestion` (header "Carpeta en uso",
  pregunta: *Esta carpeta ya tiene una empresa configurada. ¿Qué hacemos?*): **Solo revisar que todo esté en orden**
  (corre el paso 4 y termina) / **No hacer nada**. **Nunca reconfigures un repo en uso sin
  que lo confirme.** Si lo que quiere es agregar un área, eso no se hace aquí: se hace desde el trabajo que la
  necesite.

Comprueba también si hay `bun`: `which bun`. Guarda el resultado para el paso 4.

## 1. La empresa

Pregunta en una sola tanda (una línea por dato, acepta la respuesta completa): nombre, qué hace y para quién,
etapa (idea / validación / operando / escalando), modelo de negocio, cuántas personas y moneda de reporte.
**El creador por defecto de las cabeceras es `System` y no se pregunta**: va fijo en la ficha. Confírmale la ficha
antes de escribir nada.

Si al describir la empresa menciona sus áreas, no las crees ni las preguntes: dile que se crearán una a una con el
primer trabajo que las necesite. Solo si lo pide de forma explícita, crea esa área con el procedimiento de
`CLAUDE.md`.

## 2. Crear la estructura

1. Raíz: `_context.md` desde `.claude/templates/_context-raiz.md` con la ficha del paso 1 (`Id` = un slug en kebab-case
   del nombre; `Creador por defecto` = `System`), la tabla de áreas **vacía, solo con su encabezado**, y «Trabajos
   activos» vacío; `_rules.md` desde `.claude/templates/_rules-raiz.md`; `_links.md` desde `.claude/templates/_links-raiz.md`.
2. `Decisiones/Q<N>-<AAAA>.md` del quarter actual desde `.claude/templates/decisiones-quarter.md`, con la primera línea:
   `AAAA-MM-DD · [hito] Adopción de Company Cycle OS — <empresa>`.
3. `_Referencias/_index.md` con la tabla vacía (ya viene así; solo se actualiza su cabecera).
4. Fecha de hoy y `Creador: System` en todas las cabeceras.

No crees ninguna carpeta de área ni de tema en este paso.

## 3. Confidencialidad

Pregunta con `AskUserQuestion` (header "Datos"): *¿Quieres que en esta carpeta nunca se guarden datos personales de
tus clientes (nombres, correos, teléfonos), solo cómo opera la empresa: cifras totales, decisiones y procesos?*
**Sí, sin datos personales (Recomendado)** (protege a tus clientes y a tu empresa) / **No hace falta** (podrán
guardarse cuando un trabajo lo pida). Escribe la respuesta en la sección Confidencialidad de `_rules.md` de la raíz
(`no-pii: sí / no`).

## 4. Validar y guardar

El usuario no es técnico: **git lo manejas tú, sin pronunciar una palabra de git** (regla «Git» de `CLAUDE.md`).

1. **Si hay `bun`:** corre `bun .claude/validar.ts` y corrige lo que salga hasta que dé 0 errores. **Si no hay `bun`:**
   pregunta con `AskUserQuestion` (header "Revisión", pregunta: *Falta una herramienta pequeña que revisa que la
   carpeta quede en orden. ¿La instalo? Tarda un minuto y no cambia nada más en tu computadora.*): **Sí, instálala
   (Recomendado)** (corre el instalador oficial de `bun.sh` y vuelve a intentar) / **No, revisa a mano** (corre
   `/proyecto:validar`, que hace los mismos chequeos sin la herramienta).
2. Si la carpeta no tiene `.git`, corre `git init -b main`. Haz el primer commit: `Adopción de Company Cycle OS —
   <empresa>`. Al usuario dile solo «guardé la primera versión».
3. **Copia en la nube.** Si ya hay remoto (la carpeta vino de un repositorio del usuario), haz `git push` y sigue.
   Si no, pregunta con `AskUserQuestion` (header "Copia en la nube"): *¿Quieres que tu empresa quede guardada también
   en internet (GitHub), además de en esta computadora, para no perderla y poder abrirla desde otro equipo?*
   **Sí, ya tengo el enlace** → pídele que pegue el enlace del repositorio **privado y vacío** que creó, corre
   `git remote add origin <url>` y `git push -u origin main`. / **Sí, pero no sé cómo** → dale 3 pasos en lenguaje
   llano (entrar a github.com → «New repository» → nombre, marcar *Private*, no marcar nada más → «Create» → copiar
   el enlace que aparece) y espera el enlace. / **No, solo en esta computadora** → sigue; podrá pedirlo después.
   Si el push falla, no lo conviertas en un problema técnico: di que quedó guardado en la computadora y que lo
   subirás en la próxima sesión.

## 5. Confirmar

Devuelve en pocas líneas: la empresa, el resultado del validador, dónde quedó guardado (computadora o también
en la nube), y el siguiente paso:
**`/proyecto:nuevo`** para arrancar el primer trabajo, recordándole que ahí se elige el área y el tema donde
quedará su resultado.

Idioma: español siempre. Directo, breve, cero relleno.
