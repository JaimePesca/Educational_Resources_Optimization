# Contributing to Optimization in Action

Optimization in Action is a library of small, interactive operations research resources that run in the browser. It has two independent divisions:

- **Learning path**: five open categories with varied examples: 1 Linear programming, 2 Integer programming, 3 Mixed-integer programming, 4 Nonlinear programming, 5 Other OR methods. This is where contributions go.
- **Research**: four applied cases from Colombia, each with a page that walks through the real study of its manuscript (`site/research/`). These pages are maintained by the author. Case briefs are in [`materials/research-cases.md`](../materials/research-cases.md).

Any example, simulation, game or animation that teaches one of the five categories is welcome, on any subject. The planned ideas shown in each level on the home page are a good place to start.

## What a resource is

- One self-contained HTML page in `site/resources/`, with no build step and no server.
- It runs entirely in the browser with small illustrative data. Scripts from cdnjs or jsDelivr are fine when a library does real work (for example an LP solver).
- It has one level (`lp`, `ip`, `milp`, `nlp`, `other`) and one type (`simulation`, `game`, `animation`).
- It explains the model behind it in a short "The model" section, so the page teaches and not only entertains.
- It works on a phone and in light and dark mode. Use the color tokens from `site/assets/site.css`.

## Steps

1. Copy `site/resources/_template.html` to `site/resources/<your-id>.html`.
2. Build the page. Keep every visible string in `site/locales/en.js` under your own key prefix, and read it with `I18N.t("key")`. Format numbers with `I18N.fmt(value, decimals)`.
3. Register it in `site/assets/catalog.js`: add an entry to `education` with `id`, `href`, `level`, `type`, and optionally `author` (your name, shown on the card). If you are building one of the planned ideas, add `href` to its existing entry.
4. Add `resource.<your-id>.title` and `resource.<your-id>.summary` to `site/locales/en.js`.
5. Open `site/index.html` through a local server (`cd site && python3 -m http.server 8000`) and check your page in all four languages.
6. Open a pull request with a short description and a screenshot.

## Translations

English is the reference. Spanish, Portuguese and French live in `site/locales/es.js`, `pt.js` and `fr.js`. You only need to add English keys; missing keys fall back to English until someone translates them. Translation pull requests are very welcome, and so are new languages (see `site/README.md`).

## Writing style

- Plain, direct sentences. Name things the way the reader knows them.
- No em dashes or en dashes in visible text.
- Say when data are illustrative. Do not publish unpublished results from the manuscripts.
