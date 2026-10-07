<!-- Creado: 2026-09-27 · Actualizado: 2026-10-07 · Creador: company-cycle-os -->
# Proyectos

Aquí vive **todo trabajo** de la empresa, en dos tamaños. Aquí escribe el ciclo `/proyecto:*`; los resultados de un
trabajo **no** viven aquí: van a `<Área>/<tema>/`.

## Estructura fija

```
Proyectos/
  Regulares/                proyectos: una carpeta por trabajo
    <slug>/                 propuesta.md · exploracion.md · solucion.md · tareas.md · adjuntos/
    Archivados/<slug>/      proyectos cerrados
  Tareas/                   tareas: un archivo por trabajo
    <slug>.md
    Archivados/<slug>.md    tareas cerradas
```

Las cuatro carpetas existen siempre (vacías, con `.gitkeep`). En el primer nivel de `Proyectos/` no vive nada más
que este descriptor; el validador lo exige.

## Reglas

- **Tarea** (mini-proyecto): cabe en una página, un actor, sin solución técnica propia, hasta ~5 pasos. Un solo
  archivo `Proyectos/Tareas/<slug>.md` (molde `_Templates/tarea.md`).
- **Proyecto**: necesita requerimientos para que otro lo construya, decisiones propias, o más de ~5 tareas. Carpeta
  `Proyectos/Regulares/<slug>/` con cuatro documentos de nombre fijo: `propuesta.md` (qué y por qué), `exploracion.md`
  (opciones y por qué se eligió una), `solucion.md` (cómo: decisiones y spikes), `tareas.md` (plan ejecutable).
  Los archivos aportados por el usuario van en `adjuntos/`, dentro de la carpeta del proyecto.
- `<slug>` en kebab-case, sin fechas (el validador lo exige). Si una tarea crece, se gradúa a proyecto: carpeta
  `Regulares/<slug>/` con el mismo slug y el archivo de la tarea pasa a ser su `propuesta.md`. Un proyecto puede vivir solo con `propuesta.md`
  y `exploracion.md` mientras está en `explorar` o `proponer`; **desde `aplicar` los cuatro documentos son
  obligatorios**.
- **Bloque `## Estado`** en `propuesta.md` (o en la tarea): `Fase:` (`explorar | proponer | aplicar | pausado |
  archivado`), `Área:` (una fila de la tabla de áreas), `Resultado esperado:` (qué archivo(s) y en qué
  `<Área>/<tema>/`, o «ninguno — <motivo>»), última actualización y próximo paso. Es el ancla para retomar.
  **Formato literal de cada campo:** una viñeta `- **Campo:** valor` (así lo lee el validador; ver las plantillas).
- **Los resultados nacen en su destino.** Durante `aplicar`, cada archivo que produce el trabajo se escribe
  directamente en `<Área>/<tema>/`, con el destino nombrado antes de escribirlo.
- **Al archivar, el asistente deja escrita la documentación del trabajo en su área**: escribe los documentos de
  resultado que falten, decide con criterio de organización el tema donde quedan (nombrado por el tipo de documento,
  no por el proyecto) y **lo confirma siempre** antes de escribir o mover. El Estado conserva `Resultado: <rutas>`.
  La carpeta del proyecto se mueve a `Regulares/Archivados/` y el archivo de la tarea a `Tareas/Archivados/`, sin
  renombrar, y el cierre se anota en `Decisiones/`.
- `Fase: pausado` deja el trabajo donde está, con el motivo en el Estado. No se archiva.
