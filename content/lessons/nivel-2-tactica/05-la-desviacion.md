---
title: La desviación
summary: Obliga a una pieza defensora a abandonar su puesto.
tags: desviacion, tactica
minutes: 12
---

Muchas piezas tienen una **tarea defensiva**: proteger otra pieza, vigilar una casilla de mate o tapar una línea. La **desviación** consiste en **obligar a esa pieza a irse** (normalmente con un jaque o una captura que no puede rechazar). En cuanto abandona su puesto, lo que defendía queda indefenso.

Un caso típico es la **pieza sobrecargada**: una sola pieza defiende **dos cosas** a la vez. Ataca una de ellas y la otra caerá.

```tablero
{ "fen": "2r3k1/pp3ppp/8/2b5/8/Q7/PP3PPP/4R1K1 w - - 0 1", "arrows": [["c8", "c5", "rgba(220,38,38,0.85)"], ["c8", "e8", "rgba(220,38,38,0.85)"]], "caption": "La torre de c8 está sobrecargada: defiende el alfil de c5 y, a la vez, la última fila." }
```

Cuando busques una desviación, pregúntate: **¿qué hace cada pieza defensora del rival?** Si alguna tiene un trabajo imprescindible, intenta apartarla de él.

```ejercicio
{ "type": "moves", "fen": "2r3k1/pp3ppp/8/2b5/8/Q7/PP3PPP/4R1K1 w - - 0 1", "solution": ["a3c5"], "prompt": "La torre de c8 tiene **dos trabajos**. Aprovéchalo y gana material.", "hint": "Si la torre deja la octava fila, ¿qué pasa en e8?", "wrong": { "e1e8": "La torre de c8 todavía vigila la octava fila: Txe8." }, "explanation": "Dxc5! gana el alfil: si 1...Txc5, la torre abandona la octava fila y 2.Te8# es mate." }
```

```ejercicio
{ "type": "moves", "fen": "4kb1r/p2n1ppp/4q3/4p1B1/4P3/1Q6/PPP2PPP/2KR4 w k - 0 16", "solution": ["b3b8", "d7b8", "d1d8"], "goal": "mate", "prompt": "El final de la partida de la Ópera (Morphy, 1858). Mate en **dos**.", "hint": "El caballo de d7 es lo único que tapa la columna d. ¡Desvíalo!", "explanation": "16.Db8+!! Cxb8 (forzado) 17.Td8#. El caballo ha tenido que abandonar d7 y la torre da mate, apoyada por el alfil de g5." }
```

```ejercicio
{ "type": "moves", "fen": "r4r2/pp3pkp/5qp1/8/8/5Q2/PP3PPP/2B2RK1 w - - 0 1", "solution": ["c1h6", "g7h6", "f3f6"], "prompt": "Las damas están frente a frente y la negra solo está defendida por su rey. **Desvía al rey**.", "hint": "Un jaque de alfil obligará al rey a moverse.", "wrong": { "f3f6": "Dxf6+ Rxf6 es un simple cambio de damas. Primero aparta al rey." }, "explanation": "1.Ah6+! Rxh6 (si el rey va a g8 o h8, tampoco defiende la dama) 2.Dxf6 y las blancas ganan la dama por el alfil." }
```

```ejercicio
{ "type": "moves", "fen": "4r1k1/5ppp/8/4n3/2q5/8/PQ3PPP/3R2K1 w - - 0 1", "solution": ["b2e5"], "prompt": "La torre de e8 defiende el caballo **y** la última fila. **Aprovecha la sobrecarga**.", "hint": "Si la torre captura en e5, ¿quién vigila la octava fila?", "explanation": "Dxe5! gana el caballo: si 1...Txe5, 2.Td8+ Te8 3.Txe8# es mate del pasillo." }
```

```ejercicio
{ "type": "quiz", "prompt": "¿Qué es una pieza **sobrecargada**?", "options": ["Una pieza atacada por muchas piezas rivales", "Una pieza que tiene que defender dos cosas a la vez", "Una pieza que no puede moverse"], "answer": 1, "explanation": "Si una pieza defiende dos cosas, basta con atacar una de ellas: al defenderla, abandona la otra." }
```
