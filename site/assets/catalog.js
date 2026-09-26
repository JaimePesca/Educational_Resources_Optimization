/*
 * Site catalog: the single place that says which projects, levels and resources exist.
 * All visible text lives in the locale files under these keys:
 *   project.<id>.title / .summary        level.<id>.title / .summary / .topics (comma list)
 *   resource.<id>.title / .summary       type.<type>
 *   method.<id>                          (tags shown on research projects)
 *
 * Adding a resource: put the page in resources/, add one entry below, add its keys to every locale.
 */
window.CATALOG = {
  projects: [
    { id: "nanostores", methods: ["cflp", "milp"] },
    { id: "markets", methods: ["location"] },
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
    { id: "feasible-region", href: "resources/feasible-region.html", level: "lp", project: "wildfire", type: "simulation" },
    { id: "critical-load", href: "resources/critical-load.html", level: "ip", project: "wildfire", type: "game" },
    { id: "patrol-route", href: "resources/patrol-route.html", level: "other", project: "wildfire", type: "animation" }
  ]
};
