# Optimization in Action

Sitio estático (sin build) con dos divisiones:

- **Research**: una sección por proyecto de investigación (CFLP para nanostores, localización de mercados callejeros, supresión de incendios forestales y configuración de pallets).
- **Learning path**: cinco niveles (programación lineal, entera, entera mixta, no lineal y otros métodos de IO).

El idioma principal es el inglés. El selector de idioma de la barra superior cambia todo el sitio a español, portugués o francés, y la elección se recuerda entre páginas.

## Estructura

```
index.html                 página principal (se publica como página del artifact)
assets/site.css            colores, tipografía y componentes compartidos
assets/i18n.js             motor de idiomas y lista de idiomas disponibles (LANGS)
assets/catalog.js          qué proyectos, niveles y recursos existen
locales/en.js              textos en inglés (referencia)
locales/es.js, pt.js, fr.js
resources/*.html           un archivo por recurso interactivo
```

Ningún texto visible está escrito en el HTML: todo sale de `locales/<idioma>.js` por clave.

## Añadir un idioma

1. Copia `locales/en.js` a `locales/<código>.js` (por ejemplo `de.js`) y cambia `I18N.register("en", …)` por `I18N.register("de", …)`.
2. Traduce los valores sin tocar las claves, los `{marcadores}` ni las etiquetas HTML.
3. Añade una línea a `LANGS` en `assets/i18n.js`, por ejemplo `{ code: "de", name: "Deutsch", locale: "de-DE" }`.

Si falta una clave en un idioma, se muestra la versión en inglés.

## Añadir un recurso

La guía completa para colaboradores está en [`CONTRIBUTING.md`](../CONTRIBUTING.md). En resumen:

1. Copia `resources/_template.html` a `resources/<id>.html`.
2. Añade una entrada en `assets/catalog.js` con `level`, `type` (`simulation`, `game` o `animation`) y `href`. `project` (caso de investigación que aplica) y `author` (quién lo aportó) son opcionales.
3. Añade a `locales/en.js` las claves `resource.<id>.title`, `resource.<id>.summary` y los textos de la página. Los demás idiomas usan el inglés hasta que alguien los traduzca.

Una entrada del catálogo sin `href` es un recurso **planeado**: aparece en la página como idea abierta para colaboradores. Los planeados actuales salen de los manuscritos y están descritos en [`docs/research-cases.md`](../docs/research-cases.md).

## Ver en local

```bash
cd site && python3 -m http.server 8000
# abre http://localhost:8000
```
