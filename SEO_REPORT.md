# Informe de SEO técnico

Sitio: https://learn-optimization.jaimepesca.com (carpeta `site/`, estático, sin plantilla compartida).
Rama: `seo/technical-seo`, lista para pull request contra `main`.

Todo lo que se agregó es invisible: etiquetas dentro de `<head>`, un atributo en `<html>`, archivos de configuración (`robots.txt`, `sitemap.xml`), una imagen para compartir en redes (`assets/og-image.png`, que solo aparece cuando alguien comparte un enlace) y una función en el runtime de idiomas que actualiza esas etiquetas. No cambió ningún texto visible, ni la navegación, ni los nombres de archivos, ni las rutas, ni el diseño. Se comprobó que el `<body>` de las 65 páginas es idéntico al de `main`.

## 1. Google Analytics 4

No había ninguna etiqueta de Google Analytics en el sitio. El sitio no tiene una plantilla o layout compartido (cada página es un HTML independiente), así que la etiqueta `gtag.js` con el ID `G-L1HT57WJW6` se pegó justo después de `<head>`, una sola vez, en cada una de las 65 páginas (y después en las dos páginas nuevas de la segunda ronda, `about.html` y `404.html`: 67 en total):

- `site/compacta/index.html`
- `site/index.html`
- `site/about.html` (segunda ronda)
- `site/404.html` (segunda ronda)
- `site/lab/beyond-var.html`
- `site/lab/dual-street.html`
- `site/lab/fuzzy-ahp.html`
- `site/lab/index.html`
- `site/lab/inside-the-solver.html`
- `site/lab/kernel-trick.html`
- `site/lab/learning-is-optimizing.html`
- `site/lab/linearizing-markets.html`
- `site/lab/ml-ai-optimization.html`
- `site/lab/widest-street.html`
- `site/research/markets.html`
- `site/research/nanostores.html`
- `site/research/pallets.html`
- `site/research/wildfire.html`
- `site/resources/_template.html`
- `site/resources/agents-and-outbreaks.html`
- `site/resources/beer-game.html`
- `site/resources/big-m.html`
- `site/resources/bulk-discounts.html`
- `site/resources/chasing-demand.html`
- `site/resources/cheapest-feed.html`
- `site/resources/chord-test.html`
- `site/resources/cleared-to-land.html`
- `site/resources/critical-load.html`
- `site/resources/critical-path.html`
- `site/resources/cutting-planes.html`
- `site/resources/dijkstra.html`
- `site/resources/easy-to-check.html`
- `site/resources/efficient-or-not.html`
- `site/resources/exact-change.html`
- `site/resources/fair-shares.html`
- `site/resources/feasible-region-3d.html`
- `site/resources/feasible-region.html`
- `site/resources/flat-is-not-a-bottom.html`
- `site/resources/hospital-shifts.html`
- `site/resources/inventory-balance.html`
- `site/resources/keep-the-lights-on.html`
- `site/resources/logic-constraints.html`
- `site/resources/machine-scheduling.html`
- `site/resources/max-flow-min-cut.html`
- `site/resources/mixed-feasible-set.html`
- `site/resources/one-point-many-distances.html`
- `site/resources/open-or-close.html`
- `site/resources/patrol-route.html`
- `site/resources/perfect-assignment.html`
- `site/resources/plan-for-the-average.html`
- `site/resources/price-wars.html`
- `site/resources/produce-now-or-later.html`
- `site/resources/replace-or-repair.html`
- `site/resources/roll-back-the-tree.html`
- `site/resources/rounding-trap.html`
- `site/resources/search-tree.html`
- `site/resources/shadow-prices.html`
- `site/resources/signal-coverage.html`
- `site/resources/simplex-steps.html`
- `site/resources/slow-steaming.html`
- `site/resources/two-stories.html`
- `site/resources/walls-and-fences.html`
- `site/resources/weigh-the-criteria.html`
- `site/resources/where-contours-touch.html`
- `site/resources/why-queues-explode.html`
- `site/resources/workforce-planning.html`
- `site/resources/zigzag-or-leap.html`

Notas:
- Incluye las 10 páginas del laboratorio oculto y `resources/_template.html` (la plantilla de la que se copian las páginas nuevas, para que las futuras ya la traigan).
- Las URL con `?lang=es`, `?lang=pt` y `?lang=fr` se registran como páginas distintas en GA4, así que puedes ver el tráfico por idioma en el informe de páginas.

## 2. Cómo funcionan los idiomas y por qué así

