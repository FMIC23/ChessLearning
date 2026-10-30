---
title: El caballo
summary: El caballo se mueve en forma de «L» y es la única pieza que puede saltar.
tags: piezas
minutes: 6
---

El **caballo** tiene el movimiento más original: salta en forma de **«L»**, es decir, **dos casillas en una dirección y una en perpendicular**.

```tablero
{ "fen": "8/8/8/8/3N4/8/8/8 w - - 0 1", "highlights": ["c6", "e6", "f5", "f3", "e2", "c2", "b3", "b5"], "caption": "Desde d4, el caballo llega a 8 casillas." }
```

- Es la **única pieza que puede saltar** por encima de las demás (propias o rivales).
- Captura igual que se mueve: cayendo en la casilla de la pieza rival.
- Cada salto lo lleva a una casilla **de color contrario** al de partida.
- En el centro es mucho más fuerte que en una esquina: **«caballo en el borde, caballo que se pierde»**.

```ejercicio
{ "type": "squares", "fen": "8/8/8/8/3N4/8/8/8 w - - 0 1", "targets": "moves:d4", "mode": "all", "highlights": ["d4"], "prompt": "Marca todas las casillas a las que puede saltar el caballo de d4.", "explanation": "Ocho casillas: en el centro, el caballo está en su mejor momento." }
```

```ejercicio
{ "type": "squares", "fen": "8/8/8/8/8/8/8/N7 w - - 0 1", "targets": "moves:a1", "mode": "all", "highlights": ["a1"], "prompt": "Ahora el caballo está en la esquina a1. Marca sus casillas.", "explanation": "¡Solo 2! Por eso un caballo en la esquina es muy débil." }
```

```ejercicio
{ "type": "moves", "fen": "8/8/8/8/8/5r2/5PPP/6N1 w - - 0 1", "solution": ["g1f3"], "prompt": "El caballo está rodeado por sus peones, pero puede saltar. Captura la **torre**.", "explanation": "El caballo salta por encima de los peones y captura en f3.", "engine": false }
```

```ejercicio
{ "type": "quiz", "prompt": "Un caballo está en una casilla clara. ¿De qué color será la casilla a la que llegue en su próximo salto?", "options": ["Clara", "Oscura", "Depende de la dirección"], "answer": 1, "explanation": "El caballo siempre cambia de color en cada salto." }
```
