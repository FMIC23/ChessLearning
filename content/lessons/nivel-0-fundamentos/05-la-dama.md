---
title: La dama
summary: La pieza más poderosa: combina el movimiento de la torre y el del alfil.
tags: piezas
minutes: 5
---

La **dama** (a veces llamada «reina») es la pieza más poderosa del tablero. Se mueve como una **torre y un alfil a la vez**: en línea recta o en diagonal, tantas casillas como quiera, sin saltar.

```tablero
{ "fen": "8/8/8/8/3Q4/8/8/8 w - - 0 1", "arrows": [["d4", "d8"], ["d4", "d1"], ["d4", "a4"], ["d4", "h4"], ["d4", "h8"], ["d4", "a7"], ["d4", "a1"], ["d4", "g1"]], "caption": "La dama en el centro controla 27 casillas." }
```

Por ser tan valiosa, **no conviene sacarla demasiado pronto** en la partida: las piezas rivales la atacarían ganando tiempo. Lo verás en los principios de apertura.

```ejercicio
{ "type": "squares", "fen": "8/8/8/8/3Q4/8/8/8 w - - 0 1", "targets": "moves:d4", "mode": "all", "highlights": ["d4"], "prompt": "Marca todas las casillas a las que puede ir la dama de d4. (Son muchas: ¡tómate tu tiempo!)", "explanation": "27 casillas: las 14 de la torre más las 13 del alfil." }
```

```ejercicio
{ "type": "moves", "fen": "8/8/8/8/r5n1/8/8/3Q4 w - - 0 1", "solution": ["d1a4"], "prompt": "La dama puede capturar dos piezas. Captura la **más valiosa**: la torre.", "wrong": { "d1g4": "Has capturado el caballo, pero la torre vale más. ¡Busca la torre!" }, "explanation": "La dama va de d1 a a4 por la diagonal. Una torre vale más que un caballo.", "engine": false }
```

```ejercicio
{ "type": "quiz", "prompt": "¿Qué movimientos combina la dama?", "options": ["Los del rey y el caballo", "Los de la torre y el alfil", "Los del alfil y el caballo"], "answer": 1, "explanation": "La dama es una torre y un alfil en una sola pieza." }
```
