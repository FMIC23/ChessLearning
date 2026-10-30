---
title: El peón
summary: El peón avanza hacia delante, captura en diagonal y puede avanzar dos casillas en su primera jugada.
tags: piezas
minutes: 6
---

El **peón** es la pieza más humilde, pero también la más curiosa:

- **Avanza** una casilla **hacia delante** (nunca hacia atrás).
- En **su primera jugada** puede avanzar **una o dos casillas**.
- **Captura en diagonal**, una casilla hacia delante. ¡Se mueve de una manera y captura de otra!
- Si tiene una pieza justo delante (propia o rival), **queda bloqueado**.

```tablero
{ "fen": "8/8/8/3p1n2/4P3/8/3P4/8 w - - 0 1", "arrows": [["d2", "d4"], ["e4", "d5", "rgba(220,38,38,0.85)"], ["e4", "f5", "rgba(220,38,38,0.85)"]], "caption": "El peón de d2 puede avanzar una o dos casillas. El de e4 puede capturar en d5 o en f5." }
```

> «Los peones son el alma del ajedrez». — François-André Philidor, siglo XVIII.

Además, el peón tiene dos reglas especiales, la **promoción** y la **captura al paso**, que verás en lecciones posteriores.

```ejercicio
{ "type": "squares", "fen": "8/8/8/8/8/8/4P3/8 w - - 0 1", "targets": "moves:e2", "mode": "all", "highlights": ["e2"], "prompt": "Marca las casillas a las que puede ir el peón de e2.", "explanation": "En su primera jugada puede avanzar una o dos casillas: e3 o e4." }
```

```ejercicio
{ "type": "squares", "fen": "8/8/8/3pnp2/4P3/8/8/8 w - - 0 1", "targets": "moves:e4", "mode": "all", "highlights": ["e4"], "prompt": "Marca las casillas a las que puede ir el peón de e4.", "hint": "El caballo de e5 lo bloquea, pero los peones de d5 y f5 están en diagonal.", "explanation": "No puede avanzar porque el caballo le bloquea, pero sí puede capturar en d5 o f5." }
```

```ejercicio
{ "type": "moves", "fen": "4k3/8/8/8/8/8/4P3/4K3 w - - 0 1", "solution": ["e2e4"], "prompt": "Avanza el peón **dos casillas**.", "explanation": "En su primera jugada, el peón puede avanzar dos casillas.", "engine": false }
```

```ejercicio
{ "type": "quiz", "prompt": "¿Cómo captura el peón?", "options": ["Hacia delante, en línea recta", "En diagonal, una casilla hacia delante", "En cualquier dirección"], "answer": 1, "explanation": "El peón avanza recto, pero captura en diagonal." }
```
