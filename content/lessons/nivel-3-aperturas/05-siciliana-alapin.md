---
title: Contra la Siciliana, la Alapin
summary: 1.e4 c5 2.c3: preparar d4 para tener un centro ideal. Las respuestas 2...d5 y 2...Cf6 y el juego con peón aislado.
tags: aperturas, siciliana, e4
minutes: 10
---

La **Siciliana** (1.e4 c5) es la respuesta más popular a 1.e4, y su teoría es enorme. Para no tener que estudiar decenas de variantes afiladas, te proponemos la **variante Alapin: 2.c3**.

## La idea de 2.c3

Las negras juegan 1...c5 para que, cuando las blancas jueguen d4, puedan cambiar ...cxd4 y quitarles un peón central. Con **2.c3**, las blancas preparan **d4** de forma que, si las negras cambian, recapturan **con un peón** (cxd4) y se quedan con el centro ideal e4 + d4.

```tablero
{ "fen": "rnbqkbnr/pp1ppppp/8/2p5/4P3/2P5/PP1P1PPP/RNBQKBNR b KQkq - 0 2", "arrows": [["c3", "d4", "rgba(22,163,74,0.85)"], ["d2", "d4", "rgba(22,163,74,0.85)"]], "caption": "1.e4 c5 2.c3: las blancas quieren jugar d4 y recapturar con el peón de c3." }
```

El **inconveniente** de 2.c3 es que el caballo de b1 ya no puede ir a c3. Por eso las negras atacan inmediatamente el peón de e4, que no se puede defender con Cc3.

## Respuesta 1: 2...d5

Tras 2...d5 3.exd5 Dxd5, la dama negra está en el centro, pero **no puede ser atacada con Cc3**. Las blancas siguen con 4.d4, Cf3, Ae2 y O-O.

```ejercicio
{ "type": "moves", "fen": "rnb1kbnr/pp2pppp/8/2pq4/8/2P5/PP1P1PPP/RNBQKBNR w KQkq - 0 4", "solution": ["d2d4"], "accept": ["g1f3"], "engine": false, "prompt": "1.e4 c5 2.c3 d5 3.exd5 Dxd5. Juega la jugada que **cumple el plan** de la Alapin.", "hint": "¿Para qué jugaste 2.c3?", "explanation": "4.d4: ocupas el centro y abres la diagonal del alfil de c1. 4.Cf3 también es buena y suele transponer." }
```

Muchas veces las negras cambian ...cxd4 y, tras cxd4, aparece una estructura muy importante: el **peón aislado de dama** (PAD).

```tablero
{ "fen": "r1b1k2r/pp2bppp/2nqpn2/8/3P4/2N2N2/PP2BPPP/R1BQ1RK1 w kq - 3 10", "arrows": [["d4", "d5", "rgba(22,163,74,0.85)"], ["f3", "e5", "rgba(22,163,74,0.85)"]], "highlights": ["d4", "d5"], "caption": "Estructura de peón aislado en d4. Las blancas tienen espacio y actividad (casilla e5, ruptura d5). Las negras bloquearán en d5 y esperarán al final." }
```

Con peón aislado:

- **Blancas**: juego activo de piezas, ataque en el flanco de rey, caballo en **e5**, y la ruptura **d5** en el momento justo.
- **Negras**: bloquear la casilla **d5** (idealmente con un caballo), **cambiar piezas** y llegar a un final donde el peón aislado será débil.

```ejercicio
{ "type": "quiz", "fen": "r1b1k2r/pp2bppp/2nqpn2/8/3P4/2N2N2/PP2BPPP/R1BQ1RK1 w kq - 3 10", "prompt": "Tienes el peón aislado en d4. ¿Qué plan te conviene?", "options": ["Cambiar todas las piezas lo antes posible", "Jugar activamente: piezas centralizadas, Ce5, ataque en el flanco de rey y la ruptura d5", "Avanzar los peones del flanco de dama"], "answer": 1, "explanation": "El peón aislado da **actividad** en el medio juego pero es una **debilidad** en el final. Por eso quien lo tiene busca la iniciativa, y quien juega contra él busca cambios." }
```

## Respuesta 2: 2...Cf6

Las negras atacan e4. Las blancas avanzan **3.e5** con ganancia de tiempo, y el caballo va a d5.

```ejercicio
{ "type": "moves", "fen": "rnbqkb1r/pp1ppppp/5n2/2p5/4P3/2P5/PP1P1PPP/RNBQKBNR w KQkq - 1 3", "solution": ["e4e5"], "engine": false, "prompt": "1.e4 c5 2.c3 Cf6. El peón de e4 está atacado y no puedes jugar Cc3. ¿Qué haces?", "hint": "Avanza con ganancia de tiempo.", "explanation": "3.e5 Cd5 4.d4 cxd4 5.Cf3 (o 5.cxd4): las blancas ganan espacio y el caballo de d5 puede ser hostigado más adelante con c4 o Ac4.", "wrong": { "d2d3": "Demasiado pasivo: el alfil de f1 queda encerrado y renuncias a la idea de d4." } }
```

## Cuidado con la dama negra

Que no se pueda jugar Cc3 de inmediato no significa que la dama negra esté a salvo siempre. Si las negras se dedican a comer peones con ella, las blancas desarrollan con ganancia de tiempo.

```ejercicio
{ "type": "moves", "fen": "r3kbnr/pp3ppp/2n1p3/1N6/3P2b1/5N2/Pq1BBPPP/R2QK2R w KQkq - 0 11", "solution": ["b5c7"], "accept": ["a1b1"], "prompt": "Las negras han ido a por el peón de b2 con su dama (…Dd6, Cb5 Db4+, Ad2 Dxb2). **Castiga la glotonería**.", "hint": "Hay un salto de caballo con jaque que gana material.", "explanation": "11.Cc7+! Rd8 12.Tb1 Dxa2 13.Cxa8: las blancas ganan la calidad y siguen atacando. 11.Tb1 también gana. La lección: en la apertura, **una dama que come peones pierde tiempos**." }
```

## Errores comunes

- Jugar **d4 antes de c3** si las negras pueden cambiar con ventaja: el plan es recapturar con peón.
- Con el peón aislado, **jugar pasivo**: es una estructura que exige actividad.
- Olvidar que tras 2.c3 la casilla c3 está ocupada: el caballo de b1 suele ir por **a3** o **d2**.
