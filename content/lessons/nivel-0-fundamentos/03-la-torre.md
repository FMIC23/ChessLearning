---
title: La torre
summary: La torre se mueve en línea recta por filas y columnas.
tags: piezas
minutes: 5
---

La **torre** se mueve en **línea recta**, en horizontal o en vertical, **tantas casillas como quiera**, siempre que el camino esté libre.

```tablero
{ "fen": "8/8/8/8/3R4/8/8/8 w - - 0 1", "arrows": [["d4", "d8"], ["d4", "d1"], ["d4", "a4"], ["d4", "h4"]], "caption": "Desde d4, la torre controla toda la columna d y toda la fila 4." }
```

Reglas importantes:

- **No puede saltar** por encima de otras piezas.
- Si en su camino hay una **pieza propia**, se detiene antes.
- Si hay una **pieza rival**, puede **capturarla** ocupando su casilla (y ahí se detiene).

En una partida, la torre es una pieza muy fuerte. Sobre todo es poderosa en columnas sin peones, como verás más adelante.

```ejercicio
{ "type": "squares", "fen": "8/8/8/8/3R4/8/8/8 w - - 0 1", "targets": "moves:d4", "mode": "all", "highlights": ["d4"], "prompt": "Marca **todas** las casillas a las que puede ir la torre de d4.", "explanation": "¡14 casillas! Una torre en un tablero vacío siempre controla 14 casillas, esté donde esté." }
```

```ejercicio
{ "type": "squares", "fen": "8/8/3P4/8/3R1n2/8/8/8 w - - 0 1", "targets": "moves:d4", "mode": "all", "highlights": ["d4"], "prompt": "Ahora hay más piezas. Marca todas las casillas a las que puede ir la torre de d4.", "hint": "Tu propio peón de d6 bloquea el camino hacia arriba. El caballo negro de f4 se puede capturar.", "explanation": "La torre no puede pasar por encima de su propio peón (d6), pero sí puede capturar el caballo de f4. No puede seguir más allá de f4." }
```

```ejercicio
{ "type": "moves", "fen": "q7/8/8/8/8/8/8/R7 w - - 0 1", "solution": ["a1a8"], "prompt": "Captura la **dama negra** con tu torre.", "explanation": "La torre recorre toda la columna a y captura la dama ocupando su casilla.", "engine": false }
```

```ejercicio
{ "type": "quiz", "prompt": "¿Puede la torre saltar por encima de otras piezas?", "options": ["Sí, de cualquier color", "Solo por encima de las propias", "No, nunca"], "answer": 2, "explanation": "La única pieza que puede saltar es el caballo." }
```
