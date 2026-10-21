/* Textos de lab/study/index.html, el inicio de la sección de estudio (español de Colombia, tuteo). */
I18N.register("es", {
  "sth.title": "Estudio: cooperación y repuestos compartidos",
  "sth.lede": "Esta sección sigue una línea de trabajos publicados por Loe Schlicher y coautores sobre teoría de juegos en operaciones, artículo por artículo y en orden cronológico.",
  "sth.how": "Cada tarjeta abre una página de estudio: la pregunta, el modelo, los resultados principales con la idea de sus pruebas, preguntas de estudio y un modelo pequeño para probar en el navegador. Filtra por línea o desliza la línea de tiempo hacia los lados.",

  "sth.lines.aria": "Las tres líneas de trabajo",
  "sth.count.one": "1 artículo",
  "sth.count.many": "{n} artículos",

  "sth.tl.title": "Línea de tiempo",
  "sth.tl.aria": "Línea de tiempo de los artículos, se desliza hacia los lados",
  "sth.filter.label": "Mostrar",
  "sth.filter.all": "Todas las líneas",
  "sth.earlier": "← Antes",
  "sth.later": "Después →",
  "sth.open": "Abrir la página de estudio →",

  /* PROVISIONAL: escrito solo con las cinco notas terminadas; reescribir cuando existan las notas de los once artículos. */
  "sth.evolution.title": "Cómo evoluciona la línea",
  "sth.evolution.p1": "La línea abre en 2020 con un juego de agrupación de recursos: regiones que comparten dosis de vacuna. El valor de cada grupo de regiones sale de un problema de optimización, una mochila con rendimientos en forma de S, y la pregunta es si el rendimiento total se puede repartir de modo que ningún grupo prefiera irse, es decir, si el núcleo no es vacío.",
  "sth.evolution.p2": "La misma plantilla vuelve en 2023 y 2024: se define un juego a partir de un problema de operaciones (los ingresos de una plataforma de streaming, camiones compartidos a lo largo de una cadena de puntos de transbordo), se prueba que el núcleo no es vacío para subclases, unos contraejemplos muestran cuándo es vacío y unos experimentos numéricos exploran el resto. El artículo de 2022 (precios fijados en conjunto con un modelo de elección logit) hace una pregunta vecina: su núcleo nunca es vacío, pero las reglas proporcionales y el valor de Shapley pueden quedar fuera de él, mientras que una regla de intercambio de participación de mercado nunca queda fuera. Los precios ligados a la dualidad vuelven una y otra vez: un precio de mercado por dosis, un precio por unidad de participación de mercado, los precios duales de un PL. Los artículos de 2022 y 2023 citan el de 2020.",
  "sth.evolution.p3": "El artículo de 2021 sobre impresoras 3D en la respuesta a desastres no tiene jugadores ni coaliciones: es una mochila estocástica de dos etapas para un solo decisor, que, como el juego de las vacunas, tiene estructura de mochila. Los juegos de seguridad y protección (2021 a 2025) y el juego de los casilleros de paquetes (2026) se sumarán a este panorama cuando sus páginas de estudio estén listas.",

  "sth.found.title": "Fundamentos",
  "sth.found.intro": "Las ideas básicas que usa toda la línea, en cuatro páginas del laboratorio:",
  "sth.found.1.t": "Teoría de juegos 1: Lee la tabla",
  "sth.found.1.d": "Tablas de pagos, dominancia y el equilibrio de Nash.",
  "sth.found.2.t": "Teoría de juegos 2: Sé impredecible",
  "sth.found.2.d": "Estrategias mixtas y minimax: juegos de suma cero resueltos como PL, el lenguaje de los juegos de seguridad.",
  "sth.found.3.t": "Teoría de juegos 3: Jugada a jugada",
  "sth.found.3.d": "Juegos secuenciales e inducción hacia atrás: líderes, seguidores y equilibrios perfectos en subjuegos, como en los juegos de Stackelberg.",
  "sth.found.4.t": "Teoría de juegos 4: Reparte el ahorro",
  "sth.found.4.d": "Juegos cooperativos: el núcleo como un PL, el valor de Shapley y el nucléolo.",

  "sth.notyet.title": "Todavía no están en la línea de tiempo",
  "sth.notyet.p": "Los artículos anteriores sobre agrupación de recursos y de repuestos (2017 a 2020) todavía no están incluidos. Los artículos de la línea de tiempo citan estos trabajos anteriores:",
  "sth.notyet.1": "A note on maximal covering location games. <i>Operations Research Letters</i>, 2017.",
  "sth.notyet.2": "Probabilistic resource pooling games. <i>Naval Research Logistics</i>, 2017.",
  "sth.notyet.3": "Pooling of critical, low-utilization resources with unavailability. <i>OR Spectrum</i>, 2018.",
  "sth.notyet.4": "Core nonemptiness of stratified pooling games: A structured Markov decision process approach. <i>Mathematics of Operations Research</i>, 2020."
}, "lab/study/hub");