El sitio muestra cada página en un idioma según el parámetro `?lang=`; sin parámetro muestra inglés (o el último idioma que eligió ese visitante, guardado en su navegador; Google no guarda esa preferencia, así que siempre ve inglés). Por eso cada página tiene cuatro URL:

| Idioma | URL |
|---|---|
| en (y x-default) | `https://learn-optimization.jaimepesca.com/resources/shadow-prices.html` |
| es | `...shadow-prices.html?lang=es` |
| pt | `...shadow-prices.html?lang=pt` |
| fr | `...shadow-prices.html?lang=fr` |

- **hreflang:** cada página indexable declara las cuatro versiones más `x-default` (inglés) en el HTML. Se usan códigos de idioma sin región (`es`, `pt`, `fr`) para que sirvan en toda Latinoamérica, España, Brasil, Portugal, Francia y Canadá.
- **canonical:** cada versión debe ser su propia canónica; si la versión en español apuntara a la inglesa, Google la trataría como duplicado e ignoraría el hreflang. Como el idioma depende del parámetro de la URL, la etiqueta `<link rel="canonical">` la agrega `assets/i18n.js` al cargar la página (una sola etiqueta, sin otra en el HTML que la contradiga, que es lo que Google recomienda cuando la canónica se pone con JavaScript). Google ejecuta JavaScript al indexar, así que la ve. Resultado verificado: la URL sin parámetro tiene canónica la URL inglesa; `?lang=es` tiene canónica `?lang=es`, y así con pt y fr.
- **lang:** el HTML trae `lang="en"` (correcto para la URL sin parámetro) y el runtime ya lo cambiaba a `es`, `pt` o `fr` según el idioma; se verificó en las cuatro versiones.
- **Descripción y redes por idioma:** el HTML trae la descripción en inglés; el runtime la reemplaza por la misma frase en el idioma de la página (la toma de la clave indicada en `data-desc-key`), junto con `og:description`, `twitter:description`, `og:title`, `twitter:title` y `og:locale`. Así, en Google la versión en español aparece con título y descripción en español.

## 3. Cambios por archivo

### `site/assets/i18n.js` (runtime de idiomas, sin efecto visible)
- Nueva función `seo()`, llamada cada vez que se aplica un idioma: pone la descripción, `og:`/`twitter:` título y descripción y `og:locale` en el idioma actual, y agrega la canónica según el hreflang del idioma de la URL. Solo actúa en páginas que declaran hreflang (no en el laboratorio).

### `site/index.html` (inicio)
- Etiqueta GA4.
- Se conservó la meta description que ya tenía (no se tocó; está en inglés para todos los idiomas, ver recomendaciones).
- `meta author`, hreflang (en, es, pt, fr, x-default), Open Graph (`website`) y Twitter Card.
- JSON-LD: `WebSite`, `Person` (Jaime Pesca), `Course` (la ruta de aprendizaje de cinco niveles, con los niveles como `syllabusSections`, lo que enseña y los 49 recursos publicados como `hasPart`) e `ItemList` con los cuatro casos de investigación.

### Las 48 páginas de `site/resources/*.html` y `site/compacta/index.html` (recursos de aprendizaje)
- Etiqueta GA4.
- Meta description nueva (lista abajo) y `data-desc-key="resource.<id>.summary"` en `<html>`.
- `meta author`, hreflang, Open Graph (`website`) y Twitter Card.
- JSON-LD: `LearningResource` (nombre, descripción, tipo: simulación, juego, animación o ejemplo resuelto; nivel; tema que enseña; los temas del nivel como `about` y `keywords`; idiomas; gratuito; autor; parte del `Course`), `Person` y `BreadcrumbList`.

### Las 4 páginas de `site/research/*.html` (casos de investigación)
- Etiqueta GA4.
- Meta description nueva y `data-desc-key="project.<id>.summary"`.
- `meta author`, hreflang, Open Graph (`article`) y Twitter Card.
- JSON-LD: `WebPage` cuyo `mainEntity` es el `ScholarlyArticle` del estudio, con el título y los coautores tal como aparecen en la cita de cada página, los métodos como palabras clave y el lugar del caso. Nanostores incluye además el DOI 10.1007/978-3-032-19656-9_4, el libro (ICPR 2025, Lecture Notes in Production Engineering, editores), Springer, 2026 y páginas 33 a 40. Los otros tres se marcan como `Working paper`. En los cuatro, Jaime Pesca queda enlazado a la misma entidad `Person`, que reúne las formas del nombre que usan las citas (Jaime Pesca, Jaime Enrique Pesca Santos, J. E. Pesca Santos) y su perfil de GitHub.

