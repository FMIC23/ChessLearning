---
title: La horquilla
summary: Atacar dos piezas a la vez: el rival solo puede salvar una.
tags: horquilla, tactica
minutes: 12
---

Una **horquilla** (o ataque doble) es una jugada que **ataca dos piezas a la vez**. El rival solo puede salvar una, y tú capturas la otra.

Cualquier pieza puede hacer horquillas, pero hay tres especialistas:

- **El caballo**: ataca en todas direcciones y no puede ser bloqueado. Su horquilla favorita es la «familiar»: rey y dama a la vez.
- **El peón**: ataca dos casillas en diagonal. Una horquilla de peón contra dos piezas casi siempre gana material.
- **La dama**: puede atacar en ocho direcciones. Combinada con un **jaque**, es demoledora.

```tablero
{ "fen": "r3k3/2N5/8/8/8/8/8/4K3 b - - 0 1", "arrows": [["c7", "e8"], ["c7", "a8"]], "caption": "Horquilla de caballo: jaque al rey y ataque a la torre de a8." }
```

> Para encontrar horquillas, busca **piezas rivales sin defensa** y piezas que estén a **salto de caballo** unas de otras. Las horquillas con jaque son las más fuertes, porque el rival no tiene tiempo de salvar la otra pieza.

```ejercicio
{ "type": "moves", "fen": "5rk1/pp3ppp/2q5/3N4/8/8/PPP2PPP/3R2K1 w - - 0 1", "solution": ["d5e7", "g8h8", "e7c6"], "prompt": "Encuentra la **horquilla de caballo** que gana la dama.", "hint": "Busca un jaque que también ataque a la dama.", "explanation": "1.Ce7+ ataca a la vez al rey de g8 y a la dama de c6. Tras 1...Rh8, 2.Cxc6 gana la dama." }
```

```ejercicio
{ "type": "moves", "fen": "2r3k1/pp3ppp/2n1b3/8/2PP4/8/PP3PPP/2R2BK1 w - - 0 1", "solution": ["d4d5"], "prompt": "Gana una pieza con una **horquilla de peón**.", "hint": "¿Qué peón puede atacar a la vez al caballo y al alfil?", "explanation": "d5 ataca al caballo de c6 y al alfil de e6. El peón está protegido por c4, así que una de las dos piezas caerá." }
```

```ejercicio
{ "type": "moves", "fen": "r5k1/p5pp/8/7n/8/8/5PPP/3Q2K1 w - - 0 1", "solution": ["d1d5", "g8f8", "d5a8"], "prompt": "Usa la dama para hacer una **horquilla con jaque**.", "hint": "La torre de a8 no está defendida. ¿Puedes dar jaque y atacarla a la vez?", "wrong": { "d1h5": "Ganas el caballo, pero con una horquilla puedes ganar la torre, que vale más." }, "explanation": "1.Dd5+ da jaque al rey y ataca la torre de a8. Tras 1...Rf8, 2.Dxa8+ gana la torre." }
```

```ejercicio
{ "type": "moves", "fen": "r3k2r/pp3ppp/2b5/1N6/8/8/PPP2PPP/R3K2R w KQkq - 0 1", "solution": ["b5c7", "e8e7", "c7a8"], "prompt": "Encuentra la **horquilla familiar**: jaque al rey y ataque a una torre.", "hint": "La casilla c7 está libre...", "explanation": "1.Cc7+ ataca al rey y a la torre de a8. Tras 1...Re7, 2.Cxa8 gana la calidad." }
```

```ejercicio
{ "type": "quiz", "prompt": "¿Por qué una horquilla **con jaque** es especialmente fuerte?", "options": ["Porque el jaque obliga al rival a responder y no puede salvar la otra pieza", "Porque el jaque siempre es mate", "Porque así la pieza que ataca no puede ser capturada"], "answer": 0, "explanation": "El rival está obligado a sacar su rey del jaque. Mientras tanto, tú capturas la otra pieza atacada." }
```
