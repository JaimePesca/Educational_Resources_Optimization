/* Strings for resources/two-stories.html (Spanish, the author's original wording).
 * two.s.* keys hold two variants separated by " || ": story A (pharmaceutical) || story B (beverages).
 * two.f.* keys are the fixed fragments between them. Spaces around fragments matter. */
I18N.register("es", {
  "two.title": "Dos historias, un modelo",
  "two.eyebrow": "Nivel 1 · Programación lineal · <b>Ejemplo guiado</b>",
  "two.lede": "Mueva el control para reescribir el problema. Las palabras cambian de industria; los números y el modelo se quedan quietos.",

  "two.ver.a": "versión farmacéutica",
  "two.ver.b": "versión de bebidas",
  "two.scrubAria": "Transición entre la versión farmacéutica y la de bebidas",
  "two.play": "Reescribir",
  "two.stmt.kicker": "Enunciado",

  "two.ledger.swap": "fragmentos de texto cambian",
  "two.ledger.data": "de los {n} datos numéricos",
  "two.ledger.rows": "de las {n} líneas del modelo",

  "two.vars.title": "Variables de decisión",
  "two.model.title": "Programa lineal",
  "two.m.obj": "ingresos menos costo de compra",
  "two.m.r1": "mezcla mínima del producto 1",
  "two.m.r2": "mezcla mínima del producto 2",
  "two.m.r3": "venta máxima del producto 1",
  "two.m.r4": "venta máxima del producto 2",
  "two.m.r5": "compra máxima del insumo 1",
  "two.m.r6": "compra máxima del insumo 2",
  "two.m.r7": "no negatividad",
  "two.sol": "Óptimo en ambos casos: <span class=\"mono\">x₁ = 35, x₂ = 15, y₁ = y₂ = 0</span>, con <span class=\"mono\">z = 15</span>. El modelo no sabe si está mezclando fármacos o jugo: solo ve insumos, productos, precios y límites.",

  "two.hint": "Toque un número del enunciado para ver a qué línea del modelo llega.",
  "two.footer": "Recurso didáctico · Los mismos datos contados como dos negocios distintos. Los números y el programa lineal nunca cambian; solo cambian las palabras.",

  "two.s.company": "Eli Daisy || Frutal S.A.",
  "two.s.inputs": "productos químicos || concentrados",
  "two.s.products": "fármacos || bebidas",
  "two.s.ProductCap": "El fármaco || La bebida",
  "two.s.product": "el fármaco || la bebida",
  "two.s.input": "producto químico || concentrado",
  "two.s.unitsOfProduct": "oz del fármaco || litros de la bebida",
  "two.s.unitsOfInput": "oz del producto químico || litros del concentrado",
  "two.s.perUnit": "dólares la onza || dólares el litro",
  "two.s.companyShort": "Daisy || Frutal",

  "two.f.sp": " ",
  "two.f.uses": " utiliza los ",
  "two.f.and": " y ",
  "two.f.toMake": " para elaborar dos ",
  "two.f.dot": ". ",
  "two.f.mustContain": " debe contener por lo menos el ",
  "two.f.of": " del ",
  "two.f.commaAnd": ", y ",
  "two.f.sell1": ". Se pueden vender hasta ",
  "two.f.sell2": ". Se pueden vender hasta ",
  "two.f.sellAt": " a ",
  "two.f.buy1": ". Se pueden comprar hasta ",
  "two.f.buy2": ", y se pueden comprar hasta ",
  "two.f.buyAt": " a ",
  "two.f.ask": ". Plantee un PL que maximice las utilidades de ",
  "two.f.end": ".",

  "two.v.units": "oz || litros",
  "two.v.of": " de ",
  "two.v.input": "químico || concentrado",
  "two.v.usedIn": "usadas en el fármaco || usados en la bebida"
}, "resources/two-stories");
