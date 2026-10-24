# Dutch (nl) glossary and style sheet

For every translator and reviewer of the public site: home, the five levels, research, about and 404. The target is Dutch of the Netherlands. The English files (`*.en.js`) are the reference. Where an existing Dutch file in the hidden study section (`site/locales/lab/study/*.nl.js`) differs from this sheet, the study section keeps its own text, and new text for the public site follows this sheet. If you need a term that is missing here, pick one, use it the same way in your whole bundle and list it in your report so it can be added.

Sources for the choices: the Dutch study pages and `site/locales/nl.js` (kept unless clearly wrong), and Dutch university OR teaching (Erasmus and CWI notes: toegelaten gebied, doelfunctie, restricties, beslissingsvariabelen; TU/e: slackvariabelen, standaardvorm, toegelaten basisoplossing, intredende en uittredende variabele, minimum-ratiotest, bezettingsgraad, aankomstintensiteit, bedieningsintensiteit, wet van Little; UvA: iterand; TU Delft: schaduwprijs; Mathematisch Centrum: geheeltallige programmering, snede).

## 1. Style rules

### Register and tone
- Address the reader with **je / jij / jouw**, never u. In running text use the unstressed forms: "Sleep de restrictie en kijk hoe het optimum verschuift", "je plan". Use stressed jij / jouw only for contrast: "Jouw lading" next to "Optimale lading", "Nu jij".
- Imperatives are the verb stem: Kies, Sleep, Druk op, Vergelijk, Zoek, Probeer.
- Plain, short, active sentences. Say what the English says: no extra explanation, no dropped facts, no exclamation marks the English does not have.

### Capitalization
- **Sentence case everywhere**: page titles, headings, kickers, buttons, chips, legends, table heads, chapter names. Only the first word and proper names get a capital: "Toegelaten gebied in 3D", "Het model", "Bekijk het in beweging", "Simplex stap voor stap".
- Months and days are lowercase in running text (januari, maandag); a chapter or label that starts with one gets the capital of the first word only ("Januari"). Short month labels (axes, table heads, bars): Jan, Feb, Mrt, Apr, Mei, Jun, Jul, Aug, Sep, Okt, Nov, Dec. When one key fills both prose and a label (`inv.m.*`, `wfp.m.*`), keep it lowercase (the prose wins) and report it.
- "Problem {n}" of a problem set: lowercase in running text and in parentheses ("in probleem 1", "(probleem 12)"); a capital only when it starts a label, kicker or title ("Probleem 12", "Probleem 1: drie producten").
- Language names are capitalized in Dutch: Engels, Spaans, Portugees, Frans, Nederlands.
- Abbreviations keep their capitals: LP, MILP, KKT, DEA, COP.
- After a colon continue in lowercase, unless a proper name or a quotation follows.

### Buttons and short labels
- A bare action is an infinitive, as in `nl.js`: Afspelen, Pauzeren, Sluiten, Wissen, Hervatten, Alles openen.
- An action with an object is an imperative, verb first: Toon het optimum, Controleer mijn plan, Lees het artikel, Bevestig de lading.
- Keep the arrows and symbols of the English: "Volgend niveau →", "← Vorige", "↺ Terugzetten", "Stap ▸".
- Short labels must fit a 400 px phone: prefer the shorter word in chips and buttons (Gevoeligheid rather than Gevoeligheidsanalyse when space is tight).

### Punctuation
- **No em dash or en dash anywhere.** Use a comma, a colon, parentheses or "tot": "van 70% tot 97%", "2017 tot 2020". A plain hyphen stays where the English uses one in compact labels (15-18, 00-06, 0-1, 4-1).
- Lists: "x en y", "a, b en c", "a, b of c". No comma before en or of. "both x and y" is "zowel x als y".
- Quotation marks: “…” as in English, ‘…’ for a quote inside a quote. Do not put straight double quotes inside the JS strings; the straight apostrophe ' is fine.
- The middle dot separator " · " in eyebrows, kickers and footers stays as it is, with a space on each side.
- Plural with apostrophe after a, i, o, u, y and after abbreviations: scenario's, peso's, LP's, MILP's. Possessive of names: Giapetto's, Dijkstra's, Gomory's; for methods prefer the van-construction: het algoritme van Dijkstra, de methode van Newton, de wet van Little.

### Numbers
- In prose and in fixed strings: **decimal comma and thousands dot**: 3,5; 0,5%; 2.425; 8.500; 1.000; 68.858 kg. Years, page numbers, model numbers and code stay as they are (2024, p. 583, A330-200F, 2-opt).
- Numbers that code produces come from `I18N.fmt`; never replace a `{placeholder}` with a typed number.
- Inside TeX keep every number exactly as in English (only words inside `\text{...}` change).
- Percent without a space: 35%, 0,5%. Percentage points: procentpunten.
- billion = **miljard** (never biljoen), million = miljoen, thousand = duizend.
- Ordinals: 1e, 2e, 3e. Ranges in prose with "tot"; times of day as in English (09:00, 15-18). Where an integer range includes its end and it matters, write "tot en met" ("van 0 tot en met 25").
- Coordinates and tuples that contain decimals use a semicolon in prose: (0,6; 2; 0,8), (40; 20). TeX and labels written by code keep the English form.
- "X by X" is "X voor X": stap voor stap, maand voor maand, uur voor uur, pivot voor pivot, cel voor cel ("X na X" means "one X after another").

### Currency and units
- Currency codes stay and follow the amount, as in es and fr: "75 G COP", "{v} M COP", "{b} G COP", "1.200 USD". In prose: "miljoenen Colombiaanse peso's", "150 miljard COP".
- "COP {v} billion" becomes "{v} miljard COP"; "(COP billion)" becomes "(miljard COP)".
- Dollar amounts: symbol first, then a no-break space (write ` ` in the JS string): `"$ {v}"` shows "$ 3,50". Fixed amounts in prose: "$ 3,50", "$ 1.200".
- Units stay as in English, with a space: 65 t, 3.785 L, 1,5 L/m², 300 × 300 m, 50 km, 12 kg, 5 ha, m³, 13 kn. Hours: keep the symbol h in compact labels, chips, legends and axes (5 h, km/h); write "uur" in prose, status messages and summaries ("50 uur per machine", "een freesmachine (500 uur)"). A value the code builds with a `{v} h` key keeps its h. Minutes min, seconds s.
- Short forms: pts is pnt, pts/kg is pnt/kg, acft is toest., n.r. is n.g. (niet gerapporteerd), n.a. is n.v.t., e.g. is bijv., i.e. is d.w.z. (or rewrite with "dus"), approx. is ca., vs is vs. in compact labels and tegenover in prose. Plain-text "s.t." is "o.v." (`ui.st`).

