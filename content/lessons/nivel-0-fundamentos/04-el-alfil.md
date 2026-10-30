---
title: El alfil
summary: El alfil se mueve en diagonal y siempre se queda en casillas del mismo color.
tags: piezas
minutes: 5
---

El **alfil** se mueve en **diagonal**, tantas casillas como quiera, mientras el camino esté libre. Igual que la torre, **no puede saltar** y captura ocupando la casilla de la pieza rival.

```tablero
{ "fen": "8/8/8/8/3B4/8/8/8 w - - 0 1", "arrows": [["d4", "h8"], ["d4", "a7"], ["d4", "a1"], ["d4", "g1"]], "caption": "El alfil de d4 controla dos diagonales." }
```

Como las diagonales están formadas por casillas de un solo color, **un alfil nunca cambia de color**. Cada jugador tiene un alfil de casillas claras y otro de casillas oscuras, y por eso se complementan tan bien.

```ejercicio
{ "type": "squares", "fen": "8/8/8/8/8/2B5/8/8 w - - 0 1", "targets": "moves:c3", "mode": "all", "highlights": ["c3"], "prompt": "Marca todas las casillas a las que puede ir el alfil de c3.", "explanation": "El alfil controla sus dos diagonales: a1–h8 y a5–e1." }
```

```ejercicio
{ "type": "squares", "fen": "8/8/2P5/8/4B3/8/6p1/8 w - - 0 1", "targets": "moves:e4", "mode": "all", "highlights": ["e4"], "prompt": "Marca todas las casillas a las que puede ir el alfil de e4.", "hint": "Tu peón de c6 te bloquea. El peón negro de g2 se puede capturar.", "explanation": "Hacia c6 se detiene en d5 por su propio peón; hacia g2 puede capturar el peón negro, pero no seguir hasta h1." }
```

```ejercicio
{ "type": "moves", "fen": "8/8/7r/8/8/8/8/2B5 w - - 0 1", "solution": ["c1h6"], "prompt": "Captura la **torre negra** con el alfil.", "explanation": "El alfil de c1 recorre la diagonal c1–h6 y captura la torre.", "engine": false }
```

```ejercicio
{ "type": "quiz", "prompt": "Un alfil empieza en una casilla clara. ¿Podrá llegar alguna vez a una casilla oscura?", "options": ["Sí, si da un rodeo", "No, nunca", "Solo capturando"], "answer": 1, "explanation": "Moviéndose en diagonal, un alfil siempre permanece en casillas del mismo color." }
```
