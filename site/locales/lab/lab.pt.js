/* Strings for lab/index.html, the hidden proposals lab (Portuguese, Brazil, "você"). */
I18N.register("pt", {
  "lab.title": "Laboratório de propostas",
  "lab.eyebrow": "Laboratório · Ideias ainda não construídas",
  "lab.lede": "Ideias para novos recursos, reunidas aqui antes que qualquer uma delas seja construída. Cada cartão diz o que o recurso mostraria e qual formato teria. Nenhuma delas foi desenvolvida ainda.",
  "lab.idea": "Ideia",
  "lab.eqHead": "As equações",
  "lab.stepsHead": "Passo a passo",
  "lab.listLabel": "Propostas",

  "lab.lab-solver.title": "Por dentro do solver",
  "lab.lab-solver.desc": "A animação acompanharia um solver de MILP desde o pré-processamento (presolve) e a relaxação linear até a árvore de branch and bound, com cortes que apertam o limitante e heurísticas que encontram novas incumbentes pelo caminho. Duas curvas, a incumbente e o melhor limitante, se aproximam enquanto o gap cai para 0, como no registro (log) do Gurobi.",

  "lab.lab-cvar.title": "Além do VaR: o CVaR",
  "lab.lab-cvar.desc": "A partir de uma distribuição de perdas, a animação marcaria o VaR como um quantil e o CVaR como a média da cauda além dele. Depois mostraria como a formulação de Rockafellar e Uryasev (2000) transforma o CVaR em um programa linear sobre cenários e compararia uma carteira de variância mínima com uma de CVaR mínimo.",

  "lab.lab-linearization.title": "Linearizar o modelo de feiras livres",
  "lab.lab-linearization.desc": "A restrição (14) é a única parte não linear do modelo de feiras livres: a probabilidade logit de comprar em um parque tem as decisões de abertura no numerador e no denominador. Adaptando o método de Haase e Müller (2014), o artigo a substitui pelas restrições lineares (24) a (26), apoiadas na razão (23). A animação acompanharia uma célula de demanda enquanto os parques abrem, mostraria as retas que fixam a divisão logit e terminaria no calendário semanal do artigo.",
  "lab.lab-linearization.step1": "Na restrição (14) a probabilidade de um cliente comprar em um parque é uma fração cujo numerador e denominador dependem de quais parques abrem naquele dia, por isso o modelo é não linear.",
  "lab.lab-linearization.step2": "O logit mantém algo fixo: para cada parque aberto, a sua participação dividida pela dos concorrentes é um número φ que (23) calcula antes de resolver.",
  "lab.lab-linearization.step3": "O artigo acrescenta a participação dos concorrentes ȳ como nova variável e troca a fração por limites lineares: todas as participações somam no máximo 1 (24), um parque recebe no máximo φ vezes ȳ (26) e um parque fechado não recebe nada, enquanto um aberto recebe no máximo o que teria se estivesse sozinho (25).",
  "lab.lab-linearization.step4": "Quando todos os parques abertos pesam o mesmo no objetivo, maximizar a demanda captada em uma célula e um dia com demanda eleva as participações até que (24) e cada (26) de um parque aberto valham com igualdade. Esses limites fixam a divisão logit: cada parque aberto recebe φ vezes ȳ, com ȳ = 1/(1 + a soma de φ dos parques abertos). (25) só desliga os parques fechados: um parque aberto fora do alcance da célula tem φ = 0 e não recebe nada de qualquer forma, e para um parque aberto ao alcance (25) vale com igualdade apenas quando ele é o único aberto ao alcance da célula, o único caso em que as três retas se cruzam em um ponto. Assim, o modelo linear avalia cada calendário exatamente como (14), e os dois modelos têm os mesmos calendários ótimos e o mesmo valor ótimo; quando vários calendários empatam, um solver pode devolver qualquer um deles.",
  "lab.lab-linearization.step5": "Isso exige uma opção externa ao alcance de cada célula, garantida pelo vendedor 70 (outros). Também exige participações contínuas: o artigo escreve (22) e (27) como binárias, e com valores binários (25) forçaria a participação y de cada parque a valer 0, porque φ/(1 + φ) é menor que 1; por isso aqui elas são lidas como valores entre 0 e 1, uma leitura que ainda falta confirmar. Além disso, o passo 4 supõe que os parques abertos de uma célula e de um dia pesam o mesmo, enquanto (13) pondera cada parque pelo seu peso do AHP fuzzy. Com esses pesos o modelo linear pode passar a participação de um parque de menor peso para um de maior peso, então avalia cada calendário com um valor pelo menos igual ao de (14): é um limite superior, igual a (14) em uma célula e um dia só quando o peso de cada parque aberto é pelo menos a média dos pesos dos parques abertos, ponderada por φ, multiplicada pela participação logit conjunta deles. Essa condição pode falhar, então a coincidência não é exata em geral.",
  "lab.lab-linearization.eq1.cap": "Não linear: a participação logit (14)",
  "lab.lab-linearization.eq1.tex": "\\begin{aligned}& y_{ijt}=\\frac{e^{V_{ij}}\\, a_{ij}\\, x_{it}}{\\sum_{s\\in I} e^{V_{sj}}\\, a_{sj}\\, x_{st}+\\sum_{s\\in S\\setminus I} e^{V_{sj}}\\, a_{sj}} && (14)\\\\[2pt]& \\quad \\forall\\, i,\\ j,\\ t\\end{aligned}",
  "lab.lab-linearization.eq1.formula": "y_ijt = e^V_ij · a_ij · x_it / (Σ_{s∈I} e^V_sj · a_sj · x_st + Σ_{s∈S∖I} e^V_sj · a_sj)   ∀ i, j, t   (14)",
  "lab.lab-linearization.eq2.cap": "Substituição linear: (23) a (26)",
  "lab.lab-linearization.eq2.tex": "\\begin{aligned}& \\varphi_{ij}=\\frac{e^{V_{ij}}\\, a_{ij}}{\\sum_{s\\in S\\setminus I} e^{V_{sj}}\\, a_{sj}} && \\forall\\, i,\\ j && (23)\\\\[4pt]& \\bar y_{jt}+\\sum_{i\\in I} y_{ijt}\\le 1 && \\forall\\, j,\\ t && (24)\\\\& y_{ijt}\\le \\frac{\\varphi_{ij}}{1+\\varphi_{ij}}\\, x_{it} && \\forall\\, i,\\ j,\\ t && (25)\\\\& y_{ijt}\\le \\varphi_{ij}\\, \\bar y_{jt} && \\forall\\, i,\\ j,\\ t && (26)\\end{aligned}",
  "lab.lab-linearization.eq2.formula": "φ_ij = e^V_ij · a_ij / Σ_{s∈S∖I} e^V_sj · a_sj   ∀ i, j   (23)\nȳ_jt + Σ_{i∈I} y_ijt ≤ 1   ∀ j, t   (24)\ny_ijt ≤ φ_ij / (1 + φ_ij) · x_it   ∀ i, j, t   (25)\ny_ijt ≤ φ_ij · ȳ_jt   ∀ i, j, t   (26)",
  "lab.lab-linearization.eqNote": "(14) está escrita como na página de pesquisa, e (23) usa os mesmos concorrentes S∖I com a_{sj}. O manuscrito escreve a_{ij} nas duas somas do denominador de (14), J∖I sem a_{sj} em (23) e um v minúsculo nessas somas e em (23); seu texto na p. 16 chama o parâmetro de φ_{jt}.",

  "lab.lab-ml-methods.title": "Aprender é otimizar",
  "lab.lab-ml-methods.desc": "A regressão linear, a regressão logística e as pequenas redes neurais aprendem minimizando uma perda, então cada uma é um problema de otimização. A animação moveria a reta ajustada ou a fronteira de decisão passo a passo enquanto a curva de perda desce ao lado.",

  "lab.lab-svm.title": "A rua mais larga",
  "lab.lab-svm.desc": "Uma máquina de vetores de suporte procura a rua mais larga que separa duas classes, e isso é um problema quadrático de margem máxima. A animação destacaria os vetores de suporte que seguram a rua no lugar e depois passaria para a margem suave, em que o parâmetro C troca erros de classificação por uma margem mais larga.",

  "lab.lab-ml-ai-cases.title": "ML + IA em otimização",
  "lab.lab-ml-ai-cases.desc": "Quatro casos em que o aprendizado ajuda a otimização: aprender a ramificar, prever e depois otimizar, aprendizado por reforço para roteamento de veículos e agentes de linguagem que formulam modelos de otimização a partir de um texto. Cada caso teria um pequeno exemplo interativo que roda no navegador."
}, "lab/lab");
