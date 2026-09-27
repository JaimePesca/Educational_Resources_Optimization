# Addendum: building a page of the hidden proposals lab

Follow `materials/briefs/resource-build.md` (it describes the learning resources) with these differences:

- The page lives in `site/lab/<FILE>.html` and its strings in `site/locales/lab/<ID>.{en,es,pt,fr}.js`, registered as `I18N.register("<lang>", {...}, "lab/<ID>")`, with `<html data-i18n-bundles="lab/<ID>" data-title-key="<PREFIX>.title">`. Script paths start with `../` as on resource pages.
- Keep `<meta name="robots" content="noindex, nofollow">`. The top bar back link goes to the lab: `<a class="backlink" href="index.html" data-keep-lang>` with a key of your bundle such as `<PREFIX>.back` ("Proposals lab" / "Laboratorio de propuestas" / "Laboratório de propostas" / "Laboratoire de propositions"). Do not link to the home page or to other pages except the shared author footer.
- Do not edit `catalog.js`, `site/lab/index.html`, `site/locales/lab/lab.<lang>.js` or any shared file: the lead adds the `href` of your page to `CATALOG.lab` after the review.
- The card text for the proposal already exists in `site/locales/lab/lab.<lang>.js` (`lab.<ID>.title` and `lab.<ID>.desc`): read it, the page must deliver what the card promises.
- Masthead eyebrow: "Lab · Proposal · <b>Animation</b>" (translated: "Laboratorio · Propuesta", "Laboratório · Proposta", "Laboratoire · Proposition").
- Everything else is the same: standard animation format (Anim.create, 40 to 60 s, 4 to 6 chapters, one scenario control, pure render(t), final frame that summarizes), tex.js formulas, every number computed in the browser from the real model (LP.solve when linear), four languages, no dashes, never mention MIT, illustrative data declared in the footer note, Further reading line `<p class="note further" data-further="<SECTION>" data-refs="<PREFIX>.refs">`.
- Server for checks: `curl -s localhost:8765 >/dev/null || (cd /home/user/repo/site && setsid nohup python3 -m http.server 8765 >/dev/null 2>&1 &)`, then open `http://localhost:8765/lab/<FILE>.html`.