### Fixed patterns
- Resource eyebrow: "Level 1 · Linear programming · `<b>`Game`</b>`" becomes "Niveau 1 · Lineaire programmering · `<b>`Spel`</b>`". The short Level 5 form is "Andere OR-methoden": "Niveau 5 · Andere OR-methoden · `<b>`Animatie`</b>`".
- Research eyebrow: "Research case 2 · Bosa district, Bogotá, Colombia" becomes "Onderzoekscase 2 · Stadsdeel Bosa, Bogotá, Colombia".
- Resource footer: "Educational resource · …" becomes "Leermiddel · …".
- Animation chapter names: 2 to 5 words, sentence case, no final period ("De eindstand", "Voorwaartse doorrekening").
- TeX models: `\text{ST}` stays (es, fr and pt keep it too). Translate only the words in `\text{...}`: `\text{for all }` is `\text{voor alle }`, `\text{and integer}` is `\text{en geheeltallig}`, `\text{(complementary slackness)}` is `\text{(complementaire slackness)}`. Keep the spaces inside `\text{}` where the English has them and keep `\\`, `&`, `&&` and every brace.
- Keep every key, `{placeholder}`, HTML tag and attribute (`href`, `class`, `data-ga-*`, `data-keep-lang`, `target`, `rel`) and entity (`&lt;`) exactly as in English.

### What stays as it is
- Names of people, companies, products, software and named methods: Giapetto, Dijkstra, Gomory, Chvátal, Weiszfeld, Rosenbrock, Cournot, Stackelberg, Nash, Little, Birge, Louveaux, Bellman, Firehawk, Airbus A330-200F, Gurobi, GAMS, Python, TOPSIS, BFGS, 2-opt, Compacta.
- Place names: Bogotá, Chía, Cajicá, Sabana Centro, Bosa, Cundinamarca, El Dorado, Miami, Colombia. Spanish words the English keeps (vereda, fruver) stay, in the same tags. The title of the source collection “Problemas para modelar” stays.
- Abbreviations: LP, IP, MILP, MINLP, NLP, CFLP, KKT, MDP, DEA, DMU, TSP, SIR, CVaR, AHP, EV, EEV, RP, WS, VSS, EVPI, MAE, DP, DQN, BL, BSSF, BAF, BLSF, M/M/1, P, NP, R0.
- Never write "MIT".
- The markets, wildfire and pallets pages stay anonymous in Dutch exactly as in English: no paper title, authors, repository link or company hint.

### Compounds and gender
- Dutch writes compounds as one word: gevoeligheidsanalyse, beslissingsvariabele, doelfunctie, schaduwprijs.
- With an abbreviation, digit or symbol use a hyphen: LP-relaxatie, LP-optimum, MILP-model, KKT-voorwaarden, big-M-restrictie, 0-1-knapzakprobleem, iso-Z-lijn, 3D-weergave, x-as.
- After a person's name use a hyphen for readability, as the study pages do: Nash-evenwicht, Shapley-waarde, Lagrange-multiplicator, Markov-beslissingsproces, Gomory-snede, Gini-index, Weber-probleem.
- Avoid long chains: "de zoekboom van branch-and-bound", not one compound.
- English nouns that Dutch OR keeps are de-words: de solver, de gap, de incumbent, de seed, de heatmap, de run, de case, de benchmark. LP, MILP and their kin are het-words (het programma, het model): het LP, het MILP.
- Adjectives inflect after het/de: een geheeltallig optimum, het geheeltallige optimum; een toegelaten oplossing, de toegelaten oplossingen.
- If a long Dutch word still breaks the 400 px layout and rewording cannot fix it, add a page-local CSS rule scoped to `:lang(nl)` (`hyphens: auto` or `overflow-wrap: anywhere`) and report it.

## 2. Glossary

### A. Interface, navigation and recurring headings

