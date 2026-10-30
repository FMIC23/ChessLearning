---
title: Mates en dos jugadas
summary: Combina un jaque o un sacrificio con un patrón de mate conocido.
tags: mate, tactica
minutes: 12
---

En un mate en dos, tu primera jugada prepara el terreno y la segunda da el mate. Lo más habitual es que la primera sea **forzada**: un jaque o un sacrificio que el rival no puede rechazar.

Para resolverlos:

1. Busca el **patrón de mate** que podría aparecer (pasillo, coz, beso de la dama...).
2. Pregúntate qué **pieza o casilla** te lo impide.
3. Busca un **jaque o captura** que elimine ese obstáculo.

```tablero
{ "fen": "rn1q1bnr/ppp1kB1p/3p2p1/3NN3/4P3/8/PPPP1PPP/R1BbK2R b KQ - 1 7", "highlights": ["e7"], "caption": "El mate de Legal: tres piezas menores dan mate a un rey que ha salido a pasear." }
```

```ejercicio
{ "type": "moves", "fen": "rn1qkbnr/ppp2p1p/3p2p1/4N3/2B1P3/2N5/PPPP1PPP/R1BbK2R w KQkq - 0 6", "solution": ["c4f7", "e8e7", "c3d5"], "goal": "mate", "prompt": "Las negras se han comido tu dama. ¡Error! Mate en **dos**: el **mate de Legal**.", "hint": "Empieza con un jaque del alfil.", "explanation": "6.Axf7+ Re7 7.Cd5#. El rey queda encerrado entre el alfil, los dos caballos y sus propias piezas." }
```

```ejercicio
{ "type": "moves", "fen": "2k1rb1r/ppp3pp/2n2q2/3B1b2/5P2/2P1BQ2/PP1N1P1P/2KR3R b - - 0 14", "solution": ["f6c3", "b2c3", "f8a3"], "goal": "mate", "prompt": "Juegan las **negras** (Schulder-Boden, 1853). Mate en **dos**.", "hint": "Sacrifica la dama para abrir las diagonales de tus alfiles.", "explanation": "14...Dxc3+! 15.bxc3 Aa3#: el **mate de Boden**. Los dos alfiles se cruzan y el rey blanco no tiene salida." }
```

```ejercicio
{ "type": "moves", "fen": "6k1/2q2ppp/8/8/3Q4/8/5PPP/3R2K1 w - - 0 1", "solution": ["d4d8", "c7d8", "d1d8"], "goal": "mate", "prompt": "Mate en **dos** por la última fila.", "hint": "La dama negra es la única que vigila la octava fila.", "explanation": "1.Dd8+! Dxd8 2.Txd8#. La dama negra captura y la torre da el mate del pasillo." }
```

```ejercicio
{ "type": "moves", "fen": "r5k1/5p2/6P1/7Q/8/8/5PPP/6K1 w - - 0 1", "solution": ["h5h7", "g8f8", "h7f7"], "goal": "mate", "prompt": "Mate en **dos** con la dama y el peón.", "hint": "Da jaque en h7: el rey solo tiene una casilla.", "explanation": "1.Dh7+ Rf8 2.Dxf7#: la dama, protegida por el peón de g6, da mate. Es el **mate de Damiano**." }
```

```ejercicio
{ "type": "quiz", "prompt": "En un mate en dos, ¿qué tipo de primera jugada conviene revisar antes que nada?", "options": ["Jugadas tranquilas de peón", "Jaques y sacrificios que el rival no puede rechazar", "Jugadas de rey"], "answer": 1, "explanation": "Las jugadas forzadas reducen las respuestas del rival y hacen el cálculo mucho más fácil." }
```
