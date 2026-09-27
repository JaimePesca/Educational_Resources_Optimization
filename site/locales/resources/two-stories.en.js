/* Strings for resources/two-stories.html (English, reference).
 * two.s.* keys hold two variants separated by " || ": story A (pharmaceutical) || story B (beverages).
 * two.f.* keys are the fixed fragments between them. Spaces around fragments matter. */
I18N.register("en", {
  "two.title": "Two Stories, One Model",
  "two.eyebrow": "Level 1 · Linear programming · <b>Worked example</b>",
  "two.lede": "Move the control to rewrite the problem. The words switch industries; the numbers and the model stay put.",

  "two.ver.a": "pharmaceutical version",
  "two.ver.b": "beverage version",
  "two.scrubAria": "Transition between the pharmaceutical and the beverage version",
  "two.play": "Rewrite",
  "two.stmt.kicker": "Problem statement",

  "two.ledger.swap": "text fragments change",
  "two.ledger.data": "of the {n} numerical data",
  "two.ledger.rows": "of the {n} lines of the model",

  "two.vars.title": "Decision variables",
  "two.model.title": "Linear program",
  "two.m.obj": "revenue minus purchase cost",
  "two.m.r1": "minimum blend of product 1",
  "two.m.r2": "minimum blend of product 2",
  "two.m.r3": "maximum sales of product 1",
  "two.m.r4": "maximum sales of product 2",
  "two.m.r5": "maximum purchase of input 1",
  "two.m.r6": "maximum purchase of input 2",
  "two.m.r7": "non-negativity",
  "two.sol": "Optimal in both cases: <span class=\"mono\">x₁ = 35, x₂ = 15, y₁ = y₂ = 0</span>, with <span class=\"mono\">z = 15</span>. The model does not know whether it is blending drugs or juice: it only sees inputs, products, prices and limits.",

  "two.hint": "Touch a number in the statement to see which line of the model it reaches.",
  "two.footer": "Educational resource · The same data told as two different businesses. The numbers and the linear program never change; only the words do.",

  "two.s.company": "Eli Daisy || Frutal Inc.",
  "two.s.inputs": "chemicals || concentrates",
  "two.s.products": "drugs || beverages",
  "two.s.ProductCap": "Drug || Beverage",
  "two.s.product": "drug || beverage",
  "two.s.input": "chemical || concentrate",
  "two.s.unitsOfProduct": "oz of drug || liters of beverage",
  "two.s.unitsOfInput": "oz of chemical || liters of concentrate",
  "two.s.perUnit": "per ounce || per liter",
  "two.s.companyShort": "Daisy || Frutal",

  "two.f.sp": " ",
  "two.f.uses": " uses ",
  "two.f.and": " and ",
  "two.f.toMake": " to produce two ",
  "two.f.dot": ". ",
  "two.f.mustContain": " must contain at least ",
  "two.f.of": " of ",
  "two.f.commaAnd": ", and ",
  "two.f.sell1": ". Up to ",
  "two.f.sell2": ". Up to ",
  "two.f.sellAt": " can be sold at ",
  "two.f.buy1": ". Up to ",
  "two.f.buy2": ", and up to ",
  "two.f.buyAt": " can be purchased at ",
  "two.f.ask": ". Formulate an LP that maximizes ",
  "two.f.end": "’s profit.",

  "two.v.units": "oz || liters",
  "two.v.of": " of ",
  "two.v.input": "chemical || concentrate",
  "two.v.usedIn": "used in drug || used in beverage"
}, "resources/two-stories");
