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
| Home (game screen) | Home | Compacta header; "Start" was too close to the "Beginnen" button |
| Linear programming model (heading) | Lineair programmeringsmodel | all Level 1 pages; "LP model" in a statement: LP-model |
| Solved in your browser with the page's simplex solver | Opgelost in je browser met de simplexsolver van deze pagina | "solved" is opgelost, "computed" is berekend: "(in je browser opgelost met de simplexmethode, {it} pivots)", "in je browser berekend met de simplexmethode ({n} pivots)" |
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
| No feasible plan (status) / Feasible plans (legend) | Geen toegelaten plan / Toegelaten plannen | lp-inventory, lp-machines, feasible-region-3d, lp-shadow |
| Slide to z* = {z} / Slide to the cheapest (button) | Schuif naar z* = {z} / Schuif naar het goedkoopste voer | feasible-region-3d, edu-diet |
| (data), after a parameter in a variable list | (gegeven) | "vraag in maand t (gegeven)" |
| dual value(s) / marginal cost | duale waarde(n) / marginale kosten | feasible-region-3d, edu-diet |
| Classic linear programming formulation exercise (footer) | Klassieke formuleringsoefening uit de lineaire programmering | same pattern for other levels; "Money in US dollars": Bedragen in Amerikaanse dollars; "the model treats the quantities as continuous": het model behandelt de aantallen als continu |
| the problem set “Problemas para modelar” | de opgavenverzameling “Problemas para modelar” | lp-shadow footer; "Problems 9 and 10": problemen 9 en 10 |
| Spot the error (Compacta world) | Zoek de fout | |
| closed form / closed-form optimum | gesloten vorm / optimum in gesloten vorm | Level 4 and 5 pages (nlp-kkt, nlp-penalty-barrier, nlp-fairness, other-cournot, other-dea) |
| multiplier (λ) | multiplicator | nlp-kkt, nlp-penalty-barrier; Lagrange-multiplicator stays |
| squared distance | gekwadrateerde afstand | nlp-kkt, nlp-penalty-barrier, nlp-weber; not "afstand in het kwadraat" |
| violation (of a constraint, of a chord) | schending | nlp-convexity, nlp-penalty-barrier |
| stationarity / primal feasibility / dual feasibility | stationariteit / primale toelaatbaarheid / duale toelaatbaarheid | KKT lists |
| first-order condition / second-order test / first-order estimate | eersteordevoorwaarde / tweedeordetoets / schatting van de eerste orde | nlp-stationary, nlp-kkt |
| curve (graph of a function) / graph of f / tangent line | kromme / grafiek van f / raaklijn | a plotted curve in a chart may stay "curve" (other-complexity, other-abm-epidemic) |
| bowl / saddle (surface) / fence / wall (a pictured constraint) | kom / zadel (het zadel) / hek / muur | nlp-stationary, nlp-kkt, nlp-penalty-barrier |
| segment / intersection / union (of sets) | lijnstuk / doorsnede / vereniging | nlp-convexity, other-mcda |
| descent (run) / trapped | afdaling / vastgelopen | nlp-convexity |
| search direction / trial step / full step / backtracking | zoekrichting / proefstap / volle stap / backtracking | nlp-newton |
| stopping rule | stopcriterium | nlp-newton, other-mdp |
| identity matrix / linear system / diagonal entry | eenheidsmatrix / lineair stelsel / diagonaalelement | nlp-newton, other-mdp |
| warm start / cold start / condition number / ill-conditioned | warme start / koude start / conditiegetal / slecht geconditioneerd | nlp-penalty-barrier |
| duality gap | dualiteitskloof | like integraliteitskloof |
| straight-line (distance) | hemelsbreed | nlp-weber, other-complexity; "the straight-line optimum": het euclidische optimum |
| grid (of values, of roads) | raster / wegenraster | "rooster" is a staff roster |
| kink | knik | nlp-weber, other-smoothing; a breakpoint stays knikpunt |
| bisection | bisectie | nlp-slow-steaming, other-decision-tree, other-mcda |
| site (candidate location) / municipality | locatie / gemeente | nlp-weber, other-mcda, nlp-fairness; a construction site is a (bouw)terrein |
| linear utility | lineaire nutsfunctie | nlp-fairness |
| cargo / laden / in ballast / shipowner / nautical mile | lading / beladen / in ballast / reder / zeemijl (nm) | nlp-slow-steaming |
| service time / load (short label, chip, chapter name) | bedieningstijd / bezetting | other-queue-explode; prose keeps bezettingsgraad |
| time average / long-run average | tijdgemiddelde / langetermijngemiddelde | other-queue-explode |
| coefficient of variation / standard deviation / standard error / confidence interval | variatiecoëfficiënt / standaardafwijking / standaardfout / betrouwbaarheidsinterval | |
| random number generator / seeded (run, simulation) | toevalsgenerator / met een vaste seed | other-queue-explode, other-smoothing, other-abm-epidemic, other-cpm |
| policy iteration / policy evaluation / sweep (of value iteration) | beleidsiteratie / beleidsevaluatie / ronde | other-mdp |
| expected discounted cost / error bound / Bellman equation | verwachte verdisconteerde kosten / foutgrens / Bellman-vergelijking | other-mdp |
| scenario tree / extensive form / mean-value problem | scenarioboom / extensieve vorm / probleem met gemiddelde waarden | other-two-stage |
| plan for the average (year) / plan with scenarios | plan op het gemiddelde (jaar) / plan met scenario's | other-two-stage, same preposition as the title |
| perfect forecast / surplus / shortage | perfecte voorspelling / overschot / tekort | other-two-stage |
| payoff / ending (outcome at a leaf) / lot (of produce) | opbrengst / eindpunt / partij | other-decision-tree |
| certainty equivalent / expected utility / risk premium / risk tolerance / risk aversion / risk neutral / attitude to risk | zekerheidsequivalent (CE) / verwacht nut (EU) / risicopremie / risicotolerantie / risicoaversie / risiconeutraal / risicohouding | other-decision-tree; risk averse stays risicomijdend |
| precedence / predecessor / successor | volgorderelatie / voorganger / opvolger | other-cpm, dijkstra |
| merge bias / criticality index / triangular distribution / Gantt chart | samenloopeffect / criticaliteitsindex / driehoeksverdeling / Gantt-diagram | other-cpm |
| augmentation / forward arc / backward arc / breadth-first search | vergroting / voorwaartse boog / achterwaartse boog / breedte-eerst zoeken | other-maxflow |
| spare capacity (of an arc) / flow conservation / max-flow min-cut theorem | vrije capaciteit / stroombehoud / max-flow-min-cut-stelling | other-maxflow; overcapaciteit is excess capacity |
| origin / destination / visited / unvisited / neighbor | beginknoop / bestemming / bezocht / onbezocht / buur (pl. buren) | dijkstra |
| tie / tied | gelijke stand / gelijk staan | dijkstra, other-mcda; not "gelijkspel" (a drawn match) |
| firm / rival / move (in a game) / commit to | bedrijf / concurrent / zet / zich vastleggen op | other-cournot; a choice in a decision tree is a keuze |
| Cournot equilibrium / Stackelberg outcome / iso-profit curve / output (quantity) / inverse demand | Cournot-evenwicht / Stackelberg-uitkomst / isowinstcurve / productie / inverse vraagfunctie | other-cournot; best response curve and reaction line are both reactiecurve |
| monopoly / perfect competition | monopolie / volkomen concurrentie | other-cournot |
| simple exponential smoothing / naive forecast / lag / noise / golden-section search | enkelvoudige exponentiële afvlakking / naïeve voorspelling / vertraging / ruis / methode van de gulden snede | other-smoothing |
| target (DEA) / target level (base stock) | streefpunt / doelniveau | other-dea, other-beer-game |
| input-oriented / scale efficiency / convex combination / isoquant | inputgeoriënteerd / schaalefficiëntie / convexe combinatie / isoquant | other-dea |
| operations (of a computer) / nearest neighbor (heuristic) | bewerkingen (chip: bew.) / heuristiek van de dichtstbijzijnde buur | other-complexity; in prose not "de dichtstbijzijnde buur" alone |
| NP-complete / certificate / P vs NP | NP-volledig / certificaat / P versus NP | other-complexity |
| infectious / final size / fizzle out / staying put | besmettelijk / eindomvang / uitdoven / stilstaan | other-abm-epidemic; besmet is infected |
| retailer / wholesaler / distributor / factory (Beer Game roles) | detaillist / groothandel / distributeur / fabriek | other-beer-game |
| customer demand / shipment / base stock / safety stock / inventory position / net stock | klantvraag / zending / basisvoorraad / veiligheidsvoorraad / voorraadpositie / nettovoorraad | other-beer-game |
| review period / variance ratio / system dynamics | reviewperiode / variantieverhouding / systeemdynamica | other-beer-game |
| Play again (a game) | Opnieuw spelen | other-beer-game; "Opnieuw afspelen" replays an animation |
| decision matrix / weight profile / benefit criterion / cost criterion | beslissingsmatrix / gewichtsprofiel / batencriterium / kostencriterium | other-mcda |
| min-max normalization / vector normalization / closeness (TOPSIS) / rank reversal / scatter plot | min-maxnormalisatie / vectornormalisatie / nabijheid / rangomkering / spreidingsdiagram | other-mcda |
| against / versus (chapter names, titles, captions) | tegenover | "Cournot tegenover Stackelberg", "Wachttijd tegenover bezetting" |
| illustrative but plausible (footer) | illustratief maar plausibel | footer sentence: "Elk getal op deze pagina wordt in je browser uit het model berekend" |
| zoom (of the animation) | het inzoomen / een ingezoomd beeld | not "de zoom" (reads as a hem); the canvas label "zoom ×{z}" stays |
| 1000 and other four-digit numbers in prose and labels | 1.000, 1.000× | other-complexity; inline formulas keep the English digits (1000^(1/2), log₂ 1000) |
| integrality requirement / drop integrality | eis van geheeltalligheid / de eis van geheeltalligheid laten vallen | group A consistency: rounding-trap, cutting-planes, hospital-shifts, milp-mixed-set, milp-lot-sizing; not "geheeltalligheidseis" |
| tighter / weaker (formulation, relaxation, option) | sterker / zwakker | milp-logic, edu-warehouses, milp-lot-sizing; not "strakker"; for M itself: "geldig en scherp", "ruim" (milp-bigm) |
| tightest valid M / the tightest valid choice | kleinste geldige M / de kleinste geldige M (M_t) | milp-bigm, milp-logic, milp-lot-sizing; not "scherpste geldige keuze" |
| valid (plan, inequality, bound) / cut off / let through | geldig / afsnijden / doorlaten | milp-logic, milp-bigm; cutting-planes "geldige ongelijkheid" |
| shaded / hatched (region, strip) | gearceerd | edu-diet, rounding-trap, cutting-planes, milp-mixed-set, milp-bigm, search-tree; not "ingekleurd" |
| step chart / area chart / stacked bar chart | trapdiagram / vlakdiagram / gestapeld staafdiagram | aria labels; not "trapgrafiek" |
| profit line (English without "iso") | winstlijn | milp-mixed-set, milp-bigm; "iso-profit line" stays isowinstlijn |
| tied plans / at this value plans tie | gelijkwaardige plannen / zijn even duur | search-tree, perfect-assignment, milp-bigm, rounding-trap, milp-lot-sizing; greedy ties on a score: "bij een gelijke score" (signal-coverage) |
| lattice, grid of points / lattice point / rounding cell | rooster (van punten) / roosterpunt / afrondingscel | rounding-trap, milp-mixed-set, nl.js summary; a grid of cells or roads is raster |
| slice (of a mixed-integer set) | plak | milp-mixed-set; cost segments stay "segment" (milp-piecewise) |
| preset (scenario selector) / quick pick | scenario ("Vaste scenario's", "Scenario terugzetten") / snelkeuze | rounding-trap, milp-bigm |
| semi-continuous | semicontinu | one word: edu-power, milp-logic ("Semicontinue variabele") |
| be on / be off (switch, plant, budget) | aanstaan / uitstaan | separable verb, so one word in subordinate clauses and after laten: "als de ketel aanstaat", "Laat het budget uitstaan"; "zet ... aan / uit" stays split |
| switch (a binary seen as a switch) / helper switch / threshold switch / conditional bound | schakelaar / hulpschakelaar / drempelschakelaar / voorwaardelijke grens | milp-logic |
| either-or rule / either-or condition / k out of n | of-ofregel / of-ofvoorwaarde / k uit n | milp-bigm, milp-logic; the constraint stays of-ofrestrictie |
| linking constraint / disaggregated / flow balance | koppelrestrictie (koppeling) / uitgesplitst / stroombalans | milp-lot-sizing, milp-logic |
| integrality tolerance / numerics / mode (of a machine) | integraliteitstolerantie / numeriek gedrag / modus (pl. modi) | milp-bigm |
| infeasible, short label where "niet toegelaten" does not fit | onhaalbaar | perfect-assignment chart band and Z stat only (layout); elsewhere niet toegelaten / geen toegelaten oplossing |
| branching variable / branching rule / branching constraints / node selection | vertakkingsvariabele / vertakkingsregel / vertakkingsrestricties / knoopselectie | search-tree |
| root node / parent node / left child / right child | wortelknoop / ouderknoop / linkerkind / rechterkind | search-tree |
| most fractional / first fractional / dive / pseudocosts / strong branching | meest fractionele / eerste fractionele / duiken / pseudokosten / strong branching | search-tree |
| pruned by bound / pruned by infeasibility / infeasibility | gesnoeid door de grens / gesnoeid door niet-toelaatbaarheid / niet-toelaatbaarheid | search-tree |
| source row / fractional part / slack basis / dual simplex / re-optimize | bronrij / fractioneel deel / slackbasis / duale simplexmethode / opnieuw optimaliseren | cutting-planes |
| facet / floating point / tiles (KPI cards) | facet / drijvendekommagetallen / tegels | cutting-planes, rounding-trap |
| denominations / coin system / canonical / pseudo-polynomial | muntwaarden / muntsysteem / canoniek / pseudopolynomiaal | exact-change |
| principle of optimality / optimal substructure / backtracking (path) / Bellman recursion | optimaliteitsprincipe / optimale substructuur / reconstructie (reconstructiepad) / Bellman-recursie | exact-change |
| covering / packing / partitioning | overdekking / pakking / partitionering | signal-coverage; English set name in parentheses at first use |
| range (of an antenna) / covered / redundant / demand point | dekkingsgebied / gedekt / overbodig / vraagpunt | signal-coverage |
| coverage (staff on duty against demand) / spare (staff) / short | bezetting / overtallig / tekort | hospital-shifts; signal coverage is dekking |
| nurse / labor agreement / split weekend / rest day / start day | verpleegkundige / cao / gebroken weekend / rustdag / startdag | hospital-shifts |
| perfect matching / incidence matrix / submatrix / bipartite graph / assignment polytope | perfecte koppeling / incidentiematrix / deelmatrix / bipartiete graaf / de toewijzingspolytoop | perfect-assignment |
| pay (of a rider) / delivery minutes / (thousand pesos) on an axis | vergoeding / bezorgminuten / (in duizenden peso's) | perfect-assignment, compacta |
| open set (of facilities) / shipment, ship / transportation problem | combinatie van open magazijnen (table head: Open magazijnen) / zending, verzenden / transportprobleem | edu-warehouses |
| tier variable / price schedule / economies of scale / SOS2 constraint | staffelvariabele / prijsschema / schaalvoordelen / SOS2-restrictie | milp-piecewise |
| the LP cheats / claimed cost / split (of an order) | het LP speelt vals / beweerde kosten / verdeling | milp-piecewise |
| neighboring (next in a sequence) | opeenvolgend | milp-piecewise (SOS2), milp-runway; not "naburig" |
| price per unit in dollars | $ {v}/t, $ 30/MWh, $ {v}/kg | symbol first with a no-break space, as for dollar amounts; column heads keep the unit: Brandstof ($/MWh) |
| no-load cost / fuel cost / spinning reserve / blackout / merit order | nullastkosten / brandstofkosten / draaiende reserve / stroomuitval / merit order | edu-power |
| base steam / combined cycle / engines / gas peaker (plant names) | Basiscentrale (stoom) / STEG-centrale / Motoren / Piekcentrale (gas) | edu-power |
| start-up (event) / on-off pattern / Can give (MW) | opstart (pl. opstarts) / aan-uitpatroon / Leverbaar (MW) | edu-power |
| run a batch / batch week / build ahead / zero-inventory property / setup pattern | een batch draaien / batchweek / vooruit maken / nulvoorraadeigenschap / omstelpatroon | milp-lot-sizing |
| target time / time window / wake turbulence / holding pattern | streeftijd / tijdvenster / zogturbulentie / wachtpatroon (canvas label: Wachten) | milp-runway |
| Heavy / Medium / Light (wake category) | Zwaar / Middelzwaar / Licht | milp-runway |
| first come (short label) / Yours (short Gantt label) | aankomstvolgorde / Jij | milp-runway; prose keeps "op volgorde van aankomst" |
| trillion | biljoen | 10¹²; billion stays miljard |
| walking buffer / walking radius / market day / weekday / candidate park / daily cap | loopbuffer / loopradius / marktdag / doordeweekse dag (doordeweeks) / kandidaatpark / dagmaximum | research/markets |
| suitability weight / fuzzy AHP weights / membership (fuzzy) | geschiktheidsgewicht / gewichten uit fuzzy AHP / lidmaatschapsgraad | research/markets |
| Produce shops, short canvas label | Groentewinkels | markets animation legend only; elsewhere groente- en fruitwinkels |
| containability cliff / critical window / spread rate / water body / tractability / temporal radius | indammingsklif / kritiek venster / verspreidingssnelheid / waterlichaam / oplosbaarheid / temporele straal | research/wildfire |
| aircraft (firefighting) / site costs / data pipeline | toestel (pl. toestellen; short toest.) / locatiekosten / datapijplijn | research/wildfire; airliners in milp-runway are vliegtuigen |
| box / ramp (airport) / Stage 1, Stage 2 | doos (pl. dozen) / platform / fase 1, fase 2 (lowercase in running text) | research/pallets |
| volumetric capacity / geometric utilisation / mixing penalty / arrival order control / lever | volumecapaciteit / geometrische benutting / straf op menging / sturing van de aankomstvolgorde / hefboom | research/pallets |
| tubers / butcher shops / chain supermarkets / grocery / outskirts / downtown | knolgewassen / slagerijen / ketensupermarkten / kruidenier / buitenwijken / centrum | research/nanostores |
| weekly profit / unit cost / (Eds.) | weekwinst / kosten per eenheid / (red.) | research/nanostores |
| Figures reproduce the study for illustration. | De figuren geven de studie ter illustratie weer. | note line of every research page |
| lecturer / teaching assistant (university) / corporate instructor / with distinction | docent / studentassistent / bedrijfstrainer / met onderscheiding | about; "onderwijsassistent" is a classroom assistant at a school |
| relax (a constraint, a limit) | versoepelen | lp-inventory, milp-logic, milp-bigm, nlp-kkt; "relaxation" stays relaxatie |
| short weekday labels / weekdays in prose | Ma, Di, Wo, Do, Vr, Za, Zo / maandag … zondag | hospital-shifts, research/markets |
| furniture workshop / workshop (short) | meubelwerkplaats / werkplaats | search-tree, cutting-planes, milp-bigm |
| power grid / grid of cells (on a page) | net / raster | edu-power: "Houd het net in balans", "Raster wissen" |
| Custom (selector option) / guess (the player's estimate) / Effort (panel) | Aangepast / schatting / Rekenwerk | exact-change |
| amount of a currency after a number | 50 peso, 1.000 peso (singular, like 10 euro) | exact-change; without a number: peso's, Colombiaanse peso's |
| trace (of a sweep) / drag handle | spoor / greep | milp-bigm, milp-mixed-set |
| too strict / too loose / mismatch (verifier) | te streng / te ruim / afwijking | milp-logic |
| pure cutting-plane method / knapsack cover / flow cover / clique | zuivere snijvlakmethode / knapzakcover / flowcover / clique | cutting-planes |
| bounding box / crew scheduling / Hungarian algorithm | omsluitende rechthoek / bemanningsplanning / het Hongaarse algoritme | rounding-trap, signal-coverage, perfect-assignment |
| AHP scale: equal / moderate / strong / very strong / extreme importance | Gelijk / Matig / Sterk / Zeer sterk / Extreem belang | research/markets |
