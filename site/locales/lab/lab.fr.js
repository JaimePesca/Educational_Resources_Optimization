/* Strings for lab/index.html, the hidden proposals lab (French, "vous"). */
I18N.register("fr", {
  "lab.title": "Laboratoire de propositions",
  "lab.eyebrow": "Laboratoire · Idées pas encore construites",
  "lab.lede": "Des idées de nouvelles ressources, rassemblées ici avant qu'aucune ne soit construite. Chaque carte indique ce que la ressource montrerait et le format qu'elle prendrait. Aucune n'est encore développée.",
  "lab.idea": "Idée",
  "lab.eqHead": "Les équations",
  "lab.stepsHead": "Pas à pas",
  "lab.listLabel": "Propositions",

  "lab.lab-solver.title": "Au cœur du solveur",
  "lab.lab-solver.desc": "L'animation suivrait un solveur MILP depuis le prétraitement (presolve) et la relaxation linéaire jusqu'à l'arbre de séparation et évaluation, avec les coupes qui resserrent la borne et les heuristiques qui trouvent de meilleures solutions en chemin. Deux courbes, la meilleure solution connue et la meilleure borne, se rapprochent pendant que l'écart tombe à 0, comme dans un journal de Gurobi.",

  "lab.lab-cvar.title": "Au-delà de la VaR : la CVaR",
  "lab.lab-cvar.desc": "À partir d'une distribution des pertes, l'animation placerait la VaR comme un quantile et la CVaR comme la moyenne de la queue au-delà. Elle montrerait ensuite comment la formulation de Rockafellar et Uryasev (2000) transforme la CVaR en un programme linéaire sur des scénarios, puis comparerait un portefeuille de variance minimale avec un portefeuille de CVaR minimale.",

  "lab.lab-linearization.title": "Linéariser le modèle des marchés de plein air",
  "lab.lab-linearization.desc": "La contrainte (14) est la seule partie non linéaire du modèle des marchés de plein air : la probabilité logit d'acheter dans un parc a les décisions d'ouverture au numérateur et au dénominateur. En adaptant la méthode de Haase et Müller (2014), l'article la remplace par les contraintes linéaires (24) à (26), fondées sur le rapport (23). L'animation suivrait une zone de demande pendant l'ouverture des parcs, montrerait les droites qui fixent le partage logit et se terminerait sur le calendrier hebdomadaire de l'article.",
  "lab.lab-linearization.step1": "Dans la contrainte (14), la probabilité qu'un client achète dans un parc est une fraction dont le numérateur et le dénominateur dépendent des parcs ouverts le même jour, c'est pourquoi le modèle n'est pas linéaire.",
  "lab.lab-linearization.step2": "Le logit garde une chose fixe : pour chaque parc ouvert, sa part divisée par celle des concurrents est un nombre φ que (23) calcule avant la résolution.",
  "lab.lab-linearization.step3": "L'article ajoute la part des concurrents ȳ comme nouvelle variable et remplace la fraction par des limites linéaires : les parts totalisent au plus 1 (24), un parc reçoit au plus φ fois ȳ (26), et un parc fermé ne reçoit rien tandis qu'un parc ouvert reçoit au plus la part qu'il aurait s'il était seul (25).",
  "lab.lab-linearization.step4": "Lorsque tous les parcs ouverts pèsent autant dans l'objectif, maximiser la demande captée dans une zone et un jour où il y a de la demande pousse les parts vers le haut jusqu'à ce que (24) et chaque (26) d'un parc ouvert soient saturées. Ces limites fixent le partage logit : chaque parc ouvert reçoit φ fois ȳ, avec ȳ = 1/(1 + la somme des φ des parcs ouverts). (25) ne fait qu'éteindre les parcs fermés : un parc ouvert hors de portée de la zone a φ = 0 et ne reçoit rien de toute façon, et pour un parc ouvert à portée, (25) n'est saturée que lorsque ce parc est le seul ouvert à portée de la zone, le seul cas où les trois droites se croisent en un point. Le modèle linéaire évalue donc chaque calendrier exactement comme (14), et les deux modèles ont les mêmes calendriers optimaux et la même valeur optimale ; lorsque plusieurs calendriers sont à égalité, un solveur peut renvoyer n'importe lequel d'entre eux.",
  "lab.lab-linearization.step5": "Il faut pour cela une option extérieure à portée de chaque zone, fournie par le 70e vendeur (autres). Il faut aussi des parts continues : l'article écrit (22) et (27) comme binaires, et avec des valeurs binaires (25) forcerait la part y de chaque parc à 0, car φ/(1 + φ) est inférieur à 1 ; on les lit donc ici comme des valeurs entre 0 et 1, une lecture qui reste à confirmer. De plus, l'étape 4 suppose que les parcs ouverts d'une zone et d'un jour pèsent autant, alors que (13) pondère chaque parc par son poids de l'AHP flou. Avec ces poids, le modèle linéaire peut donner la part d'un parc de poids plus faible à un parc de poids plus fort, et il évalue donc chaque calendrier au moins aussi haut que (14) : c'est une borne supérieure, égale à (14) dans une zone et un jour seulement lorsque le poids de chaque parc ouvert est au moins égal à la moyenne des poids des parcs ouverts, pondérée par φ, multipliée par leur part logit totale. Cette condition peut échouer, donc la correspondance n'est pas exacte en général.",
  "lab.lab-linearization.eq1.cap": "Non linéaire : la part logit (14)",
  "lab.lab-linearization.eq1.tex": "\\begin{aligned}& y_{ijt}=\\frac{e^{V_{ij}}\\, a_{ij}\\, x_{it}}{\\sum_{s\\in I} e^{V_{sj}}\\, a_{sj}\\, x_{st}+\\sum_{s\\in S\\setminus I} e^{V_{sj}}\\, a_{sj}} && (14)\\\\[2pt]& \\quad \\forall\\, i,\\ j,\\ t\\end{aligned}",
  "lab.lab-linearization.eq1.formula": "y_ijt = e^V_ij · a_ij · x_it / (Σ_{s∈I} e^V_sj · a_sj · x_st + Σ_{s∈S∖I} e^V_sj · a_sj)   ∀ i, j, t   (14)",
  "lab.lab-linearization.eq2.cap": "Remplacement linéaire : (23) à (26)",
  "lab.lab-linearization.eq2.tex": "\\begin{aligned}& \\varphi_{ij}=\\frac{e^{V_{ij}}\\, a_{ij}}{\\sum_{s\\in S\\setminus I} e^{V_{sj}}\\, a_{sj}} && \\forall\\, i,\\ j && (23)\\\\[4pt]& \\bar y_{jt}+\\sum_{i\\in I} y_{ijt}\\le 1 && \\forall\\, j,\\ t && (24)\\\\& y_{ijt}\\le \\frac{\\varphi_{ij}}{1+\\varphi_{ij}}\\, x_{it} && \\forall\\, i,\\ j,\\ t && (25)\\\\& y_{ijt}\\le \\varphi_{ij}\\, \\bar y_{jt} && \\forall\\, i,\\ j,\\ t && (26)\\end{aligned}",
  "lab.lab-linearization.eq2.formula": "φ_ij = e^V_ij · a_ij / Σ_{s∈S∖I} e^V_sj · a_sj   ∀ i, j   (23)\nȳ_jt + Σ_{i∈I} y_ijt ≤ 1   ∀ j, t   (24)\ny_ijt ≤ φ_ij / (1 + φ_ij) · x_it   ∀ i, j, t   (25)\ny_ijt ≤ φ_ij · ȳ_jt   ∀ i, j, t   (26)",
  "lab.lab-linearization.eqNote": "(14) est écrite comme sur la page de recherche, et (23) utilise les mêmes concurrents S∖I avec a_{sj}. Le manuscrit écrit a_{ij} dans les deux sommes du dénominateur de (14), J∖I sans a_{sj} dans (23) et un v minuscule dans ces sommes et dans (23) ; son texte, p. 16, appelle le paramètre φ_{jt}.",

  "lab.lab-ml-methods.title": "Apprendre, c'est optimiser",
  "lab.lab-ml-methods.desc": "La régression linéaire, la régression logistique et les petits réseaux de neurones apprennent en minimisant une perte : chacun est donc un problème d'optimisation. L'animation déplacerait la droite ajustée ou la frontière de décision pas à pas pendant que la courbe de perte descend à côté.",

  "lab.lab-svm.title": "La rue la plus large",
  "lab.lab-svm.desc": "Une machine à vecteurs de support cherche la rue la plus large qui sépare deux classes, ce qui est un problème quadratique de marge maximale. L'animation mettrait en évidence les vecteurs de support qui tiennent la rue en place, puis passerait à la marge souple, où le paramètre C échange des erreurs de classification contre une marge plus large.",

  "lab.lab-ml-ai-cases.title": "ML + IA en optimisation",
  "lab.lab-ml-ai-cases.desc": "Quatre cas où l'apprentissage aide l'optimisation : apprendre à brancher, prédire puis optimiser, apprentissage par renforcement pour les tournées de véhicules et agents de langage qui formulent des modèles d'optimisation à partir d'un texte. Chaque cas aurait un petit exemple interactif qui s'exécute dans le navigateur."
}, "lab/lab");
