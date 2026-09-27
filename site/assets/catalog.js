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
 * A research entry without `href` is a placeholder for a coming project: the home page shows it as a
 * dimmed, unlinked card with only its title (project.<id>.title).
 *
 * Lab: `lab` lists proposals { id, type } for the hidden proposals lab (lab/index.html). They are ideas
 * only, nothing is built, the cards link nowhere and they are not part of the education catalog. Their
 * text lives in locales/lab/lab.<lang>.js: lab.<id>.title / .desc, plus lab.<id>.step1, step2… when a
 * proposal has numbered steps, and lab.<id>.eq1.tex / .formula / .cap, eq2… (+ .eqNote) for key equations,
 * typeset by assets/tex.js in a closed "The equations" box (lab.eqHead). The home page reaches the lab through an invisible door above the footer.
 * `labInNav` (default false) also shows a "Lab" link (nav.lab) in the home page's top menu when true.
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
    { id: "ip-rounding", href: "resources/rounding-trap.html", level: "ip", type: "simulation" },
    { id: "critical-load", href: "resources/critical-load.html", level: "ip", type: "game" },
    { id: "ip-coins", href: "resources/exact-change.html", level: "ip", type: "animation" },
    { id: "edu-bnb", href: "resources/search-tree.html", level: "ip", type: "animation" },
    { id: "ip-cuts", href: "resources/cutting-planes.html", level: "ip", type: "animation" },
    { id: "ip-cover", href: "resources/signal-coverage.html", level: "ip", type: "game" },
    { id: "edu-shifts", href: "resources/hospital-shifts.html", level: "ip", type: "game" },
    { id: "ip-assignment", href: "resources/perfect-assignment.html", level: "ip", type: "simulation" },
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
    { id: "lp-inventory", href: "resources/inventory-balance.html", level: "lp", type: "simulation" },
    { id: "edu-diet", href: "resources/cheapest-feed.html", level: "lp", type: "simulation" },
    { id: "edu-simplex", href: "resources/simplex-steps.html", level: "lp", type: "animation" },
    { id: "lp-shadow", href: "resources/shadow-prices.html", level: "lp", type: "simulation" },
    { id: "lp-machines", href: "resources/machine-scheduling.html", level: "lp", type: "animation" },
    { id: "lp-workforce", href: "resources/workforce-planning.html", level: "lp", type: "animation" },
    // Level 4 · Nonlinear programming (being built), in learning order
    { id: "nlp-convexity", href: "resources/chord-test.html", level: "nlp", type: "animation" },
    { id: "nlp-stationary", href: "resources/flat-is-not-a-bottom.html", level: "nlp", type: "animation" },
    { id: "nlp-kkt", href: "resources/where-contours-touch.html", level: "nlp", type: "animation" },
    { id: "nlp-newton", href: "resources/zigzag-or-leap.html", level: "nlp", type: "animation" },
    { id: "nlp-penalty-barrier", href: "resources/walls-and-fences.html", level: "nlp", type: "animation" },
    { id: "nlp-weber", href: "resources/one-point-many-distances.html", level: "nlp", type: "animation" },
    { id: "nlp-slow-steaming", href: "resources/slow-steaming.html", level: "nlp", type: "game" },
    { id: "nlp-fairness", href: "resources/fair-shares.html", level: "nlp", type: "simulation" },
    // Level 5 · Other OR methods (being built), in learning order
    { id: "other-queue-explode", href: "resources/why-queues-explode.html", level: "other", type: "animation" },
    { id: "other-mdp", href: "resources/replace-or-repair.html", level: "other", type: "animation" },
    { id: "other-two-stage", href: "resources/plan-for-the-average.html", level: "other", type: "animation" },
    { id: "other-decision-tree", href: "resources/roll-back-the-tree.html", level: "other", type: "animation" },
    { id: "other-cpm", href: "resources/critical-path.html", level: "other", type: "animation" },
    { id: "other-maxflow", href: "resources/max-flow-min-cut.html", level: "other", type: "animation" },
    { id: "other-cournot", href: "resources/price-wars.html", level: "other", type: "animation" },
    { id: "other-smoothing", href: "resources/chasing-demand.html", level: "other", type: "animation" },
    { id: "other-dea", href: "resources/efficient-or-not.html", level: "other", type: "animation" },
    { id: "other-complexity", href: "resources/easy-to-check.html", level: "other", type: "animation" },
    { id: "other-abm-epidemic", href: "resources/agents-and-outbreaks.html", level: "other", type: "simulation" },
    { id: "other-beer-game", href: "resources/beer-game.html", level: "other", type: "game" },
    { id: "other-mcda", href: "resources/weigh-the-criteria.html", level: "other", type: "simulation" },

    // Planned: open for contributors
    { id: "edu-portfolio", level: "nlp", type: "simulation" },
    { id: "edu-gradient", level: "nlp", type: "animation" },
    { id: "edu-queue", level: "other", type: "simulation" },
    { id: "edu-newsvendor", level: "other", type: "game" }
  ],

  research: [
    { id: "nanostores", href: "research/nanostores.html", paper: "https://doi.org/10.1007/978-3-032-19656-9_4", methods: ["cfl", "logit", "minlp", "linearization"] },
    { id: "markets", href: "research/markets.html", methods: ["cfl", "logit", "minlp", "fahp"] },
    { id: "wildfire", href: "research/wildfire.html", methods: ["twostage", "cvar", "matheuristic"] },
    { id: "pallets", href: "research/pallets.html", methods: ["ilp", "packing", "drl"] },
    { id: "ml-opt" }
  ],

  // Hidden proposals lab (lab/index.html), in display order. Ideas only: no href, nothing is built.
  lab: [
    { id: "lab-solver", type: "animation", href: "lab/inside-the-solver.html" },
    { id: "lab-cvar", type: "animation", href: "lab/beyond-var.html" },
    { id: "lab-linearization", type: "animation", href: "lab/linearizing-markets.html" },
    { id: "lab-ml-methods", type: "animation", href: "lab/learning-is-optimizing.html" },
    { id: "lab-svm", type: "animation", href: "lab/widest-street.html" },
    { id: "lab-ml-ai-cases", type: "simulation" }
  ],
  // true adds a "Lab" link to the home page's top menu; false keeps the lab reachable only by its door
  labInNav: false
};
