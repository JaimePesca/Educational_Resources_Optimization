# Research cases

Short briefs of the four applied cases. Each one has a page on the site (`site/research/<id>.html`) that walks through the real study. The full manuscripts are in [`manuscripts/`](manuscripts/).

## 1. CFLP for nanostores

**Manuscript:** *A Multi-product Competitive Facility Location Model for Food Purchase: Does the Store Type Matter?* (ICPR 2025, Springer LNPE). File: `manuscripts/nanostores-competitive-facility-location.pdf` (kept outside the repository).

- **Question:** where to open a new network of nanostores (small family-run food shops) and which fresh products each one sells, to reach households in underserved areas.
- **Case:** Chía and Cajicá, Sabana Centro region, Colombia. Household survey of 537 households (2020), 50 candidate sites, 188 existing competitors (nanostores, fruit shops, butchers, convenience stores, hard discounters, supermarkets), 3 product categories (fruits, vegetables, tubers).
- **Model:** competitive facility location with multinomial logit demand capture. Utility depends on distance and price, with coefficients by retailer type and product. Binary site and assortment decisions, a minimum distance between new stores and a minimum captured demand per store. Objective: weekly profit. The MINLP is linearized exactly (Haase and Müller 2014) into a MILP.


## 2. Locating street markets

**Manuscript:** *[street markets working paper, title withheld while under review].* File: `manuscripts/street-markets-location.pdf` (kept outside the repository). Code and data: the markets code repository (name withheld while under review).

- **Question:** which parks should host Bogotá's subsidized farmers' markets (mercados campesinos), and on which days of the week, to capture the most fresh-food demand.
- **Case:** Bosa district, Bogotá. 25 candidate parks, 271 demand zones of 300 × 300 m, 44 large competing retailers plus an aggregated "others" option, walking-distance buffer of 750 m in the base case.
- **Model:** MINLP with multinomial logit capture, linearized with the Haase and Müller reformulation. Binary decision: open park i on day t. Weekly rules: a fixed number of market days, no site on three consecutive days, daily caps for weekdays and weekends. Captured demand is weighted by a fuzzy AHP suitability score built from 10 urban planning criteria.


## 3. Wildfire suppression

**Manuscript:** *[wildfire working paper, title withheld while under review].* File: `manuscripts/wildfire-aerial-bases-water-points.pdf` (kept outside the repository).

- **Question:** under one budget, which aerial bases to open, how many helicopters to station and which water points to enable, so that fewer fires escape across uncertain fire days.
- **Case:** Cundinamarca, Colombia, around the purchase of Sikorsky S-70 Firehawk helicopters. NASA FIRMS VIIRS detections for 2024 clustered into 2,425 fire events; ESA WorldCover, SRTM, NASA POWER and WorldPop layers; 120 candidate bases; 5,449 candidate water points; 200 fire-day scenarios.
- **Model:** two-stage stochastic MILP with a mean-CVaR objective on exposed population. First stage: bases, aircraft, water points. Second stage: dispatch and refill assignment per scenario. A fire is contained only if the water delivered by refill cycles meets a requirement that grows exponentially with arrival time. The bilinear dispatch × refill term has an exact McCormick linearization. Solved with a fix-and-optimize LNS matheuristic and validated with SAA.


## 4. Optimizing pallet configuration

**Manuscript:** *[flower pallets working paper, title withheld while in preparation].* File: `manuscripts/flower-pallets-air-cargo.pdf` (kept outside the repository).

- **Question:** which flower boxes go on which pallet position of a full-charter cargo plane, and whether workers can physically stack them as boxes arrive on a conveyor.
- **Case:** Bogotá (El Dorado) to Miami, Airbus A330-200F with 32 pallet positions, peak-season manifest of 8,500 boxes of 35 commercial types grouped into 45 classes, 65,000 kg payload and a 500 kg lateral balance limit.
- **Model:** Stage 1 is an integer program that assigns boxes (or box classes) to positions, maximizing weight plus volume with a penalty for boxes left behind, under volume, weight, payload and balance constraints. Stage 2 is online 3D bin packing with a lookahead window (Bottom-Left, BSSF, BAF, BLSF rules and a DQN agent). Measured fill factors from Stage 2 feed back into Stage 1.

