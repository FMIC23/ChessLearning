---
title: El jaque mate
summary: El objetivo del ajedrez: dar jaque al rey sin que pueda escapar.
tags: mate
minutes: 7
---

El **jaque mate** (o simplemente **mate**) es un jaque del que **no hay forma de salir**: el rey no puede huir, no se puede tapar y no se puede capturar a la pieza atacante. **Quien da mate gana la partida.**

```tablero
{ "fen": "R5k1/5ppp/8/8/8/8/5PPP/6K1 b - - 0 1", "arrows": [["a8", "g8"]], "caption": "El mate del pasillo: el rey negro está encerrado por sus propios peones." }
```

Cuando busques un mate, comprueba las tres salidas del rey rival:

- ¿Tiene **casillas libres** para huir?
- ¿Puede **tapar**?
- ¿Puede **capturar** la pieza que da jaque?

Si la respuesta a las tres es «no», ¡es mate!

```ejercicio
{ "type": "moves", "fen": "6k1/5ppp/8/8/8/8/5PPP/R5K1 w - - 0 1", "solution": ["a1a8"], "goal": "mate", "prompt": "Da **jaque mate** en una jugada.", "hint": "El rey negro está encerrado detrás de sus peones.", "explanation": "Ta8#: es el famoso **mate del pasillo**. Los peones del rey le quitan las casillas de escape." }
```

```ejercicio
{ "type": "moves", "fen": "6k1/Q7/5K2/8/8/8/8/8 w - - 0 1", "solution": ["a7g7"], "goal": "mate", "prompt": "Da **jaque mate** en una jugada.", "hint": "La dama necesita la ayuda de su rey para que no la capturen.", "explanation": "Dg7#: la dama, protegida por el rey de f6, quita todas las casillas al rey negro." }
```

```ejercicio
{ "type": "moves", "fen": "7k/8/6K1/8/8/8/8/R7 w - - 0 1", "solution": ["a1a8"], "goal": "mate", "prompt": "Da **jaque mate** con la torre.", "explanation": "Ta8#: el rey blanco controla g7 y h7, y la torre da jaque y controla toda la fila 8." }
```

```ejercicio
{ "type": "quiz", "fen": "4k3/4Q3/8/8/8/8/8/4K3 b - - 0 1", "prompt": "Juegan las negras. ¿Es **jaque mate**?", "options": ["Sí, es mate", "No: el rey puede capturar la dama", "No: el rey puede huir a d8"], "answer": 1, "explanation": "La dama está pegada al rey y **sin protección**: el rey la captura (Rxe7). Una dama sola junto al rey no da mate si no está defendida." }
```
