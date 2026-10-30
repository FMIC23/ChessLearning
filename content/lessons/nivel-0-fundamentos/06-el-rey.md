---
title: El rey
summary: La pieza más importante: se mueve una casilla en cualquier dirección y nunca puede quedar en jaque.
tags: piezas
minutes: 5
---

El **rey** es la pieza más importante: **si lo atrapan, pierdes la partida**. Se mueve **una sola casilla en cualquier dirección**: horizontal, vertical o diagonal.

```tablero
{ "fen": "8/8/8/8/4K3/8/8/8 w - - 0 1", "highlights": ["d3", "e3", "f3", "d4", "f4", "d5", "e5", "f5"], "caption": "El rey de e4 puede ir a cualquiera de las 8 casillas vecinas." }
```

Dos reglas esenciales:

1. El rey **nunca puede moverse a una casilla atacada** por una pieza rival.
2. Por eso, **los dos reyes nunca pueden estar en casillas vecinas**: siempre hay al menos una casilla entre ellos.

```ejercicio
{ "type": "squares", "fen": "8/8/8/8/4K3/8/8/8 w - - 0 1", "targets": "moves:e4", "mode": "all", "highlights": ["e4"], "prompt": "Marca todas las casillas a las que puede ir el rey.", "explanation": "Las 8 casillas que lo rodean." }
```

```ejercicio
{ "type": "squares", "fen": "3r4/8/8/8/4K3/8/8/8 w - - 0 1", "targets": "moves:e4", "mode": "all", "highlights": ["e4"], "prompt": "La torre negra controla la columna d. Marca solo las casillas **seguras** a las que puede ir el rey.", "hint": "El rey no puede pisar ninguna casilla de la columna d.", "explanation": "d3, d4 y d5 están atacadas por la torre, así que el rey solo tiene 5 casillas." }
```

```ejercicio
{ "type": "quiz", "prompt": "¿Pueden los dos reyes estar en casillas vecinas?", "options": ["Sí, si es para capturar", "No, nunca", "Solo en el final"], "answer": 1, "explanation": "Cada rey ataca las casillas que lo rodean, así que acercarse al otro rey sería meterse en jaque." }
```
