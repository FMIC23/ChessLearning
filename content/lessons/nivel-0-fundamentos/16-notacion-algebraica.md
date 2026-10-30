---
title: La notación algebraica
summary: Aprende a leer y escribir las jugadas de una partida.
tags: notacion
minutes: 8
---

La **notación algebraica** es el idioma universal para escribir partidas. Cada jugada se escribe con **la letra de la pieza** seguida de **la casilla de destino**.

| Pieza | Letra (español) | Letra (inglés) |
|---|---|---|
| Rey | R | K |
| Dama | D | Q |
| Torre | T | R |
| Alfil | A | B |
| Caballo | C | N |
| Peón | *sin letra* | *sin letra* |

Ejemplos: **Cf3** (caballo a f3), **e4** (peón a e4), **Ab5** (alfil a b5).

## Símbolos

- **x** = captura: **Axe5** (el alfil captura en e5); en los peones se indica la columna de salida: **dxe5**.
- **+** = jaque; **#** = jaque mate.
- **O-O** = enroque corto; **O-O-O** = enroque largo.
- **=** = promoción: **e8=D**.
- Si dos piezas iguales pueden ir a la misma casilla, se añade la columna o fila de salida: **Cbd2**, **T1e2**.
- Comentarios: **!** buena jugada, **?** error, **??** error grave, **!?** interesante.

Las jugadas se numeran por parejas: **1. e4 e5 2. Cf3 Cc6** significa que en la primera jugada las blancas movieron e4 y las negras e5, y en la segunda Cf3 y Cc6.

```ejercicio
{ "type": "quiz", "prompt": "¿Qué significa **Cxe5**?", "options": ["Un caballo captura una pieza en e5", "Un caballo se mueve a e5 sin capturar", "Se captura un caballo en e5"], "answer": 0, "explanation": "C = caballo, x = captura, e5 = casilla de destino." }
```

```ejercicio
{ "type": "quiz", "prompt": "¿Cómo se escribe el **enroque largo**?", "options": ["O-O", "O-O-O", "R-c1"], "answer": 1, "explanation": "Tres «O» para el largo y dos para el corto." }
```

```ejercicio
{ "type": "quiz", "prompt": "La jugada **e8=D+** significa…", "options": ["La dama va a e8 y da jaque", "Un peón promociona a dama en e8 y da jaque", "Un peón captura una dama en e8"], "answer": 1, "explanation": "= indica promoción y + jaque." }
```

```ejercicio
{ "type": "moves", "fen": "r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3", "solution": ["f1b5"], "prompt": "Tras **1. e4 e5 2. Cf3 Cc6**, juega **3. Ab5** (la apertura española).", "explanation": "El alfil de f1 va a b5 y ataca al caballo que defiende el peón de e5.", "engine": false }
```

```ejercicio
{ "type": "moves", "fen": "rnbqkbnr/pppp1ppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2", "solution": ["g8f6"], "prompt": "Juegan negras. Juega **2... Cf6**.", "hint": "Los puntos suspensivos (…) indican que es una jugada de las negras.", "explanation": "El caballo de g8 va a f6: es la defensa Petrov.", "engine": false }
```
