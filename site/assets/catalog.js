/*
 * Site catalog: the single place that says which projects, levels and resources exist.
 * All visible text lives in the locale files under these keys:
 *   project.<id>.title / .summary / .place / .facts (facts separated by |)
 *   level.<id>.title / .summary / .topics (topics separated by |)
 *   resource.<id>.title / .summary       type.<type>       method.<id>
 *
 * The learning levels are independent of the research projects. A resource always has a level and a type;
 * `project` is optional and only set when the resource applies one of the research cases.
 * `author` is optional and credits whoever contributed the resource.
 * A resource without `href` is planned: it shows up as an open idea that anyone can build.
 *
 * Adding a resource: put the page in resources/ (start from resources/_template.html), add or complete
 * its entry below with `href`, and add its keys to locales/en.js. Other languages fall back to English
 * until someone translates them.
 */
window.CATALOG = {
  projects: [
    { id: "nanostores", methods: ["cfl", "logit", "minlp", "linearization"] },
    { id: "markets", methods: ["cfl", "logit", "minlp", "fahp"] },
    { id: "wildfire", methods: ["twostage", "cvar", "matheuristic"] },
    { id: "pallets", methods: ["ilp", "packing", "drl"] }
  ],
  levels: [
    { id: "lp", n: 1 },
    { id: "ip", n: 2 },
    { id: "milp", n: 3 },
    { id: "nlp", n: 4 },
    { id: "other", n: 5 }
  ],
  resources: [
    // Published
    { id: "feasible-region", href: "resources/feasible-region.html", level: "lp", project: "wildfire", type: "simulation" },
    { id: "critical-load", href: "resources/critical-load.html", level: "ip", project: "wildfire", type: "game" },
    { id: "patrol-route", href: "resources/patrol-route.html", level: "other", project: "wildfire", type: "animation" },

    // Planned: built on the research cases, open to contributors
    { id: "nano-assortment", level: "lp", project: "nanostores", type: "simulation" },
    { id: "nano-open", level: "ip", project: "nanostores", type: "game" },
    { id: "nano-logit", level: "nlp", project: "nanostores", type: "simulation" },

    { id: "market-week", level: "ip", project: "markets", type: "game" },
    { id: "market-linearize", level: "milp", project: "markets", type: "animation" },
    { id: "market-ahp", level: "other", project: "markets", type: "simulation" },

    { id: "fire-budget", level: "milp", project: "wildfire", type: "game" },
    { id: "fire-cycle", level: "nlp", project: "wildfire", type: "simulation" },
    { id: "fire-risk", level: "other", project: "wildfire", type: "simulation" },

    { id: "pallet-payload", level: "lp", project: "pallets", type: "simulation" },
    { id: "pallet-charter", level: "ip", project: "pallets", type: "game" },
    { id: "pallet-conveyor", level: "other", project: "pallets", type: "game" }
  ]
};
