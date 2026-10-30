---
title: El valor de las piezas
summary: Cuánto vale cada pieza y cómo saber si un cambio te conviene.
tags: material
minutes: 8
---

No todas las piezas valen lo mismo. Para decidir si un cambio te conviene, los ajedrecistas usan una **escala de puntos** muy sencilla:

| Pieza | Valor aproximado |
| --- | --- |
| Peón | 1 |
| Caballo | 3 |
| Alfil | 3 |
| Torre | 5 |
| Dama | 9 |
| Rey | ¡Incalculable! |

El rey no tiene puntos porque **no se puede cambiar**: si lo pierdes, pierdes la partida.

## Cambios favorables

Un **cambio** es dar una pieza tuya a cambio de una del rival. Suma lo que ganas y resta lo que pierdes:

- Alfil (3) por caballo (3): cambio **igualado**.
- Caballo (3) por torre (5): **ganas 2 puntos**. A esto se le llama **ganar la calidad**.
- Dama (9) por torre (5): **pierdes 4 puntos**. ¡Mal negocio!

```tablero
{ "fen": "3r1rk1/ppp2ppp/8/6B1/8/2N5/PPP2PPP/4R1K1 w - - 0 1", "arrows": [["g5", "d8"], ["f8", "d8", "rgba(220,38,38,0.85)"]], "caption": "El alfil puede comer la torre de d8. Aunque la otra torre recaptura, das 3 puntos y recibes 5." }
```

> Los puntos son una guía, no una ley. Una pieza muy activa vale más que una encerrada, y un mate vale más que todo el material del mundo. Pero, para empezar, **cuenta siempre los puntos antes de cambiar**.

```ejercicio
{ "type": "quiz", "prompt": "¿Cuántos puntos vale una **torre**?", "options": ["3", "5", "9"], "answer": 1, "explanation": "La torre vale 5 puntos: más que un caballo o un alfil (3) y menos que la dama (9)." }
```

```ejercicio
{ "type": "moves", "fen": "6k1/5ppp/3r4/6b1/4N3/8/5PPP/R5K1 w - - 0 1", "solution": ["e4d6"], "prompt": "Tu caballo puede comer **dos piezas** negras sin defensa. Elige la que vale **más**.", "hint": "Compara: ¿qué vale más, una torre o un alfil?", "wrong": { "e4g5": "Ganas un alfil (3 puntos), pero había una torre (5 puntos) esperando." }, "explanation": "Cxd6 gana una torre (5 puntos) en lugar de un alfil (3). Cuando puedas elegir, **come la pieza más valiosa**." }
```

```ejercicio
{ "type": "moves", "fen": "3r1rk1/ppp2ppp/8/6B1/8/2N5/PPP2PPP/4R1K1 w - - 0 1", "solution": ["g5d8"], "prompt": "Haz un **cambio favorable**: da una pieza menor a cambio de una torre.", "hint": "La torre de d8 está defendida, pero ¿qué vale más, tu alfil o esa torre?", "explanation": "Axd8 Txd8: entregas el alfil (3) y te quedas con una torre (5). Has **ganado la calidad**: 2 puntos de ventaja." }
```

```ejercicio
{ "type": "quiz", "prompt": "Cambias tu **dama** por una **torre y un alfil** del rival. ¿Cómo queda el material?", "options": ["Gano 4 puntos", "Pierdo 1 punto (casi igualado)", "Pierdo 6 puntos"], "answer": 1, "explanation": "Das 9 y recibes 5 + 3 = 8. Pierdes 1 punto: es un cambio casi igualado, y todo dependerá de la posición." }
```

```ejercicio
{ "type": "quiz", "prompt": "¿Cuál de estos cambios te **conviene**?", "options": ["Mi torre por su caballo", "Mi alfil por su torre", "Mi dama por su alfil y su caballo"], "answer": 1, "explanation": "Alfil (3) por torre (5): ganas 2 puntos. Los otros dos cambios te hacen perder material." }
```
