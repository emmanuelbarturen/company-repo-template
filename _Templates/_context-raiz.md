<!-- Creado: 2026-10-07 · Actualizado: 2026-10-07 · Creador: admin -->
# <Nombre de la empresa>

> **Este archivo se lee PRIMERO** en cualquier trabajo. Es la fuente de verdad de la empresa.

## Ficha

| Campo | Valor |
|---|---|
| Id | `<id>`  <!-- `mi-empresa` en la copia recién descargada; setup lo cambia --> |
| Nombre | <nombre para mostrar> |
| Qué hace | <una línea: qué vende y a quién> |
| Etapa | <idea / validación / operando / escalando> |
| Modelo | <suscripción / servicios / transaccional / mixto> |
| Equipo | <cuántas personas y qué roles> |
| Moneda | <moneda de reporte> |
| Creador por defecto | <nombre que va en las cabeceras cuando escribe el asistente> |

## Áreas

**Declara aquí las áreas que esta empresa realmente tiene.** El ruteo se hace contra esta tabla. Borra las que no
apliquen, renombra las que se llamen distinto, agrega las que falten. Cada fila existe como carpeta con sus tres
descriptores. Nombres de carpeta sin tildes ni espacios: la carpeta es el identificador.

| Carpeta | Qué vive aquí |
|---|---|
| `Empresa/` | la empresa misma y su estrategia: equipo, objetivos, decisiones de rumbo, indicadores |
| `Producto/` | el qué y el para quién: catálogo y hoja de ruta |
| `Ingenieria/` | infraestructura y deuda técnica transversal, no atada a un proyecto |
| `Ventas/` | pipeline, propuestas, contratos |
| `Marketing/` | demanda y posicionamiento: mercado, competidores, contenido |
| `Operaciones/` | procesos del día a día y coordinación |
| `Finanzas/` | dinero y administración: reportes, métricas, costos |
| `Legal/` | contratos, términos, cumplimiento normativo |
| `Personas/` | equipo, contratación, cultura |

> **Catálogo sugerido, no obligatorio.** Una consultora quizá cambie `Producto/` por `Servicios/`. Un e-commerce
> quizá agregue `Logistica/`. Una empresa con una sola área es válida.

## Carpetas de servicio (siempre presentes)

| Carpeta | Qué vive aquí |
|---|---|
| `Proyectos/` | todo trabajo: proyectos (carpeta de 4 documentos) y tareas (un archivo) |
| `_Referencias/` | archivos de afuera que se consultan, con `_index.md` |
| `Decisiones/` | bitácora de la empresa, por quarter |
| `_Templates/` | moldes; no se editan para un caso concreto, se copian |

## Trabajos activos

<Opcional: una línea por trabajo en curso con su fase. Ayuda a retomar sin abrir `Proyectos/`.>
