# Lab notes (internal, not published)

## Street markets: linearizing the logit choice constraint

**Source.** `materials/manuscripts/street-markets-location.pdf`, "Locating street markets: analysis from qualitative and quantitative factors using a discrete choice model, mixed integer nonlinear programming and fuzzy AHP" (Pesca, Mejía, Gutiérrez-Franco). Page numbers below are PDF page numbers (28 pages; the manuscript prints none). The model is Section 5, pages 15 to 17.

**Compared with.** `site/research/markets.html` (formulation block, equations (13) to (21)) and `site/locales/research/markets.en.js` (keys `r.markets.model.*`, `r.markets.var.*`). The site already writes $a_{sj}$ in the denominator of (14), omits (22) and says, correctly, that the logit constraint is rewritten linearly "with the method of Haase and Müller (2014) and solved with Gurobi".

**Tags used below.**
- **[paper]** stated in the manuscript.
- **[repo]** read in the authors' public repository cited in the Data Availability Statement (p. 22): `github.com/JaimePesca/Locating-street-markets-Using-a-discrete-choice-model-MINLP-and-fuzzy-AHP` (GAMS files `0.3WD_Bosa_*.gms`, notebook `Street_Markets_Gurobi_Bosa.ipynb`, data `Datos_Bosa.xlsx`). Cloned to the scratchpad only; nothing from it is in this repo.
- **[own]** my derivation or my computation. Not in the paper.

---

### 1. Source equations as printed [paper]

Discrete choice background, Section 3.1, pp. 6 to 7 (the Section 3.1 heading and (1) are on p. 6, (2) on p. 7):

- (1) $V_{ij}=\beta_{0i}+\sum_{k=1}^{K}\beta_k v_{ijk}$ (p. 6)
- (2) (p. 7) $PR_{ij}=\dfrac{e^{V_{ij}}}{\sum_{l\in C} e^{V_{lj}}}$ ("the classical multinomial logit formula (Train, 2009). In this research, the discrete choice model is incorporated into the MINLP.")

Optimization model, Section 5, p. 15 (13 to 19) and p. 16 (20 to 27), transcribed as printed, typos included:

- (13) $\max Z=\sum_{i\in I}\sum_{j\in J}\sum_{t\in T} w_i\, d_{jt}\, y_{ijt}$
- (14) $y_{ijt}=\dfrac{e^{V_{ij}}\,a_{ij}\,x_{it}}{\sum_{s\in I} e^{v_{sj}}\,a_{ij}\,x_{st}+\sum_{s\in S\setminus I} e^{v_{sj}}\,a_{ij}}\quad \forall i\in I;\ \forall j\in J;\ \forall t\in T$
- (15) $x_{it}+x_{it+1}+x_{it+2}\le 1\quad \forall i\in I;\ \forall t\in T<|T|-2$
- (16) $x_{i1}+x_{i2}+x_{i7}=0\quad \forall i\in I;\ \forall t\in T$
- (17) $\sum_{i\in I}\sum_{t\in T}x_{it}=M_d$
- (18) $\sum_{i\in I}x_{it}\le 0.3M_d\quad \forall t\in\{6,7\}$
- (19) $\sum_{i\in I}x_{it}\le 0.2M_d\quad \forall t\in\{1,2,3,4,5\}$
- (20) $\sum_{i\in I}\sum_{t\in Weekdays}x_{it}=0.4M_d$
- (21) $x_{it}\in\{0,1\}\quad \forall i\in I;\ \forall t\in T$
- (22) $y_{ijt}\in\{0,1\}\quad \forall i\in I;\ \forall j\in J;\ \forall t\in T$

Linearization, p. 16, quoted (the dash between the equation numbers is written "to" here):

> "The second constraint set involves non-linear aspects, we have adapted the linearization method proposed by Haase and Müller (2014). Consequently, this constraint set is reformulated into constraints (23) to (27), introducing the variable $\bar y_{jt}$. This variable accumulates the probability of customers selecting sellers during period $t$ and employs the auxiliary parameter $\varphi_{jt}$."

