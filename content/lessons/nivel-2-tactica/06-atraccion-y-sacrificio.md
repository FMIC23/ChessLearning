---
title: Atracción y sacrificio
summary: Entrega material para atraer una pieza rival, casi siempre el rey, a una casilla fatal.
tags: atraccion, sacrificio, tactica
minutes: 12
---

Un **sacrificio** es entregar material a propósito para conseguir algo más valioso: un mate, recuperar más material o un ataque decisivo.

La **atracción** es un tipo de sacrificio: obligas a una pieza rival (muy a menudo el **rey**) a ir a una casilla concreta capturando tu pieza. Una vez allí, esa pieza queda expuesta a un mate, una horquilla o un jaque doble.

```tablero
{ "fen": "5r1k/pp4pp/7N/q7/2Q5/8/PPP2PPP/6K1 w - - 0 1", "arrows": [["c4", "g8"], ["h6", "f7"]], "caption": "El mate de la coz: tras Dg8+ Txg8, el rey queda encerrado por sus propias piezas y Cf7 es mate." }
```

> Un sacrificio solo es bueno si has calculado lo que pasa después. Las jugadas forzadas (jaques y capturas que el rival no puede rechazar) hacen que el cálculo sea mucho más sencillo.

```ejercicio
{ "type": "moves", "fen": "5r1k/pp4pp/7N/q7/2Q5/8/PPP2PPP/6K1 w - - 0 1", "solution": ["c4g8", "f8g8", "h6f7"], "goal": "mate", "prompt": "Mate en **dos**: el famoso **mate de la coz**.", "hint": "Sacrifica la dama en g8: el rey no puede capturarla porque la defiende el caballo.", "explanation": "1.Dg8+!! Txg8 (forzado) 2.Cf7#. La torre ha sido atraída a g8 y el rey queda **ahogado** por sus propias piezas." }
```

```ejercicio
{ "type": "moves", "fen": "5r1k/pp2Nppp/8/7Q/8/3R4/PP3PPP/6K1 w - - 0 1", "solution": ["h5h7", "h8h7", "d3h3"], "goal": "mate", "prompt": "Mate en **dos**. Atrae al rey a h7.", "hint": "El caballo de e7 controla g6 y g8. ¿Qué pasa si el rey va a h7?", "explanation": "1.Dxh7+! Rxh7 2.Th3#: el **mate de Anastasia**. El caballo quita g6 y g8, el peón de g7 tapa la otra salida y la torre da mate por la columna h." }
```

```ejercicio
{ "type": "moves", "fen": "3q2k1/pp4p1/8/6N1/8/7R/PPP2PPP/6K1 w - - 0 1", "solution": ["h3h8", "g8h8", "g5f7", "h8g8", "f7d8"], "prompt": "Atrae al rey a una **horquilla** y gana la dama.", "hint": "Si el rey estuviera en h8, ¿qué casilla del caballo atacaría al rey y a la dama?", "explanation": "1.Th8+! Rxh8 (forzado: f7 y h7 están controladas por el caballo) 2.Cf7+ y 3.Cxd8. Das una torre y ganas la dama." }
```

```ejercicio
{ "type": "moves", "fen": "7k/pp4pp/8/q5N1/8/8/PPP2PPP/3R2K1 w - - 0 1", "solution": ["d1d8", "a5d8", "g5f7", "h8g8", "f7d8"], "prompt": "Atrae a la **dama** negra a la casilla adecuada y gánala.", "hint": "Da jaque en la octava fila: la dama tendrá que capturar.", "explanation": "1.Td8+! Dxd8 2.Cf7+ (horquilla al rey y a la dama) Rg8 3.Cxd8. Has cambiado una torre por la dama." }
```

```ejercicio
{ "type": "quiz", "prompt": "¿Cuándo está justificado un sacrificio?", "options": ["Siempre que el rival vaya ganando", "Cuando has calculado que obtienes algo de más valor (mate, material o un ataque decisivo)", "Cuando la pieza sacrificada no se puede salvar"], "answer": 1, "explanation": "Un sacrificio es una inversión: das material para recibir más. Por eso hay que calcular las respuestas forzadas del rival." }
```
