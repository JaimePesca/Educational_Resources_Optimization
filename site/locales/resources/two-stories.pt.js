/* Textos de resources/two-stories.html (português do Brasil).
 * As chaves two.s.* têm duas variantes separadas por " || ": história A (farmacêutica) || história B (bebidas).
 * As chaves two.f.* são os fragmentos fixos entre elas. Os espaços ao redor dos fragmentos importam. */
I18N.register("pt", {
  "two.title": "Duas histórias, um modelo",
  "two.eyebrow": "Nível 1 · Programação linear · <b>Exemplo guiado</b>",
  "two.lede": "Mova o controle para reescrever o problema. As palavras mudam de setor; os números e o modelo ficam onde estão.",

  "two.ver.a": "versão farmacêutica",
  "two.ver.b": "versão de bebidas",
  "two.scrubAria": "Transição entre a versão farmacêutica e a de bebidas",
  "two.play": "Reescrever",
  "two.stmt.kicker": "Enunciado",

  "two.ledger.swap": "fragmentos de texto mudam",
  "two.ledger.data": "dos {n} dados numéricos",
  "two.ledger.rows": "das {n} linhas do modelo",

  "two.vars.title": "Variáveis de decisão",
  "two.model.title": "Programa linear",
  "two.m.obj": "receita menos custo de compra",
  "two.m.r1": "mistura mínima do produto 1",
  "two.m.r2": "mistura mínima do produto 2",
  "two.m.r3": "venda máxima do produto 1",
  "two.m.r4": "venda máxima do produto 2",
  "two.m.r5": "compra máxima do insumo 1",
  "two.m.r6": "compra máxima do insumo 2",
  "two.m.r7": "não negatividade",
  "two.sol": "Valor ótimo nos dois casos: <span class=\"mono\">z = 15</span>, por exemplo com <span class=\"mono\">x₁ = 35, x₂ = 15, y₁ = y₂ = 0</span>. Não é o único ótimo: a função objetivo se simplifica para z = x₂ − y₁, então y₂ pode assumir qualquer valor entre 0 e 25 sem mudar z. O modelo não sabe se está misturando medicamentos ou suco: ele só vê insumos, produtos, preços e limites.",

  "two.hint": "Toque em um número do enunciado para ver a qual linha do modelo ele chega.",
  "two.footer": "Recurso didático · Os mesmos dados contados como dois negócios diferentes. Os números e o programa linear nunca mudam; só mudam as palavras.",

  "two.s.company": "Eli Daisy || Frutal S.A.",
  "two.s.inputs": "produtos químicos || concentrados",
  "two.s.products": "dois medicamentos || duas bebidas",
  "two.s.ProductCap": "O medicamento || A bebida",
  "two.s.product": "o medicamento || a bebida",
  "two.s.input": "produto químico || concentrado",
  "two.s.unitsOfProduct": "oz do medicamento || litros da bebida",
  "two.s.unitsOfInput": "oz do produto químico || litros do concentrado",
  "two.s.perUnit": "por onça || por litro",
  "two.s.companyShort": "Daisy || Frutal",

  "two.f.sp": " ",
  "two.f.uses": " utiliza os ",
  "two.f.and": " e ",
  "two.f.toMake": " para produzir ",
  "two.f.dot": ". ",
  "two.f.mustContain": " deve conter pelo menos ",
  "two.f.of": " do ",
  "two.f.commaAnd": ", e ",
  "two.f.sell1": ". É possível vender até ",
  "two.f.sell2": ". É possível vender até ",
  "two.f.sellAt": " a ",
  "two.f.buy1": ". É possível comprar até ",
  "two.f.buy2": ", e até ",
  "two.f.buyAt": " a ",
  "two.f.ask": ". Formule um PL que maximize o lucro da ",
  "two.f.end": ".",

  "two.v.units": "oz || litros",
  "two.v.of": " de ",
  "two.v.input": "produto químico || concentrado",
  "two.v.usedIn": "usadas no medicamento || usados na bebida"
}, "resources/two-stories");
