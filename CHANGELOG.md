<!-- Creado: 2026-09-27 · Actualizado: 2026-09-27 · Creador: company-cycle-os -->
# Historia del framework

Qué cambió en **Company Cycle OS** y qué debe migrar quien ya lo usa. La bitácora de tu empresa es otra cosa: vive en
`Decisiones/`.

## v1 — 2026-09-27

- Creación del framework. Mono-empresa, en español, para Claude Code (también desde la app de escritorio).
- Descriptores con subguion por carpeta: `_context.md`, `_rules.md`, `_links.md`. Áreas declaradas en la raíz,
  temas declarados en cada área; nada se crea sin preguntar.
- Ciclo de trabajo `/proyecto:explorar → proponer → aplicar → archivar`, más `/proyecto:setup` (adopción) y
  `/proyecto:validar` (respaldo del validador cuando no hay `bun`).
- Todo trabajo en `Proyectos/`: proyecto (carpeta de cuatro documentos) o tarea (un archivo). Campos `Área:` y
  `Resultado esperado:`; al archivar se pregunta dónde queda el resultado.
- `_Referencias/` como estante con `_index.md`. `Decisiones/` por quarter. Cabecera de metadatos y tope de 120
  líneas por archivo.
- `validar.ts`: un archivo, sin dependencias, con `--publicar` para la higiene previa a compartir.
- Empresa de ejemplo en la raíz, listada en `.ccos/ejemplo.txt`; `setup` la borra por manifiesto.
