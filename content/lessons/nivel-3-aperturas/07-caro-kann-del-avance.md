---
title: Contra la Caro-Kann, el avance
summary: 1.e4 c6 2.d4 d5 3.e5: el alfil negro fuera de la cadena, el sistema Short y el ataque con g4 y h4.
tags: aperturas, caro-kann, e4, cadenas
minutes: 10
---

La **Caro-Kann** (1.e4 c6 2.d4 d5) se parece a la Francesa, pero con una diferencia importante: las negras apoyan d5 con el peón de **c6**, de modo que el alfil de c8 **no queda encerrado**. Contra ella jugaremos también **3.e5**.

## La gran diferencia con la Francesa

Tras 3.e5, las negras sacan el alfil **antes** de jugar ...e6: **3...Af5**. Así el alfil queda fuera de la cadena de peones y es una pieza activa.

```tablero
{ "fen": "rn1qkbnr/pp2pppp/2p5/3pPb2/3P4/8/PPP2PPP/RNBQKBNR w KQkq - 1 4", "arrows": [["f5", "b1"], ["e7", "e6", "rgba(22,163,74,0.85)"]], "highlights": ["f5"], "caption": "1.e4 c6 2.d4 d5 3.e5 Af5: el alfil sale antes de cerrar la diagonal con ...e6." }
```

```ejercicio
{ "type": "quiz", "fen": "rn1qkbnr/pp2pppp/2p5/3pPb2/3P4/8/PPP2PPP/RNBQKBNR w KQkq - 1 4", "prompt": "¿Por qué las negras juegan 3...Af5 antes de ...e6?", "options": ["Para atacar el peón de e5", "Para sacar el alfil fuera de la cadena de peones antes de que ...e6 lo encierre", "Para preparar el enroque largo"], "answer": 1, "explanation": "Si las negras juegan ...e6 primero, el alfil de c8 queda tan encerrado como en la Francesa. Por eso sale antes." }
```

Después, las negras atacarán la base de la cadena con **...c5** (sí, el peón de c juega dos veces: c6 y luego c5), y desarrollarán con ...e6, ...Cd7, ...Ce7 y ...Cc6.

## Objetivos de cada bando

- **Blancas**: ganar espacio, mantener la cadena d4-e5 y **molestar al alfil de f5**, que es la mejor pieza negra.
- **Negras**: completar el desarrollo, presionar d4 con **...c5**, ...Cc6 y ...Db6, y conseguir buenos cambios.

## Dos maneras de jugar con blancas

**1. El sistema Short (tranquilo):** 4.Cf3 e6 5.Ae2, seguido de O-O, c3 o Ae3. Las blancas se desarrollan con calma y aprovechan el espacio.

```ejercicio
{ "type": "moves", "fen": "rn1qkbnr/pp3ppp/2p1p3/3pPb2/3P4/5N2/PPP1BPPP/RNBQK2R b KQkq - 1 5", "solution": ["c6c5"], "accept": ["b8d7", "g8e7"], "engine": false, "prompt": "Ponte en el lugar de las negras: 4.Cf3 e6 5.Ae2. Juega la **ruptura temática** contra la base de la cadena.", "hint": "El peón de c6 puede avanzar una casilla más.", "explanation": "5...c5 ataca d4, la base de la cadena blanca. Es la misma idea que en la Francesa: **ataca la cadena por su base**. 5...Cd7 y 5...Ce7 preparan lo mismo." }
```

**2. El ataque con g4 y h4 (agresivo):** las blancas usan sus peones para perseguir al alfil de f5 y ganar espacio en el flanco de rey.

```tablero
{ "fen": "rn1qkbnr/pp2ppp1/2p3bp/3pP3/3P2PP/8/PPP2P2/RNBQKBNR w KQkq - 0 6", "arrows": [["h4", "h5", "rgba(22,163,74,0.85)"], ["g6", "h7", "rgba(220,38,38,0.85)"]], "caption": "4.g4 Ag6 5.h4 h6. Con 6.h5, el alfil tiene que irse a h7, donde queda muy fuera de juego." }
```

```ejercicio
{ "type": "moves", "fen": "rn1qkbnr/pp2ppp1/2p3bp/3pP3/3P2PP/8/PPP2P2/RNBQKBNR w KQkq - 0 6", "solution": ["h4h5"], "engine": false, "prompt": "4.g4 Ag6 5.h4 h6. Sigue persiguiendo al alfil: **jugada temática**.", "explanation": "6.h5! obliga al alfil a meterse en h7, donde tus peones de g4 y h5 le quitan las casillas f5 y g6: queda fuera de juego. Has ganado mucho espacio. El precio: tu flanco de rey está lleno de peones avanzados, así que no podrás enrocar corto con tranquilidad." }
```

## Una línea táctica: el peón envenenado de b2

En el sistema Short con **6.Ae3**, las negras pueden comerse el peón de b2 con la dama. Las blancas responden con Cc3 y Cb5, buscando Cc7+. Las negras tienen que conocer la jugada exacta:

```ejercicio
{ "type": "moves", "fen": "rn2kbnr/pp3ppp/4p3/1NppPb2/3P4/4BN2/PqP1BPPP/R2QK2R b KQkq - 1 8", "solution": ["c5c4"], "prompt": "4.Cf3 e6 5.Ae2 c5 6.Ae3 Db6 7.Cc3 Dxb2 8.Cb5. Las blancas amenazan **Tb1** atrapando a la dama, y Cc7+. Juegan negras: ¿qué haces?", "hint": "Un peón puede abrir a la dama una vía de escape y a la vez cerrar el flanco de dama.", "explanation": "8...c4! Si 9.Tb1, 9...Dxc2 escapa ganando otro peón. Es una línea muy afilada: si no la conoces bien, con negras es más sensato no comer en b2.", "wrong": { "e8d7": "El rey no está seguro en d7 y no resuelve el problema de la dama." } }
```

## Errores comunes

- Con blancas: dejar que las negras cambien cómodamente los alfiles de casillas blancas con **...Ae4** o **...Ag6** sin conseguir nada a cambio.
- Con blancas: jugar g4 y h4 y luego **no saber dónde poner al rey**.
- Con negras: jugar ...e6 antes de sacar el alfil.
- Con negras: olvidarse de **...c5**; sin esa ruptura, las blancas tienen espacio y nada que temer.
