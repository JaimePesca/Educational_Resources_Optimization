# Optimization in Action

Sitio estático (sin build) con dos divisiones:

1. **Learning path**: cinco niveles (programación lineal, entera, entera mixta, no lineal y otros métodos de IO), independientes de la investigación y abiertos a colaboradores.
2. **Research**: una sección por caso de investigación (CFLP para nanotiendas, mercados campesinos, incendios forestales y configuración de pallets).

El idioma principal es el inglés. El selector de idioma de la barra superior cambia todo el sitio a español, portugués o francés, y la elección se recuerda entre páginas.

## Estructura

```
index.html                 página principal
assets/site.css            colores (paleta MIT), tipografía y componentes compartidos
assets/research.css        componentes de las páginas de investigación
assets/i18n.js             motor de idiomas y lista de idiomas disponibles (LANGS)
assets/catalog.js          niveles, recursos educativos y casos de investigación
locales/en.js              textos en inglés (referencia)
locales/es.js, pt.js, fr.js
locales/research/          textos de cada página de investigación, por idioma
resources/*.html           un archivo por recurso educativo
research/*.html            una página por caso de investigación
```

Ningún texto visible está escrito en el HTML: todo sale de `locales/<idioma>.js` por clave.

## Añadir un idioma

1. Copia `locales/en.js` a `locales/<código>.js` (por ejemplo `de.js`) y cambia `I18N.register("en", …)` por `I18N.register("de", …)`.
2. Traduce los valores sin tocar las claves, los `{marcadores}` ni las etiquetas HTML.
3. Añade una línea a `LANGS` en `assets/i18n.js`, por ejemplo `{ code: "de", name: "Deutsch", locale: "de-DE" }`.

Si falta una clave en un idioma, se muestra la versión en inglés.

## Añadir un recurso

La guía completa para colaboradores está en [`.github/CONTRIBUTING.md`](../.github/CONTRIBUTING.md). En resumen:

1. Copia `resources/_template.html` a `resources/<id>.html`.
2. Añade una entrada en `education` de `assets/catalog.js` con `level`, `type` (`simulation`, `game` o `animation`) y `href`. `author` (quién lo aportó) es opcional.
3. Añade a `locales/en.js` las claves `resource.<id>.title`, `resource.<id>.summary` y los textos de la página. Los demás idiomas usan el inglés hasta que alguien los traduzca.

Una entrada del catálogo sin `href` es un recurso **planeado**: aparece en la página como idea abierta para colaboradores. Las dos divisiones son independientes: los recursos educativos no enlazan a los casos de investigación.

## Páginas de investigación

Cada caso tiene su página en `research/<id>.html`, construida a partir de su manuscrito, con datos y resultados reales. Sus textos viven aparte en `locales/research/<id>.<idioma>.js` (se declaran con `data-i18n-bundles` en la etiqueta `<html>`), para no mezclarlos con los textos generales.

## Ver en local

```bash
cd site && python3 -m http.server 8000
# abre http://localhost:8000
```
