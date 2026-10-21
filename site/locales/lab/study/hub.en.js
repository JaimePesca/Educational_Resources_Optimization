/* Strings of lab/study/index.html, the hub of the study section. */
I18N.register("en", {
  "sth.title": "Study: Cooperation and Shared Spare Parts",
  "sth.lede": "This section follows a line of published work by Loe Schlicher and co-authors on game theory in operations, paper by paper, in chronological order.",
  "sth.how": "Each card opens a study page: the question, the model, the main results with their proof ideas, study questions and a small model to try in the browser. Filter by line or scroll the timeline sideways.",

  "sth.lines.aria": "The three lines of work",
  "sth.count.one": "1 paper",
  "sth.count.many": "{n} papers",

  "sth.tl.title": "Timeline",
  "sth.tl.aria": "Timeline of the papers, it scrolls sideways",
  "sth.filter.label": "Show",
  "sth.filter.all": "All lines",
  "sth.earlier": "← Earlier",
  "sth.later": "Later →",
  "sth.open": "Open the study page →",

  /* PROVISIONAL: written from the five finished notes only (2020 vaccination, 2021 3D printing, 2022 choice-based pricing,
     2023 streaming platforms, 2024 freight consolidation); rewrite when the notes of all eleven papers exist. */
  "sth.evolution.title": "How the line evolves",
  "sth.evolution.p1": "The line opens in 2020 with a resource pooling game: regions that share vaccine doses. The value of each group of regions comes from an optimization problem, a knapsack with S-shaped returns, and the question is whether the total return can be split so that no group prefers to leave, that is, whether the core is non-empty.",
  "sth.evolution.p2": "The same template returns in 2023 and 2024: a game is defined from an operational problem (the revenue of a streaming platform, trucks shared along a chain of transfer points), the core is proved non-empty for subclasses, counterexamples show when it is empty, and numerical experiments explore the rest. The 2022 paper (prices set together under a logit choice model) asks a neighbouring question: its core is never empty, but proportional rules and the Shapley value can fall outside it, while a market share exchange rule never does. Prices linked to duality keep coming back: one market price per dose, one price per unit of market share, the dual prices of a linear program. The 2022 and 2023 papers cite the 2020 paper.",
  "sth.evolution.p3": "The 2021 paper on 3D printers in disaster response has no players or coalitions: it is a two-stage stochastic knapsack for a single decision maker, which, like the vaccine game, has a knapsack structure. The security and protection games (2021 to 2025) and the parcel locker game (2026) will be added to this overview when their study pages are ready.",

  "sth.found.title": "Foundations",
  "sth.found.intro": "The basic ideas used across the line, in four pages of the lab:",
  "sth.found.1.t": "Game Theory 1: Read the Table",
  "sth.found.1.d": "Payoff tables, dominance and the Nash equilibrium.",
  "sth.found.2.t": "Game Theory 2: Be Unpredictable",
  "sth.found.2.d": "Mixed strategies and minimax: zero-sum games solved as linear programs, the language of security games.",
  "sth.found.3.t": "Game Theory 3: Move by Move",
  "sth.found.3.d": "Sequential games and backward induction: leaders, followers and subgame perfect equilibria, as in Stackelberg games.",
  "sth.found.4.t": "Game Theory 4: Share the Savings",
  "sth.found.4.d": "Cooperative games: the core as a linear program, the Shapley value and the nucleolus.",

  "sth.notyet.title": "Not yet in the timeline",
  "sth.notyet.p": "The earlier papers on resource and spare parts pooling (2017 to 2020) are not included yet. The papers of the timeline cite these earlier articles:",
  "sth.notyet.1": "A note on maximal covering location games. <i>Operations Research Letters</i>, 2017.",
  "sth.notyet.2": "Probabilistic resource pooling games. <i>Naval Research Logistics</i>, 2017.",
  "sth.notyet.3": "Pooling of critical, low-utilization resources with unavailability. <i>OR Spectrum</i>, 2018.",
  "sth.notyet.4": "Core nonemptiness of stratified pooling games: A structured Markov decision process approach. <i>Mathematics of Operations Research</i>, 2020."
}, "lab/study/hub");
