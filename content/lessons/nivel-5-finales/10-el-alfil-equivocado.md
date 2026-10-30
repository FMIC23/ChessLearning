---
title: El alfil del color equivocado
summary: Alfil y peón de torre contra rey pueden ser tablas aunque tengas una pieza y un peón de ventaja.
tags: finales, alfil, peon de torre, tablas
minutes: 7
---

Rey, alfil y peón contra rey suele ser una victoria fácil. Pero hay una excepción famosa: cuando el peón es **de torre** y el alfil **no controla la casilla de coronación**.

## ¿Cuál es el alfil «equivocado»?

Mira el color de la casilla en la que corona el peón:

- El peón blanco de h corona en **h8**, que es una casilla **oscura**. El alfil «bueno» es el de casillas oscuras.
- El peón blanco de a corona en **a8**, que es una casilla **clara**. El alfil «bueno» es el de casillas claras.

Si tu alfil **no** controla esa casilla, el rey rival se mete en la esquina y no hay forma de sacarlo: o le das ahogado o el peón no puede avanzar.

```tablero
{ "fen": "7k/8/6K1/7P/8/8/8/5B2 w - - 0 1", "highlights": ["h8"], "caption": "El alfil blanco es de casillas claras y no controla h8. El rey negro no sale de la esquina: tablas." }
```

```ejercicio
{ "type": "quiz", "fen": "7k/8/6K1/7P/8/8/8/5B2 w - - 0 1", "prompt": "Juegan las blancas, con un alfil y un peón de ventaja. ¿Cuál es el resultado con juego correcto?", "options": ["Ganan las blancas", "Tablas", "Depende de a quién le toque mover"], "answer": 1, "explanation": "El alfil de casillas claras nunca podrá echar al rey de h8 ni de g8. Si las blancas avanzan el peón hasta h7, el rey negro se queda en h8 y el blanco solo puede ahogarlo." }
```

```ejercicio
{ "type": "moves", "fen": "8/2k5/8/8/7P/6K1/8/5B2 b - - 0 1", "solution": ["c7d7"], "accept": ["c7d8", "c7d6"], "orientation": "black", "prompt": "Juegan las **negras**, que tienen solo el rey. El alfil blanco es de casillas claras y el peón es de torre. ¿Cuál es tu plan? Haz la primera jugada.", "hint": "Corre hacia la esquina de coronación del peón.", "wrong": { "c7c6": "Te alejas de la esquina de h8: el rey blanco o el peón llegarán antes." }, "explanation": "**...Rd7** (o ...Rd8, ...Rd6): el rey negro corre hacia h8 por el camino más corto (e7-f8-g8). Si llega a la esquina, son tablas haga lo que haga el blanco." }
```

```ejercicio
{ "type": "quiz", "prompt": "Tienes rey, alfil y peón de **a** contra rey. ¿Qué alfil necesitas para ganar si el rey rival llega a a8?", "options": ["El de casillas claras", "El de casillas oscuras", "Cualquiera de los dos"], "answer": 0, "explanation": "a8 es una casilla **clara**. Solo el alfil de casillas claras puede expulsar al rey de la esquina." }
```

```ejercicio
{ "type": "play", "fen": "8/2k5/8/8/7P/6K1/8/5B2 b - - 0 1", "goal": "draw", "maxMoves": 15, "orientation": "black", "prompt": "Juegas con **negras**. Lleva tu rey a la esquina de h8 y **aguanta las tablas** contra el alfil del color equivocado." }
```
