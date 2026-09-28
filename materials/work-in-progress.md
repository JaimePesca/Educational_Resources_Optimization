# Work in progress (not published)

Read this first after any interruption (credits, context reset). It is the single source of truth for the current job. Update the status table and commit it after every step.

- Branch: `seo/technical-seo` (from main e12744a). Holds the technical SEO commit d47a5c7 and this job. Do not merge to main until the owner says so.
- Local server for checks: `cd site && python3 -m http.server 8765`.
- Previous jobs (lab pages, home visuals) are merged and deployed (main e12744a).

## The owner's request (2026-09-28)
Apply these recommendations of SEO_REPORT.md section 6 (the others not yet):
- 3: an "About the author" page (bio, affiliation, research lines, courses, links) and complete `sameAs`.
- 12: accessible descriptions for canvas/SVG graphics, only if nothing visual changes.
- 13: speed (preconnect, MathJax loaded lazily, measure).
- 14: a custom 404 page with links to the learning path.
- 15: outreach (backlinks): what can be done from the repo plus a ready kit for the owner.

## Status
| # | Task | Status | Notes |
|---|---|---|---|
| 12 | Accessible names for canvas and SVG charts (site.js, from existing headings, no visual change) | done | site.js: role="img" + aria-label from page title and nearest heading; 0 unnamed canvases after (was 40 of 47); pixel-identical screenshots on 7 pages; follows language; page labels win |
| 13 | Speed: preconnect hints, MathJax deferred until a formula is near or the page is idle | todo | |
| 14 | 404.html (absolute asset paths, 4 languages, noindex, links to levels) | todo | |
| 3 | about.html from materials/cv (no MIT, no phone or email), footer link, Person JSON-LD | todo | ORCID, Scholar, ResearchGate, LinkedIn URLs are not in the CV: ask the owner |
| 15 | CITATION.cff, README link, outreach kit (materials/outreach.md) | todo | |
| F | Update SEO_REPORT.md, verify 4 languages x 1200/400 x light/dark, commit, push, report | todo | |

## Decisions already taken
- CV facts only; everything about MIT is left out (site rule); no phone or email on the site.
- About page in first person, like the home page ("my research").
