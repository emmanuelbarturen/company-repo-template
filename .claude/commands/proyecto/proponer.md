---
description: Crea o modifica la propuesta de un trabajo — tarea (un archivo con checklist) o proyecto (entrevista en vivo → propuesta, solución y plan de tareas). Declara área y resultado esperado. Sesión retomable vía el bloque Estado
argument-hint: [trabajo o tema]
---

Conduces una sesión para **proponer** un trabajo: definir su qué, su cómo, dónde quedará su resultado y su plan de
tareas ejecutable. La entrevista la corres **tú, en el hilo principal**, con los tres playbooks de abajo
(requerimientos, solución, tareas). No hay agentes: los playbooks son parte de este comando.

**Contrato: una propuesta no se cierra sin su plan de tareas** — `tareas.md` en un proyecto, o el checklist
`## Tareas` en una tarea. Ese plan es lo que `/proyecto:aplicar` ejecuta.

Trabajo o tema (opcional): $ARGUMENTS

## 0. Contexto mínimo

Lee `_context.md` y `_rules.md` de la raíz, `Proyectos/_context.md` (reglas de tamaño y del bloque Estado) y
`_Templates/catalogo-areas.md` (alternativas de área y tema). Cuando sepas el área del trabajo y exista, lee también
`_context.md` y `_rules.md` de esa área: sus reglas de «cómo se crea un proyecto» son parte de la entrevista.

## 1. ¿En qué trabajamos?

El nombre puede venir en $ARGUMENTS. **Si no viene, no lo inventes:** lista los trabajos activos (carpetas de
`Proyectos/Regulares/` y archivos de `Proyectos/Tareas/`, sin mirar dentro de `Archivados/`) y
preséntalos con `AskUserQuestion` (header "Trabajo") con una opción por trabajo **más la opción fija «Nuevo»**.
`AskUserQuestion` admite hasta 4 opciones: con más de 3 trabajos, ofrece los 3 más recientes más «Nuevo» y pide el
resto por nombre en texto libre. Deriva el `<slug>` (kebab-case) y decide la rama:

- **Nuevo** → paso 2.
- **Existente sin cerrar** (`Fase: explorar` o `proponer`, frentes abiertos) → lee sus documentos, resume en 3-5
  líneas qué está documentado y qué falta, y **retoma la entrevista donde quedó**.
- **Existente ya documentado** (requerimientos cerrados y plan de tareas) → **modo cambio** (paso 6).

## 2. Calibrar tamaño, área y tema (solo nuevo)

Con `AskUserQuestion` (header "Tamaño"): **Tarea** / **Proyecto**, con la heurística de `Proyectos/_context.md` y tu
recomendación. Luego, con el procedimiento de `CLAUDE.md` «Áreas y temas», dos preguntas más:

- **Área** (header "Área"): hasta 4 opciones, primero las filas que ya tiene la tabla de áreas de la raíz, luego las
  del catálogo más probables por el tema; cualquier otro nombre, por texto libre. La tabla puede estar vacía.
- **Tema** (header "Tema"): la subcarpeta de esa área donde quedará el resultado. Primero los temas que ya tiene la
  tabla del área, luego los sugeridos en el catálogo para esa área; cualquier otro nombre, por texto libre.

Si `/proyecto:nuevo` ya dejó área y tema en el Estado, confírmalos en una línea en vez de volver a preguntar. Si
el usuario eligió un área o un tema que no existe, **créalo ahora**, antes de escribir la propuesta: el área con su
carpeta, sus tres descriptores desde `_Templates/area/` (responsabilidad redactada, no en blanco) y su fila en la
tabla de la raíz; el tema con su carpeta (con un `.gitkeep` mientras va vacía) y su fila en la tabla del área. El
Estado necesita un `Área:` que esté en la tabla y un `Resultado esperado:` con su `<Área>/<tema>/`.

Si a mitad de camino una tarea crece (aparece solución técnica propia, más de ~5 pasos, alguien más lo va a
construir), dilo y **gradúala**: crea `Proyectos/Regulares/<slug>/` con el mismo slug y su archivo pasa a ser `propuesta.md`.

## 3. Rama tarea

Un lote de 3-5 preguntas (playbook de requerimientos condensado): problema real · resultado esperado y **con qué
nombre de archivo queda** en el `<Área>/<tema>/` elegido en el paso 2 · qué NO entra · pasos concretos. Escribe
`Proyectos/Tareas/<slug>.md` desde `_Templates/tarea.md`, con `Área:` y `Resultado esperado:` llenos y los pasos
numerados por dependencia. Si el checklist quedó completo, deja **`- **Fase:** aplicar`** (el plan ya existe); si
falta algo, `proponer`. Salta al paso 7.

## 4. Rama proyecto — entrevista en vivo

1. **Cimientos:** `propuesta.md` desde `_Templates/proyecto/propuesta.md` con el bloque `## Estado` completo
   (`Fase: proponer`, `Área:`, `Resultado esperado:` tentativo) y `exploracion.md` desde su molde. Si
   `/proyecto:nuevo` dejó conclusiones, hereda esos puntos.
