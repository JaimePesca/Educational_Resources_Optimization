/* Strings for lab/index.html, the hidden proposals lab (Spanish, Colombia, "tú"). */
I18N.register("es", {
  "lab.title": "Laboratorio de propuestas",
  "lab.eyebrow": "Laboratorio · Ideas aún sin construir",
  "lab.lede": "Ideas para nuevos recursos, reunidas aquí antes de construir cualquiera de ellas. Cada tarjeta dice qué mostraría el recurso y qué formato tendría. Ninguna está desarrollada todavía.",
  "lab.idea": "Idea",
  "lab.built": "Construido",
  "lab.open": "Abrir",
  "lab.eqHead": "Las ecuaciones",
  "lab.stepsHead": "Paso a paso",
  "lab.listLabel": "Propuestas",

  "lab.lab-solver.title": "Dentro del solver",
  "lab.lab-solver.desc": "La animación seguiría a un solver de MILP desde el preprocesamiento (presolve) y la relajación lineal hasta el árbol de ramificación y acotamiento, con cortes que ajustan la cota y heurísticas que encuentran nuevas incumbentes en el camino. Dos curvas, la incumbente y la mejor cota, se acercan una a otra mientras la brecha cae a 0, como en el registro (log) de Gurobi.",

  "lab.lab-cvar.title": "Más allá del VaR: el CVaR",
  "lab.lab-cvar.desc": "A partir de una distribución de pérdidas, la animación marcaría el VaR como un cuantil y el CVaR como el promedio de la cola que queda más allá. Luego mostraría cómo la formulación de Rockafellar y Uryasev (2000) convierte el CVaR en un programa lineal sobre escenarios, y compararía un portafolio de mínima varianza con uno de mínimo CVaR.",

  "lab.lab-linearization.title": "Linealizar el modelo de mercados campesinos",
  "lab.lab-linearization.desc": "La restricción (14) es la única parte no lineal del modelo de mercados campesinos: la probabilidad logit de comprar en un parque tiene las decisiones de apertura en el numerador y en el denominador. Adaptando el método de Haase y Müller (2014), el artículo la reemplaza por las restricciones lineales (24) a (26), que se apoyan en la razón (23). La animación sigue una celda de demanda mientras abren parques, dibuja las rectas que fijan el reparto logit y muestra cuándo el modelo lineal es exacto y cuándo es solo una cota superior.",
  "lab.lab-linearization.step1": "En la restricción (14) la probabilidad de que un cliente compre en un parque es una fracción cuyo numerador y denominador dependen de qué parques abren ese día, por eso el modelo es no lineal.",
  "lab.lab-linearization.step2": "El logit mantiene algo fijo: para cada parque abierto, su participación dividida por la de los competidores es un número φ que (23) calcula antes de resolver.",
  "lab.lab-linearization.step3": "El artículo agrega la participación de los competidores ȳ como variable nueva y cambia la fracción por límites lineales: todas las participaciones suman como máximo 1 (24), un parque recibe como máximo φ veces ȳ (26) y un parque cerrado no recibe nada, mientras que uno abierto recibe como máximo lo que tendría si estuviera solo (25).",
  "lab.lab-linearization.step4": "Si todos los parques abiertos pesan lo mismo en el objetivo, el óptimo sube las participaciones hasta que (24) y (26) se cumplen con igualdad, y eso reproduce el reparto logit: cada parque abierto recibe φ veces ȳ. (25) solo apaga los parques cerrados. Así, los dos modelos tienen los mismos calendarios óptimos.",
  "lab.lab-linearization.step5": "Dos condiciones: cada celda necesita una opción externa (el vendedor 70, «otros») y las participaciones se deben leer como continuas entre 0 y 1. Con los pesos distintos del AHP difuso en (13), el modelo lineal da una cota superior de (14), no siempre el mismo valor.",
  "lab.lab-linearization.eq1.cap": "No lineal: la participación logit (14)",
  "lab.lab-linearization.eq1.tex": "\\begin{aligned}& y_{ijt}=\\frac{e^{V_{ij}}\\, a_{ij}\\, x_{it}}{\\sum_{s\\in I} e^{V_{sj}}\\, a_{sj}\\, x_{st}+\\sum_{s\\in S\\setminus I} e^{V_{sj}}\\, a_{sj}} && (14)\\\\[2pt]& \\quad \\forall\\, i,\\ j,\\ t\\end{aligned}",
  "lab.lab-linearization.eq1.formula": "y_ijt = e^V_ij · a_ij · x_it / (Σ_{s∈I} e^V_sj · a_sj · x_st + Σ_{s∈S∖I} e^V_sj · a_sj)   ∀ i, j, t   (14)",
  "lab.lab-linearization.eq2.cap": "Reemplazo lineal: (23) a (26)",
  "lab.lab-linearization.eq2.tex": "\\begin{aligned}& \\varphi_{ij}=\\frac{e^{V_{ij}}\\, a_{ij}}{\\sum_{s\\in S\\setminus I} e^{V_{sj}}\\, a_{sj}} && \\forall\\, i,\\ j && (23)\\\\[4pt]& \\bar y_{jt}+\\sum_{i\\in I} y_{ijt}\\le 1 && \\forall\\, j,\\ t && (24)\\\\& y_{ijt}\\le \\frac{\\varphi_{ij}}{1+\\varphi_{ij}}\\, x_{it} && \\forall\\, i,\\ j,\\ t && (25)\\\\& y_{ijt}\\le \\varphi_{ij}\\, \\bar y_{jt} && \\forall\\, i,\\ j,\\ t && (26)\\end{aligned}",
  "lab.lab-linearization.eq2.formula": "φ_ij = e^V_ij · a_ij / Σ_{s∈S∖I} e^V_sj · a_sj   ∀ i, j   (23)\nȳ_jt + Σ_{i∈I} y_ijt ≤ 1   ∀ j, t   (24)\ny_ijt ≤ φ_ij / (1 + φ_ij) · x_it   ∀ i, j, t   (25)\ny_ijt ≤ φ_ij · ȳ_jt   ∀ i, j, t   (26)",
  "lab.lab-linearization.eqNote": "(14) se escribe como en la página de investigación, y (23) usa los mismos competidores S∖I con a_{sj}. El manuscrito escribe a_{ij} en las dos sumas del denominador de (14), J∖I sin a_{sj} en (23) y una v minúscula en esas sumas y en (23); su texto en la p. 16 llama al parámetro φ_{jt}.",

  "lab.lab-ml-methods.title": "Aprender es optimizar",
  "lab.lab-ml-methods.desc": "La regresión lineal, la regresión logística y las redes neuronales pequeñas aprenden minimizando una pérdida, así que cada una es un problema de optimización. La animación movería la recta ajustada o la frontera de decisión paso a paso mientras la curva de pérdida baja a su lado.",

  "lab.lab-svm.title": "La calle más ancha",
  "lab.lab-svm.desc": "Una máquina de vectores de soporte busca la calle más ancha que separa dos clases, y eso es un problema cuadrático de margen máximo. La animación resaltaría los vectores de soporte que sostienen la calle y luego pasaría al margen suave, donde el parámetro C cambia errores de clasificación por un margen más ancho.",

  "lab.lab-ml-ai-cases.title": "ML + IA en optimización",
  "lab.lab-ml-ai-cases.desc": "Cuatro casos en los que el aprendizaje ayuda a optimizar: aprender a ramificar, predecir y luego optimizar, aprendizaje por refuerzo para el ruteo de vehículos y agentes de lenguaje que formulan modelos de optimización a partir de un texto. Cada caso tendría un pequeño ejemplo interactivo que corre en el navegador."
}, "lab/lab");
