---
title: La captura al paso
summary: Una regla especial de los peones que sorprende a muchos principiantes.
tags: reglas-especiales
minutes: 6
---

Cuando un peón avanza **dos casillas** desde su posición inicial y queda **justo al lado** de un peón rival, ese peón rival puede capturarlo **como si solo hubiera avanzado una casilla**. Es la **captura al paso** (en francés, *en passant*).

```tablero
{ "fen": "4k3/8/8/3pP3/8/8/8/4K3 w - d6 0 2", "arrows": [["d7", "d5", "rgba(100,100,100,0.6)"], ["e5", "d6"]], "caption": "Las negras acaban de jugar d7-d5. El peón de e5 puede capturarlo al paso, yendo a d6." }
```

Condiciones:

- El peón que captura debe estar en su **quinta fila** (fila 5 para las blancas, fila 4 para las negras).
- El peón rival acaba de avanzar **dos casillas** y ha quedado a su lado.
- Hay que hacerlo **en la jugada inmediatamente siguiente**; si no, se pierde el derecho.

```ejercicio
{ "type": "moves", "fen": "4k3/8/8/3pP3/8/8/8/4K3 w - d6 0 2", "solution": ["e5d6"], "prompt": "Las negras acaban de jugar **d7-d5**. Captura **al paso**.", "hint": "Mueve el peón de e5 en diagonal a d6.", "explanation": "exd6 a.p.: el peón blanco va a d6 y el peón negro de d5 desaparece del tablero.", "engine": false }
```

```ejercicio
{ "type": "moves", "fen": "4k3/8/8/8/3pP3/8/8/4K3 b - e3 0 1", "solution": ["d4e3"], "prompt": "Juegan negras. Las blancas acaban de jugar **e2-e4**. Captura al paso.", "explanation": "dxe3 a.p.: el peón negro de d4 captura al de e4 como si hubiera ido solo a e3.", "engine": false }
```

```ejercicio
{ "type": "quiz", "prompt": "¿Cuándo se puede capturar al paso?", "options": ["En cualquier momento de la partida", "Solo en la jugada inmediatamente siguiente al avance doble", "Solo si el peón rival está defendido"], "answer": 1, "explanation": "Si no lo haces justo en la jugada siguiente, pierdes ese derecho." }
```
