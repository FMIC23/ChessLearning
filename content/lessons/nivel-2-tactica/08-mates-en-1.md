---
title: Mates en una jugada
summary: Los patrones de mate más frecuentes: pasillo, beso de la dama, coz, Anastasia y árabe.
tags: mate, tactica
minutes: 10
---

Los mates se repiten. Si reconoces los **patrones** más habituales, los verás en tus partidas al instante. Estos son algunos de los más importantes:

- **Mate del pasillo**: el rey está encerrado por sus propios peones y una torre o dama da jaque en la última fila.
- **Beso de la dama**: la dama da mate pegada al rey, protegida por otra pieza.
- **Mate de la coz** (o del ahogado): un caballo da mate a un rey rodeado por sus propias piezas.
- **Mate de Anastasia**: caballo y torre contra el rey en la banda, con un peón propio tapándole la salida.
- **Mate árabe**: torre y caballo en la esquina; el caballo protege a la torre y controla la casilla de huida.

```tablero
{ "fen": "6rk/5Npp/8/8/8/8/8/6K1 b - - 0 1", "highlights": ["h8", "g8", "g7", "h7"], "caption": "Mate de la coz: el rey negro está rodeado por sus propias piezas y el caballo le da jaque." }
```

```ejercicio
{ "type": "moves", "fen": "1r4k1/R4ppp/8/8/8/8/5PPP/6K1 b - - 0 1", "solution": ["b8b1"], "goal": "mate", "prompt": "Juegan las **negras**. Da mate en una.", "explanation": "1...Tb1#: **mate del pasillo**. Los peones blancos encierran a su propio rey." }
```

```ejercicio
{ "type": "moves", "fen": "4r1k1/5p1p/5PpQ/8/8/8/5PPP/6K1 w - - 0 1", "solution": ["h6g7"], "goal": "mate", "prompt": "Da mate en una: el **beso de la dama**.", "explanation": "Dg7#: la dama se pega al rey protegida por el peón de f6." }
```

```ejercicio
{ "type": "moves", "fen": "6rk/6pp/8/6N1/8/8/5PPP/6K1 w - - 0 1", "solution": ["g5f7"], "goal": "mate", "prompt": "Da mate en una con el caballo.", "explanation": "Cf7#: **mate de la coz**. El rey no tiene casillas porque sus propias piezas se las quitan." }
```

```ejercicio
{ "type": "moves", "fen": "r7/4N1pk/8/8/8/3R4/5PPP/6K1 w - - 0 1", "solution": ["d3h3"], "goal": "mate", "prompt": "Da mate en una: el **mate de Anastasia**.", "explanation": "Th3#: el caballo de e7 controla g6 y g8, el peón de g7 tapa la otra salida y la torre da jaque por la columna h." }
```

```ejercicio
{ "type": "moves", "fen": "7k/1R6/5N2/8/8/8/5PPP/6K1 w - - 0 1", "solution": ["b7h7"], "goal": "mate", "prompt": "Da mate en una: el **mate árabe**.", "wrong": { "b7b8": "El rey escapa a g7. Busca una casilla donde el caballo proteja a la torre." }, "explanation": "Th7#: la torre, protegida por el caballo, da jaque; el caballo cubre g8 y la torre cubre g7." }
```

```ejercicio
{ "type": "quiz", "prompt": "En el **mate del pasillo**, ¿qué le quita las casillas de escape al rey?", "options": ["La dama rival", "Sus propios peones", "El rey rival"], "answer": 1, "explanation": "Los peones delante del rey enroscado le cierran la salida. Para evitarlo, a veces conviene abrir una «ventana» jugando h3 (o ...h6)." }
```
