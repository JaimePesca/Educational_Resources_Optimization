/*
 * Site catalog: the single place that says what the two divisions contain.
 * The divisions are independent: education resources never point to research cases, and the
 * research pages show the real cases from the manuscripts, not teaching exercises.
 *
 * Visible text lives in the locale files:
 *   level.<id>.title / .summary / .topics (topics separated by |)
 *   resource.<id>.title / .summary        type.<type>
 *   project.<id>.title / .summary / .place / .facts (facts separated by |)     method.<id>
 *
 * Education: a resource has a level and a type; `author` (optional) credits whoever built it.
 * An entry without `href` is planned: it shows up as an open idea that anyone can build.
 * Research: each case links to its page in research/, whose own strings live in
 * locales/research/<id>.<lang>.js. `paper` (optional) is the published article's link; when present the
 * case page shows a "Read the paper" button.
 */
window.CATALOG = {
  levels: [
    { id: "lp", n: 1 },
    { id: "ip", n: 2 },
    { id: "milp", n: 3 },
    { id: "nlp", n: 4 },
    { id: "other", n: 5 }
  ],

  education: [
    // Published
    { id: "feasible-region", href: "resources/feasible-region.html", level: "lp", type: "simulation" },
    { id: "critical-load", href: "resources/critical-load.html", level: "ip", type: "game" },
    { id: "patrol-route", href: "resources/patrol-route.html", level: "other", type: "animation" },
    // Level 3 · Mixed-integer programming, in learning order
    { id: "milp-mixed-set", href: "resources/mixed-feasible-set.html", level: "milp", type: "simulation" },
    { id: "milp-logic", href: "resources/logic-constraints.html", level: "milp", type: "game" },
    { id: "milp-bigm", href: "resources/big-m.html", level: "milp", type: "simulation" },
    { id: "edu-warehouses", href: "resources/open-or-close.html", level: "milp", type: "simulation" },
    { id: "milp-piecewise", href: "resources/bulk-discounts.html", level: "milp", type: "simulation" },
    { id: "edu-power", href: "resources/keep-the-lights-on.html", level: "milp", type: "game" },
    { id: "milp-lot-sizing", href: "resources/produce-now-or-later.html", level: "milp", type: "game" },
    { id: "milp-runway", href: "resources/cleared-to-land.html", level: "milp", type: "animation" },
    { id: "two-stories", href: "resources/two-stories.html", level: "lp", type: "example" },
    { id: "feasible-region-3d", href: "resources/feasible-region-3d.html", level: "lp", type: "simulation" },
    { id: "compacta", href: "compacta/index.html", level: "lp", type: "game" },
    { id: "dijkstra", href: "resources/dijkstra.html", level: "other", type: "animation" },

    // Planned: open for contributors
    { id: "edu-diet", level: "lp", type: "simulation" },
    { id: "edu-simplex", level: "lp", type: "animation" },
    { id: "edu-shifts", level: "ip", type: "game" },
    { id: "edu-bnb", level: "ip", type: "animation" },
    { id: "edu-portfolio", level: "nlp", type: "simulation" },
    { id: "edu-gradient", level: "nlp", type: "animation" },
    { id: "edu-queue", level: "other", type: "simulation" },
    { id: "edu-newsvendor", level: "other", type: "game" }
  ],

  research: [
    { id: "nanostores", href: "research/nanostores.html", paper: "https://doi.org/10.1007/978-3-032-19656-9_4", methods: ["cfl", "logit", "minlp", "linearization"] },
    { id: "markets", href: "research/markets.html", methods: ["cfl", "logit", "minlp", "fahp"] },
    { id: "wildfire", href: "research/wildfire.html", methods: ["twostage", "cvar", "matheuristic"] },
    { id: "pallets", href: "research/pallets.html", methods: ["ilp", "packing", "drl"] }
  ]
};
