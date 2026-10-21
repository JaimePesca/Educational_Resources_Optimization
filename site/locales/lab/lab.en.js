/* Strings for lab/index.html, the hidden proposals lab (English, the reference). Cards come from CATALOG.lab. */
I18N.register("en", {
  "lab.title": "Proposals Lab",
  "lab.eyebrow": "Lab · Prototypes before the path",
  "lab.lede": "New resources, built and tested here before they join the learning path. Each card says what the page shows and which format it takes; open it to try the prototype. None of them is on the home page yet.",
  "lab.idea": "Idea",
  "lab.built": "Built",
  "lab.open": "Open",
  "lab.eqHead": "The equations",
  "lab.stepsHead": "Step by step",
  "lab.listLabel": "Proposals",

  "lab.lab-solver.title": "Inside the Solver",
  "lab.lab-solver.desc": "A small MILP, a coffee roaster in Manizales planning whole batches, is solved live: presolve, the LP relaxation, a Gomory cut that tightens the bound, a rounding heuristic that finds incumbents, and the branch-and-bound tree. The incumbent and the best bound close in on each other while the gap falls to 0, in a log modeled on the ones commercial solvers print.",

  "lab.lab-cvar.title": "Beyond VaR: CVaR",
  "lab.lab-cvar.desc": "From 200 simulated months of Colombian stocks, TES bonds and dollars, the animation marks VaR as a quantile and CVaR as the average of the tail beyond it. It then shows how the Rockafellar and Uryasev (2000) formulation turns CVaR into a linear program over scenarios, and compares the minimum variance portfolio with the minimum CVaR portfolio.",

  "lab.lab-linearization.title": "Linearizing the Street Markets Model",
  "lab.lab-linearization.desc": "Constraint (14) is the only nonlinear piece of the street markets model: the logit probability of buying at a park has the opening decisions in both the numerator and the denominator. Adapting the method of Haase and Müller (2014), the paper replaces it with the linear constraints (24) to (26), built on the ratio (23). The animation follows one demand cell as parks open, draws the straight lines that pin the logit split, and shows when the linear model is exact and when it is only an upper bound.",
  "lab.lab-linearization.step1": "In constraint (14) the chance that a customer buys at a park is a fraction whose numerator and denominator both depend on which parks open that day, so the model is nonlinear.",
  "lab.lab-linearization.step2": "The logit rule keeps one thing fixed: for any open park, its share divided by the competitors' share equals a number φ that (23) computes before solving.",
  "lab.lab-linearization.step3": "The paper adds the competitors' share ȳ as a new variable and replaces the fraction with linear limits: all shares add up to at most 1 (24), a park gets at most φ times ȳ (26), and a closed park gets nothing while an open one gets at most its share when alone (25).",
  "lab.lab-linearization.step4": "When every open park counts the same in the objective, the optimum pushes the shares up until (24) and (26) hold tight, and that reproduces the logit split: each open park gets φ times ȳ. (25) only switches closed parks off. So both models have the same optimal schedules.",
  "lab.lab-linearization.step5": "Two conditions: every cell needs an outside option (vendor 70, “others”) and the shares must be read as continuous between 0 and 1. With the unequal fuzzy AHP weights of (13), the linear model gives an upper bound on (14), not always the same value.",
  "lab.lab-linearization.eq1.cap": "Nonlinear: the logit share (14)",
  "lab.lab-linearization.eq1.tex": "\\begin{aligned}& y_{ijt}=\\frac{e^{V_{ij}}\\, a_{ij}\\, x_{it}}{\\sum_{s\\in I} e^{V_{sj}}\\, a_{sj}\\, x_{st}+\\sum_{s\\in S\\setminus I} e^{V_{sj}}\\, a_{sj}} && (14)\\\\[2pt]& \\quad \\forall\\, i,\\ j,\\ t\\end{aligned}",
  "lab.lab-linearization.eq1.formula": "y_ijt = e^V_ij · a_ij · x_it / (Σ_{s∈I} e^V_sj · a_sj · x_st + Σ_{s∈S∖I} e^V_sj · a_sj)   ∀ i, j, t   (14)",
  "lab.lab-linearization.eq2.cap": "Linear replacement: (23) to (26)",
  "lab.lab-linearization.eq2.tex": "\\begin{aligned}& \\varphi_{ij}=\\frac{e^{V_{ij}}\\, a_{ij}}{\\sum_{s\\in S\\setminus I} e^{V_{sj}}\\, a_{sj}} && \\forall\\, i,\\ j && (23)\\\\[4pt]& \\bar y_{jt}+\\sum_{i\\in I} y_{ijt}\\le 1 && \\forall\\, j,\\ t && (24)\\\\& y_{ijt}\\le \\frac{\\varphi_{ij}}{1+\\varphi_{ij}}\\, x_{it} && \\forall\\, i,\\ j,\\ t && (25)\\\\& y_{ijt}\\le \\varphi_{ij}\\, \\bar y_{jt} && \\forall\\, i,\\ j,\\ t && (26)\\end{aligned}",
  "lab.lab-linearization.eq2.formula": "φ_ij = e^V_ij · a_ij / Σ_{s∈S∖I} e^V_sj · a_sj   ∀ i, j   (23)\nȳ_jt + Σ_{i∈I} y_ijt ≤ 1   ∀ j, t   (24)\ny_ijt ≤ φ_ij / (1 + φ_ij) · x_it   ∀ i, j, t   (25)\ny_ijt ≤ φ_ij · ȳ_jt   ∀ i, j, t   (26)",
  "lab.lab-linearization.eqNote": "(14) is written as on the research page, and (23) uses the same competitors S∖I with a_{sj}. The manuscript prints a_{ij} in both denominator sums of (14), J∖I without a_{sj} in (23), and a lower case v in those sums and in (23); its text on p. 16 names the parameter φ_{jt}.",

  "lab.lab-ml-methods.title": "Learning Is Optimizing",
  "lab.lab-ml-methods.desc": "Linear regression, logistic regression and small neural networks all learn by minimizing a loss, so each one is an optimization problem. The animation trains all three live with gradient descent, moving the fitted line or the decision boundary step by step while the loss curve goes down beside it, and shows what happens when the step is too small or too large.",

  "lab.lab-svm.title": "The Widest Street",
  "lab.lab-svm.desc": "A Support Vector Machine looks for the widest street that separates two classes, which is a quadratic program of maximum margin. On 24 coffee lots sorted by altitude and bean density, the animation highlights the support vectors that hold the street in place, shows how one outlier breaks the hard margin, and switches to the soft margin, where the parameter C trades classification errors for a wider margin.",

  "lab.lab-ml-ai-cases.title": "ML + AI in Optimization",
  "lab.lab-ml-ai-cases.desc": "Four small cases where learning helps optimization, each one running for real in the browser: a branch and bound that learns where to branch, a demand forecast fitted for the decision it feeds, a delivery van that learns its route by trial and error and is compared with the shortest path, and an automatic checker that tests prewritten formulations like those a language agent might produce.",

  "lab.lab-svm-dual.title": "SVM, Level 2: The Dual Street",
  "lab.lab-svm-dual.desc": "The same 24 coffee lots as The Widest Street, now seen from the dual side. Each lot gets a Lagrange multiplier, and the animation solves the dual quadratic program two multipliers at a time (SMO) while the dual objective rises, the primal objective falls and the duality gap closes to 0. At the end only the support vectors keep a nonzero multiplier, and the street is rebuilt from them alone. The dual needs nothing but dot products between lots, which opens the door to level 3.",

  "lab.lab-svm-kernel.title": "SVM, Level 3: The Kernel Trick",
  "lab.lab-svm-kernel.desc": "A drying coffee lot is good when its moisture and temperature sit close to an ideal point, so no straight line separates good lots from bad ones. The animation lifts the lots into three dimensions, where a flat plane does separate them, and brings the plane back down as a circle. Then comes the trick: the dual only uses dot products, so a kernel computes them in the lifted space without ever building it, up to the Gaussian (RBF) kernel, whose width decides how tightly the boundary follows the data.",

  "lab.lab-fahp.title": "AHP, Fuzzy Sets and Fuzzy AHP",
  "lab.lab-fahp.desc": "A roaster in Medellín chooses among three coffee suppliers using four criteria. First, classic AHP: compare the criteria in pairs on Saaty's scale, get the weights from the principal eigenvector and let the consistency ratio warn you when your judgments contradict each other. Then fuzzy sets: turn words like \"moderately more important\" into triangular fuzzy numbers and operate with them. Finally both together: the judgments of three experts give fuzzy weights with Buckley's geometric mean, and the page shows when the uncertainty is large enough to change the ranking.",

  "lab.lab-gtb-table.title": "Game Theory 1: Read the Table",
  "lab.lab-gtb-table.desc": "The cement market of Price Wars becomes a payoff table: each plant chooses 30, 40 or 60 kt, and every cell computes both profits live with the same demand and cost. You cross out the outputs that never pay, round by round, until only (40, 40) is left, the Nash equilibrium, and then see that (30, 30) would give both plants more: a prisoner's dilemma hidden in the market. Next you load the classics (prisoner's dilemma, stag hunt, chicken, battle of the sexes) or a random game and read it through three lenses: dominance, best responses and the space of payoffs. Finally you measure what going alone costs, with fishers who share a lake and with Pigou's two roads, where the price of anarchy appears.",

  "lab.lab-gtb-mix.title": "Game Theory 2: Be Unpredictable",
  "lab.lab-gtb-mix.desc": "You play 30 rounds of heads or tails against a machine that reads your patterns and punishes them, and only the half and half mix guarantees you the value of the game against any opponent. A square of mixes then shows where the best responses of two players cross in battle of the sexes, stag hunt, chicken and matching pennies, and the indifference principle explains why each player's mix is set by the rival's payoffs; you test it on penalty kicks with the scoring rates reported by Palacios-Huerta (2003). Then you solve any zero-sum game from its security levels with a linear program whose dual is the rival's linear program, so the minimax theorem is strong duality. In odd or even you discover that the player who calls odd wins 1/12 per round on average, although the game looks fair.",

  "lab.lab-gtb-moves.title": "Game Theory 3: Move by Move",
  "lab.lab-gtb-moves.desc": "Many decisions are taken in turns, and a tree of moves is solved from the leaves back to the root, like a dynamic program. The animation does it for an incumbent facing a possible entrant, for the leader and follower of Price Wars (the leader again produces 60 kt against the follower's 30, now in a tree) and for the centipede, where flawless logic leaves both players with one sixteenth of what they could earn, and it marks the subgame perfect path and the threats that are not credible. Below you edit the payoffs, play the ultimatum against a population of responders and pit tit for tat, grim trigger and other strategies against each other in a repeated prisoner's dilemma with the continuation probability you choose.",

  "lab.lab-gtb-share.title": "Game Theory 4: Share the Savings",
  "lab.lab-gtb-share.desc": "Three firms share a distribution center and save 35 million COP a month: how should they split the bill so that no firm and no pair prefers to go alone? Each coalition has its own optimal cost, the core is a polygon of stable splits inside the triangle of imputations, and a linear program says whether it exists; when it does not, its dual gives the Bondareva-Shapley certificate and the subsidy that would save the alliance. The firms arrive in every order and the average of their marginal costs is the Shapley value, while a sequence of linear programs shrinks the complaints down to the nucleolus, and with a slider you see when both are stable and when Shapley falls outside the core. Finally you compare allocation rules (equal split, proportional, SCRB, Shapley, nucleolus) on classic games: gloves, an airport, the Talmud, a shared network and a common pool of spare parts.",

  "lab.lab-braess.title": "The Shortcut That Slows Everyone Down",
  "lab.lab-braess.desc": "A two-minute connector opens between the two corridors that lead downtown, every driver takes the route that suits them best, and with 4,000 cars per hour everyone arrives 18 minutes later. The animation shows that this Wardrop equilibrium is the minimum of a convex program, Beckmann's, which is not the total travel time the city cares about, and measures the gap between the two with the price of anarchy. A control sets the morning demand, so you see when the shortcut helps, when it hurts and when nobody takes it. Below you play planner: you open or close the connector, set tolls and let a linear program find the least-revenue toll that still leads drivers to the system optimum, next to marginal-cost tolls, while a time plus toll chip shows that tolls fix total travel time even when each driver's time plus toll gets worse.",

  "lab.lab-patrols.title": "The Rangers Move First",
  "lab.lab-patrols.desc": "Two to four ranger teams protect eight zones of an illustrative park from illegal loggers who watch the patrols before they cut. You set how often each zone is patrolled, the loggers go to the zone that pays them most and you see the hectares affected; a fixed patrol or an even spread does badly. The page then solves one linear program per zone the loggers could attack, and every feasible one returns the same coverage, the one that minimizes the loggers' best expected gain, which water filling confirms before a draw turns it into tomorrow's patrol. That coverage leaves the loggers indifferent among several zones, and the hectares only decide which one they are steered to when ties break in the rangers' favor, so a box with live numbers shows how much the tie-breaking rule matters.",

  "lab.lab-tolls.title": "Price the Road",
  "lab.lab-tolls.desc": "You run a concession with two tolls on an illustrative corridor from Bogotá toward Girardot and Ibagué, and the truck drivers always answer with their cheapest route, including a free road to the north. You move both tolls and see on a heat map how revenue falls off cliffs and has local optima where small moves get stuck. The page then solves this bilevel problem exactly: it splits it into 16 linear programs, one per route pattern, and in an \"Under the hood\" block turns it into a single MILP with KKT conditions and big M that branch and bound explores node by node, with the node count computed live. You compare your revenue with pricing each toll alone and with the optimum, which here sits where some truck drivers are exactly indifferent between routes."
}, "lab/lab");
