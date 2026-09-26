# Research cases

Short briefs of the four applied cases, written for people who want to build teaching resources on them. The full manuscripts are in the repository root. Use small illustrative data in resources, and do not publish results that are not yet in print.

## 1. CFLP for nanostores

**Manuscript:** *A Multi-product Competitive Facility Location Model for Food Purchase: Does the Store Type Matter?* (ICPR 2025, Springer LNPE). File: `A Multi-product Competitive Facility Location.pdf`.

- **Question:** where to open a new network of nanostores (small family-run food shops) and which fresh products each one sells, to reach households in underserved areas.
- **Case:** Chía and Cajicá, Sabana Centro region, Colombia. Household survey of 537 households (2020), 50 candidate sites, 188 existing competitors (nanostores, fruit shops, butchers, convenience stores, hard discounters, supermarkets), 3 product categories (fruits, vegetables, tubers).
- **Model:** competitive facility location with multinomial logit demand capture. Utility depends on distance and price, with coefficients by retailer type and product. Binary site and assortment decisions, a minimum distance between new stores and a minimum captured demand per store. Objective: weekly profit. The MINLP is linearized exactly (Haase and Müller 2014) into a MILP.

| Planned resource | Level | Type | Idea |
|---|---|---|---|
| Stocking the Shelf | 1 LP | Simulation | Sites fixed; choose kg of each product under shelf and budget limits; read shadow prices. |
| Open Your Nanostores | 2 IP | Game | Pick up to K sites with a minimum spacing; compare captured demand and profit with the optimum. |
| Where Shoppers Go | 4 NLP | Simulation | Logit sliders for price and distance weights; households change store type on a map. |

## 2. Locating street markets

**Manuscript:** *Locating street markets: analysis from qualitative and quantitative factors using a discrete choice model, mixed integer nonlinear programming and fuzzy AHP.* File: `Manuscript_IJIEC_Locating_Street_Markets.pdf`. Code and data: [JaimePesca/Locating-street-markets-Using-a-discrete-choice-model-MINLP-and-fuzzy-AHP](https://github.com/JaimePesca/Locating-street-markets-Using-a-discrete-choice-model-MINLP-and-fuzzy-AHP).

- **Question:** which parks should host Bogotá's subsidized farmers' markets (mercados campesinos), and on which days of the week, to capture the most fresh-food demand.
- **Case:** Bosa district, Bogotá. 25 candidate parks, 271 demand zones of 300 × 300 m, 44 large competing retailers plus an aggregated "others" option, walking-distance buffer of 750 m in the base case.
- **Model:** MINLP with multinomial logit capture, linearized with the Haase and Müller reformulation. Binary decision: open park i on day t. Weekly rules: a fixed number of market days, no site on three consecutive days, daily caps for weekdays and weekends. Captured demand is weighted by a fuzzy AHP suitability score built from 10 urban planning criteria.

| Planned resource | Level | Type | Idea |
|---|---|---|---|
| Market Week | 2 IP | Game | Place 10 market days on parks and weekdays under the scheduling rules; compare with the best schedule. |
| Straightening the Logit | 3 MILP | Animation | Step through the linearization on 3 sites and 4 demand nodes and show both models agree. |
| Rank the Parks | 5 Other | Simulation | Fuzzy AHP workbench: pairwise judgments, consistency ratio, fuzzy weights, park ranking. |

## 3. Wildfire suppression

**Manuscript:** *The Cycle-Constrained Aerial Suppression Base and Water Point Location Problem: Joint Siting under Uncertainty with an Application to Cundinamarca, Colombia.* File: `main.pdf`.

- **Question:** under one budget, which aerial bases to open, how many helicopters to station and which water points to enable, so that fewer fires escape across uncertain fire days.
- **Case:** Cundinamarca, Colombia, around the purchase of Sikorsky S-70 Firehawk helicopters. NASA FIRMS VIIRS detections for 2024 clustered into 2,425 fire events; ESA WorldCover, SRTM, NASA POWER and WorldPop layers; 120 candidate bases; 5,449 candidate water points; 200 fire-day scenarios.
- **Model:** two-stage stochastic MILP with a mean-CVaR objective on exposed population. First stage: bases, aircraft, water points. Second stage: dispatch and refill assignment per scenario. A fire is contained only if the water delivered by refill cycles meets a requirement that grows exponentially with arrival time. The bilinear dispatch × refill term has an exact McCormick linearization. Solved with a fix-and-optimize LNS matheuristic and validated with SAA.

| Resource | Level | Type | Status |
|---|---|---|---|
| Feasible Region | 1 LP | Simulation | Published (generic wildfire scenario) |
| Critical Load | 2 IP | Game | Published (generic wildfire scenario) |
| Patrol Route | 5 Other | Animation | Published (generic wildfire scenario) |
| One Budget, Three Decisions | 3 MILP | Game | Planned: buy bases, aircraft and water points; show joint versus sequential siting. |
| Refill Cycle | 4 NLP | Simulation | Planned: base-to-fire-to-water loop; stepwise water delivered against an exponential requirement. |
| Bad Days Count | 5 Other | Simulation | Planned: slide λ from expected loss to CVaR across pre-solved fire days. |

## 4. Optimizing pallet configuration

**Manuscript:** *A Two-Stage Decision Support Model for Cut Flower Palletisation in Full Charter Air Freight: Integer Programming for Allocation and Online Bin Packing for Placement.* File: `manuscript_integrado_2026-09-22.pdf`.

- **Question:** which flower boxes go on which pallet position of a full-charter cargo plane, and whether workers can physically stack them as boxes arrive on a conveyor.
- **Case:** Bogotá (El Dorado) to Miami, Airbus A330-200F with 32 pallet positions, peak-season manifest of 8,500 boxes of 35 commercial types grouped into 45 classes, 65,000 kg payload and a 500 kg lateral balance limit.
- **Model:** Stage 1 is an integer program that assigns boxes (or box classes) to positions, maximizing weight plus volume with a penalty for boxes left behind, under volume, weight, payload and balance constraints. Stage 2 is online 3D bin packing with a lookahead window (Bottom-Left, BSSF, BAF, BLSF rules and a DQN agent). Measured fill factors from Stage 2 feed back into Stage 1.

| Planned resource | Level | Type | Idea |
|---|---|---|---|
| Payload Prices | 1 LP | Simulation | LP relaxation of the allocation; move payload and balance limits; find the binding limit and its shadow price. |
| Fill the Charter | 2 IP | Game | Assign box classes to positions under volume and weight; compare with the integer optimum. |
| Conveyor Stacking | 5 Other | Game | 2D online stacking with a short lookahead; race placement rules and count boxes left behind. |