- (23) $\varphi_{ij}=\dfrac{e^{v_{ij}}\,a_{ij}}{\sum_{s\in J\setminus I} e^{v_{sj}}}\quad \forall i\in I;\ \forall j\in J$
- (24) $\bar y_{jt}+\sum_{i\in I} y_{ijt}\le 1\quad \forall j\in J;\ \forall t\in T$
- (25) $y_{ijt}-\dfrac{\varphi_{ij}}{1+\varphi_{ij}}\,x_{it}\le 0\quad \forall i\in I;\ \forall j\in J;\ \forall t\in T$
- (26) $y_{ijt}-\varphi_{ij}\,\bar y_{jt}\le 0\quad \forall i\in I;\ \forall j\in J;\ \forall t\in T$
- (27) $\bar y_{jt}\in\{0,1\}\quad \forall j\in J;\ \forall t\in T$

Explanation, p. 17, quoted:

> "Parameter (23) calculates the marginal probability that customers will buy fruits and vegetables from competitor sellers, which are essentially the alternatives where they have no other choice. Constraint (24) computes the accumulated probability ($\bar y_{jt}$) of customers opting for sellers other than the street markets. Constraints (25) and (26) establish connections between the decision variables and an auxiliary parameter known as $\varphi_{ij}$. Lastly, constraint (27) sets the range for the decision variable $\bar y_{jt}$."

Outside option, Section 4.1, p. 11, quoted:

> "To represent the option of shopping at other retailers, such as markets at other districts or nano stores, a 70th location was added, with at least one of these stores located within a 500-meter radius of each customer cluster and associated with higher prices to penalize the discrete choice model."

Solver, Section 6, p. 17: "the implementation and solution of the mathematical model, also in Python, using Gurobi".

### 2. Notation

| Symbol | Meaning | Kind | Values in the study |
|---|---|---|---|
| $I$ | candidate parks (street market sites), index $i$ | set | 25 [paper p. 11, repo `i /1*25/`] |
| $S$ | all sellers: candidates plus competitors, index $s$ | set (used in (14), not defined in the Sets list) | 70 [paper p. 11; repo `s /1*70/`] |
| $S\setminus I$ | competitors: 44 large retailers plus the aggregated "others" seller (the 70th location) | set | 45 [repo `o /26*70/`] |
| $J$ | customer nodes (300 m grid cells), index $j$ | set | 271 [paper p. 10] |
| $T$ | days, Monday (1) to Sunday (7), index $t$ | set | 7 |
| $w_i$ | fuzzy AHP suitability weight of park $i$ | parameter | 0.023 to 0.058 [repo `W(i)`] |
| $d_{jt}$ | fruit and vegetable demand of cell $j$ on day $t$ (kg) | parameter | about 840 kg per cell per day on average [paper p. 10] |
| $V_{ij}$, $v_{sj}$ | observed logit utility of seller for cell $j$ (the paper mixes upper and lower case) | parameter | [repo] $V_{sj}=-0.5\,\text{dist}^{norm}_{sj}-2.0\,\text{price}_s$ |
| $a_{ij}$ | 1 if seller is within the walking buffer of cell $j$ | binary parameter | buffer 750 m in the base case [paper p. 17] |
| $M_d$ | number of market days in the week | parameter | 10 in the base case |
| $x_{it}$ | 1 if park $i$ hosts a market on day $t$ | binary decision | |
| $y_{ijt}$ | probability that cell $j$ buys at market $i$ on day $t$ | decision (continuous in practice, see section 4, A4 and 9.1) | |
| $\bar y_{jt}$ | total probability that cell $j$ buys from a competitor on day $t$ (the outside option share) | auxiliary decision (continuous in practice) | |
| $\varphi_{ij}$ | odds of park $i$ against the whole competitor set for cell $j$ | precomputed parameter (23) | 0.19 to 350.5, median 1.04 over the 204 reachable park/cell pairs [own, repo data] |

Shorthand used in my derivations [own]: $C_j=\sum_{s\in S\setminus I} e^{v_{sj}}a_{sj}$ (competitor attraction of cell $j$), $\alpha_{ij}=e^{V_{ij}}a_{ij}$ (attraction of park $i$), so $\varphi_{ij}=\alpha_{ij}/C_j$; for a fixed day, $O_{jt}=\{i: x_{it}=1,\ a_{ij}=1\}$ and $\Phi_{jt}=\sum_{i\in O_{jt}}\varphi_{ij}$.

### 3. Which equations are nonlinear, and why