| English | Dutch | Note |
|---|---|---|
| Language | Taal | nl.js |
| Read the paper | Lees het artikel | nl.js |
| s.t. (plain text) | o.v. | nl.js `ui.st`; in TeX `\text{ST}` stays |
| Play | Afspelen | nl.js |
| Pause | Pauzeren | nl.js |
| Play again | Opnieuw afspelen | nl.js |
| Restart / Start over | Opnieuw beginnen | nl.js |
| Speed | Snelheid | nl.js |
| Animation timeline | Tijdlijn van de animatie | nl.js |
| chapter | hoofdstuk | animation player |
| See it in motion | Bekijk het in beweging | nl.js `nav.animation` |
| The model | Het model | heading and kicker; study pages |
| What to notice | Wat opvalt | heading; a relative clause, so no question mark ("Wat valt op" reads as a question without its mark) |
| Challenges / Challenge 1 | Uitdagingen / Uitdaging 1 | |
| Hint | Hint | "Hint:" |
| Formulation | Formulering | kicker |
| Problem / Problem statement | Probleem / Probleemstelling | |
| Solution / Optimal solution | Oplossing / Optimale oplossing | |
| Your plan / Your load | Jouw plan / Jouw lading | stressed, contrasts with the optimum |
| Results / Live results | Resultaten / Live resultaten | |
| Telemetry | Telemetrie | |
| Convergence | Convergentie | |
| Derivation | Afleiding | |
| Cheat sheet | Spiekbriefje | |
| Your turn | Nu jij | |
| Try it / Try it yourself | Probeer het / Probeer het zelf | study pages |
| Why? | Waarom? | |
| Further reading | Verder lezen | nl.js |
| section {n} (of a paper) | paragraaf {n} | majority form in the study pages; nl.js `ref.section` uses it |
| Created by | Gemaakt door | nl.js footer |
| All rights reserved. | Alle rechten voorbehouden. | nl.js |
| About the author | Over de auteur | nl.js |
| Sections | Secties | nl.js, page table of contents |
| Browse / Browse the learning path | Bladeren / Blader door het leerpad | nl.js |
| By level / By type | Per niveau / Per type | nl.js |
| Close | Sluiten | nl.js |
| Research | Onderzoek | nl.js |
| Learning path | Leerpad | nl.js |
| Lab / Study | Lab / Studie | nl.js |
| Proposals lab | Voorstellenlab | shared key of the hidden lab |
| home page / Go to the home page | startpagina / Naar de startpagina | |
| Error 404 / Page not found | Fout 404 / Pagina niet gevonden | |
| Show the optimum / Hide the optimum | Toon het optimum / Verberg het optimum | |
| Show the answer / Hide the answer | Toon het antwoord / Verberg het antwoord | |
| Show optimal plan / Hide optimal plan | Toon het optimale plan / Verberg het optimale plan | |
| Go to the optimum / Reveal the optimum | Ga naar het optimum / Onthul het optimum | |
| Highlight … | Markeer … | "Highlight greedy choice": Markeer de gulzige keuze |
| Check my plan | Controleer mijn plan | |
| Check (kicker) | Controle | |
| Confirm plan / load / roster | Bevestig het plan / de lading / het rooster | |
| Reset / ↺ Reset | Terugzetten / ↺ Terugzetten | back to the start values |
| Retry | Opnieuw proberen | |
| Retry level / Replay this level | Speel het niveau opnieuw / Speel dit niveau opnieuw | |
| Next level → | Volgend niveau → | |
| Next → / ← Previous | Volgende → / ← Vorige | |
| Back / ◂ Back | Terug / ◂ Terug | |
| Step / Step ▸ | Stap / Stap ▸ | |
| Jump to the end | Naar het einde | |
| Finish / ✓ End | Afronden / ✓ Einde | |
| Clear / Clear grid / Empty | Wissen / Raster wissen / Leegmaken | |
| Run / Run again / Resume | Starten / Opnieuw starten / Hervatten | a simulation |
| Open all / Close all | Alles openen / Alles sluiten | study pages |
| New map | Nieuwe kaart | |
| seed / New seeds | seed / Nieuwe seeds | de seed; "Seed {s}" stays |
| Preset example | Standaardvoorbeeld | short enough for a button |
| Random costs | Willekeurige kosten | |
| Level {n} (game level) | Niveau {n} | same word as the learning levels |
| not played | niet gespeeld | |
| Attempt {n} | Poging {n} | |
| {n} of 3 stars / Rating | {n} van 3 sterren / Score | |
| {k} of {n} | {k} van {n} | |
| Very close / Correct / Pending | Heel dichtbij / Goed / Nog open | |
| verdict / The verdict | oordeel / Het oordeel | |
| The tally | De eindstand | chapter name |
| card / world (game) | kaart / wereld | Compacta |
| ready / running / paused / finished | gereed / bezig / gepauzeerd / afgelopen | status |
| fast / medium / slow | snel / gemiddeld / langzaam | |
| on / off | aan / uit | |
| with / without | met / zonder | scenario buttons |
| none / neither | geen / geen van beide | |
| total | totaal | |
| control (on a page) | instelling, schuifregelaar | not "controle" (that means check) |
| slider / toggle / button | schuifregelaar / schakelaar / knop | |
| drag / click / tap / press | sleep / klik / tik / druk op | imperatives |
| move (a control) | verschuif | |
| legend / axis / bar / line chart | legenda / as / staaf / lijndiagram | |
| heat map | heatmap | |
| map | kaart | |
| Scenario: {s} | Scenario: {s} | the scenario control (`.seg`) |
| Case / Choose a case (selector of worked problems on a page) | Voorbeeld / Kies een voorbeeld | lp-inventory, lp-shadow; not "geval" |
| Classify (game action) | Classificeer | Compacta label, prompts and how-to; not "deel in" |
| dashed / dotted (line, ring, outline) | gestreept / gestippeld | "gestreepte lijn", "gestreepte omtrek"; plotly `dash` and `setLineDash` are dashed |
| gauge | meter; peilbuis when drawn as a tube | lp-machines / edu-diet |
| Sweep / Stop (buttons) | Doorlopen / Stoppen | lp-shadow |
| Start over / Reset data / Back to the problem's data | Opnieuw beginnen / Gegevens terugzetten / Terug naar de gegevens van het probleem | |
| Home (game screen) | Start | Compacta header, fits 400 px |
| Linear programming model (heading) | Lineair programmeringsmodel | all Level 1 pages; "LP model" in a statement: LP-model |
| Solved in your browser with the page's simplex solver | Opgelost in je browser met de simplexsolver van deze pagina | "in je browser berekend met de simplexmethode ({n} pivots)" |
| sweep (a value) / swept | laten doorlopen / doorlopen | "Sweep Z": Laat Z oplopen |
| Available in {list}. | Beschikbaar in {list}. | |
| Contributed by | Bijdrage van | `home.byAuthor`; "Bijgedragen door" is a calque |
| Planned · open for contributors | Gepland · open voor bijdragers | |

### B. Site, levels and resource types

| English | Dutch | Note |
|---|---|---|
| Optimization in Action (site name) | Optimalisatie in actie | `home.title`: Optimalisatie in `<span class="opt">`actie`</span>`; es, fr and pt translate the name; nl.js `nav.backToPath` uses it |
| optimization | optimalisatie | study pages |
| operations research | operations research | lowercase in running text; short form OR (OR-methoden) |
| Operations research · Interactive resources | Operations research · Interactieve leermiddelen | home eyebrow |
| resource (an item of the site) | leermiddel (pl. leermiddelen) | not "bron"; resource as an input (hours, water) is "middel" |
| Educational resource · | Leermiddel · | resource footers |
| published / planned resources | gepubliceerde / geplande leermiddelen | |
| learning levels | leerniveaus | |
| research cases | onderzoekscases | nl.js "Onderzoekscases" |
| Research case {n} | Onderzoekscase {n} | |
| Real case / Explore the real case | Praktijkcase / Verken de praktijkcase | "echte case" is a calque |
| Division 1 · By level | Deel 1 · Per niveau | |
| Division 2 · By project | Deel 2 · Per project | |
| Project {n} | Project {n} | |
| contributors / contributions | bijdragers / bijdragen | |
| Level | Niveau | |
| Linear programming (Level 1) | Lineaire programmering | study pages, CWI, Radboud |
| Integer programming (Level 2) | Geheeltallige programmering | Mathematisch Centrum |
| Mixed-integer programming (Level 3) | Gemengd geheeltallige programmering | |
| Nonlinear programming (Level 4) | Niet-lineaire programmering | |
| Other operations research methods (Level 5) | Andere methoden uit de operations research | |
| Other OR methods (eyebrow) | Andere OR-methoden | |
| Level 1 topics | Grafische methode \| Simplexmethode \| Dualiteit \| Gevoeligheidsanalyse | keep the " \| " separators of the string |
| Level 2 topics | Afronden en het geheeltallige omhulsel \| Knapzakprobleem \| Dynamisch programmeren \| Branch-and-bound \| Snijvlakken \| Overdekkingsproblemen \| Totale unimodulariteit | |
| Level 3 topics | Modellen met vaste kosten \| Locatieproblemen \| Big-M \| Linearisatie | |
| Level 4 topics | Convexiteit \| Stationaire punten \| KKT-voorwaarden \| Newton en quasi-Newton \| Straf- en barrièremethoden \| Toepassingen | |
| Level 5 topics | Wachtrijen \| Markov-beslissingsprocessen \| Stochastische programmering \| Beslissingsanalyse \| Projectplanning \| Netwerkstromen \| Speltheorie \| Voorspellen \| Efficiëntieanalyse \| Complexiteit \| Simulatie \| Beslissen met meerdere criteria | |
| Simulation | Simulatie | nl.js |
| Game | Spel | nl.js |
| Animation | Animatie | nl.js |
| Worked example | Uitgewerkt voorbeeld | nl.js |