### Páginas del laboratorio oculto (`site/lab/*.html`)
- Solo la etiqueta GA4. Ya tenían `noindex, nofollow`, así que no llevan canónica, hreflang, descripción ni datos estructurados, y no están en el sitemap: siguen ocultas para los buscadores.

### `site/resources/_template.html`
- Etiqueta GA4. No va en el sitemap y queda bloqueada en `robots.txt`. No se le puso `noindex` porque las páginas nuevas se copian de ella y lo heredarían.

### `site/sitemap.xml` (nuevo)
- 216 URL: las 54 páginas indexables (inicio, 49 recursos, 4 casos de investigación) en sus cuatro idiomas, cada una con sus alternativas hreflang (incluido x-default) y la fecha de su último cambio según git.

### `site/robots.txt` (nuevo)
- Permite rastrear todo, bloquea solo la plantilla y apunta al sitemap. El laboratorio no se bloquea a propósito: así los buscadores pueden leer su `noindex`.

### `site/assets/og-image.png` (nuevo)
- Imagen de 1200 × 630 para Open Graph y Twitter: el nombre del sitio, el subtítulo que ya usa la página de inicio, el dominio y los dibujos de los cinco niveles. Solo se ve al compartir un enlace.

### `tools/seo_gen.py` (nuevo, fuera de `site/`, no se publica)
- El script que generó todo lo anterior a partir de los textos existentes. Si agregas o renombras una página, ejecuta `python3 tools/seo_gen.py`: actualiza el bloque SEO de cada página, el sitemap y robots.txt, y pone GA4 donde falte. Es idempotente.

### `CLAUDE.md`
- Una línea con la convención: GA4 al inicio de cada `<head>` y ejecutar el generador al agregar páginas.

## 4. Meta descriptions nuevas (para revisar)

Se agregaron solo donde faltaban: en las 53 páginas indexables que no tenían (el inicio ya tenía la suya). Cada una es el resumen que la página ya muestra en su tarjeta del inicio; si pasa de 200 caracteres se corta en la última frase completa. En español, portugués y francés se usa la traducción existente de la misma clave, con la misma regla.

