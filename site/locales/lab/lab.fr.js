/* Strings for lab/index.html, the hidden proposals lab (French, "vous"). */
I18N.register("fr", {
  "lab.title": "Laboratoire de propositions",
  "lab.eyebrow": "Laboratoire · Prototypes avant le parcours",
  "lab.lede": "De nouvelles ressources, construites et testées ici avant de rejoindre le parcours d'apprentissage. Chaque carte indique ce que la page montre et le format qu'elle prend ; ouvrez-la pour essayer le prototype. Aucune n'est encore sur la page d'accueil.",
  "lab.idea": "Idée",
  "lab.built": "Construit",
  "lab.open": "Ouvrir",
  "lab.eqHead": "Les équations",
  "lab.stepsHead": "Pas à pas",
  "lab.listLabel": "Propositions",

  "lab.lab-solver.title": "Au cœur du solveur",
  "lab.lab-solver.desc": "Un petit MILP, une brûlerie de Manizales qui planifie des lots entiers, est résolu en direct : prétraitement (presolve), relaxation linéaire, une coupe de Gomory qui resserre la borne, une heuristique d'arrondi qui trouve de meilleures solutions et l'arbre de séparation et évaluation. La meilleure solution connue et la meilleure borne se rapprochent pendant que l'écart tombe à 0, dans un journal inspiré de ceux qu'impriment les solveurs commerciaux.",

  "lab.lab-cvar.title": "Au-delà de la VaR : la CVaR",
  "lab.lab-cvar.desc": "Sur 200 mois simulés d'actions colombiennes, d'obligations TES et de dollars, l'animation place la VaR comme un quantile et la CVaR comme la moyenne de la queue au-delà. Elle montre ensuite comment la formulation de Rockafellar et Uryasev (2000) transforme la CVaR en un programme linéaire sur des scénarios, puis compare le portefeuille de variance minimale avec celui de CVaR minimale.",

  "lab.lab-linearization.title": "Linéariser le modèle des marchés de plein air",
  "lab.lab-linearization.desc": "La contrainte (14) est la seule partie non linéaire du modèle des marchés de plein air : la probabilité logit d'acheter dans un parc a les décisions d'ouverture au numérateur et au dénominateur. En adaptant la méthode de Haase et Müller (2014), l'article la remplace par les contraintes linéaires (24) à (26), fondées sur le rapport (23). L'animation suit une zone de demande pendant l'ouverture des parcs, trace les droites qui fixent le partage logit et montre quand le modèle linéaire est exact et quand il n'est qu'une borne supérieure.",
  "lab.lab-linearization.step1": "Dans la contrainte (14), la probabilité qu'un client achète dans un parc est une fraction dont le numérateur et le dénominateur dépendent des parcs ouverts le même jour, c'est pourquoi le modèle n'est pas linéaire.",
  "lab.lab-linearization.step2": "Le logit garde une chose fixe : pour chaque parc ouvert, sa part divisée par celle des concurrents est un nombre φ que (23) calcule avant la résolution.",
  "lab.lab-linearization.step3": "L'article ajoute la part des concurrents ȳ comme nouvelle variable et remplace la fraction par des limites linéaires : les parts totalisent au plus 1 (24), un parc reçoit au plus φ fois ȳ (26), et un parc fermé ne reçoit rien tandis qu'un parc ouvert reçoit au plus la part qu'il aurait s'il était seul (25).",
  "lab.lab-linearization.step4": "Lorsque tous les parcs ouverts pèsent autant dans l'objectif, l'optimum pousse les parts vers le haut jusqu'à ce que (24) et (26) soient saturées, ce qui reproduit le partage logit : chaque parc ouvert reçoit φ fois ȳ. (25) ne fait qu'éteindre les parcs fermés. Les deux modèles ont donc les mêmes calendriers optimaux.",
  "lab.lab-linearization.step5": "Deux conditions : chaque zone a besoin d'une option extérieure (le vendeur 70, « autres ») et les parts doivent être lues comme continues entre 0 et 1. Avec les poids inégaux de l'AHP flou dans (13), le modèle linéaire donne une borne supérieure de (14), pas toujours la même valeur.",
  "lab.lab-linearization.eq1.cap": "Non linéaire : la part logit (14)",
  "lab.lab-linearization.eq1.tex": "\\begin{aligned}& y_{ijt}=\\frac{e^{V_{ij}}\\, a_{ij}\\, x_{it}}{\\sum_{s\\in I} e^{V_{sj}}\\, a_{sj}\\, x_{st}+\\sum_{s\\in S\\setminus I} e^{V_{sj}}\\, a_{sj}} && (14)\\\\[2pt]& \\quad \\forall\\, i,\\ j,\\ t\\end{aligned}",
  "lab.lab-linearization.eq1.formula": "y_ijt = e^V_ij · a_ij · x_it / (Σ_{s∈I} e^V_sj · a_sj · x_st + Σ_{s∈S∖I} e^V_sj · a_sj)   ∀ i, j, t   (14)",
  "lab.lab-linearization.eq2.cap": "Remplacement linéaire : (23) à (26)",
  "lab.lab-linearization.eq2.tex": "\\begin{aligned}& \\varphi_{ij}=\\frac{e^{V_{ij}}\\, a_{ij}}{\\sum_{s\\in S\\setminus I} e^{V_{sj}}\\, a_{sj}} && \\forall\\, i,\\ j && (23)\\\\[4pt]& \\bar y_{jt}+\\sum_{i\\in I} y_{ijt}\\le 1 && \\forall\\, j,\\ t && (24)\\\\& y_{ijt}\\le \\frac{\\varphi_{ij}}{1+\\varphi_{ij}}\\, x_{it} && \\forall\\, i,\\ j,\\ t && (25)\\\\& y_{ijt}\\le \\varphi_{ij}\\, \\bar y_{jt} && \\forall\\, i,\\ j,\\ t && (26)\\end{aligned}",
  "lab.lab-linearization.eq2.formula": "φ_ij = e^V_ij · a_ij / Σ_{s∈S∖I} e^V_sj · a_sj   ∀ i, j   (23)\nȳ_jt + Σ_{i∈I} y_ijt ≤ 1   ∀ j, t   (24)\ny_ijt ≤ φ_ij / (1 + φ_ij) · x_it   ∀ i, j, t   (25)\ny_ijt ≤ φ_ij · ȳ_jt   ∀ i, j, t   (26)",
  "lab.lab-linearization.eqNote": "(14) est écrite comme sur la page de recherche, et (23) utilise les mêmes concurrents S∖I avec a_{sj}. Le manuscrit écrit a_{ij} dans les deux sommes du dénominateur de (14), J∖I sans a_{sj} dans (23) et un v minuscule dans ces sommes et dans (23) ; son texte, p. 16, appelle le paramètre φ_{jt}.",

  "lab.lab-ml-methods.title": "Apprendre, c'est optimiser",
  "lab.lab-ml-methods.desc": "La régression linéaire, la régression logistique et les petits réseaux de neurones apprennent en minimisant une perte : chacun est donc un problème d'optimisation. L'animation entraîne les trois en direct par descente de gradient, déplace la droite ajustée ou la frontière de décision pas à pas pendant que la courbe de perte descend à côté, et montre ce qui se passe quand le pas est trop petit ou trop grand.",

  "lab.lab-svm.title": "La rue la plus large",
  "lab.lab-svm.desc": "Une machine à vecteurs de support cherche la rue la plus large qui sépare deux classes, ce qui est un problème quadratique de marge maximale. Sur 24 lots de café classés par altitude et densité du grain, l'animation met en évidence les vecteurs de support qui tiennent la rue en place, montre comment un lot atypique casse la marge stricte, puis passe à la marge souple, où le paramètre C échange des erreurs de classification contre une marge plus large.",

  "lab.lab-ml-ai-cases.title": "ML + IA en optimisation",
  "lab.lab-ml-ai-cases.desc": "Quatre petits cas où l'apprentissage aide l'optimisation, chacun s'exécutant réellement dans le navigateur : un branch and bound qui apprend où brancher, une prévision de la demande ajustée pour la décision qu'elle alimente, une camionnette de livraison qui apprend son itinéraire par essais et erreurs et que l'on compare au plus court chemin, et un vérificateur automatique qui teste des formulations déjà écrites comme celles qu'un agent de langage pourrait produire.",

  "lab.lab-svm-dual.title": "SVM, niveau 2 : la rue duale",
  "lab.lab-svm-dual.desc": "Les mêmes 24 lots de café que dans La rue la plus large, vus cette fois du côté dual. Chaque lot reçoit un multiplicateur de Lagrange, et l'animation résout le programme quadratique dual deux multiplicateurs à la fois (SMO) pendant que l'objectif dual monte, que l'objectif primal descend et que l'écart de dualité se referme à 0. À la fin, seuls les vecteurs de support gardent un multiplicateur non nul, et la rue est reconstruite à partir d'eux seuls. Le dual n'a besoin que de produits scalaires entre les lots, ce qui ouvre la porte au niveau 3.",

  "lab.lab-svm-kernel.title": "SVM, niveau 3 : l'astuce du noyau",
  "lab.lab-svm-kernel.desc": "Un lot de café en séchage est bon quand son humidité et sa température sont proches d'un point idéal, si bien qu'aucune droite ne sépare les bons lots des mauvais. L'animation élève les lots en trois dimensions, où un plan les sépare, puis ramène ce plan en bas sous la forme d'un cercle. Vient ensuite l'astuce : le dual n'utilise que des produits scalaires, donc un noyau les calcule dans l'espace élevé sans jamais le construire, jusqu'au noyau gaussien (RBF), dont la largeur décide à quel point la frontière suit les données.",

  "lab.lab-fahp.title": "AHP, ensembles flous et AHP flou",
  "lab.lab-fahp.desc": "Un torréfacteur de Medellín choisit entre trois fournisseurs de café selon quatre critères. D'abord l'AHP classique : comparez les critères deux à deux sur l'échelle de Saaty, obtenez les poids par le vecteur propre principal et laissez le ratio de cohérence vous avertir quand vos jugements se contredisent. Ensuite les ensembles flous : transformez des mots comme « modérément plus important » en nombres flous triangulaires et calculez avec eux. Enfin les deux ensemble : les jugements de trois experts donnent des poids flous par la moyenne géométrique de Buckley, et la page montre quand l'incertitude suffit à changer le classement."
}, "lab/lab");
