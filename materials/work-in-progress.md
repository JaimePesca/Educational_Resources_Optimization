# Work in progress (not published)

Read this first after any interruption (credits, context reset). It is the single source of truth for the current job. Update the status table and commit it after every step.

- Branch: `feat/dutch` (from main 96bd88e). Do not merge to main until the owner says so.
- Local server for checks: `cd site && python3 -m http.server 8765`.
- Previous job (game theory lab pages and the hidden study section) is merged and deployed (main 31dbfb9, Deploy website run 39837121966).

## The owner's request (2026-10-23)
"Procedamos con el nuevo idioma en dutch para el sitio base": add Dutch to the public site (home, the five levels, research, about, 404). The hidden lab stays in en, es, pt, fr (pinned with data-i18n-langs); its study section is already en, es, nl. Ask the owner at the end whether to add the lab too.

Measured volume (English bundles): levels 49 pages, about 56,000 words; research 4 pages, about 6,600 words; about page 600 words; shared en.js 400 keys, 3,600 words (home, nav, footer, catalog titles and summaries, plus the feas, knap and tsp page strings).

## Status
| # | Task | Status | Notes |
|---|---|---|---|
| 1 | Infrastructure | done | assets/i18n.js SITE_LANGS += nl (Dutch is stored like the other site languages); the 17 lab pages pinned with data-i18n-langs="en es pt fr"; tools/seo_gen.py LANGS += nl, og:locale nl_NL (run it only when every base page has its nl bundle); CLAUDE.md language rule (five languages, Dutch "je", glossary path, exceptions) |
| 2 | Pilot: glossary, shared strings (locales/nl.js, all keys of en.js), Level 1 (10 pages: feasible-region via shared keys, two-stories, feasible-region-3d, compacta, lp-inventory, edu-diet, edu-simplex, lp-shadow, lp-machines, lp-workforce) | todo | workflow: glossary + critic, then translator + independent reviewer per bundle, then a consistency pass |
| 3 | Owner reviews the pilot (screenshots; ideally a Dutch speaker) | todo | |
| 4 | Rest: levels 2 to 5 (39 pages), research (4, anonymized and noindex: keep them anonymous in Dutch too), about | todo | same pipeline |
| 5 | Run seo_gen.py, SEO_REPORT.md (nl), final sweep (5 languages, 1200/400, light/dark), report, ask for merge | todo | |

## Decisions already taken
- Scope "sitio base" = the public site, not the hidden lab (owner asked after the previous job; confirm the lab at the end).
- Dutch register "je" (informal), as in the study section; Dutch number format comes from I18N.fmt (nl-NL: decimal comma, dot for thousands).
- Translate from the English reference; for Level 1 statements check the Spanish original too.
- Pilot first (glossary + shared + Level 1), owner review, then the rest.
