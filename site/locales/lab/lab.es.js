/* Strings for lab/index.html, the hidden proposals lab (Spanish, Colombia, "tú"). */
I18N.register("es", {
  "lab.title": "Laboratorio de propuestas",
  "lab.eyebrow": "Laboratorio · Ideas aún sin construir",
  "lab.lede": "Ideas para nuevos recursos, reunidas aquí antes de construir cualquiera de ellas. Cada tarjeta dice qué mostraría el recurso y qué formato tendría. Ninguna está desarrollada todavía.",
  "lab.idea": "Idea",
  "lab.eqHead": "Las ecuaciones",
  "lab.stepsHead": "Paso a paso",
  "lab.listLabel": "Propuestas",

  "lab.lab-solver.title": "Dentro del solver",
  "lab.lab-solver.desc": "La animación seguiría a un solver de MILP desde el preprocesamiento (presolve) y la relajación lineal hasta el árbol de ramificación y acotamiento, con cortes que ajustan la cota y heurísticas que encuentran nuevas incumbentes en el camino. Dos curvas, la incumbente y la mejor cota, se acercan una a otra mientras la brecha cae a 0, como en el registro (log) de Gurobi.",

  "lab.lab-cvar.title": "Más allá del VaR: el CVaR",
  "lab.lab-cvar.desc": "A partir de una distribución de pérdidas, la animación marcaría el VaR como un cuantil y el CVaR como el promedio de la cola que queda más allá. Luego mostraría cómo la formulación de Rockafellar y Uryasev (2000) convierte el CVaR en un programa lineal sobre escenarios, y compararía un portafolio de mínima varianza con uno de mínimo CVaR.",

  "lab.lab-linearization.title": "Linealizar el modelo de mercados campesinos",
  "lab.lab-linearization.desc": "La restricción (14) es la única parte no lineal del modelo de mercados campesinos: la probabilidad logit de comprar en un parque tiene las decisiones de apertura en el numerador y en el denominador. Adaptando el método de Haase y Müller (2014), el artículo la reemplaza por las restricciones lineales (24) a (26), que se apoyan en la razón (23). La animación seguiría una celda de demanda mientras abren parques, mostraría las rectas que fijan el reparto logit y terminaría en el calendario semanal del artículo.",
  "lab.lab-linearization.step1": "En la restricción (14) la probabilidad de que un cliente compre en un parque es una fracción cuyo numerador y denominador dependen de qué parques abren ese día, por eso el modelo es no lineal.",
  "lab.lab-linearization.step2": "El logit mantiene algo fijo: para cada parque abierto, su participación dividida por la de los competidores es un número φ que (23) calcula antes de resolver.",
  "lab.lab-linearization.step3": "El artículo agrega la participación de los competidores ȳ como variable nueva y cambia la fracción por límites lineales: todas las participaciones suman como máximo 1 (24), un parque recibe como máximo φ veces ȳ (26) y un parque cerrado no recibe nada, mientras que uno abierto recibe como máximo lo que tendría si estuviera solo (25).",
  "lab.lab-linearization.step4": "Cuando todos los parques abiertos pesan lo mismo en el objetivo, maximizar la demanda captada en una celda y un día con demanda sube las participaciones hasta que (24) y cada (26) de un parque abierto se cumplen con igualdad. Esos límites fijan el reparto logit: cada parque abierto recibe φ veces ȳ, con ȳ = 1/(1 + la suma de φ de los parques abiertos). (25) solo apaga los parques cerrados: un parque abierto fuera del alcance de la celda tiene φ = 0 y no recibe nada de todos modos, y para un parque abierto al alcance (25) se cumple con igualdad únicamente cuando es el único abierto al alcance de la celda, el único caso en que las tres rectas se cruzan en un punto. Así, el modelo lineal evalúa cada calendario igual que (14), y los dos modelos tienen los mismos calendarios óptimos y el mismo valor óptimo; cuando varios calendarios empatan, un solver puede entregar cualquiera de ellos.",
  "lab.lab-linearization.step5": "Esto requiere una opción externa al alcance de cada celda, que da el vendedor 70 (otros). También requiere participaciones continuas: el artículo escribe (22) y (27) como binarias, y con valores binarios (25) obligaría a que la participación y de cada parque valga 0, porque φ/(1 + φ) es menor que 1; por eso aquí se leen como valores entre 0 y 1, una lectura que falta confirmar. Además, el paso 4 supone que los parques abiertos de una celda y un día pesan lo mismo, mientras que (13) pondera cada parque con su peso del AHP difuso. Con esos pesos el modelo lineal puede pasar la participación de un parque de menor peso a uno de mayor peso, así que califica cada calendario al menos tan alto como (14): es una cota superior, igual a (14) en una celda y un día solo cuando el peso de cada parque abierto es al menos el promedio de los pesos de los parques abiertos, ponderado por φ, multiplicado por su participación logit conjunta. Esa condición puede fallar, así que la coincidencia no es exacta en general.",
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
