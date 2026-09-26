# Optimization in Action

Sitio web de recursos interactivos de investigación de operaciones, en inglés (versión principal), español, portugués y francés.

1. **Learning path:** cinco niveles abiertos a cualquier colaborador: programación lineal, entera, entera mixta, no lineal y otros métodos de IO.
2. **Research:** cuatro casos aplicados en Colombia que sirven de escenario real para muchos recursos: nanotiendas (CFLP), mercados campesinos, incendios forestales y configuración de pallets.

## Estructura

```
site/                  el sitio web (HTML, CSS y JS sin build)
  index.html           página principal
  resources/           un archivo por recurso interactivo, más _template.html
  locales/             textos por idioma (en, es, pt, fr)
  assets/              estilos, motor de idiomas y catálogo
materials/             material de trabajo que no se publica en el sitio
  manuscripts/         manuscritos de los cuatro casos
  cv/                  hoja de vida
  research-cases.md    resumen de cada caso e ideas de recursos
.github/
  CONTRIBUTING.md      cómo aportar un recurso
  workflows/pages.yml  despliegue del sitio en GitHub Pages
.claude/               configuración de Claude Code
```

## Publicación

Cada push a `main` que cambie `site/` publica el sitio con GitHub Pages. Para activarlo una sola vez: **Settings → Pages → Build and deployment → Source: GitHub Actions**. Solo se publica la carpeta `site/`; los manuscritos y el CV no quedan en el sitio.

Para verlo en local:

```bash
cd site && python3 -m http.server 8000
# abre http://localhost:8000
```

Más detalles sobre idiomas y recursos en [`site/README.md`](site/README.md) y [`.github/CONTRIBUTING.md`](.github/CONTRIBUTING.md).
