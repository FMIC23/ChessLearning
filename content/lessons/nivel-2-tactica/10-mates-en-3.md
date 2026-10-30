---
title: Mates en tres jugadas
summary: Combinaciones más largas: encadena jaques y sacrificios hasta el mate.
tags: mate, tactica
minutes: 15
---

Un mate en tres exige **calcular más lejos**, pero el método es el mismo: jugadas forzadas que llevan a un patrón conocido. Visualiza la posición final **antes** de empezar.

Consejos para calcular:

- Usa jugadas **forzadas**: si el rival tiene una sola respuesta, el cálculo es sencillo.
- Después de cada jugada, comprueba **todas** las respuestas del rival, no solo la que te conviene.
- Piensa en el **patrón final** (pasillo, coz, Anastasia...) y trabaja hacia atrás.

```tablero
{ "fen": "5rk1/pp1RR1pp/8/8/2q5/8/5PPP/6K1 w - - 0 1", "arrows": [["d7", "g7"], ["e7", "g7"]], "caption": "Dos torres en la séptima fila: un clásico que suele terminar en mate." }
```

```ejercicio
{ "type": "moves", "fen": "5rk1/pp3ppp/8/3N3Q/8/3R4/PP3PPP/6K1 w - - 0 1", "solution": ["d5e7", "g8h8", "h5h7", "h8h7", "d3h3"], "goal": "mate", "prompt": "Mate en **tres**. Prepara el **mate de Anastasia**.", "hint": "Primero un jaque de caballo para llevar al rey a la esquina.", "explanation": "1.Ce7+ Rh8 2.Dxh7+!! Rxh7 3.Th3#." }
```

```ejercicio
{ "type": "moves", "fen": "4r1k1/pp3Npp/8/8/2Q5/8/PPP2PPP/6K1 w - - 0 1", "solution": ["f7h6", "g8h8", "c4g8", "e8g8", "h6f7"], "goal": "mate", "prompt": "Mate en **tres**: el **mate de Philidor**.", "hint": "Empieza con un jaque doble del caballo y la dama.", "explanation": "1.Ch6+ (jaque doble) Rh8 2.Dg8+!! Txg8 3.Cf7#, el mate de la coz. Si 1...Rf8, 2.Df7# es mate." }
```

```ejercicio
{ "type": "moves", "fen": "5rk1/pp1RR1pp/8/8/2q5/8/5PPP/6K1 w - - 0 1", "solution": ["e7g7", "g8h8", "g7h7", "h8g8", "d7g7"], "goal": "mate", "prompt": "Mate en **tres** con las dos torres en la séptima.", "hint": "Empieza capturando en g7 con jaque.", "explanation": "1.Txg7+ Rh8 2.Txh7+ Rg8 3.Tdg7#. Las dos torres se protegen mutuamente y el rey no tiene escapatoria." }
```

```ejercicio
{ "type": "moves", "fen": "5rk1/pp3p1p/6p1/8/4R3/1P5Q/PB3PPP/6K1 w - - 0 1", "solution": ["h3h7", "g8h7", "e4h4", "h7g8", "h4h8"], "goal": "mate", "prompt": "Mate en **tres**. Fíjate en el alfil de b2.", "hint": "Sacrifica la dama en h7 y sigue dando jaques por la columna h.", "explanation": "1.Dxh7+!! Rxh7 2.Th4+ Rg8 3.Th8#. El alfil de b2 controla g7 y h8 por la gran diagonal." }
```

```ejercicio
{ "type": "quiz", "prompt": "Has encontrado un sacrificio que lleva a mate si el rival responde como esperas. ¿Qué debes comprobar?", "options": ["Nada más: si es bonito, funciona", "Todas las respuestas posibles del rival, no solo la que te conviene", "Que el sacrificio sea de la dama"], "answer": 1, "explanation": "Un mate en tres solo es mate si funciona contra **cualquier** defensa. Revisa siempre todas las respuestas del rival." }
```
