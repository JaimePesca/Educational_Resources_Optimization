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

  "sth.evolution.title": "How the line evolves",
  "sth.evolution.p1": "<b>Three lines of work.</b> The eleven papers, from 2020 to 2026, fall into the three lines of work shown above. The timeline opens with a cooperative game in which <a href='2020-vaccination.html' data-keep-lang>health agencies pool vaccine doses</a> (2020). The other two lines start in 2021: a Stackelberg game in which a government <a href='2021-production-protection.html' data-keep-lang>defends crop production</a> against an attacker, and a two-stage stochastic program that decides whether a relief team should <a href='2021-3d-printing.html' data-keep-lang>pack 3D printers for a disaster</a>. That paper is the only one with a single decision maker and no game; it is solved through a deterministic equivalent built on an upper bound on the number of printers and, like the vaccine game, has a knapsack structure. After 2021 the cooperative and the security games grow side by side: one paper in 2022, three dated December 2023, one in 2024, two in 2025 and one in 2026.",
  "sth.evolution.p2": "<b>Cooperative games: the core and allocation rules.</b> Each cooperative paper builds a game from an operational problem and studies its core: can the total value be split so that no group prefers to leave? The problem behind the game changes: a knapsack with S-shaped returns for vaccines, pricing under a logit choice model for <a href='2022-choice-based-pricing.html' data-keep-lang>mobility operators that set prices together</a> (2022), a revenue-maximizing subscription fee for <a href='2023-streaming-platforms.html' data-keep-lang>streaming platforms</a> (2023), a mixed integer linear program for <a href='2024-freight-consolidation.html' data-keep-lang>carriers that share truck capacity</a> (2024) and a locker location integer program for <a href='2026-parcel-lockers.html' data-keep-lang>carriers that open parcel lockers together</a> (2026). The 2020 template returns in 2023, 2024 and 2026: sufficient conditions for subclasses, counterexamples with an empty core, then a numerical study of the other cases. Allocation rules take several forms: one market price per dose (2020); proportional rules and the Shapley value, which can leave the core, against a market share exchange rule that never does (2022); and proportional, Shapley and scaled dual rules compared by how far they violate stability (2026). Duality recurs: duality for nonlinear problems proves a market price stable (2020), a Lagrangian bound certifies the joint prices (2022), and the dual of a linear program gives core allocations, in 2024 when there are no fixed transfer costs and in 2026 whenever the locker problem has no integrality gap, as on tree networks.",
  "sth.evolution.p3": "<b>Security games: leader, follower and zero-sum.</b> The 2021 crop production paper sets up the leader-follower structure of this line: the defender commits first, the attacker observes and answers greedily, and the defender's bilevel max-min problem is solved by linear-time algorithms; an optimal plan equalizes the loss per unit of attack over the highest-yield regions. The <a href='2023-rapid-response-teams.html' data-keep-lang>rapid response team game</a> (2023) takes this structure to a line: a terrorist attacks where the damage is largest, and a placement that equalizes the worst damage on every stretch is optimal. Its <a href='2025-protection-location.html' data-keep-lang>2025 follow-up</a> keeps this result when the damage rate changes over time, even with jumps. <a href='2023-pickpocketing.html' data-keep-lang>Fighting pickpocketing</a> (2023) replaces an attacker who best responds by a thief whose choice follows a logit model, the choice model of the 2022 pricing paper, and the budget allocations come in closed form. <a href='2025-bodyguards.html' data-keep-lang>Scheduling bodyguards</a> (2025) turns to a simultaneous zero-sum game: a small linear program solves the allocation of bodyguards to targets, and an LP bound and a restricted game bracket the value of a scheduling version.",
  "sth.evolution.p4": "<b>Applications and numerical work.</b> The applications move from health care and crop production through disaster relief, micromobility, pickpocketing in Paris, counter-terrorism on a boulevard and streaming platforms to freight transport, the protection of people and last-mile parcel delivery. The numerical work ranges from exact worked examples (crop production and both rapid response team papers) and a ten-region influenza case (2020) to experiments on random instances: 10,000 per number of players (2022), 1,000 for pickpocketing (2023), one per combination of a full factorial design for freight consolidation (2024), 50,000 to test a conjecture on scheduling bodyguards (2025) and 23,520 for parcel lockers (2026). The bodyguard paper adds a case study for the DKDB, the Dutch royal and diplomatic protection service.",
  "sth.evolution.p5": "<b>Co-authors and citations.</b> Loe Schlicher co-authors all eleven papers, with changing partners. Marieke Musegaas appears on three (vaccination, crop production, streaming), Virginie Lurkin on both logit papers (2022, 2023), Lotte van Aken and Marco Slikker on both rapid response team papers (with Geert-Jan van Houtum in 2023), and Fabio Mercurio, Sonja U.K. Rohmer and Tom Van Woensel on both carrier papers (2024, 2026); Lotty E. Westerink-Duijzer, Denise D. Tönissen, Herman Blok, Bas Dietzenbacher, Kyle Y. Lin and Moshe Kress appear once. Citations follow the lines. The 2022 pricing paper and the 2023 streaming paper cite the vaccination paper, and the parcel locker paper cites it for one argument; the pickpocketing, rapid response team and bodyguard papers cite the crop production paper, the bodyguard paper also cites the pickpocketing paper, and the 2025 paper on time-dependent damage extends the 2023 rapid response team paper. The 3D printing and freight consolidation papers cite no earlier paper by Loe Schlicher, while the vaccination, pricing, streaming and parcel locker papers cite one or more of the earlier pooling papers listed below.",

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
