---
title: La clavada
summary: Una pieza que no puede (o no debe) moverse porque dejaría expuesta otra más valiosa.
tags: clavada, tactica
minutes: 12
---

Hay **clavada** cuando una pieza de largo alcance (alfil, torre o dama) ataca a una pieza rival que tiene **detrás**, en la misma línea, otra pieza más valiosa.

- **Clavada absoluta**: la pieza de detrás es el **rey**. La pieza clavada **no puede moverse**: sería ilegal.
- **Clavada relativa**: detrás hay otra pieza (por ejemplo, la dama). La pieza clavada **puede** moverse, pero perdería la de detrás.

```tablero
{ "fen": "r1bqkbnr/ppp2ppp/2np4/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 4", "arrows": [["b5", "e8"]], "highlights": ["c6"], "caption": "Clavada absoluta: el caballo de c6 no puede moverse porque dejaría en jaque a su rey." }
```

```tablero
{ "fen": "rnbqkb1r/ppp2ppp/4pn2/3p2B1/2PP4/2N5/PP2PPPP/R2QKBNR b KQkq - 1 4", "arrows": [["g5", "d8"]], "highlights": ["f6"], "caption": "Clavada relativa: si el caballo de f6 se mueve, el alfil captura la dama." }
```

## Cómo aprovechar una clavada

- **Ataca la pieza clavada** con algo de menos valor, por ejemplo un peón: no podrá escapar.
- **Recuerda que una pieza clavada no defiende**: lo que «protege» es una ilusión.
- **Cuidado con las clavadas relativas**: la pieza clavada puede moverse si con ello gana algo mayor.

```ejercicio
{ "type": "moves", "fen": "6k1/pp4pp/4qp2/8/8/1P1B4/P2Q1PPP/6K1 w - - 0 1", "solution": ["d3c4"], "prompt": "**Clava** la dama negra contra su rey y gánala.", "hint": "La dama y el rey negros están en la misma diagonal.", "explanation": "Ac4 clava la dama: no puede apartarse de la diagonal. Lo mejor que tiene el negro es Dxc4, y tras bxc4 has ganado dama por alfil." }
```

```ejercicio
{ "type": "moves", "fen": "4k3/pp2nppp/8/3b4/8/2N5/PPP2PPP/4R1K1 w - - 0 1", "solution": ["c3d5"], "prompt": "El alfil de d5 parece defendido por el caballo. ¿Lo está de verdad? **Gana material**.", "hint": "El caballo de e7 está clavado por tu torre.", "explanation": "Cxd5 gana una pieza: el caballo de e7 está clavado contra su rey por la torre de e1 y **no puede recapturar**." }
```

```ejercicio
{ "type": "moves", "fen": "r3k2r/pp3ppp/2n5/1B6/3P4/8/PP3PPP/R3K2R w KQkq - 0 1", "solution": ["d4d5"], "prompt": "El caballo de c6 está clavado. **Atácalo** con la pieza de menos valor.", "hint": "Un peón puede atacar al caballo.", "explanation": "d5 ataca al caballo clavado, que no puede escapar. Las blancas ganan una pieza." }
```

```ejercicio
{ "type": "moves", "fen": "r1bqkb1r/pppn1ppp/5n2/3N2B1/3P4/8/PP2PPPP/R2QKBNR b KQkq - 0 6", "solution": ["f6d5", "g5d8", "f8b4"], "prompt": "Juegan las **negras**. Las blancas creen que el caballo de f6 está clavado y han capturado en d5. **Castígalo**.", "hint": "La clavada es solo relativa: si el alfil come tu dama, ¿tienes un jaque?", "explanation": "La **trampa del elefante**: 6...Cxd5! 7.Axd8 Ab4+ y, tras 8.Dd2 Axd2+ 9.Rxd2 Rxd8, las negras han ganado una pieza." }
```

```ejercicio
{ "type": "moves", "fen": "3rkb1r/p2nqppp/5n2/1B2p1B1/4P3/1Q6/PPP2PPP/2KR3R w k - 3 13", "solution": ["d1d7"], "prompt": "La famosa **partida de la Ópera** (Morphy, 1858). El caballo de d7 está clavado. **Aprovéchalo**.", "hint": "Acumula presión sobre la pieza clavada... ¡o captúrala!", "explanation": "13.Txd7! Txd7 14.Td1: las blancas vuelven a atacar la pieza clavada y el ataque es decisivo." }
```

```ejercicio
{ "type": "quiz", "prompt": "¿Qué diferencia hay entre una clavada **absoluta** y una **relativa**?", "options": ["En la absoluta la pieza clavada es la dama", "En la absoluta, detrás está el rey y la pieza clavada no puede moverse", "No hay diferencia"], "answer": 1, "explanation": "Con el rey detrás, mover la pieza clavada es ilegal. En la relativa es legal, aunque normalmente cueste material." }
```
