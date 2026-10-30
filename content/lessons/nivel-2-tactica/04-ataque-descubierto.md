---
title: Ataque descubierto y jaque doble
summary: Mueve una pieza y deja al descubierto el ataque de otra: dos amenazas en una sola jugada.
tags: ataque descubierto, tactica
minutes: 12
---

Un **ataque descubierto** se produce cuando mueves una pieza que **tapaba la línea** de otra pieza tuya de largo alcance. De golpe, haces dos cosas: la pieza que se mueve puede atacar algo, y la que estaba detrás también ataca.

- Si la pieza descubierta da jaque, es un **jaque descubierto**.
- Si **las dos** piezas dan jaque a la vez, es un **jaque doble**. Contra un jaque doble no se puede tapar ni capturar: **el rey tiene que moverse**.

```tablero
{ "fen": "6k1/4qppp/8/8/4B3/8/5PPP/4R1K1 w - - 0 1", "arrows": [["e1", "e7", "rgba(220,38,38,0.85)"], ["e4", "h7"]], "caption": "El alfil tapa la torre. Si el alfil se mueve dando jaque, la torre ataca a la dama." }
```

> Busca tus piezas de largo alcance (torres, alfiles, dama) que tengan **una pieza propia delante** apuntando a algo valioso del rival. Si puedes mover esa pieza de delante **con jaque o con otra amenaza**, tienes un ataque descubierto.

```ejercicio
{ "type": "moves", "fen": "6k1/4qppp/8/8/4B3/8/5PPP/4R1K1 w - - 0 1", "solution": ["e4h7", "g8f8", "e1e7"], "prompt": "Mueve el alfil **dando jaque** para descubrir el ataque de la torre.", "hint": "El alfil puede capturar en h7.", "wrong": { "e4d5": "El alfil se aparta, pero sin jaque: la dama negra se escapa o captura tu torre." }, "explanation": "1.Axh7+ da jaque y descubre la torre de e1. Las negras tienen que atender el jaque (1...Rf8) y 2.Txe7 gana la dama." }
```

```ejercicio
{ "type": "moves", "fen": "4k3/qp3ppp/8/4N3/8/8/PP3PPP/4R1K1 w - - 0 1", "solution": ["e5c6", "a7e3", "e1e3"], "prompt": "**Jaque descubierto**: mueve el caballo para que la torre dé jaque y, a la vez, ataca algo valioso.", "hint": "¿Desde qué casilla atacaría el caballo a la dama de a7?", "explanation": "1.Cc6+ descubre el jaque de la torre y ataca a la dama. Si el rey se mueve, 2.Cxa7; si la dama tapa con 1...De3, 2.Txe3+ la gana igualmente." }
```

```ejercicio
{ "type": "moves", "fen": "r2qkb1r/pp1p1ppp/8/8/4N3/8/PPP2PPP/4R1K1 w kq - 0 1", "solution": ["e4d6"], "goal": "mate", "prompt": "Da **jaque mate** con un **jaque doble**.", "hint": "Mueve el caballo a una casilla desde la que también dé jaque.", "explanation": "Cd6# es jaque doble: dan jaque el caballo y la torre de e1. El rey no puede moverse (sus propias piezas le quitan las casillas y e7 está atacada). También valía Cf6#." }
```

```ejercicio
{ "type": "moves", "fen": "rnb1kb1r/pp3ppp/2p5/4q3/4n3/3Q4/PPPB1PPP/2KR1BNR w kq - 0 9", "solution": ["d3d8", "e8d8", "d2g5", "d8c7", "g5d8"], "goal": "mate", "prompt": "Réti-Tartakower, Viena 1910. Mate en **tres** con un sacrificio y un **jaque doble**.", "hint": "Sacrifica la dama para atraer al rey a la columna d.", "explanation": "9.Dd8+!! Rxd8 10.Ag5++ (jaque doble del alfil y la torre de d1) Rc7 11.Ad8#. Si 10...Re8, 11.Td8#." }
```

```ejercicio
{ "type": "quiz", "prompt": "El rival te da un **jaque doble**. ¿Cuál es la única forma de defenderte?", "options": ["Tapar uno de los jaques", "Capturar una de las piezas que dan jaque", "Mover el rey"], "answer": 2, "explanation": "Tapando o capturando solo eliminas uno de los dos jaques. La única salida es mover el rey... si puede." }
```
