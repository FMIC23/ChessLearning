---
title: Mate con rey y torre
summary: Cómo empujar al rey rival hasta la banda y darle mate con torre y rey.
tags: mate, finales
minutes: 12
---

Con rey y torre contra rey también se gana siempre, pero hace falta más paciencia que con la dama: la torre sola **no puede** dar mate, necesita la ayuda del rey.

## El plan

1. **Corta** al rey rival con la torre: la torre controla una fila o columna que el rey no puede cruzar.
2. **Acerca tu rey** hasta ponerlo enfrente del rey rival (en **oposición**).
3. Cuando los reyes estén enfrentados, **da jaque** con la torre: el rey rival tiene que retroceder.
4. Repite hasta llegar a la banda y dar mate.

```tablero
{ "fen": "8/8/8/3k4/8/3K4/8/7R w - - 0 1", "arrows": [["h1", "h5"]], "caption": "Los reyes están en oposición: Th5+ obliga al rey negro a retroceder a la sexta fila." }
```

## La jugada de espera

Muchas veces el rey rival se coloca **a salto de caballo** de tu rey en lugar de enfrente. Entonces no des jaque: haz una **jugada de espera** con la torre (moviéndola por su misma fila o columna, lejos del rey rival). El rival tendrá que moverse... ¡y caerá en la oposición!

```tablero
{ "fen": "4k3/R7/4K3/8/8/8/8/8 w - - 0 1", "arrows": [["a7", "a8"]], "caption": "El mate de la torre: los reyes en oposición y la torre da jaque en la banda." }
```

```ejercicio
{ "type": "moves", "fen": "4k3/8/4K3/8/8/8/8/7R w - - 0 1", "solution": ["h1h8"], "goal": "mate", "prompt": "Da **jaque mate** en una jugada.", "explanation": "Th8#: los reyes están en oposición (tu rey controla d7, e7 y f7) y la torre da jaque en toda la octava fila." }
```

```ejercicio
{ "type": "moves", "fen": "8/k7/2K5/8/8/8/3R4/8 w - - 0 1", "solution": ["d2d8", "a7a6", "d8a8"], "goal": "mate", "prompt": "Mate en **dos**. A veces hay que **esperar**.", "hint": "Pon la torre en la octava fila para quitarle casillas, sin dar jaque.", "explanation": "1.Td8 deja al rey negro solo la casilla a6. Tras 1...Ra6, 2.Ta8# es mate." }
```

```ejercicio
{ "type": "moves", "fen": "4k3/8/5K2/8/8/5R2/8/8 w - - 0 1", "solution": ["f3d3", "e8f8", "d3d8"], "goal": "mate", "prompt": "Mate en **dos**. Corta al rey por el otro lado.", "hint": "Si la torre controla la columna d, el rey negro solo podrá ir a f8.", "explanation": "1.Td3 quita d7 y d8. El rey solo puede ir a f8 y 2.Td8# es mate, porque tu rey cubre e7, f7 y g7." }
```

```ejercicio
{ "type": "quiz", "prompt": "¿Por qué no se puede dar mate con la torre sola, sin ayuda del rey?", "options": ["Porque la torre no puede dar jaque", "Porque el rey rival siempre podría huir o capturar la torre", "Sí se puede, si la torre está en la banda"], "answer": 1, "explanation": "La torre controla una fila y una columna, pero no las casillas pegadas a ella en diagonal. Siempre necesitas a tu rey para quitar esas casillas o proteger a la torre." }
```

```ejercicio
{ "type": "play", "fen": "8/8/8/4k3/8/8/8/R3K3 w - - 0 1", "goal": "mate", "maxMoves": 30, "prompt": "Practica contra el ordenador: **da mate con rey y torre** en 30 jugadas como máximo. Corta, busca la oposición y usa jugadas de espera." }
```
