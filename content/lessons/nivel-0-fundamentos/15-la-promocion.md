---
title: La promoción
summary: Cuando un peón llega al final del tablero se convierte en otra pieza.
tags: reglas-especiales
minutes: 6
---

Cuando un peón llega a la **última fila** (la 8 para las blancas, la 1 para las negras), se **promociona**: se cambia inmediatamente por una **dama, torre, alfil o caballo** del mismo color, a elección del jugador. Nunca por un rey ni por otro peón.

Casi siempre se elige la **dama**, por ser la pieza más fuerte. Promocionar a otra pieza se llama **subpromoción** y a veces sirve para dar un jaque de caballo o para evitar un ahogado.

```tablero
{ "fen": "8/4P3/8/8/8/k7/8/4K3 w - - 0 1", "arrows": [["e7", "e8"]], "caption": "El peón de e7 llegará a e8 y se convertirá en dama." }
```

Puedes tener varias damas a la vez: no importa que tu dama original siga en el tablero.

¡Por eso los peones avanzados son tan peligrosos! Un peón sin peones rivales que le cierren el paso se llama **peón pasado**.

```ejercicio
{ "type": "moves", "fen": "8/4P3/8/8/8/k7/8/4K3 w - - 0 1", "solution": ["e7e8q"], "prompt": "**Promociona** el peón a dama.", "hint": "Lleva el peón a e8 y elige la dama.", "explanation": "e8=D: ahora tienes una dama nueva y la victoria está asegurada." }
```

```ejercicio
{ "type": "moves", "fen": "8/8/8/8/8/4K3/2p5/4k3 b - - 0 1", "solution": ["c2c1q"], "prompt": "Juegan negras. **Promociona** el peón.", "explanation": "c1=D+: las negras consiguen una dama, ¡y además con jaque!", "engine": false }
```

```ejercicio
{ "type": "quiz", "prompt": "¿En qué piezas se puede promocionar un peón?", "options": ["Solo en dama", "En dama, torre, alfil o caballo", "En cualquier pieza, incluido el rey", "Solo en una pieza que se haya capturado antes"], "answer": 1, "explanation": "Puedes elegir cualquier pieza salvo el rey, aunque no te la hayan capturado." }
```