| Página | Descripción (inglés, en el HTML) | Clave del texto | Caracteres |
|---|---|---|---|
| `research/markets.html` | Which parks should host Bogotá's subsidized farmers' markets, and on which days of the week, to capture the most fresh-food demand from households that could also shop at supermarkets and produce stores. Site suitability from urban planning criteria enters through fuzzy AHP. | `project.markets.summary` | 275 |
| `research/nanostores.html` | Where to open a new network of nanostores, the small family-run food shops of Latin American neighborhoods, and which fresh products each one should sell. | `project.nanostores.summary` | 154 |
| `research/pallets.html` | Which flower boxes go on which pallet position of a full-charter cargo plane, and whether workers can actually stack them as the boxes arrive on the conveyor. | `project.pallets.summary` | 158 |
| `research/wildfire.html` | Which aerial suppression bases to open, how many helicopters to station and which water points to enable, all under one budget and across uncertain fire days. | `project.wildfire.summary` | 158 |
| `compacta/index.html` | A game about writing models in compact form: sets, indices, Σ and ∀, across five worlds of challenges. | `resource.compacta.summary` | 102 |
| `resources/agents-and-outbreaks.html` | Let people move and meet in a box, tune distancing and the chance of contagion, and compare many simulated outbreaks with the SIR equations. | `resource.other-abm-epidemic.summary` | 140 |
| `resources/beer-game.html` | Run one link of a four-stage supply chain for 30 weeks. A small jump in customer demand grows into wild swings upstream, the bullwhip effect. See what sharing information changes. | `resource.other-beer-game.summary` | 179 |
| `resources/big-m.html` | Move the big-M values in an either-or model and see how too small cuts off good plans, too large weakens the LP relaxation, and the tightest M matches the convex hull. | `resource.milp-bigm.summary` | 167 |
| `resources/bulk-discounts.html` | Piecewise linear costs from two mills: see why rising prices fit a plain LP, while volume discounts need binary variables to stop the LP from buying the cheap last tier first. | `resource.milp-piecewise.summary` | 175 |
| `resources/chasing-demand.html` | Forecast a noisy demand that suddenly shifts with exponential smoothing, see how the smoothing constant trades stability for speed, and find the constant with the lowest error. | `resource.other-smoothing.summary` | 176 |
| `resources/cheapest-feed.html` | Mix corn, fat residue and alfalfa to meet a pig's daily carbohydrates, proteins and vitamins, then compare your cost with the optimal diet. | `resource.edu-diet.summary` | 139 |
| `resources/chord-test.html` | Draw chords across curves and shapes: when every chord stays above the curve or inside the set, the problem is convex and every local minimum is the global one. | `resource.nlp-convexity.summary` | 160 |
| `resources/cleared-to-land.html` | Watch arrivals land at a busy runway, first in arrival order and then in the order a mixed-integer model chooses, and try to beat it yourself. | `resource.milp-runway.summary` | 142 |
| `resources/critical-load.html` | Pack a helicopter for the fire line under a weight limit, then compare your load with the exact optimum and a greedy rule. | `resource.critical-load.summary` | 122 |
| `resources/critical-path.html` | Schedule a nine-activity project: forward and backward passes give the slack of each task and the critical path, then Monte Carlo shows why deadlines slip when paths merge. | `resource.other-cpm.summary` | 172 |
| `resources/cutting-planes.html` | Watch Gomory's algorithm slice fractional corners off the LP region until the optimum is integer, then build your own Chvátal-Gomory cut by combining and rounding constraints. | `resource.ip-cuts.summary` | 175 |
| `resources/dijkstra.html` | Follow Dijkstra's shortest path algorithm iteration by iteration on a worked example, then solve an exercise on an undirected graph. | `resource.dijkstra.summary` | 132 |
| `resources/easy-to-check.html` | Race n², n³, 2ⁿ and n! as n grows, see why checking a tour is quick while finding the best one is not, and why a faster computer barely helps. | `resource.other-complexity.summary` | 142 |
| `resources/efficient-or-not.html` | Compare eight schools that turn resources into results: draw the efficient frontier, project an inefficient school onto it, and compute every efficiency score with a linear program. | `resource.other-dea.summary` | 181 |
| `resources/exact-change.html` | Watch dynamic programming fill a table cell by cell to give change with the fewest coins, and find out when the cashier's largest-coin-first rule fails. | `resource.ip-coins.summary` | 152 |
| `resources/fair-shares.html` | Split a budget among five groups and slide from efficiency to equality: alpha fairness goes from utilitarian to proportional to maximin, and shows the price of fairness. | `resource.nlp-fairness.summary` | 169 |
| `resources/feasible-region-3d.html` | Explore a three-variable military procurement LP in 3D, find its vertices and see why a whole edge of optimal solutions appears. | `resource.feasible-region-3d.summary` | 128 |
| `resources/feasible-region.html` | Allocate helicopter hours and ground crews to a wildfire. Drag the constraints and watch the optimal vertex move. | `resource.feasible-region.summary` | 113 |
| `resources/flat-is-not-a-bottom.html` | A zero gradient only says the ground is flat. See a minimum, a maximum, the curve x³ and a saddle, and let the curvature tell them apart. | `resource.nlp-stationary.summary` | 137 |
| `resources/hospital-shifts.html` | Staff a week of nursing shifts with whole people, not fractions, while covering demand and respecting rest rules. | `resource.edu-shifts.summary` | 113 |
| `resources/inventory-balance.html` | Plan four months of production for two products and watch the warehouse fill and empty: what you make plus what you keep must cover what you sell. | `resource.lp-inventory.summary` | 146 |
| `resources/keep-the-lights-on.html` | Switch power plants on and off hour by hour and set their output to meet demand at the lowest cost, including start-up costs. | `resource.edu-power.summary` | 125 |
| `resources/logic-constraints.html` | Turn plant rules that mix yes/no decisions and quantities into linear constraints, and let a verifier show which plans each formulation cuts off or lets through. | `resource.milp-logic.summary` | 161 |
| `resources/machine-scheduling.html` | Three machines, four beam sizes and 50 hours each: watch the cheapest way to cover every weekly requirement take shape. | `resource.lp-machines.summary` | 119 |
| `resources/max-flow-min-cut.html` | Push flow through a network one augmenting path at a time until no path is left, then find the cut that proves it: the maximum flow equals the minimum cut. | `resource.other-maxflow.summary` | 155 |
| `resources/mixed-feasible-set.html` | See how the same constraints give a polygon, a set of slices or a grid of points once some variables must be whole numbers, and why the LP is a bound and rounding is only a heuristic. | `resource.milp-mixed-set.summary` | 183 |
| `resources/one-point-many-distances.html` | Place one collection center for seven rural villages with different demands, follow Weiszfeld's algorithm to the point of least weighted distance and compare it with the city-block answer. | `resource.nlp-weber.summary` | 188 |
| `resources/open-or-close.html` | Decide which warehouses to open when each one has a fixed cost, and how much each should ship to every city. | `resource.edu-warehouses.summary` | 108 |
| `resources/patrol-route.html` | Watch simulated annealing plan a drone route through watchtowers, and see why accepting worse moves helps escape local optima. | `resource.patrol-route.summary` | 126 |
| `resources/perfect-assignment.html` | Assign riders to orders and see why the LP relaxation already returns a whole assignment. Then add one budget constraint and watch fractions and an integrality gap appear. | `resource.ip-assignment.summary` | 171 |
| `resources/plan-for-the-average.html` | Birge and Louveaux's farmer plants 500 acres before knowing the weather. | `resource.other-two-stage.summary` | 72 |
| `resources/price-wars.html` | Two firms take turns choosing how much to produce, each giving its best response to the other, and staircase into the Nash equilibrium. Then let one firm lead and compare. | `resource.other-cournot.summary` | 171 |
| `resources/produce-now-or-later.html` | Choose which weeks a jam factory runs a batch, trading fixed setup costs against holding costs, and see why the binary setup and a tight big-M matter. | `resource.milp-lot-sizing.summary` | 150 |
| `resources/replace-or-repair.html` | A machine wears out one state at a time. Watch value iteration fill a heat map until the best policy appears: keep maintaining it while it is healthy, replace it past a threshold. | `resource.other-mdp.summary` | 179 |
| `resources/roll-back-the-tree.html` | A coffee cooperative decides whether to export. Roll expected values back from the leaves to the root, prune the losing branches, and see the choice flip when the cooperative is risk averse. | `resource.other-decision-tree.summary` | 190 |
| `resources/rounding-trap.html` | Solve the LP and round the answer? With whole trucks and vans, watch rounding break constraints or miss the true integer optimum, and meet the integer hull. | `resource.ip-rounding.summary` | 156 |
| `resources/search-tree.html` | Watch branch and bound split a problem, compute bounds and prune whole branches without exploring them. | `resource.edu-bnb.summary` | 103 |
| `resources/shadow-prices.html` | Add finishing or carpentry hours to Giapetto's workshop and see what each extra hour is worth, how far that value holds and when the plan changes. | `resource.lp-shadow.summary` | 146 |
| `resources/signal-coverage.html` | Choose antenna sites so every vereda of a rural Colombian municipality gets signal, and see how the map becomes a 0-1 matrix with one constraint per vereda. | `resource.ip-cover.summary` | 156 |
| `resources/simplex-steps.html` | Follow the simplex method pivot by pivot on Giapetto's toys, and watch each tableau move to a better corner of the feasible region. | `resource.edu-simplex.summary` | 131 |
| `resources/slow-steaming.html` | Set a ship's speed on each leg of its voyage: fuel grows with the square of speed, cargo in transit costs money every day and the deadline must hold. Then compare with the KKT optimum. | `resource.nlp-slow-steaming.summary` | 184 |
| `resources/two-stories.html` | Slide between a pharmaceutical and a beverage version of the same blending problem: the words change, the numbers and the linear program do not. | `resource.two-stories.summary` | 144 |
| `resources/walls-and-fences.html` | Turn a constrained problem into a series of unconstrained ones: a penalty lets the iterates arrive from outside, a barrier keeps them inside on the central path. | `resource.nlp-penalty-barrier.summary` | 161 |
| `resources/weigh-the-criteria.html` | Choose a site for a regional hospital among five options and four criteria. Move the weights, compare the weighted sum with TOPSIS, and find how far the weights can move before the winner changes. | `resource.other-mcda.summary` | 196 |
| `resources/where-contours-touch.html` | Grow the level curves of a distance until they touch a constraint, watch the two gradients line up, and read the multiplier as a shadow price. | `resource.nlp-kkt.summary` | 142 |
| `resources/why-queues-explode.html` | Watch a single-server queue as the load climbs from 70% to 97%: waiting time does not grow in a straight line, it explodes, and variability makes it worse. Little's law checks the numbers. | `resource.other-queue-explode.summary` | 188 |
| `resources/workforce-planning.html` | Hire and train technicians month by month while experienced staff supervise trainees and 5% leave every month, at the lowest labor cost. | `resource.lp-workforce.summary` | 136 |
| `resources/zigzag-or-leap.html` | Race steepest descent, Newton's method and BFGS down the Rosenbrock valley from the same start and count the steps each one needs. | `resource.nlp-newton.summary` | 130 |