**(14) is the only nonlinear constraint of the decision model (13) to (22).** [own reading, consistent with the paper's "the second constraint set involves non-linear aspects", p. 16]

- $y_{ijt}$ is set equal to a **ratio of two affine functions of the binary decisions**: the numerator has $x_{it}$ and the denominator has $\sum_{s\in I} e^{v_{sj}}a_{sj}x_{st}$, the attraction of every park open on the same day. Opening a second park near cell $j$ lowers the share of the first one (cannibalization), so each $y_{ijt}$ depends nonlinearly on all the $x_{\cdot t}$.
- Clearing the denominator gives $y_{ijt}\,(C_j+\sum_{s\in I}\alpha_{sj}x_{st})=\alpha_{ij}x_{it}$, which contains **bilinear products** $y_{ijt}\,x_{st}$ (continuous times binary). As an equality this is a nonconvex constraint, hence the MINLP.
- Equivalently, substituting (14) into (13) gives an objective that is a **sum of ratios** in $x$, which is neither concave nor convex.

Not nonlinear in the decisions:
- (13) is linear in $y$; (15) to (20) are linear in $x$; (21), (22), (27) are domain statements.
- (23) is a ratio, but of **parameters only**; it is computed before solving (repo: `PHI(i,j)` is a GAMS `Parameter`, and a pandas table in the notebook).
- (1), (2) (Section 3.1) are the generic utility and logit formulas; (14) is (2) specialized to the model. (3) to (12) (fuzzy sets and fuzzy AHP) are nonlinear computations but produce the constant weights $w_i$ offline.

### 4. What the paper actually does [paper, with the repo as confirmation]

The paper states that it "adapted the linearization method proposed by Haase and Müller (2014)" and replaced (14) by (23) to (27). It does not reproduce the cited method, does not prove equivalence and does not state assumptions. What the equations do:

1. Precompute, for every park and cell, the odds $\varphi_{ij}$ of the park against the competitor set (23).
2. Add one continuous variable per cell and day, $\bar y_{jt}$, the share that goes to competitors (24).
3. Replace the equality (14) by two linear upper bounds on $y_{ijt}$: one proportional to $\bar y_{jt}$ (26), one proportional to $x_{it}$ (25).
4. Keep the objective (13) unchanged. The model becomes a MILP.

The repo confirms this is what was solved: GAMS `R6` = (24) with `=L=`, `R7` = (25), `R8` = (26), `PHI` = (23), `Y` and `Yb` declared `Positive Variable` (continuous), `Solve FLQC using MIP Max Z`; the Gurobi notebook has the same constraints with `vtype=GRB.CONTINUOUS` for `y` and `yb`.

About the cited reference: the paper names Haase and Müller (2014), "A comparison of linear reformulations for multinomial logit choice probabilities in facility location models", EJOR 232(3). My recollection (not verified against that article here) is that it compares several linear MNL reformulations and that the structure used here, a no-purchase probability variable plus the constant ratio bound and the "alone" cap, is the one it attributes to Haase (2009). The notes below do not depend on that recollection.

### 5. The linear reformulation, cleaned up [paper; typo fixes confirmed in the repo]

$$\max Z=\sum_{i\in I}\sum_{j\in J}\sum_{t\in T} w_i\,d_{jt}\,y_{ijt}\qquad(13)$$

subject to (15) to (21) and

- (23) $\varphi_{ij}=\dfrac{e^{V_{ij}}\,a_{ij}}{\sum_{s\in S\setminus I} e^{v_{sj}}\,a_{sj}}$ (printed $J\setminus I$ without $a_{sj}$; repo: `sum(o, exp(V(o,j))*A(o,j))`)
- (24) $\bar y_{jt}+\sum_{i\in I} y_{ijt}\le 1$
- (25) $y_{ijt}\le \dfrac{\varphi_{ij}}{1+\varphi_{ij}}\,x_{it}$
- (26) $y_{ijt}\le \varphi_{ij}\,\bar y_{jt}$
- $y_{ijt}\ge 0,\ \bar y_{jt}\ge 0$ continuous (printed as binary in (22) and (27); see 9.1)

Reading of each piece [own]:
- $\varphi_{ij}/(1+\varphi_{ij})=\alpha_{ij}/(\alpha_{ij}+C_j)$ is the logit share park $i$ would get **if it were the only open park** in reach of cell $j$. It is the largest value $y_{ijt}$ can ever take, so (25) is the tightest valid "big M" link between $y$ and $x$: closed park, zero share; open park, at most its solo share.
- (26) encodes the logit ratio: in (14), for any open park, $y_{ijt}/\bar y_{jt}=\alpha_{ij}/C_j=\varphi_{ij}$ no matter which other parks are open (independence of irrelevant alternatives).
- (24) says the shares of parks and competitors add up to at most 1.

### 6. Why it is equivalent: the logic step by step [own derivation]

**Step 1. Rewrite (14) with the competitor share.** Define $\bar y_{jt}=C_j/(C_j+\sum_{s\in I}\alpha_{sj}x_{st})$. Then (14) is exactly: $y_{ijt}=\varphi_{ij}\,\bar y_{jt}\,x_{it}$ for all $i$, and $\bar y_{jt}+\sum_i y_{ijt}=1$. The fraction is gone but the product $\bar y_{jt}x_{it}$ remains.

**Step 2. Split the product into two linear bounds.** Replace $y=\varphi\,\bar y\,x$ by $y\le\varphi\bar y$ (26) and $y\le\frac{\varphi}{1+\varphi}x$ (25). Replace the sum equality by $\le$ (24). Every point of the original model satisfies these (because $\bar y\le 1/(1+\varphi_{ij})$ whenever park $i$ is open, so $\varphi\bar y\le\varphi/(1+\varphi)$), so the linear model is at least as permissive.

**Step 3. Let the maximization close the gap.** Fix a binary $x$. The linear model separates into one small LP per cell and day, in $(y_{\cdot jt},\bar y_{jt})$. Suppose the objective coefficient is the same for every park in that block, $c>0$ (true when the objective is plain captured demand, as in Haase type market share models and in the paper's "No Fuzzy AHP" runs). From (26) and (24):
$$\sum_{i\in O}y_{ijt}\le\min\big(\Phi_{jt}\,\bar y_{jt},\ 1-\bar y_{jt}\big)\le\frac{\Phi_{jt}}{1+\Phi_{jt}},$$
with equality only at $\bar y_{jt}=1/(1+\Phi_{jt})$ and every (26) tight, that is $y_{ijt}=\varphi_{ij}/(1+\Phi_{jt})=\alpha_{ij}/(C_j+\sum_{s\in O}\alpha_{sj})$. This is (14) exactly. Closed parks get $y=0$ from (25). (25) is slack at this point when two or more parks in reach of cell $j$ ($\varphi_{ij}>0$, that is $a_{ij}=1$) are open, and when park $i$ is alone the three lines (24), (25), (26) meet at the same point $(\bar y,y)=(\tfrac1{1+\varphi},\tfrac{\varphi}{1+\varphi})$.

**Step 4. Conclude.** For every binary $x$, the best value of the linear model equals the MINLP objective at $x$, and the optimal $y$ are the logit probabilities (in blocks with $d_{jt}>0$). Hence both models have the same optimal schedules and the same optimal value.

**Assumptions the argument needs.**
- A1. **An outside option in reach of every cell**: $C_j>0$ for all $j$, otherwise (23) divides by zero and there is no competitor share. The paper guarantees it with the 70th "others" seller within 500 m of every cluster (p. 11); [repo] its distance is at most 0.499 km and its price 3.0, so its attraction is small ($e^{V}\approx 0.0024$) but positive. [own] minimum $C_j$ over the 271 cells is 0.0024; no cell has $C_j=0$.
- A2. **Positive attraction weights**: $e^{V}>0$ always, and $a_{ij}\in\{0,1\}$ only switches a park off for a cell ($\varphi_{ij}=0$ gives $y_{ijt}=0$).
- A3. **Binary $x$**. With fractional $x$ (LP relaxation in branch and bound) (25) gives only a bound, not the logit share. That is fine for a relaxation.
- A4. **Continuous $y$, $\bar y$** in $[0,1]$. As printed, (22) and (27) make them binary, and then (25) forces $y_{ijt}=0$ because $\varphi/(1+\varphi)<1$: the model would capture nothing. The implementation uses continuous variables (section 4).
- A5. **A maximization with nonnegative coefficients on $y$ that are equal across parks for the same cell and day.** This is where the paper's weighted objective departs from the textbook case; see section 7.
- A6. **Multinomial logit (IIA) choice**: the constant ratio in (26) holds only for MNL.

### 7. Caveat: with the fuzzy AHP weights the linear model is a (tight) relaxation [own]

**7.1 Derivation.** In (13) the coefficient of $y_{ijt}$ is $c_i=w_i d_{jt}$, which varies with the park. For a fixed binary $x$, write $y_{ijt}=\varphi_{ij}\bar y_{jt}z_i$ with $z_i\in[0,1]$. The block LP value is
$$\max_{z\in[0,1]^{O}}\ \frac{\sum_{i\in O}c_i\varphi_{ij}z_i}{1+\sum_{i\in O}\varphi_{ij}z_i}=\max_{U\subseteq O}R(U),\qquad R(U)=\frac{\sum_{i\in U}c_i\varphi_{ij}}{1+\sum_{i\in U}\varphi_{ij}},$$
because a linear fractional function with a positive denominator reaches its maximum over a box at a vertex. Every $U$ is feasible in the linear model (it is the logit split if the customer only considered the parks in $U$), and $R(O)$ is the true logit value. So the linear model evaluates each schedule by the **best subset of the open parks**: it may "ignore" a low weight park for a cell on a day to hand its share to a higher weight park. It is exact for the block if and only if
$$w_i\ \ge\ \frac{\sum_{k\in O}w_k\varphi_{kj}}{1+\sum_{k\in O}\varphi_{kj}}\quad\text{for every open park } i\in O,$$
(KKT at $z=\mathbf 1$; the right side is the weighted average weight of the open parks times the street market share of that cell and day). A failure needs a street market share above $w_{\min}/w_{\max}\approx 0.023/0.058\approx 0.40$ in that cell and day, which only happens where almost no competitor is in reach.

**What is proven, and under which assumptions [own].** Assume A1 to A4 and A6 (section 6) and $w_i\ge 0$, $d_{jt}\ge 0$. Then:
- (i) For every binary schedule $x$ the linear model's value is at least the logit value of (14) at $x$ (section 6 step 2, and $R(O)\le\max_U R(U)$). So the optimum of the linear model is an upper bound on the optimum of the MINLP.
- (ii) In a cell day with $d_{jt}>0$ the two values are equal if and only if the condition above holds (the objective is linear fractional in $z$, so the KKT point $z=\mathbf 1$ is a global maximum exactly when every $c_i\ge R(O)$); then the logit split is an optimal $y$.
- (iii) With equal weights the condition always holds (it reads $w\ge w\,\Phi_{jt}/(1+\Phi_{jt})$), which gives back section 6.
- (iv) The condition can fail (7.2: one cell day with the authors' data), so under the weighted objective (13) the reformulation is **not exact in general**.
- Not proven: that the two models share their optimal schedules. With the authors' base data the published schedule is optimal for both (7.2, CBC), which is a computation on one instance, not a theorem.

**7.2 Numbers with the authors' data** (repo data, my recomputation in Python; MILPs solved with CBC through PuLP with zero gap; constraints as in the repo GAMS base file, see 9.5):

| Check | Value |
|---|---|
| Published base schedule (Table 4, p. 17), true logit captured demand | 68,861.0 kg |
| Same schedule, captured demand implied by the linear model's $y$ | **68,858.3 kg** = paper's 68,858 (Table 5 p. 19, Figure 6 p. 18) |
| Cell days with at least one open park in reach | 99 |
| Cell days where the exactness condition fails | 1: cell 170 on Sunday, parks 14 ($w=0.0385$) and 20 ($w=0.0336$), both $\varphi\approx 340$ (only "others" in reach) |
| Logit shares in that cell day | 0.499 and 0.500 |
| Linear model shares in that cell day | 0.997 and 0 |
| Weighted objective of the base schedule: linear model vs true logit | 2,619.191 vs 2,614.800 (overstated by 4.39, 0.17%) |
| Optimum of the paper's linear model (CBC) | 2,619.191, same six parks, days permuted among ties |
| Optimum of an exact MILP (7.3) | 2,614.7998 = true logit value of the published schedule, so **Table 4 is also optimal for the original MINLP** |
| Linear model without weights ("No Fuzzy AHP", A5 holds, exact) | 69,046.4 kg = Table 5's 69,046 |
| Buffer 1,000 m, weighted: linear = exact | 72,595.4 kg = Table 5's 72,595 (no gap) |
| Buffer 1,000 m, no weights | 75,449.6 kg = Table 5's 75,450 |
| Buffer 1,500 m, weighted: linear = exact | 81,719.0 kg; Table 5 reports 78,159 (not reproduced, see 9.6) |
| Buffer 1,500 m, no weights | 84,341.6 kg = Table 5's 84,342 |
| Buffer 2,000 m, weighted: linear = exact | 85,024.6 kg = Table 5's 85,025 (no gap) |
| Buffer 2,000 m, no weights | 93,085.4 kg = Table 5's 93,085 |

So 7 of the 8 captured demand figures of Table 5 are reproduced to the kilogram with the repo data. For 1,000, 1,500 and 2,000 m the linear model's optimum equals the exact optimum and its value equals the true logit value of its own schedule (no gap). A plausible reason (my reading): with larger buffers more competitors are in reach of every cell, so street market shares stay far below the 0.40 threshold of 7.1.

The captured kilograms in the paper therefore come from the linear model's $y$ (68,858), not from the logit formula applied to the chosen schedule (68,861). The difference is 3 kg and does not change any decision in the base case, but the reformulation is not exactly equivalent to (14) under the weighted objective (13).

**7.3 An exact linear variant (own suggestion, not in the paper).** Make (24) an equality and add
$$y_{ijt}\ \ge\ \varphi_{ij}\,(\bar y_{jt}-1+x_{it})\qquad\forall i,j,t.$$
If $x_{it}=1$ it gives $y_{ijt}\ge\varphi_{ij}\bar y_{jt}$, which with (26) forces $y_{ijt}=\varphi_{ij}\bar y_{jt}$; if $x_{it}=0$ it reads $y\ge\varphi(\bar y-1)\le 0$ and is inactive. With $\bar y_{jt}+\sum_i y_{ijt}=1$ this yields $\bar y_{jt}=1/(1+\Phi_{jt})$, the logit split, for any weights. This is the model labeled "exact MILP" in 7.2.

### 8. What an animation could show later (proposal only)

Standard format (`Anim.create`, 40 to 60 s, 5 chapters, one `.seg` scenario control, DOM counters). Accent red for the model's decisions (open parks, $y$), bright red for the new linear pieces, ink for the three constraint lines, silver gray for competitors.

1. **One cell, one Sunday** (0 to 10 s). Cell 212 of Bosa and the sellers within 750 m: park 20 and 5 competitors, dots sized by attraction $e^{V}$. Counter: $d_{j,7}=1{,}366.8$ kg.
2. **Logit splits the basket** (10 to 20 s). Park 20 opens; the basket splits: $y=0.323$, $\bar y=0.677$, and a ratio bar shows $y/\bar y=\varphi=0.477$ (441 kg to the market).
3. **A ratio of decisions** (20 to 30 s). A second park opens nearby (cell 190 has parks 19 and 20, $\varphi=0.479$ each): both shares shrink to 0.245 and $\bar y$ to 0.511; the fraction (14) pulses, $x$ in numerator and denominator.
4. **Three straight fences** (30 to 45 s). Switch to the $(\bar y, y)$ plane: ray $y=\varphi\bar y$ (26), cap $y=\frac{\varphi}{1+\varphi}x$ (25), diagonal $\bar y+y=1$ (24). The objective pushes the point to the corner, which is exactly the logit share; closing the park drops the cap to zero.
5. **Same schedule, linear solver** (45 to 55 s). Back to the week: 6 parks, 10 market days, 68,858 kg captured; final frame shows the fences meeting at the logit point next to the weekly schedule.

Scenario control: "Open parks in reach: 0 / 1 / 2" (changes chapters 2 to 4). A possible second view for experts (not the main control): the cell 170 corner case where the weighted objective lets the linear model move the whole share to the higher weight park.

Honesty labels for that animation: 68,858 kg, 69,046 kg, the 750 m buffer, the six parks and Table 4 days are [paper]; cell ids, distances, $\varphi$ values, utilities ($\beta_{\text{price}}=-2.0$, $\beta_{\text{dist}}=-0.5$ on min max normalized walking distance) are [repo]; choosing cells 212 and 190 and opening parks 19 and 20 on the same day (the base schedule never does) are illustrative.

### 9. Open questions for the owner

1. **(22) and (27) say binary**, but $y$ and $\bar y$ are probabilities and the code declares them continuous. With binary variables (25) would force every park share $y_{ijt}=0$ (because $\varphi/(1+\varphi)<1$); it says nothing about $\bar y$. Typo in the manuscript? The manuscript does not settle it: p. 15 defines $y_{ijt}$ as "the probability of customer $j$ of selecting street market $i$", but p. 16 says "Constraints (21) and (22) define the binary nature of the decision variables, indicating whether a market is opened and whether a customer selects a given market on a specific day", and p. 17 only says that (27) "sets the range" for $\bar y_{jt}$. So this stays open, and the lab card (`step5`) calls the continuous reading "a reading still to be confirmed", not a fact.
2. **(23) denominator** prints $\sum_{s\in J\setminus I}e^{v_{sj}}$; the code uses the competitors $S\setminus I$ with $a_{sj}$. **(14) denominator** prints $a_{ij}$ in both sums; $a_{sj}$ is meant (code and site). $S$ is used but not defined in the Sets list. The text on p. 16 calls the auxiliary parameter $\varphi_{jt}$, the equation defines $\varphi_{ij}$. Upper and lower case $V$/$v$ are mixed.
3. **Wording of (23) on p. 17**: $\varphi_{ij}$ is not a probability but an odds ratio (park $i$ against all competitors); $\bar y_{jt}$ is the competitors' share.
4. **Weighted objective and exactness** (section 7): should the paper state that the reformulation is exact for the unweighted objective and an upper bound with fuzzy AHP weights (0.17% in the base case, no change of decision), or adopt the exact variant 7.3? Until you confirm, the lab card (`lab.lab-linearization.step4`/`step5`) leaves out the 0.17% and the "no change of decision" claim (both [own], from CBC runs on the code version, see 9.5). Step 4 states the argument for equal weights only (then both models have the same set of optimal schedules and the same optimal value; with ties a solver may return a different schedule), and step 5 says that step 4 assumes equal weights and states what 7.1 proves for the fuzzy AHP weights, without numbers: the linear model can move a lower weight park's share to a higher weight park, so it scores every schedule at least as high as (14) (an upper bound), equal to (14) in a cell and day only when each open park's weight is at least the $\varphi$ weighted average weight of the open parks times their combined logit share; the condition can fail, so the match is not exact in general. Step 4 also says that it works in a cell and day with demand, that (25) switches closed parks off, that an open park out of reach has $\varphi=0$ and gets nothing, that for an open park in reach (25) is tight only when that park is the only open one in reach of the cell, and that every (26) of an open park is tight; step 5 also says that reading (22) and (27) as continuous is still to be confirmed (9.1). The manuscript itself says nothing about exactness or weights (p. 16 only cites Haase and Müller).
5. **Other constraints differ between paper and code** (not about linearization): (16) is printed "$=0$" but coded `X(i,1)+X(i,2)+X(i,7) =L= 1` (the site already notes the literal reading contradicts Table 4); (20) is printed "$=0.4M_d$", the text says "minimum" and the code uses `=G=`; (15) is coded for every $t$ in GAMS (so also $x_{i6}+x_{i7}\le 1$), while the paper restricts $t<|T|-2$. My CBC runs used the code version.
6. **Buffer scenarios**: with repo data and code, 7 of the 8 Table 5 figures are reproduced exactly; only "1,500 m with fuzzy AHP weights" is not (81,719 kg recomputed vs 78,159 kg printed, while the unweighted 1,500 m value 84,342 matches). Typo in Table 5, or a run with a different setting? The repo scenario files were edited after the runs (for example `P2_750.gms` uses a 2 km buffer), so I cannot tell.
7. Section 4.2 (pp. 12 to 15; the sentences are on p. 14) speaks of a 50 × 50 × 10 comparison and "a fuzzy vector of size 50", while the model and the repo use 25 candidates.
8. **Equations shown on the lab card** (`lab.lab-linearization.eq1.tex`, `eq2.tex`, inside "The equations"): (14) as on the research page ($a_{sj}$ in both denominator sums, $V$ upper case, quantifier $\forall\, i, j, t$ on its own line so it fits 400 px) and (23) to (26) in the cleaned form of section 5 ($S\setminus I$ with $a_{sj}$ in (23)); a note under them says the manuscript prints $a_{ij}$ in both denominator sums of (14) and $J\setminus I$ without $a_{sj}$ in (23) (9.2). The box comes after the numbered steps in the DOM, so phones and desktop read description, steps, equations in the same order.