### C. Models in general

| English | Dutch | Note |
|---|---|---|
| model | model | het model |
| mathematical programming | wiskundige programmering | |
| optimization problem | optimalisatieprobleem | |
| decision variable | beslissingsvariabele | Erasmus |
| variable | variabele | |
| parameter | parameter | |
| set | verzameling | |
| index / indices | index / indices | |
| sum (Σ) | som | |
| for all (∀) | voor alle | also inside `\text{}` |
| compact form | compacte vorm | Compacta |
| objective function | doelfunctie | Erasmus, study pages |
| objective (value) | doelfunctiewaarde | short labels: Doelfunctie ("Objective f*": Doelfunctie f*; "Objective (persons)": Doelfunctie (personen)); not "doelwaarde", which means target value |
| maximize / minimize | maximaliseren / minimaliseren | |
| constraint | restrictie (pl. restricties) | TU/e, Erasmus, majority in the study pages; "beperking" only for a limitation in prose |
| subject to | onder de voorwaarden | prose; short form o.v. |
| right-hand side | rechterlid | study pages |
| coefficient | coëfficiënt | |
| formulation | formulering | |
| data | gegevens | "data" acceptable in compounds (gegevensbron, datagedreven) |
| instance | instantie | study pages |
| solve / solver | oplossen / solver | de solver |
| optimum (pl. optima) | optimum (pl. optima) | het optimum |
| optimal solution / optimal value / optimal plan | optimale oplossing / optimale waarde / optimaal plan | |
| feasible / infeasible | toegelaten / niet toegelaten | point tooltips and badges |
| infeasible (status of a problem) | geen toegelaten oplossing | "The feasible region is empty": Het toegelaten gebied is leeg |
| feasibility | toelaatbaarheid | study pages |
| unbounded / bounded | onbegrensd / begrensd | |
| linear | lineair | |
| nonnegativity / non-negativity only | niet-negativiteit / alleen niet-negativiteit | |
| algorithm | algoritme | |
| iteration | iteratie | |
| step | stap | |
| exact method | exacte methode | |
| heuristic | heuristiek | study pages |
| metaheuristic | metaheuristiek | |
| matheuristic | matheuristiek | |
| greedy (algorithm) | gulzig (algoritme) | study pages, Leiden algorithm courses |
| enumeration | enumeratie | study pages; "Vertex enumeration": Enumeratie van hoekpunten |
| brute force | volledige enumeratie | |
| scenario | scenario (pl. scenario's) | |
| sensitivity | gevoeligheid | |
| trade-off | afweging | |
| benchmark | benchmark | de benchmark, pl. benchmarks (a reference solution or outcome, as Dutch OR says); "vergelijkingstest" is a consumer product test |

### D. Linear programming

| English | Dutch | Note |
|---|---|---|
| linear program (LP) | lineair programma (LP) | pl. lineaire programma's, LP's; het LP |
| linear programming | lineaire programmering | |
| graphical method | grafische methode | |
| decision plane | beslissingsvlak | |
| feasible region | toegelaten gebied | Erasmus, CWI; study pages use toegelaten 40 times, toelaatbaar 14 |
| feasible set | toegelaten verzameling | |
| feasible solution | toegelaten oplossing | CWI |
| vertex / corner (point) | hoekpunt | "hoek" in light prose |
| edge (of the region) | zijde (2D) / ribbe (3D, polytope) | |
| iso-profit line / iso-cost line | isowinstlijn / isokostenlijn | |
| Iso-Z line | iso-Z-lijn | |
| fundamental theorem of linear programming | hoofdstelling van de lineaire programmering | |
| binding constraint | bindende restrictie | |
| non-binding | niet-bindend | |
| tight (constraint at a corner) | bindend | "Constraints tight at the corner": Restricties die in het hoekpunt bindend zijn |
| slack (resource left over) | speling | "has slack": heeft speling |
| slack variable | slackvariabele | TU/e |
| surplus variable | surplusvariabele | |
| standard form | standaardvorm | TU/e |
| simplex method | simplexmethode | |
| simplex tableau | simplextableau | het tableau |
| pivot | pivot | pivotkolom, pivotrij, pivotelement; "Pivot 1" stays |
| ratio test | ratiotest | minimum-ratiotest, as at TU/e |
| entering / leaving variable | intredende / uittredende variabele | TU/e; "Entering column, leaving row": Intredende kolom, uittredende rij; short labels "enters / leaves": komt erin / gaat eruit |
| basis | basis | |
| basic / nonbasic variable | basisvariabele / niet-basisvariabele | |
| basic feasible solution | toegelaten basisoplossing | TU/e |
| optimality test | optimaliteitstoets | |
| objective row | doelfunctierij | |
| pricing out | gereduceerde kosten berekenen | |
| reduced cost | gereduceerde kosten | always plural |
| degenerate | gedegenereerd | |
| multiple optima / a whole edge of optimal solutions | meerdere optima / een hele ribbe (zijde) van optimale oplossingen | |
| duality | dualiteit | |
| dual (problem) / the dual | duale probleem / de duale | "LP-duale" in the study pages |
| primal | primale probleem | |
| dual variable / dual price | duale variabele / duale prijs | |
| shadow price | schaduwprijs (pl. schaduwprijzen) | TU Delft |
| weak / strong duality | zwakke / sterke dualiteit | |
| complementary slackness | complementaire slackness | kept, as in Dutch courses |
| sensitivity analysis | gevoeligheidsanalyse | CWI, study pages |
| range of validity | geldigheidsbereik | |
| blending problem | mengprobleem | |
| diet problem / feed | dieetprobleem / voer | |
| inventory balance | voorraadbalans | |
| workforce planning | personeelsplanning | |
| machine scheduling | machineplanning | |
| production planning | productieplanning | |
| finishing / carpentry (Giapetto) | afwerking / timmerwerk | |

### E. Integer programming

| English | Dutch | Note |
|---|---|---|
| integer (adjective) | geheeltallig | |
| integer program / integer programming | geheeltallig programma / geheeltallige programmering | |
| integer variable | geheeltallige variabele | |
| whole number | geheel getal (pl. gehele getallen) | |
| integer optimum | geheeltallig optimum | |
| binary variable | binaire variabele | |
| 0-1 / yes/no decision | 0-1 / ja-neebeslissing | |
| fractional | fractioneel | study pages |
| rounding / round down / round up | afronden / naar beneden afronden / naar boven afronden | |
| relaxation | relaxatie | |
| LP relaxation | LP-relaxatie | study pages |
| integrality gap | integraliteitskloof | study pages |
| integer hull | geheeltallig omhulsel | het geheeltallige omhulsel |
| convex hull | convex omhulsel | het convexe omhulsel |
| combinatorial optimization | combinatorische optimalisatie | |
| knapsack problem / 0-1 knapsack | knapzakprobleem / 0-1-knapzakprobleem | study pages |
| dynamic programming | dynamisch programmeren | the established Dutch name (not "programmering"); DP stays |
| subproblem | deelprobleem | |
| Bellman table | Bellman-tabel | |
| branch and bound | branch-and-bound | lowercase, always hyphenated |
| branching / branch (of a tree) | vertakken / tak | study pages |
| node / search tree | knoop / zoekboom | |
| prune / pruned | snoeien / gesnoeid | |
| bound / upper bound / lower bound | grens / bovengrens / ondergrens | |
| LP bound / best bound | LP-grens / beste grens | |
| incumbent | incumbent | de incumbent; explain once per page as "beste toegelaten oplossing tot nu toe" |
| depth-first / best-first | diepte-eerst / beste-eerst | |
| cutting plane | snijvlak (pl. snijvlakken) | |
| cut | snede (pl. snedes) | study pages, Mathematisch Centrum |
| Gomory's algorithm / Gomory cut | het algoritme van Gomory / Gomory-snede | |
| Chvátal-Gomory cut | Chvátal-Gomory-snede | |
| branch and cut | branch-and-cut | |
| set covering | overdekkingsprobleem | add "(set covering)" at first use |
| coverage matrix | dekkingsmatrix | |
| assignment / assignment problem | toewijzing / toewijzingsprobleem | |
| total unimodularity / totally unimodular | totale unimodulariteit / totaal unimodulair | study pages |
| NP-hard | NP-moeilijk | |
| greedy rule (cashier's largest coin first) | gulzige regel | |
| give change / coins | wisselgeld geven / munten | |
| shift (nursing) / roster / rest rules | dienst / rooster / rustregels | |

### F. Mixed-integer programming

| English | Dutch | Note |
|---|---|---|
| mixed-integer program (MILP) | gemengd geheeltallig programma (MILP) | study pages |
| mixed-integer model | gemengd geheeltallig model | |
| big-M / big-M formulation | big-M / big-M-formulering | "Big-M" at the start of a label |
| big-M constraint | big-M-restrictie | study pages |
| either-or constraint | of-ofrestrictie | spelled like ja-neebeslissing; "Either-or with big-M": Of-of met big-M |
| logical condition / if-then | logische voorwaarde / als-dan | |
| fixed cost | vaste kosten | always plural |
| fixed-charge model | model met vaste kosten | |
| setup cost / setup | omstelkosten / omstelling | lot sizing |
| start-up cost | opstartkosten | power plants |
| holding cost | voorraadkosten | |
| lot sizing / lot-for-lot | seriegrootteplanning / lot-for-lot | lot-for-lot stays, as in Dutch MRP practice |
| batch | batch | |
| facility location | locatieprobleem / locatiekeuze | |
| capacity | capaciteit | |
| piecewise linear | stuksgewijs lineair | |
| breakpoint | knikpunt | |
| price tier / volume discount | staffel / staffelkorting | |
| linearization / exact linearization | linearisatie / exacte linearisatie | |
| tight / weak formulation | sterke / zwakke formulering | |
| tight bound / tightest M | scherpe grens / kleinste geldige M | |
| verifier | controleur | Say It with Constraints |
| first come, first served | op volgorde van aankomst | runway |
| runway / separation (between landings) | landingsbaan / separatie | |
| unit commitment / economic dispatch | inzetplanning van centrales / economische dispatch | |
| power plant / output | centrale / vermogen | |

### G. Nonlinear programming

| English | Dutch | Note |
|---|---|---|
| nonlinear | niet-lineair | |
| convex / concave | convex / concaaf | |
| convexity | convexiteit | study pages |
| convex set / convex function | convexe verzameling / convexe functie | |
| chord / chord test | koorde / koordetoets | |
| gradient | gradiënt | |
| Hessian | Hessiaan | Hessematrix is also understood; use one form per page |
| eigenvalue | eigenwaarde | |
| positive definite | positief definiet | |
| curvature | kromming | |
| stationary point | stationair punt | |
| saddle point | zadelpunt | |
| local / global minimum | lokaal / globaal minimum | |
| local / global optimum | lokaal / globaal optimum | |
| level curve / contour | niveaulijn | |
| unconstrained / constrained problem | probleem zonder restricties / met restricties | |
| KKT conditions | KKT-voorwaarden | study pages |
| Lagrange multiplier | Lagrange-multiplicator | study pages |
| Lagrangian | Lagrange-functie | study pages |
| steepest descent | steilste helling | "methode van de steilste helling" |
| gradient descent | gradiëntafdaling | |
| Newton's method | methode van Newton | |
| quasi-Newton (BFGS) | quasi-Newtonmethode (BFGS) | |
| step size / step length | stapgrootte | |
| line search | lijnzoekmethode | |
| iterate (noun) | iterand (pl. iteranden) | UvA numerical courses |
| tolerance | tolerantie | |
| penalty method / penalty term | strafmethode / strafterm | |
| barrier method | barrièremethode | |
| central path | centraal pad | |
| interior point method | inwendigepuntmethode | |
| minimizer / path of minimizers | minimumpunt / pad van minimumpunten | study pages; "minimalisator" is not used |
| Rosenbrock function / banana valley | Rosenbrock-functie / bananendal | |
| Weber problem | Weber-probleem | |
| Weiszfeld's algorithm | het algoritme van Weiszfeld | |
| centroid | zwaartepunt | |
| Euclidean distance | euclidische afstand | |
| city-block (Manhattan) distance | Manhattan-afstand | |
| weighted distance / weighted median | gewogen afstand / gewogen mediaan | |
| collection center | inzamelpunt | |
| fairness / alpha fairness | eerlijkheid / α-eerlijkheid | |
| price of fairness | prijs van eerlijkheid | |
| utilitarian / proportional / maximin | utilitaristisch / proportioneel / maximin | |
| efficiency / equality | efficiëntie / gelijkheid | |
| Gini index | Gini-index | |
| slow steaming | slow steaming | kept, shipping term |
| leg (of a voyage) | traject | |
| knots | knopen (kn) | do not confuse with graph nodes |
| portfolio / risk and return | portefeuille / risico en rendement | |
| efficient frontier (portfolio) | efficiënte grens | |

### H. Other operations research methods

| English | Dutch | Note |
|---|---|---|
| queue / queueing (theory) | wachtrij / wachtrijtheorie | |
| single-server queue | wachtrij met één bediende | TU/e |
| server / teller | bediende / loketmedewerker | |
| arrival rate | aankomstintensiteit | TU/e |
| service rate | bedieningsintensiteit | TU/e, pairs with aankomstintensiteit |
| load / utilization | bezettingsgraad | TU/e |
| waiting time | wachttijd | |
| Little's law | de wet van Little | TU/e |
| variability | variabiliteit | |
| Markov decision process (MDP) | Markov-beslissingsproces (MDP) | |
| value iteration | waarde-iteratie | |
| policy / optimal policy | beleid / optimaal beleid | |
| state / action | toestand / actie | |
| transition probability | overgangskans | |
| discount factor | disconteringsfactor | |
| threshold | drempel | |
| wear / maintain / replace / repair | slijtage / onderhouden / vervangen / repareren | |
| stochastic programming | stochastische programmering | |
| two-stage stochastic program | tweefasig stochastisch programma | study pages |
| first stage / second stage | eerste fase / tweede fase | study pages |
| recourse | recourse | kept, study pages |
| deterministic equivalent | deterministisch equivalent | |
| expected value | verwachte waarde | |
| value of the stochastic solution (VSS) | waarde van de stochastische oplossing (VSS) | |
| expected value of perfect information (EVPI) | verwachte waarde van perfecte informatie (EVPI) | |
| yield (of a crop) | opbrengst | |
| decision analysis | beslissingsanalyse | |
| decision tree | beslisboom | |
| decision node / chance node | beslisknoop / kansknoop | |
| leaf / root | blad / wortel | |
| roll back | terugrekenen | "Roll Back the Tree": Reken de boom terug |
| backward induction | terugwaartse inductie | study pages |
| risk averse | risicomijdend | |
| utility | nut | |
| project scheduling | projectplanning | |
| activity | activiteit | |
| critical path / critical path method | kritieke pad / methode van het kritieke pad (CPM) | het kritieke pad |
| forward pass / backward pass | voorwaartse doorrekening / achterwaartse doorrekening | |
| slack (float) of an activity | speling | same word as LP slack |
| earliest / latest start | vroegste / laatste starttijd | |
| deadline | deadline | |
| Monte Carlo (simulation) | Monte Carlo / Monte-Carlosimulatie | |
| network flows | netwerkstromen | study pages |
| graph / directed / undirected | graaf / gericht / ongericht | |
| node / arc / edge (of a graph) | knoop / boog / kant | study pages |
| shortest path | kortste pad | |
| Dijkstra's algorithm | het algoritme van Dijkstra | |
| permanent / temporary label | permanent / tijdelijk label | |
| maximum flow / minimum cut | maximale stroom / minimale snede | |
| augmenting path | stroomvergrotend pad | |
| residual network | restnetwerk | |
| source / sink | bron / put | |
| bottleneck | knelpunt | |
| traveling salesman problem (TSP) | handelsreizigersprobleem (TSP) | |
| tour / route | rondrit / route | |
| simulated annealing | simulated annealing | kept |
| temperature / cooling | temperatuur / afkoeling | |
| local search / local descent | lokaal zoeken / lokale daling | |
| 2-opt move | 2-opt-stap | "zet" is a move in a board game |
| improvements only | alleen verbeteringen | |
| game theory | speltheorie | study pages |
| Nash equilibrium | Nash-evenwicht | study pages |
| best response | beste antwoord | |
| best response curve | reactiecurve | |
| leader / follower | leider / volger | study pages |
| duopoly / price war | duopolie / prijsoorlog | |
| forecasting / forecast | voorspellen / voorspelling | |
| exponential smoothing | exponentiële afvlakking | |
| smoothing constant | afvlakkingsconstante | |
| level / trend (of a forecast) | niveau / trend | |
| forecast error / MAE | voorspelfout / MAE | |
| one-step-ahead | één stap vooruit | |
| efficiency analysis | efficiëntieanalyse | |
| data envelopment analysis (DEA) | data envelopment analysis (DEA) | kept, as in Dutch reports |
| decision-making unit (DMU) | beslissingseenheid (DMU) | |
| efficiency score | efficiëntiescore | |
| efficient frontier (DEA) | efficiënte grens | |
| input / output | input / output | |
| peer | referentie-eenheid | |
| returns to scale | schaalopbrengsten | |
| complexity | complexiteit | |
| polynomial / exponential time | polynomiale / exponentiële tijd | |
| running time | rekentijd | |
| simulation / replication / warm-up | simulatie / replicatie / inloopperiode | |
| run (of a simulation) | run | de run, pl. runs |
| agent-based model | agent-based model | kept, as in Dutch theses; agents: agenten |
| SIR model: susceptible / infected / recovered | SIR-model: vatbaar / besmet / hersteld | |
| outbreak / contagion / distancing | uitbraak / besmetting / afstand houden | |
| supply chain | toeleveringsketen | |
| bullwhip effect | bullwhipeffect | gloss "zweepslageffect" once |
| The Beer Game | De Beer Game | name stays |
| stage (link of the chain) | schakel | |
| upstream / downstream | stroomopwaarts / stroomafwaarts | |
| order / backlog / lead time | bestelling / achterstand / levertijd | |
| multi-criteria decision analysis (MCDA) | multicriteria-analyse (MCDA) | |
| criterion / criteria | criterium / criteria | |
| weight / weighted sum | gewicht / gewogen som | |
| ideal / anti-ideal solution | ideale / anti-ideale oplossing | TOPSIS |
| fuzzy AHP | fuzzy AHP | |
| newsvendor problem | krantenjongenprobleem | planned resource only |
| leftovers / lost sales | restvoorraad / gemiste verkoop | |

### I. Research words

| English | Dutch | Note |
|---|---|---|
| paper | artikel | study pages |
| manuscript | manuscript | |
| study / case study | studie / casestudie | study pages |
| The real case | De praktijkcase | heading |
| Interactive exemplification | Interactief voorbeeld | heading |
| Key findings | Belangrijkste resultaten | study pages |
| Scenario explorer | Scenarioverkenner | |
| base case / base scenario | basisgeval / basisscenario | study pages |
| illustrative | illustratief | "The data are illustrative": De gegevens zijn illustratief |
| data source | gegevensbron | |
| table / figure / section / equation / appendix | tabel / figuur / paragraaf / vergelijking / bijlage | lowercase in running text |
| not reported / not applicable | niet gerapporteerd (n.g.) / niet van toepassing (n.v.t.) | |
| proven optimal | bewezen optimaal | |
| time limit / cut at limit | tijdslimiet / gestopt bij de limiet | |
| gap (of the solver) | gap | relatieve gap, as in the study pages; integrality or duality gap is "kloof" |
| computational time / run time | rekentijd | study pages |
| sensitivity hierarchy | gevoeligheidshiërarchie | |
| Published / In revision / In preparation | Gepubliceerd / In revisie / In voorbereiding | about page |
| working paper | werkdocument | |
| conference | congres | |
| peer reviewed | met peerreview | |
| under peer review | in peerreview | "Working paper under peer review.": Werkdocument in peerreview. |
| household / surveyed households | huishouden / ondervraagde huishoudens | |
| candidate site / candidate base | kandidaatlocatie / kandidaatbasis | |
| competing retailers / competitor | concurrerende winkels / concurrent | |
| captured demand / captured share | aangetrokken vraag / aangetrokken aandeel | |
| market share | marktaandeel | study pages |
| demand cell / demand zone | vraagcel / vraagzone | |
| nanostore | nanostore | kept, explained in the text |
| corner shop | buurtwinkel | |
| produce shop (fruver) | groente- en fruitwinkel (fruver) | |
| supermarket / hard discounter / convenience store | supermarkt / harddiscounter / gemakswinkel | |
| street market / farmers' market | straatmarkt / boerenmarkt | |
| multinomial logit | multinomiaal logitmodel | study pages: logitmodel |
| competitive facility location | competitieve locatiekeuze | |
| discrete choice / random utility | discrete keuze / random utility | |
| two-stage stochastic MILP | tweefasig stochastisch MILP | |
| mean-CVaR | mean-CVaR | |
| online 3D bin packing | online 3D bin packing | kept |
| deep reinforcement learning / machine learning | deep reinforcement learning / machine learning | kept |
| wildfire / wildfire suppression | natuurbrand / bestrijding van natuurbranden | |
| fire event / fire day | brand / branddag | |
| aerial suppression base | basis voor brandbestrijding uit de lucht | short: basis |
| water point | waterpunt | |
| drop (of water) | afworp | |
| refill cycle | vulcyclus | |
| contained / escaped (fire) | ingedamd / niet ingedamd | |
| pallet position | palletpositie | |
| main deck / lower deck | hoofddek / onderdek | |
| payload limit | maximaal laadvermogen | |
| charter flight / manifest | chartervlucht / vrachtmanifest | |
| box class | dozenklasse | |
| fill factor / placement rate | vulfactor / plaatsingsgraad | |
| feedback | terugkoppeling | |
| conveyor | transportband | |

### J. Proposed resource and project titles

Use the same title in `locales/nl.js` (catalog) and in the page bundle (`*.title`, h1).

| English | Dutch | Note |
|---|---|---|
| Feasible Region | Toegelaten gebied | |
| Feasible Region in 3D | Toegelaten gebied in 3D | |
| Two Stories, One Model | Twee verhalen, één model | |
| Compacta | Compacta | name |
| Inventory Balance | Voorraadbalans | |
| The Cheapest Feed | Het goedkoopste voer | |
| Simplex Step by Step | Simplex stap voor stap | |
| Shadow Prices | Schaduwprijzen | |
| Machine Scheduling | Machineplanning | |
| Workforce Planning | Personeelsplanning | |
| Critical Load | Kritieke lading | |
| Rounding Is Not Enough | Afronden is niet genoeg | |
| Exact Change | Gepast wisselgeld | |
| Cutting Planes | Snijvlakken | |
| Signal in Every Vereda | Bereik in elke vereda | |
| Perfect Assignment | Perfecte toewijzing | |
| Hospital Shifts | Ziekenhuisdiensten | |
| Growing the Search Tree | De zoekboom groeit | |
| Points, Lines and Regions | Punten, lijnen en gebieden | |
| Say It with Constraints | Zeg het met restricties | |
| How Big Is M? | Hoe groot is M? | |
| Bulk Discounts | Staffelkortingen | |
| Produce Now or Later | Nu produceren of later | |
| Cleared to Land | Toestemming om te landen | |
| Open or Close | Openen of sluiten | |
| Keep the Lights On | Houd het licht aan | |
| The Chord Test | De koordetoets | |
| Flat Is Not a Bottom | Vlak is geen bodem | |
| Where the Contours Touch | Waar de niveaulijnen raken | |
| Zigzag or Leap | Zigzag of sprong | |
| Walls and Fences | Muren en hekken | |
| One Point, Many Distances | Eén punt, veel afstanden | |
| Slow Steaming | Slow steaming | |
| Fair Shares | Eerlijk delen | |
| Risk and Return | Risico en rendement | planned |
| Down the Valley | Het dal in | planned |
| Why Queues Explode | Waarom wachtrijen exploderen | |
| Replace or Repair? | Vervangen of repareren? | |
| Plan for the Average? | Plannen op het gemiddelde? | |
| Roll Back the Tree | Reken de boom terug | |
| Critical Path | Het kritieke pad | |
| Max Flow, Min Cut | Maximale stroom, minimale snede | |
| Price Wars | Prijsoorlogen | |
| Chasing Demand | De vraag achterna | |
| Efficient or Not? | Efficiënt of niet? | |
| Easy to Check, Hard to Find | Makkelijk te controleren, moeilijk te vinden | |
| Agents and Outbreaks | Agenten en uitbraken | |
| The Beer Game | De Beer Game | |
| Weigh the Criteria | Weeg de criteria | |
| Patrol Route | Patrouilleroute | |
| Dijkstra Step by Step | Dijkstra stap voor stap | |
| Waiting in Line | In de rij | planned |
| How Many Newspapers? | Hoeveel kranten? | planned |
| CFLP for nanostores | CFLP voor nanostores | research |
| Locating street markets | Locatiekeuze voor straatmarkten | research, anonymized; "Straatmarkten plaatsen" also reads as "street market places" |
| Wildfire suppression | Bestrijding van natuurbranden | research, anonymized |
| Optimizing pallet configuration | Palletconfiguratie optimaliseren | research, anonymized |
| Machine Learning + Optimization | Machine learning + optimalisatie | |

### K. Formats and false friends

| English | Dutch | Note |
|---|---|---|
| billion | miljard | never biljoen (that is 10¹²) |
| million / M COP | miljoen / M COP | |
| COP {v} billion | {v} miljard COP | |
| $3.50 / ${v} | $ 3,50 / `$ {v}` | no-break space |
| 2,425 / 0.5% | 2.425 / 0,5% | |
| {v} h (hours) | {v} h | "uur" in prose |
| pts / pts/kg | pnt / pnt/kg | |
| {n} acft | {n} toest. | |
| e.g. / i.e. | bijv. / d.w.z. | |
| vs | vs. (labels) / tegenover (prose) | |
| approx. / about | ca. / ongeveer | |
| eventually | uiteindelijk | not "eventueel" (= possibly) |
| actual / actually | werkelijk / eigenlijk | not "actueel" (= current) |
| control (on the page) | instelling | "controle" means check |
| order (sequence) / order (purchase) | volgorde / bestelling | |
| resource (input such as hours, water) | middel | |
| schedule | planning / rooster | production / staff |
| sensible | verstandig | not "sensibel" |
| sensitive (to a parameter) | gevoelig | not "sensitief" |
| realize (understand) | beseffen, zien | "realiseren" means to achieve |
| dramatically | sterk, flink | not "dramatisch" |
| case (research case) | case (pl. cases) | as in nl.js "Onderzoekscases" |

### L. Terms added in the Level 1 pilot

Chosen by the translators and reviewers of `locales/nl.js` and the nine Level 1 bundles; reuse them.

| English | Dutch | Note |
|---|---|---|
| requirement (a condition the solution must meet) / requirement (an amount needed) | eis / behoefte | edu-diet "eis", "dagelijkse behoefte"; lp-machines "wekelijkse behoefte"; lp-workforce "servicebehoefte" |
| statement (of a problem) / the problem (as a source) | probleemstelling / opgave | "niet in de probleemstelling", "5% (uit de opgave)" |
| input (blending) / purchase cost / revenue | grondstof / inkoopkosten / opbrengst | two-stories, Compacta |
| minimum blend | minimale mengverhouding | two-stories |
| lines of the model | modelregels | |
| drug / chemical / beverage / concentrate | geneesmiddel / chemische stof / drank / concentraat | |
| Inc. (company suffix of a fictional company) | B.V. | es, fr and pt also localize it; the name stays |
| solid / face / normal (vector) | ruimtelijk lichaam / zijvlak / normaalvector | 3D LP |
| iso-utility plane | isonutsvlak | |
| upper ratio (constraint) | bovengrens van de verhouding | |
| Minimum / Maximum (short constraint label) | Min. / Max. | "Min. tanks", "Max. vliegtuigen" |
| extended / compact formulation; expand | uitgeschreven / compacte formulering; uitschrijven | Compacta |
| the index is consumed / survives | wordt verbruikt / blijft over | |
| family of constraints | familie van restricties | |
| sum over (Σ) | sommeren over | not "sommen" |
| left-hand side | linkerlid | pairs with rechterlid |
| streak / points / badge / dictionary / proposal | reeks / punten / badge / woordenboek / voorstel | Compacta |
| case of beer / plant hours / branch / advisor / relocation cost / supply | krat / fabrieksuren / filiaal / adviseur / overplaatsingskosten / aanbod | Compacta cases |
| warehouse / stock / opening stock / end-of-month stock | magazijn / voorraad / beginvoorraad / eindvoorraad | lp-inventory |
| storage cost / net cost / storage capacity | opslagkosten / nettokosten / opslagcapaciteit | holding cost stays voorraadkosten |
| article (item A, B) / rack / slot | artikel / rek / vak | |
| backlog | achterstand | "geen achterstand" |
| nutrient / nutritional ingredient / type of feed | voedingsstof / voedingsbestanddeel / voersoort | edu-diet |
| mix / feed mixer / hopper / trough | mengsel / voermenger / trechter / trog | |
| fat residue / alfalfa / vitamins | vetresten / luzerne / vitamines | nl.js and edu-diet |
| Dantzig's rule / Bland's rule / pivot rule | regel van Dantzig / regel van Bland / pivotregel | edu-simplex |
| simplex path / slack columns / tableaus | simplexpad / slackkolommen / tableaus | |
| ray | halve lijn | not "halfrechte" (Belgian) |
| skilled labor | geschoolde arbeid | Giapetto statement in edu-simplex and lp-shadow |
| cap (upper limit on a quantity) | bovengrens | |
| milling machine / lathe / grinder / machine hours | freesmachine / draaibank / slijpmachine / machine-uren | lp-shadow |
| spare (excess) capacity | overcapaciteit | |
| Management (of a company) | de directie | |
| Sales / Resources (bar labels) | Verkoop / Middelen | |
| beam / beam size / feet | balk / balkmaat / voet (unit ft) | lp-machines |
| Small / Medium / Large / Extra large | Klein / Middelgroot / Groot / Extra groot | |
| rolling mill / beam bay / steel maker | walsmachine / balkvak / staalproducent | |
| operating costs / weekly cost / hour limits | bedrijfskosten / weekkosten / urenlimieten | |
| B down / breakdown / closest plan / short (missing) | B defect / storing / beste benadering / tekort | |
| the next cheapest | de op één na goedkoopste | not "de volgende goedkoopste" |
| technician / experienced / trainee / hire | technicus (pl. technici) / ervaren / trainee / aannemen | lp-workforce, nl.js |
| labor cost / attrition / supervision, supervisor | loonkosten / verloop / begeleiding, begeleider | |
| repair hours / idle / starting team / team balance | reparatie-uren / onbenut / startteam / personeelsbalans | |
| training / month of training / textbook | opleiding / opleidingsmaand / leerboek | |
| fire line / ground crew / helicopter hour | brandfront / grondploeg / helikopteruur (short: heli-uren) | nl.js feas, knap |
| watchtower / rider (delivery) | uitkijktoren / bezorger | nl.js |
| item (in the knapsack) / medical kit / retardant tank / harnesses | voorwerp / EHBO-kit / tank met brandvertrager / klimgordels | nl.js knap |
| search (of a metaheuristic) / worsening proposal | zoektocht / verslechterend voorstel | nl.js tsp |
| synthetic (territory, data) | fictief | nl.js tsp |
| candidate water points / fruit shops / discounters | kandidaatwaterpunten / fruitwinkels / discounters | nl.js research summaries |
