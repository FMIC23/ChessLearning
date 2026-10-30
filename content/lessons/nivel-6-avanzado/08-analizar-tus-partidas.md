---
title: Cómo analizar tus partidas
summary: El método para aprender de cada partida: primero sin motor, después con él, y siempre buscando patrones.
tags: analisis, entrenamiento
minutes: 10
---

Jugar mucho ayuda, pero **lo que más hace mejorar es analizar tus propias partidas**. Cada derrota es una lección personalizada: te dice exactamente qué tienes que entrenar.

## El método en cuatro pasos

1. **Analiza tú primero, sin motor.** Recién terminada la partida, repásala y apunta qué pensabas en cada momento: tus planes, tus dudas, las variantes que calculaste. Este paso es el más importante: si enciendes el motor directamente, solo verás números y no aprenderás a pensar.
2. **Busca los momentos críticos.** Normalmente hay 2-4 momentos en los que la partida cambió de rumbo: un error grave, una decisión estratégica, el paso al final. Dedica la mayor parte del tiempo a ellos.
3. **Después, usa el motor.** Comprueba tus análisis con Stockfish. Donde el motor no esté de acuerdo, pregúntate **por qué**: ¿qué no viste? ¿Una táctica? ¿Una amenaza del rival? ¿Una evaluación equivocada?
4. **Saca conclusiones y busca patrones.** Escribe una o dos lecciones de la partida. Con el tiempo, revisa tus notas: ¿pierdes muchas partidas por piezas colgadas? ¿por apuros de tiempo? ¿siempre en el mismo tipo de posición? Esos patrones te dicen qué entrenar.

> En esta aplicación puedes **importar tus partidas en PGN** y analizarlas con **Stockfish**. Úsalo en el paso 3, nunca en el 1.

## Tipos de errores que conviene clasificar

- **Tácticos**: piezas colgadas, combinaciones que no viste (tuyas o del rival).
- **Estratégicos**: un plan equivocado, una mala estructura de peones, un cambio que no convenía.
- **De cálculo**: viste la idea pero calculaste mal la variante.
- **Prácticos**: apuros de tiempo, relajarte con ventaja, rendirte demasiado pronto.

```tablero
{ "fen": "rn1qkbnr/ppp2p1p/3p2p1/4N3/2B1P3/2N5/PPPP1PPP/R1BbK2R w KQkq - 0 6", "arrows": [["c4", "f7"], ["c3", "d5"]], "caption": "Un momento crítico: las negras acaban de capturar la dama blanca con ...Axd1. ¿Ha sido un acierto o un error?" }
```

```ejercicio
{ "type": "quiz", "prompt": "Acabas de perder una partida. ¿Cuál es el **primer** paso del análisis?", "options": ["Meterla en el motor para ver dónde fallaste", "Repasarla tú solo, anotando lo que pensabas durante la partida", "Olvidarla y jugar otra"], "answer": 1, "explanation": "Si empiezas por el motor, te limitas a mirar evaluaciones. Analizar primero tú solo te obliga a pensar y te muestra **cómo razonaste**, que es lo que de verdad hay que corregir." }
```

```ejercicio
{ "type": "moves", "fen": "rn1qkbnr/ppp2p1p/3p2p1/4N3/2B1P3/2N5/PPPP1PPP/R1BbK2R w KQkq - 0 6", "solution": ["c4f7", "e8e7", "c3d5"], "goal": "mate", "prompt": "Imagina que esta posición sale en una de tus partidas. Las negras acaban de comerse tu dama con ...Axd1. En el análisis descubres que tenías algo mucho mejor que recapturar. **Da mate.**", "hint": "Jaque con el alfil y después el caballo.", "wrong": { "e1d1": "Recapturar es lo «normal», pero se te escapa un mate en dos." }, "explanation": "**Axf7+** Re7 **Cd5#**. Es el **mate de Legal**: la dama era un cebo. En el análisis, estos momentos («¿por qué no busqué jugadas forzantes?») son los que te enseñan un patrón para siempre." }
```

```ejercicio
{ "type": "quiz", "prompt": "Al analizar tus diez últimas derrotas descubres que en siete de ellas dejaste una pieza sin defender. ¿Qué deberías entrenar?", "options": ["Aperturas nuevas", "Táctica y el hábito de revisar las piezas atacadas antes de cada jugada", "Finales de torres"], "answer": 1, "explanation": "Ese es justo el valor de buscar **patrones**: te dice dónde está tu mayor debilidad. Antes de cada jugada, pregúntate qué piezas tuyas están atacadas o sin defensa." }
```

```ejercicio
{ "type": "quiz", "prompt": "El motor dice que en la jugada 23 cometiste un error de −2. ¿Qué es lo más útil que puedes hacer?", "options": ["Apuntar la jugada correcta del motor y pasar a la siguiente partida", "Entender **por qué** era un error: qué amenaza no viste o qué evaluaste mal", "Nada: los motores juegan de otra manera"], "answer": 1, "explanation": "Memorizar la jugada del motor sirve de poco. Lo valioso es descubrir **qué parte de tu razonamiento falló** para no repetirlo en otras posiciones." }
```

```ejercicio
{ "type": "quiz", "prompt": "¿Qué son los **momentos críticos** de una partida?", "options": ["Las jugadas en las que se da jaque", "Las posiciones en las que una decisión cambió el rumbo de la partida", "Las últimas cinco jugadas antes de rendirse"], "answer": 1, "explanation": "Pueden ser errores tácticos, decisiones estratégicas (cambiar o no las damas, enrocar a un lado o al otro) o el paso a un final. Detectarlos te enseña a reconocerlos **durante** la partida y a dedicarles más tiempo." }
```
