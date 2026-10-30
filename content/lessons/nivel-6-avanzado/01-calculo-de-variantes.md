---
title: Cálculo de variantes
summary: Jugadas candidatas, jugadas forzadas y el árbol de variantes. Un método para calcular sin perderte.
tags: calculo, tactica, combinaciones
minutes: 12
---

Calcular es imaginar las jugadas **sin moverlas** en el tablero y valorar a qué posición llevan. No se trata de calcularlo todo, sino de calcular **bien lo importante**. Para eso necesitas un método.

## 1. Busca las jugadas candidatas

Antes de calcular nada, haz una lista corta (2-4 jugadas) de **jugadas candidatas**: las que merecen la pena analizar. Si te lanzas a calcular la primera jugada que se te ocurre, puede que nunca veas la mejor.

## 2. Empieza por las jugadas forzadas

Las jugadas que más limitan la respuesta del rival son las más fáciles de calcular y las que más a menudo deciden la partida. Revísalas siempre en este orden:

1. **Jaques**
2. **Capturas**
3. **Amenazas** (ataques a piezas, amenazas de mate)

Incluso las jugadas que parecen absurdas, como un sacrificio de dama, merecen un vistazo si dan jaque.

## 3. Construye el árbol de variantes

Cada jugada candidata es una **rama**. Para cada una, piensa en las mejores respuestas del rival (¡no en las que te gustaría que jugase!) y sigue solo las ramas forzadas. Calcula cada rama **una sola vez** y con orden: es mejor terminar una línea que saltar de una a otra.

## 4. Evalúa la posición final

Al final de cada variante, **para y evalúa**: ¿quién está mejor y por qué? Material, seguridad del rey, actividad… Una variante bien calculada que acaba en una posición mal evaluada no sirve de nada.

```tablero
{ "fen": "r4rk1/1b3ppp/8/3NR3/8/3Q4/5PPP/6K1 w - - 0 1", "arrows": [["d5", "e7"], ["d3", "h7"], ["e5", "h5"]], "caption": "Un árbol muy estrecho: jaque, sacrificio con jaque y mate. Cuando todas las jugadas son forzadas, puedes calcular muy lejos." }
```

```ejercicio
{ "type": "quiz", "prompt": "¿En qué orden conviene revisar las **jugadas forzadas**?", "options": ["Amenazas, capturas, jaques", "Jaques, capturas, amenazas", "Capturas, jaques, amenazas"], "answer": 1, "explanation": "Los **jaques** son lo más forzante: el rival tiene muy pocas respuestas. Después vienen las **capturas** (normalmente hay que recapturar) y por último las **amenazas**." }
```

```ejercicio
{ "type": "moves", "fen": "r4rk1/1b3ppp/8/3NR3/8/3Q4/5PPP/6K1 w - - 0 1", "solution": ["d5e7", "g8h8", "d3h7", "h8h7", "e5h5"], "goal": "mate", "prompt": "Juegan las blancas. Empieza por las jugadas forzadas y **da mate**.", "hint": "Jaque de caballo, y después un sacrificio de dama con jaque.", "explanation": "**Ce7+** Rh8 **Dxh7+!!** Rxh7 **Th5#**. Es el **mate de Anastasia**: el caballo de e7 quita al rey las casillas g8 y g6, y la torre da mate por la columna h. Todas las jugadas eran jaques: por eso se puede calcular hasta el final." }
```

```ejercicio
{ "type": "moves", "fen": "4r1k1/3q1ppp/8/8/8/8/4QPPP/4R1K1 w - - 0 1", "solution": ["e2e8", "d7e8", "e1e8"], "goal": "mate", "prompt": "Juegan las blancas. Revisa todas las capturas y **da mate**.", "hint": "El rey negro no tiene casillas de escape en la segunda fila.", "explanation": "**Dxe8+!** Dxe8 **Txe8#**. La captura con la dama parece regalarla, pero tras la recaptura la torre da mate en la octava fila: el clásico **mate del pasillo**." }
```

```ejercicio
{ "type": "moves", "fen": "3r2k1/3P1ppp/8/8/8/8/5PPP/2R3K1 w - - 0 1", "solution": ["c1c8", "g8f8", "c8d8"], "prompt": "Juegan las blancas. Tu peón de d7 está a un paso de coronar, pero la torre negra lo vigila. Encuentra la combinación ganadora.", "hint": "Si la torre negra deja de vigilar d8, el peón corona. ¿Cómo la desvías?", "wrong": { "c1d1": "Demasiado lento: el rey negro se acerca (...Rf8-e7) y gana el peón." }, "explanation": "**Tc8!** Si ...Txc8, dxc8=D+ y ganas una torre entera. Por eso las negras juegan ...Rf8, pero tras **Txd8+** Re7 las blancas se quedan con una torre de más, aunque el rey negro capture después el peón de d7. Evalúa siempre la posición final de cada rama." }
```

```ejercicio
{ "type": "quiz", "prompt": "Has calculado una variante de cinco jugadas que termina con material igualado. ¿Qué debes hacer ahora?", "options": ["Jugarla: si el material es igual, la posición es igual", "Evaluar la posición final: seguridad del rey, actividad, estructura de peones…", "Calcular una jugada más en todas las ramas"], "answer": 1, "explanation": "El material es solo uno de los factores. Al final de cada variante tienes que **evaluar**: quizá un rey desprotegido o una pieza muy activa valgan más que un peón." }
```
