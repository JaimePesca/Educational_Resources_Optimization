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

1. Crea `resources/<id>.html` partiendo de uno existente (misma cabecera, barra superior y scripts).
2. Añade una entrada en `assets/catalog.js` con su `level`, `project` y `type` (`simulation`, `game` o `animation`).
3. Añade a cada archivo de `locales/` las claves `resource.<id>.title`, `resource.<id>.summary` y los textos propios de la página.

## Ver en local

```bash
cd site && python3 -m http.server 8000
# abre http://localhost:8000
```
