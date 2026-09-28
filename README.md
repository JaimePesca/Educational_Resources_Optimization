# Optimization in Action

**Sitio web:** https://learn-optimization.jaimepesca.com · **Autor:** [Jaime Pesca](https://learn-optimization.jaimepesca.com/about.html) ([jaimepesca.com](https://jaimepesca.com)) · Cómo citarlo: ver `CITATION.cff` (botón "Cite this repository" en GitHub).

Sitio web de recursos interactivos de investigación de operaciones, en inglés (versión principal), español, portugués y francés.

1. **Learning path:** cinco niveles abiertos a cualquier colaborador: programación lineal, entera, entera mixta, no lineal y otros métodos de IO.
2. **Research:** cuatro casos aplicados en Colombia, cada uno con una página que muestra el estudio real de su manuscrito: nanotiendas (CFLP), mercados campesinos, incendios forestales y configuración de pallets. Es independiente de la sección educativa.

## Estructura

```
site/                  el sitio web (HTML, CSS y JS sin build)
  index.html           página principal
  resources/           un archivo por recurso educativo, más _template.html
  research/            una página por caso de investigación
  locales/             textos por idioma (en, es, pt, fr)
  assets/              estilos, motor de idiomas y catálogo
materials/             material de trabajo que no se publica en el sitio
  manuscripts/         manuscritos de los cuatro casos
  cv/                  hoja de vida
  research-cases.md    resumen de cada caso
.github/
  CONTRIBUTING.md      cómo aportar un recurso
  workflows/pages.yml  despliegue del sitio en GitHub Pages
.claude/               configuración de Claude Code
CLAUDE.md              convenciones del proyecto para Claude (idiomas, diseño, formato de animaciones)
```

## Publicación

Cada push a `main` que cambie `site/` publica el sitio con GitHub Pages. Para activarlo una sola vez: **Settings → Pages → Build and deployment → Source: GitHub Actions**. Solo se publica la carpeta `site/`; los manuscritos y el CV no quedan en el sitio.

Para verlo en local:

```bash
cd site && python3 -m http.server 8000
# abre http://localhost:8000
```

Más detalles sobre idiomas y recursos en [`site/README.md`](site/README.md) y [`.github/CONTRIBUTING.md`](.github/CONTRIBUTING.md).