2. **Loop de requerimientos** → *Playbook A*. Documenta gated por OK: cuando un frente quede estable, pregunta
   *«esto ya está definido, ¿lo documento?»* y di a qué archivo va (discovery → `exploracion.md`; lo que ya es
   spec → `propuesta.md`). Tras escribir, actualiza `## Estado` (frentes, fecha, próximo paso).
3. **Cierre de requerimientos → solución:** pregunta con `AskUserQuestion` (header "Siguiente"): **Definir la
   solución ahora** (recomendado) / **Dejarla pendiente** (el plan de tareas quedará limitado a lo no técnico).
4. **Loop de solución** → *Playbook B* → `solucion.md` desde su molde.
5. **Cierre obligatorio — el plan** → *Playbook C* → `tareas.md`. Preséntalo y ajústalo con el usuario antes de
   dar la propuesta por cerrada.

### Playbook A — Requerimientos

Lotes de **3-5 preguntas** priorizadas por impacto, nunca un cuestionario largo. Antes de cerrar cubre los ocho
frentes: **problema real · actor · resultado esperado y métrica · alcance (qué sí y qué no) · flujo principal ·
reglas y casos borde · restricciones · prioridad**. No avances si el problema o el alcance siguen ambiguos.
Requerimientos con **MoSCoW** (Debe / Debería / Podría / No ahora). Criterios de aceptación en forma
*Dado / Cuando / Entonces*: si no se puede comprobar, no es criterio. Fija siempre **dónde queda el resultado**
(`<Área>/<tema>/<archivo>.md`): el tema se eligió en el paso 2, aquí se nombra el archivo. Si la entrevista revela
que el tema no era el correcto, vuelve a preguntarlo con el mismo procedimiento. Es un campo obligatorio del Estado,
no un detalle.

### Playbook B — Solución

Relee propuesta y exploración e identifica los huecos: enfoque, datos que hacen falta, herramientas o servicios,
quién ejecuta, costos, plazos, qué se necesita de terceros. Pregunta en lotes de 3-5. **La regla clave: cada «por
validar» termina en Decisión o en Spike.** Una **Decisión** se toma ahora, con las convenciones de `_rules.md` del
área y de la raíz, y se justifica en 1-2 líneas. Un **Spike** es una validación empírica con objetivo, qué se prueba,
cómo, y un **criterio de éxito medible**. La solución no cierra con un hueco bloqueante sin una de las dos. Llena
la tabla de decisiones, la de spikes, el mapa a los Must y los riesgos.

### Playbook C — Tareas

Descompón el alcance en tareas **atómicas**: quien la recibe sabe exactamente qué entregar y cómo se comprueba, sin
volver a preguntar. Numeradas `NN.` por dependencias, agrupadas por etapas. **Toda tarea que produce un archivo dice
dónde queda con el marcador literal `resultado: <Área>/<tema>/<archivo>.md`** (es lo que `archivar` busca) y cómo se
verifica. Es un plan local: nada se publica a ningún lado.

## 5. Bloque Estado — el ancla para retomar

Siempre al día: `Fase:`, `Área:`, `Resultado esperado:`, última actualización, frentes cubiertos y **próximo paso al
retomar**. Si el plan de tareas quedó listo, `Fase: aplicar`.

## 6. Modo cambio (trabajo ya documentado)

El cambio puede venir en $ARGUMENTS; si no, pídelo en una línea. Clasifícalo: **funcional** (alcance, requerimiento,
flujo, métrica) → Playbook A → `propuesta.md`; **técnico** (enfoque, herramienta, una Decisión o Spike) →
Playbook B → `solucion.md`; **ambos** → primero el qué, luego el cómo. Pregunta solo lo que el cambio deja ambiguo.
**Edita quirúrgicamente.** Coherencia obligatoria: un Must nuevo necesita su fila en el mapa de `solucion.md`; una
decisión que cambia el alcance se ve en la propuesta. **Y siempre actualiza `tareas.md`:** las tareas que el cambio
invalida quedan `~~tachadas~~` con una línea de por qué; las nuevas van al final de su etapa. En una tarea, todo va
en su único archivo. Cierra actualizando `## Estado`.

## 7. Cierre

Actualiza `## Estado` y ofrece con `AskUserQuestion` (header "Cierre"): **Ejecutar ahora** → indícale correr
`/proyecto:aplicar <slug>` / **Cerrar** → la propuesta queda lista para otra sesión. Si `_context.md` de la raíz tiene
la sección «Trabajos activos», agrega la línea del trabajo.

Todo `.md` lleva la cabecera de metadatos con el **Creador por defecto** declarado en la ficha de `_context.md` de la
raíz; al editar, actualiza la fecha. Los campos del Estado se escriben siempre como viñeta `- **Campo:** valor`.
Respeta lo que `_rules.md` de la raíz declare que no entra en el repo.

Idioma: español siempre. Directo, breve, cero relleno.