## 5. Verificación
- Las 65 páginas: `<body>` idéntico a `main`; GA4 presente una sola vez. (Segunda ronda: ver sección 7.)
- En el navegador, inicio, recursos, un caso de investigación, Compacta y el laboratorio en los cuatro idiomas: sin errores de página; título, descripción, `og:locale`, `lang` y canónica correctos por idioma; JSON-LD válido.
- `sitemap.xml` es XML válido con 216 URL.

## 6. Recomendaciones que NO implementé (para que decidas)

**Contenido y títulos (cambiarían texto visible o contenido):**
1. **Títulos de página más descriptivos.** Hoy el título de la pestaña es solo el nombre del recurso (por ejemplo "Shadow Prices"). Agregar el tema y la marca ayudaría mucho en búsquedas: "Shadow Prices: linear programming sensitivity analysis | Optimization in Action". Cambia el texto de la pestaña, por eso no lo hice.
2. **Meta description del inicio por idioma.** La actual está en inglés para los cuatro idiomas. Podría usar el texto de presentación (`home.lede`) ya traducido, con el mismo mecanismo de `data-desc-key`.
3. **[Aplicada, ver sección 7]** **Una página "Sobre el autor"** con biografía, afiliación, líneas de investigación, cursos que enseñas y enlaces a ORCID, Google Scholar, ResearchGate y LinkedIn. Es lo que más ayuda a que Google te reconozca como experto (E-E-A-T) y a que aparezcas cuando buscan "experto en optimización" o "investigación de operaciones Colombia". Con esos enlaces también completaría `sameAs` en el `Person`.
4. **Páginas por nivel y por tema** (por ejemplo, una página para "programación lineal" con sus recursos y una breve explicación). Hoy todo el temario vive en el inicio; páginas propias por tema capturan búsquedas generales ("ejercicios de programación lineal", "branch and bound ejemplo", "condiciones KKT interactivo").
5. **Texto pensado para docentes:** una sección corta "Para profesores" (cómo usar los recursos en clase, duración, prerrequisitos) atrae búsquedas de material didáctico. Con eso también podría declararse en los datos estructurados el público (estudiantes y docentes), que no agregué para no afirmar algo que la página no dice.
6. **Enlaces a los artículos completos** (DOI, preprint en SSRN, arXiv u Optimization Online) desde cada caso de investigación, para que Google Scholar y los buscadores académicos los asocien con el sitio.

