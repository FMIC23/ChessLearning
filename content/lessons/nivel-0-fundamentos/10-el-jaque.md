---
title: El jaque
summary: Qué es el jaque y las tres formas de salir de él.
tags: jaque
minutes: 6
---

Cuando una pieza **ataca al rey** rival, se dice que le da **jaque**. El jugador que recibe el jaque **está obligado a salir de él** en su jugada inmediatamente.

Hay **tres formas** de salir del jaque:

1. **Mover el rey** a una casilla segura.
2. **Tapar** (interponer una pieza entre el rey y la pieza atacante). No sirve contra el caballo, que salta.
3. **Capturar** la pieza que da jaque.

```tablero
{ "fen": "4k3/8/8/8/8/8/5PPP/R5K1 w - - 0 1", "arrows": [["a1", "a8"], ["a8", "e8"]], "caption": "Si la torre va a a8, da jaque al rey negro por la fila 8." }
```

Es ilegal hacer una jugada que deje a tu propio rey en jaque.

```ejercicio
{ "type": "moves", "fen": "4k3/8/8/8/8/8/5PPP/R5K1 w - - 0 1", "solution": ["a1a8"], "accept": ["a1e1"], "prompt": "Da **jaque** al rey negro con la torre.", "explanation": "La torre ataca al rey por la fila 8 (Ta8+) o por la columna e (Te1+).", "engine": false }
```

```ejercicio
{ "type": "moves", "fen": "6k1/5ppp/8/8/8/3N4/5PPP/4r1K1 w - - 0 1", "solution": ["d3e1"], "prompt": "Tu rey está en **jaque**. Sal del jaque **capturando** la pieza atacante.", "explanation": "El caballo captura la torre (Cxe1). Era la única defensa: el rey no podía moverse y no se podía tapar." }
```

```ejercicio
{ "type": "quiz", "fen": "4k3/8/8/q7/8/8/8/2B1K3 w - - 0 1", "prompt": "La dama negra da jaque por la diagonal. ¿Cómo pueden las blancas **tapar** el jaque?", "options": ["Llevando el alfil a d2", "Moviendo el rey a f2", "No se puede tapar"], "answer": 0, "explanation": "Ad2 se interpone en la diagonal a5–e1. Mover el rey también es legal, pero eso es huir, no tapar." }
```

```ejercicio
{ "type": "quiz", "prompt": "¿Cuál de estas **no** es una forma de salir del jaque?", "options": ["Mover el rey", "Tapar el jaque", "Capturar la pieza que da jaque", "Enrocarse"], "answer": 3, "explanation": "Nunca se puede enrocar estando en jaque." }
```
