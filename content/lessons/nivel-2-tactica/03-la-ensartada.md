---
title: La ensartada
summary: Atacar una pieza valiosa que, al apartarse, deja expuesta otra pieza detrás.
tags: ensartada, tactica
minutes: 10
---

La **ensartada** (en inglés, *skewer*) es como una clavada al revés: atacas en línea a una pieza **valiosa** que tiene **detrás** otra pieza. Cuando la valiosa se aparta, capturas la de detrás.

- En la **clavada**, la pieza de delante vale **menos** que la de detrás.
- En la **ensartada**, la pieza de delante vale **más** (a menudo es el rey, que está obligado a moverse por el jaque).

```tablero
{ "fen": "8/6p1/R1k4q/8/8/8/5PPP/6K1 b - - 0 1", "arrows": [["a6", "c6"], ["c6", "h6", "rgba(220,38,38,0.85)"]], "caption": "La torre da jaque en la sexta fila; cuando el rey se aparte, la dama de h6 quedará indefensa." }
```

Las ensartadas las hacen las piezas de largo alcance: **alfiles, torres y damas**. Búscalas cuando el rey rival y otra pieza suya estén en la **misma fila, columna o diagonal**.

```ejercicio
{ "type": "moves", "fen": "8/6p1/2k4q/8/8/8/5PPP/R5K1 w - - 0 1", "solution": ["a1a6", "c6d7", "a6h6"], "prompt": "El rey y la dama negros están en la misma fila. **Ensártalos**.", "hint": "Da jaque por la sexta fila.", "explanation": "1.Ta6+ obliga al rey a salir de la sexta fila. Tras 1...Rd7, 2.Txh6 gana la dama a cambio de la torre." }
```

```ejercicio
{ "type": "moves", "fen": "7r/8/8/4k3/8/8/P4PPP/2B3K1 w - - 0 1", "solution": ["c1b2", "e5f5", "b2h8"], "prompt": "Gana la torre con una **ensartada de alfil**.", "hint": "El rey y la torre están en la misma diagonal larga.", "explanation": "1.Ab2+ da jaque por la gran diagonal. Cuando el rey se aparta (1...Rf5), 2.Axh8 captura la torre." }
```

```ejercicio
{ "type": "moves", "fen": "r5k1/5ppp/8/8/3K4/8/6PP/3Q4 b - - 0 1", "solution": ["a8d8", "d4e5", "d8d1"], "prompt": "Juegan las **negras**. El rey y la dama blancos están en la misma columna. **Aprovéchalo**.", "explanation": "1...Td8+ da jaque por la columna d. El rey tiene que apartarse (2.Re5) y 2...Txd1 gana la dama." }
```

```ejercicio
{ "type": "moves", "fen": "6r1/p7/8/8/2k5/8/5PPP/1B4K1 w - - 0 1", "solution": ["b1a2", "c4d4", "a2g8"], "prompt": "El rey negro y su torre comparten una diagonal. **Ensártalos**.", "hint": "Da jaque desde a2.", "explanation": "1.Aa2+ ataca al rey a lo largo de la diagonal a2-g8. Cuando se aparta (1...Rd4), 2.Axg8 gana la torre." }
```

```ejercicio
{ "type": "quiz", "prompt": "¿En qué se diferencia la ensartada de la clavada?", "options": ["En la ensartada la pieza de delante vale más que la de detrás", "En la ensartada siempre se usa el caballo", "No hay diferencia: son lo mismo"], "answer": 0, "explanation": "En la clavada, la pieza de delante no quiere moverse para no exponer a la de detrás. En la ensartada, la de delante (más valiosa) se aparta y cae la de detrás." }
```