**Técnico (requiere decisiones o cambia la estructura):**
7. **Versiones estáticas por idioma** (por ejemplo `/es/...`) generadas en el despliegue. Google ejecuta JavaScript, pero otros buscadores y las redes sociales solo leen el HTML inicial, que está en inglés; con páginas prerenderizadas cada idioma tendría su texto en el HTML. Cambia rutas, por eso no lo hice.
8. **Aviso de cookies y modo de consentimiento de GA4.** Para visitantes de la Unión Europea (sitio en francés y portugués) y para la Ley 1581 de 2012 en Colombia conviene un aviso de privacidad y el Consent Mode de Google. Es un elemento visible.
9. **Google Search Console y Bing Webmaster Tools:** verificar el dominio, enviar `sitemap.xml` y revisar el informe de hreflang e indexación. Se hace desde tu cuenta.
10. **Imagen para compartir por idioma y por página** (hoy todas usan la misma imagen en inglés).
11. **`og:url` no se incluyó a propósito:** Facebook y LinkedIn no ejecutan JavaScript, y un `og:url` fijo haría que un enlace compartido en español abriera la versión en inglés.

**Accesibilidad y velocidad:**
12. **[Aplicada, ver sección 7]** **Textos alternativos:** el sitio no usa `<img>`; los gráficos son canvas y SVG. Varias animaciones ya tienen etiquetas ARIA; conviene revisar que cada canvas tenga una descripción (`role="img"` y `aria-label` traducido), lo que ayuda a la accesibilidad y a los buscadores. Implica textos nuevos en cuatro idiomas.
13. **[Aplicada, ver sección 7]** **Velocidad:** MathJax (cdnjs), Plotly (jsDelivr) y Google Fonts se cargan desde CDN. Se podrían agregar `preconnect` a esos dominios, cargar MathJax solo cuando una fórmula entra en pantalla y medir Core Web Vitals en PageSpeed Insights tras publicar.
14. **[Aplicada, ver sección 7]** **Página 404 propia** con enlaces a la ruta de aprendizaje, para no perder visitas que llegan a URL viejas.

