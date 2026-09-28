/* Strings for lab/index.html, the hidden proposals lab (Portuguese, Brazil, "você"). */
I18N.register("pt", {
  "lab.title": "Laboratório de propostas",
  "lab.eyebrow": "Laboratório · Protótipos antes da trilha",
  "lab.lede": "Novos recursos, construídos e testados aqui antes de entrarem na trilha de aprendizagem. Cada cartão diz o que a página mostra e qual formato tem; abra-o para experimentar o protótipo. Nenhum deles está ainda na página inicial.",
  "lab.idea": "Ideia",
  "lab.built": "Construído",
  "lab.open": "Abrir",
  "lab.eqHead": "As equações",
  "lab.stepsHead": "Passo a passo",
  "lab.listLabel": "Propostas",

  "lab.lab-solver.title": "Por dentro do solver",
  "lab.lab-solver.desc": "Um MILP pequeno, uma torrefação de Manizales que planeja lotes inteiros, é resolvido ao vivo: pré-processamento (presolve), relaxação linear, um corte de Gomory que aperta o limitante, uma heurística de arredondamento que encontra incumbentes e a árvore de branch and bound. A incumbente e o melhor limitante se aproximam enquanto o gap cai para 0, num registro (log) feito à semelhança dos que os solvers comerciais imprimem.",

  "lab.lab-cvar.title": "Além do VaR: o CVaR",
  "lab.lab-cvar.desc": "Com 200 meses simulados de ações colombianas, títulos TES e dólares, a animação marca o VaR como um quantil e o CVaR como a média da cauda além dele. Depois mostra como a formulação de Rockafellar e Uryasev (2000) transforma o CVaR em um programa linear sobre cenários e compara a carteira de variância mínima com a de CVaR mínimo.",

  "lab.lab-linearization.title": "Linearizar o modelo de feiras livres",
  "lab.lab-linearization.desc": "A restrição (14) é a única parte não linear do modelo de feiras livres: a probabilidade logit de comprar em um parque tem as decisões de abertura no numerador e no denominador. Adaptando o método de Haase e Müller (2014), o artigo a substitui pelas restrições lineares (24) a (26), apoiadas na razão (23). A animação acompanha uma célula de demanda enquanto os parques abrem, desenha as retas que fixam a divisão logit e mostra quando o modelo linear é exato e quando é só um limite superior.",
  "lab.lab-linearization.step1": "Na restrição (14) a probabilidade de um cliente comprar em um parque é uma fração cujo numerador e denominador dependem de quais parques abrem naquele dia, por isso o modelo é não linear.",
  "lab.lab-linearization.step2": "O logit mantém algo fixo: para cada parque aberto, a sua participação dividida pela dos concorrentes é um número φ que (23) calcula antes de resolver.",
  "lab.lab-linearization.step3": "O artigo acrescenta a participação dos concorrentes ȳ como nova variável e troca a fração por limites lineares: todas as participações somam no máximo 1 (24), um parque recebe no máximo φ vezes ȳ (26) e um parque fechado não recebe nada, enquanto um aberto recebe no máximo o que teria se estivesse sozinho (25).",
  "lab.lab-linearization.step4": "Quando todos os parques abertos pesam o mesmo no objetivo, o ótimo eleva as participações até que (24) e (26) valham com igualdade, e isso reproduz a divisão logit: cada parque aberto recebe φ vezes ȳ. (25) só desliga os parques fechados. Assim, os dois modelos têm os mesmos calendários ótimos.",
  "lab.lab-linearization.step5": "Duas condições: cada célula precisa de uma opção externa (o vendedor 70, «outros») e as participações devem ser lidas como contínuas entre 0 e 1. Com os pesos diferentes do AHP difuso em (13), o modelo linear dá um limite superior de (14), nem sempre o mesmo valor.",
  "lab.lab-linearization.eq1.cap": "Não linear: a participação logit (14)",
  "lab.lab-linearization.eq1.tex": "\\begin{aligned}& y_{ijt}=\\frac{e^{V_{ij}}\\, a_{ij}\\, x_{it}}{\\sum_{s\\in I} e^{V_{sj}}\\, a_{sj}\\, x_{st}+\\sum_{s\\in S\\setminus I} e^{V_{sj}}\\, a_{sj}} && (14)\\\\[2pt]& \\quad \\forall\\, i,\\ j,\\ t\\end{aligned}",
  "lab.lab-linearization.eq1.formula": "y_ijt = e^V_ij · a_ij · x_it / (Σ_{s∈I} e^V_sj · a_sj · x_st + Σ_{s∈S∖I} e^V_sj · a_sj)   ∀ i, j, t   (14)",
  "lab.lab-linearization.eq2.cap": "Substituição linear: (23) a (26)",
  "lab.lab-linearization.eq2.tex": "\\begin{aligned}& \\varphi_{ij}=\\frac{e^{V_{ij}}\\, a_{ij}}{\\sum_{s\\in S\\setminus I} e^{V_{sj}}\\, a_{sj}} && \\forall\\, i,\\ j && (23)\\\\[4pt]& \\bar y_{jt}+\\sum_{i\\in I} y_{ijt}\\le 1 && \\forall\\, j,\\ t && (24)\\\\& y_{ijt}\\le \\frac{\\varphi_{ij}}{1+\\varphi_{ij}}\\, x_{it} && \\forall\\, i,\\ j,\\ t && (25)\\\\& y_{ijt}\\le \\varphi_{ij}\\, \\bar y_{jt} && \\forall\\, i,\\ j,\\ t && (26)\\end{aligned}",
  "lab.lab-linearization.eq2.formula": "φ_ij = e^V_ij · a_ij / Σ_{s∈S∖I} e^V_sj · a_sj   ∀ i, j   (23)\nȳ_jt + Σ_{i∈I} y_ijt ≤ 1   ∀ j, t   (24)\ny_ijt ≤ φ_ij / (1 + φ_ij) · x_it   ∀ i, j, t   (25)\ny_ijt ≤ φ_ij · ȳ_jt   ∀ i, j, t   (26)",
  "lab.lab-linearization.eqNote": "(14) está escrita como na página de pesquisa, e (23) usa os mesmos concorrentes S∖I com a_{sj}. O manuscrito escreve a_{ij} nas duas somas do denominador de (14), J∖I sem a_{sj} em (23) e um v minúsculo nessas somas e em (23); seu texto na p. 16 chama o parâmetro de φ_{jt}.",

  "lab.lab-ml-methods.title": "Aprender é otimizar",
  "lab.lab-ml-methods.desc": "A regressão linear, a regressão logística e as pequenas redes neurais aprendem minimizando uma perda, então cada uma é um problema de otimização. A animação treina os três ao vivo com descida de gradiente, move a reta ajustada ou a fronteira de decisão passo a passo enquanto a curva de perda desce ao lado e mostra o que acontece quando o passo é pequeno demais ou grande demais.",

  "lab.lab-svm.title": "A rua mais larga",
  "lab.lab-svm.desc": "Uma máquina de vetores de suporte procura a rua mais larga que separa duas classes, e isso é um problema quadrático de margem máxima. Com 24 lotes de café classificados por altitude e densidade do grão, a animação destaca os vetores de suporte que seguram a rua no lugar, mostra como um lote atípico quebra a margem rígida e passa para a margem suave, em que o parâmetro C troca erros de classificação por uma margem mais larga.",

  "lab.lab-ml-ai-cases.title": "ML + IA em otimização",
  "lab.lab-ml-ai-cases.desc": "Quatro casos pequenos em que o aprendizado ajuda a otimização, cada um rodando de verdade no navegador: um branch and bound que aprende onde ramificar, uma previsão de demanda ajustada para a decisão que ela alimenta, uma van de entregas que aprende sua rota por tentativa e erro e é comparada com o caminho mais curto, e um verificador automático que testa formulações já escritas como as que um agente de linguagem poderia produzir.",

  "lab.lab-svm-dual.title": "SVM, nível 2: a rua dual",
  "lab.lab-svm-dual.desc": "Os mesmos 24 lotes de café de A rua mais larga, agora vistos pelo lado dual. Cada lote recebe um multiplicador de Lagrange, e a animação resolve o programa quadrático dual dois multiplicadores de cada vez (SMO) enquanto o objetivo dual sobe, o primal desce e a lacuna de dualidade se fecha em 0. No fim, só os vetores de suporte mantêm um multiplicador diferente de zero, e a rua é reconstruída apenas com eles. O dual não precisa de nada além de produtos escalares entre lotes, e isso abre a porta para o nível 3.",

  "lab.lab-svm-kernel.title": "SVM, nível 3: o truque do kernel",
  "lab.lab-svm-kernel.desc": "Um lote de café em secagem é bom quando sua umidade e sua temperatura estão perto de um ponto ideal, então nenhuma reta separa os lotes bons dos ruins. A animação eleva os lotes a três dimensões, onde um plano os separa, e traz esse plano de volta como um círculo. Depois vem o truque: o dual só usa produtos escalares, então um kernel os calcula no espaço elevado sem nunca construí-lo, até chegar ao kernel gaussiano (RBF), cuja largura decide o quanto a fronteira segue os dados de perto.",

  "lab.lab-fahp.title": "AHP, conjuntos fuzzy e AHP fuzzy",
  "lab.lab-fahp.desc": "Uma torrefadora de Medellín escolhe entre três fornecedores de café com quatro critérios. Primeiro, o AHP clássico: compare os critérios aos pares na escala de Saaty, obtenha os pesos pelo autovetor principal e deixe a razão de consistência avisar quando seus julgamentos se contradizem. Depois, os conjuntos fuzzy: transforme palavras como \"moderadamente mais importante\" em números fuzzy triangulares e opere com eles. Por fim, os dois juntos: os julgamentos de três especialistas geram pesos fuzzy pela média geométrica de Buckley, e a página mostra quando a incerteza basta para mudar a ordem."
}, "lab/lab");
