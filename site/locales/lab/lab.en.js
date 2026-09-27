/* Strings for lab/index.html, the hidden proposals lab (English, the reference). Cards come from CATALOG.lab. */
I18N.register("en", {
  "lab.title": "Proposals Lab",
  "lab.eyebrow": "Lab · Ideas not built yet",
  "lab.lede": "Ideas for new resources, collected here before any of them is built. Each card says what the resource would show and which format it would take. None of them is developed yet.",
  "lab.idea": "Idea",
  "lab.eqHead": "The equations",
  "lab.stepsHead": "Step by step",
  "lab.listLabel": "Proposals",

  "lab.lab-solver.title": "Inside the Solver",
  "lab.lab-solver.desc": "The animation would follow a MILP solver from presolve and the LP relaxation through the branch-and-bound tree, with cuts tightening the bound and heuristics finding new incumbents along the way. Two curves, the incumbent and the best bound, close in on each other while the gap falls to 0, as in a Gurobi log.",

  "lab.lab-cvar.title": "Beyond VaR: CVaR",
  "lab.lab-cvar.desc": "Starting from a loss distribution, the animation would mark VaR as a quantile and CVaR as the average of the tail beyond it. It would then show how the Rockafellar and Uryasev (2000) formulation turns CVaR into a linear program over scenarios, and compare a minimum variance portfolio with a minimum CVaR portfolio.",

  "lab.lab-linearization.title": "Linearizing the Street Markets Model",
  "lab.lab-linearization.desc": "Constraint (14) is the only nonlinear piece of the street markets model: the logit probability of buying at a park has the opening decisions in both the numerator and the denominator. Adapting the method of Haase and Müller (2014), the paper replaces it with the linear constraints (24) to (26), built on the ratio (23). The animation would follow one demand cell as parks open, show the straight lines that pin the logit split, and end on the paper's weekly schedule.",
  "lab.lab-linearization.step1": "In constraint (14) the chance that a customer buys at a park is a fraction whose numerator and denominator both depend on which parks open that day, so the model is nonlinear.",
  "lab.lab-linearization.step2": "The logit rule keeps one thing fixed: for any open park, its share divided by the competitors' share equals a number φ that (23) computes before solving.",
  "lab.lab-linearization.step3": "The paper adds the competitors' share ȳ as a new variable and replaces the fraction with linear limits: all shares add up to at most 1 (24), a park gets at most φ times ȳ (26), and a closed park gets nothing while an open one gets at most its share when alone (25).",
  "lab.lab-linearization.step4": "When every open park counts the same in the objective, maximizing captured demand in a cell and day with demand pushes the shares up until (24) and every (26) of an open park hold tight. Those limits pin the logit split: each open park gets φ times ȳ, with ȳ = 1/(1 + the sum of φ over the open parks). (25) only switches closed parks off: an open park out of reach of the cell has φ = 0 and gets nothing anyway, and for an open park in reach (25) is tight only when it is the only open one in reach of the cell, the one case where the three lines meet at a single point. So the linear model scores each schedule exactly as (14) does, and both models have the same optimal schedules and the same optimal value; when several schedules tie, a solver may return any one of them.",
  "lab.lab-linearization.step5": "This needs an outside option in reach of every cell, which the 70th seller (others) provides. It also needs continuous shares: the paper prints (22) and (27) as binary, and with binary values (25) would force every park's share y to 0 because φ/(1 + φ) is below 1, so the shares are read here as values between 0 and 1, a reading still to be confirmed. Step 4 also assumes that the open parks of a cell and day weigh the same, while (13) weights each park by its fuzzy AHP weight. With those weights the linear model can move the share of a lower weight park to a higher weight one, so it scores every schedule at least as high as (14): an upper bound, equal to (14) in a cell and day only when each open park's weight is at least the average weight of the open parks, weighted by φ, times their combined logit share. That condition can fail, so the match is not exact in general.",
  "lab.lab-linearization.eq1.cap": "Nonlinear: the logit share (14)",
  "lab.lab-linearization.eq1.tex": "\\begin{aligned}& y_{ijt}=\\frac{e^{V_{ij}}\\, a_{ij}\\, x_{it}}{\\sum_{s\\in I} e^{V_{sj}}\\, a_{sj}\\, x_{st}+\\sum_{s\\in S\\setminus I} e^{V_{sj}}\\, a_{sj}} && (14)\\\\[2pt]& \\quad \\forall\\, i,\\ j,\\ t\\end{aligned}",
  "lab.lab-linearization.eq1.formula": "y_ijt = e^V_ij · a_ij · x_it / (Σ_{s∈I} e^V_sj · a_sj · x_st + Σ_{s∈S∖I} e^V_sj · a_sj)   ∀ i, j, t   (14)",
  "lab.lab-linearization.eq2.cap": "Linear replacement: (23) to (26)",
  "lab.lab-linearization.eq2.tex": "\\begin{aligned}& \\varphi_{ij}=\\frac{e^{V_{ij}}\\, a_{ij}}{\\sum_{s\\in S\\setminus I} e^{V_{sj}}\\, a_{sj}} && \\forall\\, i,\\ j && (23)\\\\[4pt]& \\bar y_{jt}+\\sum_{i\\in I} y_{ijt}\\le 1 && \\forall\\, j,\\ t && (24)\\\\& y_{ijt}\\le \\frac{\\varphi_{ij}}{1+\\varphi_{ij}}\\, x_{it} && \\forall\\, i,\\ j,\\ t && (25)\\\\& y_{ijt}\\le \\varphi_{ij}\\, \\bar y_{jt} && \\forall\\, i,\\ j,\\ t && (26)\\end{aligned}",
  "lab.lab-linearization.eq2.formula": "φ_ij = e^V_ij · a_ij / Σ_{s∈S∖I} e^V_sj · a_sj   ∀ i, j   (23)\nȳ_jt + Σ_{i∈I} y_ijt ≤ 1   ∀ j, t   (24)\ny_ijt ≤ φ_ij / (1 + φ_ij) · x_it   ∀ i, j, t   (25)\ny_ijt ≤ φ_ij · ȳ_jt   ∀ i, j, t   (26)",
  "lab.lab-linearization.eqNote": "(14) is written as on the research page, and (23) uses the same competitors S∖I with a_{sj}. The manuscript prints a_{ij} in both denominator sums of (14), J∖I without a_{sj} in (23), and a lower case v in those sums and in (23); its text on p. 16 names the parameter φ_{jt}.",

  "lab.lab-ml-methods.title": "Learning Is Optimizing",
  "lab.lab-ml-methods.desc": "Linear regression, logistic regression and small neural networks all learn by minimizing a loss, so each one is an optimization problem. The animation would move the fitted line or the decision boundary step by step while the loss curve goes down beside it.",

  "lab.lab-svm.title": "The Widest Street",
  "lab.lab-svm.desc": "A Support Vector Machine looks for the widest street that separates two classes, which is a quadratic program of maximum margin. The animation would highlight the support vectors that hold the street in place and then switch to the soft margin, where the parameter C trades classification errors for a wider margin.",

  "lab.lab-ml-ai-cases.title": "ML + AI in Optimization",
  "lab.lab-ml-ai-cases.desc": "Four cases where learning helps optimization: learning to branch, predict then optimize, reinforcement learning for vehicle routing, and language agents that formulate optimization models from a text description. Each case would come with one small interactive example that runs in the browser."
}, "lab/lab");
