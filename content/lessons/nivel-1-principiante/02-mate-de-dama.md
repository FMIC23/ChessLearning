---
title: Mate con rey y dama
summary: La técnica de la «caja» para dar mate con dama y rey contra el rey solo.
tags: mate, finales
minutes: 10
---

Rey y dama contra rey solo es una victoria segura... si conoces la técnica. El plan tiene tres fases:

1. **Encerrar** al rey rival en una «caja» con la dama.
2. **Hacer la caja más pequeña** hasta llevar al rey a una banda (fila o columna del borde).
3. **Acercar tu rey** y dar mate con la ayuda de los dos.

## La caja

Coloca la dama **a salto de caballo** del rey rival. Así le quitas muchas casillas sin darle jaque y sin ponerte a su alcance.

```tablero
{ "fen": "8/8/3k4/5Q2/8/8/8/4K3 w - - 0 1", "highlights": ["a6", "b6", "c6", "d6", "e6", "a7", "b7", "c7", "d7", "e7", "a8", "b8", "c8", "d8", "e8"], "caption": "La dama en f5 controla la quinta fila y la columna f: el rey negro está encerrado en la zona marcada." }
```

Cada vez que el rey rival se mueve, **sigue a salto de caballo** con la dama y la caja se encoge. Los jaques sueltos no sirven: solo dejan que el rey se escape.

## Cuidado con el ahogado

Cuando el rey rival esté en la banda, no le quites **todas** sus casillas sin darle jaque. Si no tiene jugadas y no está en jaque, ¡es tablas!

```tablero
{ "fen": "k7/2Q5/1K6/8/8/8/8/8 b - - 0 1", "highlights": ["a8"], "caption": "¡Ahogado! Juegan negras, su rey no está en jaque y no tiene casillas: tablas." }
```

## El mate final

El mate típico llega con el rey rival en la banda: la dama da jaque pegada a él y **tu rey la protege**, o la dama controla toda la banda mientras tu rey tapa la fila de delante.

```ejercicio
{ "type": "moves", "fen": "k7/8/1K6/8/8/8/8/2Q5 w - - 0 1", "solution": ["c1c8"], "goal": "mate", "prompt": "Da **jaque mate** en una jugada. ¡Ojo con el ahogado!", "hint": "Tu rey ya controla a7 y b7. Busca un jaque por la octava fila.", "wrong": { "c1c7": "¡Ahogado! El rey negro no está en jaque y no tiene jugadas: tablas." }, "explanation": "Dc8#: la dama controla toda la octava fila y tu rey cubre a7 y b7." }
```

```ejercicio
{ "type": "moves", "fen": "3k4/8/1K6/8/5Q2/8/8/8 w - - 0 1", "solution": ["f4f7", "d8c8", "f7c7"], "goal": "mate", "prompt": "Mate en **dos** jugadas. Primero, encoge la caja con una jugada tranquila.", "hint": "Pon la dama en la séptima fila, sin dar jaque.", "explanation": "1.Df7 deja al rey negro una sola casilla (c8). Tras 1...Rc8, 2.Dc7# con la dama protegida por el rey." }
```

```ejercicio
{ "type": "moves", "fen": "4k3/8/8/5K2/1Q6/8/8/8 w - - 0 1", "solution": ["f5e6", "e8d8", "b4b8"], "goal": "mate", "prompt": "Mate en **dos**. La dama sola no puede: ¡trae al rey!", "hint": "Coloca tu rey frente al rey negro (en oposición).", "explanation": "1.Re6 quita d7, e7 y f7; la dama ya vigila f8. Tras 1...Rd8, 2.Db8# es mate." }
```

```ejercicio
{ "type": "quiz", "prompt": "¿Dónde conviene colocar la dama para encerrar al rey rival sin darle jaque?", "options": ["Pegada al rey, en una casilla vecina", "A salto de caballo del rey", "Lo más lejos posible"], "answer": 1, "explanation": "A salto de caballo, la dama le quita muchas casillas, no da jaque y no puede ser capturada." }
```

```ejercicio
{ "type": "play", "fen": "8/8/8/2k5/8/8/8/4K2Q w - - 0 1", "goal": "mate", "maxMoves": 20, "prompt": "Practica contra el ordenador: **da mate con rey y dama** en 20 jugadas como máximo. Usa la caja, acerca tu rey y vigila el ahogado." }
```
