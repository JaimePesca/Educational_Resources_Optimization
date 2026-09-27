/* Chaînes de resources/two-stories.html (français).
 * Les clés two.s.* contiennent deux variantes séparées par " || " : histoire A (pharmaceutique) || histoire B (boissons).
 * Les clés two.f.* sont les fragments fixes entre elles. Les espaces autour des fragments comptent. */
I18N.register("fr", {
  "two.title": "Deux histoires, un modèle",
  "two.eyebrow": "Niveau 1 · Programmation linéaire · <b>Exemple guidé</b>",
  "two.lede": "Déplacez le curseur pour réécrire le problème. Les mots changent de secteur ; les nombres et le modèle restent en place.",

  "two.ver.a": "version pharmaceutique",
  "two.ver.b": "version boissons",
  "two.scrubAria": "Transition entre la version pharmaceutique et la version boissons",
  "two.play": "Réécrire",
  "two.stmt.kicker": "Énoncé",

  "two.ledger.swap": "fragments de texte changent",
  "two.ledger.data": "sur les {n} données numériques",
  "two.ledger.rows": "sur les {n} lignes du modèle",

  "two.vars.title": "Variables de décision",
  "two.model.title": "Programme linéaire",
  "two.m.obj": "recettes moins coût d'achat",
  "two.m.r1": "mélange minimal du produit 1",
  "two.m.r2": "mélange minimal du produit 2",
  "two.m.r3": "vente maximale du produit 1",
  "two.m.r4": "vente maximale du produit 2",
  "two.m.r5": "achat maximal de l'intrant 1",
  "two.m.r6": "achat maximal de l'intrant 2",
  "two.m.r7": "non-négativité",
  "two.sol": "Valeur optimale dans les deux cas : <span class=\"mono\">z = 15</span>, par exemple avec <span class=\"mono\">x₁ = 35, x₂ = 15, y₁ = y₂ = 0</span>. Ce n'est pas le seul optimum : la fonction objectif se simplifie en z = x₂ − y₁, donc y₂ peut prendre n'importe quelle valeur entre 0 et 25 sans changer z. Le modèle ne sait pas s'il mélange des médicaments ou du jus : il ne voit que des intrants, des produits, des prix et des limites.",

  "two.hint": "Touchez un nombre de l'énoncé pour voir à quelle ligne du modèle il correspond.",
  "two.footer": "Ressource pédagogique · Les mêmes données racontées comme deux entreprises différentes. Les nombres et le programme linéaire ne changent jamais ; seuls les mots changent.",

  "two.s.company": "Eli Daisy || Frutal SA",
  "two.s.inputs": "produits chimiques || concentrés",
  "two.s.products": "médicaments || boissons",
  "two.s.ProductCap": "Le médicament || La boisson",
  "two.s.product": "le médicament || la boisson",
  "two.s.input": "produit chimique || concentré",
  "two.s.unitsOfProduct": "oz du médicament || litres de la boisson",
  "two.s.unitsOfInput": "oz du produit chimique || litres du concentré",
  "two.s.perUnit": "l'once || le litre",
  "two.s.companyShort": "Daisy || Frutal",

  "two.f.sp": " ",
  "two.f.uses": " utilise les ",
  "two.f.and": " et ",
  "two.f.toMake": " pour fabriquer deux ",
  "two.f.dot": ". ",
  "two.f.mustContain": " doit contenir au moins ",
  "two.f.of": " du ",
  "two.f.commaAnd": ", et ",
  "two.f.sell1": ". On peut vendre jusqu'à ",
  "two.f.sell2": ". On peut vendre jusqu'à ",
  "two.f.sellAt": " à ",
  "two.f.buy1": ". On peut acheter jusqu'à ",
  "two.f.buy2": ", et jusqu'à ",
  "two.f.buyAt": " à ",
  "two.f.ask": ". Formulez un PL qui maximise le bénéfice de ",
  "two.f.end": ".",

  "two.v.units": "oz || litres",
  "two.v.of": " de ",
  "two.v.input": "produit chimique || concentré",
  "two.v.usedIn": "utilisées dans le médicament || utilisés dans la boisson"
}, "resources/two-stories");