**Difusión (fuera del sitio):**
15. **[Aplicada, ver sección 7]** Enlaces entrantes desde programas de curso, sitios de universidades, sociedades (INFORMS, ALIO, SOCIO), repositorios de material docente (MERLOT, OER Commons) y tus perfiles académicos. Es el factor que más pesa para posicionar temas generales de optimización.

## 7. Recomendaciones aplicadas en la segunda ronda (3, 12, 13, 14 y 15)

Las demás (1, 2, 4 a 11) siguen pendientes de tu decisión.

### 3. Página "Sobre el autor" (`site/about.html`, nueva)
- Ruta nueva: https://learn-optimization.jaimepesca.com/about.html, en los cuatro idiomas (`site/locales/about/about.<lang>.js`).
- Contenido tomado de tu hoja de vida (`materials/cv`): perfil, docencia (Universidad Externado de Colombia, Claro Colombia, Universidad de La Sabana), investigación (asistente de investigación en La Sabana y los cuatro casos del sitio con su estado: publicado, en revisión, en preparación), publicaciones (las mismas citas de cada página de investigación, con el DOI del artículo publicado), métodos y herramientas, experiencia en la industria (Coca-Cola FEMSA, Overlap, XAQ10), formación (La Sabana), membresías (The OR Society, ASOCIO), reconocimientos y enlaces (jaimepesca.com y GitHub).
- Se dejó fuera, a propósito: todo lo relacionado con MIT (regla del sitio: dos certificados, el proyecto final y la presentación en la red SCALE), tu teléfono y tu correo.
- Enlace "Sobre el autor" agregado en el pie de página de todas las páginas (`assets/site.js`), junto a tu nombre y dominio. Es el único cambio visible fuera de las páginas nuevas.
- Datos estructurados: `ProfilePage` cuya entidad principal es el `Person`. El `Person` de todo el sitio ahora incluye cargo (profesor de métodos de optimización), Universidad Externado de Colombia, Universidad de La Sabana (egresado), The OR Society y ASOCIO, temas de experticia (`knowsAbout`), idiomas y un enlace a esta página.
- Descripción nueva (clave `ab.desc`): "Jaime Pesca, industrial engineer and lecturer in optimization methods at Universidad Externado de Colombia: operations research, mixed-integer programming, facility location and Fuzzy AHP." (y su traducción en es, pt y fr).
- Perfiles: ORCID (https://orcid.org/0009-0003-8221-0924) y LinkedIn (https://www.linkedin.com/in/jaime-pesca/) agregados como botones en la página y en `sameAs` del `Person`, junto con GitHub. Afiliación actual confirmada: Universidad Externado de Colombia. Google Scholar y ResearchGate se pueden agregar después en `PROFILES` (`site/about.html`) y en `sameAs` (`tools/seo_gen.py`).

### 12. Descripción accesible de gráficos (sin cambio visual)
- `assets/site.js`: cada `<canvas>` y cada gráfico `<svg>` sin nombre accesible recibe `role="img"` y un `aria-label` hecho con textos que ya están en la página: el título de la página y el encabezado o pie de figura más cercano (por ejemplo "Por qué explotan las colas: Míralo en movimiento"). Cambia con el idioma, alcanza los gráficos que se dibujan después y respeta las etiquetas que una página ya tenga.
- Antes: 40 de 47 lienzos sin descripción. Después: 0.
- Sin cambio visual: capturas de 7 páginas antes y después son idénticas píxel a píxel.

### 13. Velocidad
- `assets/tex.js` y `assets/research.js`: MathJax (el archivo más pesado) ya no se descarga al abrir la página. Se descarga cuando la primera fórmula está a 300 px de la pantalla o cuando la página ya cargó y el navegador está libre, lo que ocurra primero. Las fórmulas se ven igual.
- Resultado (evento de carga completa, medido localmente con un retardo de CDN de 400 ms): Big M 673 a 115 ms, el laboratorio 694 a 64 ms, Donde se tocan las curvas de nivel 829 a 157 ms, Incendios forestales 812 a 166 ms.
- Todas las páginas abren antes la conexión con Google Fonts (`preconnect`) y resuelven antes los dominios de cdnjs y jsDelivr (`dns-prefetch`) cuando los usan. Lo escribe `tools/seo_gen.py`.
- Las 8 páginas del nivel 1 que cargan MathJax con su propio script (por ejemplo Precios sombra) se dejaron como estaban para no arriesgar su funcionamiento; también reciben las pistas de conexión.
- Tras publicar, mide Core Web Vitals en https://pagespeed.web.dev (no se puede desde este entorno).

### 14. Página 404 (`site/404.html`, nueva)
- GitHub Pages la muestra en cualquier dirección que no exista. Rutas absolutas (funciona a cualquier profundidad), cuatro idiomas (claves `nf.*` en `locales/<idioma>.js`), `noindex`, el menú Explorar, un botón al inicio, los cinco niveles con su número de recursos y un enlace a investigación. Probada en una dirección inexistente en 4 idiomas, 1200 y 400 px, claro y oscuro.

### 15. Enlaces entrantes
- `CITATION.cff` (raíz del repositorio): GitHub muestra "Cite this repository".
- `README.md`: enlace al sitio, a "Sobre el autor" y a la cita.
- `materials/outreach/README.md` (no se publica): textos listos para pegar en español e inglés, cita APA y BibTeX, 12 lugares donde publicarlo en orden de impacto (tus cursos, perfiles académicos, GitHub, ASOCIO, The OR Society, ALIO, INFORMS Transactions on Education, MERLOT, OER Commons, repositorios institucionales), qué evitar, cómo medirlo y la lista de enlaces por nivel y recurso para programas de curso.
- `materials/outreach/qr-site.png` y `.svg`: código QR para diapositivas, medible en GA4.
- Publicar en esos sitios lo tienes que hacer tú desde tus cuentas.

### Otros archivos tocados en esta ronda
- `tools/seo_gen.py`: pistas de conexión en todas las páginas, página "Sobre el autor", `Person` ampliado. El sitemap ahora tiene 220 URL (55 páginas × 4 idiomas).
- `CLAUDE.md` y `materials/work-in-progress.md`: convenciones y seguimiento.

## 8. Eventos de Google Analytics 4

Un solo listener de clics en `document` (`site/assets/site.js`, que cargan todas las páginas) lee los atributos del enlace, nunca su texto, y llama a `gtag('event', ...)`. No usa `preventDefault` y envía con `transport_type: 'beacon'`, así que la navegación nunca se bloquea y el evento sale aunque la página cambie. Todos los eventos llevan `page_language`.

| Evento | Cuándo | Parámetros | Dónde está marcado |
|---|---|---|---|
| `jaimepesca_click` | clic en un enlace a jaimepesca.com | `link_location`, `page_language` | pie de página de todas las páginas (`footer`, nombre y dominio), botón en "Sobre el autor" (`about_profile`) |
| `github_click` | clic en un enlace a github.com | `link_location`, `page_language` | botón en "Sobre el autor" (`about_profile`), repositorio del caso de mercados (`research_page`) |
| `resource_open` | clic que abre un recurso | `resource_id` (id del catálogo), `level` (`lp`, `ip`, `milp`, `nlp`, `other`; `lab` en el laboratorio), `link_location`, `page_language` | tarjetas de la ruta de aprendizaje en el inicio (`learning_path`), menú Explorar (`browse_menu`), botón Abrir del laboratorio (`lab`) |
| `language_change` | cambio en el selector de idioma | `language` (el nuevo), `page_language` (el anterior) | `site/assets/i18n.js` |

Atributos en el HTML: `data-ga-event`, `data-ga-location`, y para recursos `data-ga-resource-id` y `data-ga-level`. Un enlace a jaimepesca.com o github.com sin `data-ga-event` también se cuenta, por su dominio (no por su texto), con la ubicación del contenedor más cercano que tenga `data-ga-location` o `content`. El subdominio del sitio (learn-optimization.jaimepesca.com) no cuenta como jaimepesca.com.

Probado en el navegador leyendo `window.dataLayer`: los cuatro eventos con sus parámetros en inglés, español, portugués y francés, y un clic normal en un recurso navega sin retraso.

Para verlos en los informes: en GA4, Administrar, Definiciones personalizadas, crea dimensiones personalizadas con alcance de evento para `link_location`, `page_language`, `resource_id`, `level` y `language` (sin eso los eventos se cuentan, pero sus parámetros solo se ven en DebugView y en Exploraciones). Para probar en vivo: Administrar, DebugView, con la extensión Google Analytics Debugger activada en tu navegador. Si quieres, marca `resource_open` como evento clave (conversión).

Nota: `resource_open` cuenta las aperturas desde el propio sitio. Quien llega a un recurso desde Google u otro sitio queda registrado como `page_view` de esa página, que GA4 ya mide solo.
