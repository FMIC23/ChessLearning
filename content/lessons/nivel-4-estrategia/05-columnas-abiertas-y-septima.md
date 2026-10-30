---
title: Columnas abiertas y la séptima fila
summary: Dónde poner las torres: columnas abiertas y semiabiertas, doblar torres y la fuerza de una torre en séptima.
tags: estrategia, torres, columnas
minutes: 8
---

Las torres son piezas de largo alcance, pero al principio de la partida están encerradas. Necesitan **líneas abiertas** para actuar.

## Tipos de columnas

- **Columna abierta**: no tiene peones de ningún color. Es la autopista natural de las torres.
- **Columna semiabierta**: solo tiene peones del rival. Tu torre presiona el peón contrario (como en la Siciliana, donde las negras usan la columna c).
- **Columna cerrada**: tiene peones de ambos colores. Las torres hacen poco ahí.

```tablero
{ "fen": "2r4k/pp3pp1/7p/8/8/6P1/PP3PKP/3R4 w - - 0 1", "arrows": [["d1", "d7", "rgba(22,163,74,0.85)"]], "highlights": ["d7"], "caption": "La columna d está abierta y la blanca la controla. El objetivo es la séptima fila: la casilla d7." }
```

## El objetivo: la séptima fila

Una torre en la **séptima fila** (la segunda del rival) es muy poderosa:

- Ataca los peones que aún no han avanzado, que suelen estar ahí.
- Encierra al rey rival en la octava fila.
- Dos torres en séptima (los «cerdos») suelen ser **decisivas**.

```ejercicio
{ "type": "moves", "fen": "2r4k/pp3pp1/7p/8/8/6P1/PP3PKP/3R4 w - - 0 1", "solution": ["d1d7"], "prompt": "Usa la columna abierta: **lleva tu torre a la séptima fila**.", "hint": "La torre puede llegar a la séptima de una sola jugada.", "explanation": "1.Td7! ataca a la vez b7 y f7. Las negras no pueden defender los dos peones: si el rey va a g8 para proteger f7, cae b7 (1...Rg8 2.Txb7). Además, la torre en séptima mantiene al rey negro encerrado.", "wrong": { "d1d2": "Demasiado pasivo: la columna abierta sirve para **entrar** en el campo rival.", "b2b3": "Defiendes un peón que nadie atacaba todavía y pierdes un tiempo. Aprovecha antes la columna abierta." } }
```

## Doblar las torres

Si la columna está disputada, **dobla las torres**: dos torres en la misma columna se defienden y ganan el control. Después, una de ellas entra en la séptima. Y si llegan las dos...

```ejercicio
{ "type": "moves", "fen": "5rk1/1RR3p1/7p/8/8/6P1/5P1P/6K1 w - - 0 1", "solution": ["c7g7", "g8h8", "g7h7", "h8g8", "b7g7"], "goal": "mate", "prompt": "Tienes los «cerdos» en séptima. **Da mate** en tres jugadas.", "hint": "Empieza capturando en g7 con jaque.", "explanation": "1.Txg7+ Rh8 2.Th7+ Rg8 3.Tbg7#. Las dos torres en séptima se protegen mutuamente y el rey negro no tiene escape: es la fuerza de los cerdos." }
```

## ¿Qué columna ocupar?

Antes de mover una torre, pregúntate:

1. ¿Qué columna está **abierta** o puede abrirse pronto?
2. ¿Tiene esa columna un **punto de entrada** (una casilla en la séptima u octava que el rival no controle)?
3. ¿Puede el rival **disputarla** con su torre? Si es así, quizá debas doblar torres.

```ejercicio
{ "type": "quiz", "fen": "r4rk1/pp3ppp/2p1b3/8/8/2N5/PPP2PPP/3R1RK1 w - - 0 1", "prompt": "Juegan blancas. ¿Qué columna es más interesante para tus torres?", "options": ["La columna d, que está abierta y lleva a la séptima fila", "La columna c, donde está tu caballo", "La columna f, cerrada por tus propios peones"], "answer": 0, "explanation": "La columna d está totalmente abierta y ya tienes una torre en ella. El plan natural es doblar torres (Tfd1 o Td2 y Tfd1) y buscar la entrada en d7." }
```

```ejercicio
{ "type": "quiz", "prompt": "¿Qué es una columna **semiabierta**?", "options": ["Una columna sin peones", "Una columna con solo peones del rival, que tu torre puede presionar", "Una columna donde solo hay un peón en la mitad del tablero"], "answer": 1, "explanation": "Por ejemplo, tras un cambio ...cxd4 en la Siciliana, la columna c queda semiabierta para las negras: no tienen peón en ella, pero las blancas sí." }
```
