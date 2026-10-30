---
title: La oposición
summary: Cuando los reyes se enfrentan, quien NO tiene que mover suele ganar la batalla. Oposición directa, distante y casillas clave.
tags: finales, oposicion, finales de peones
minutes: 10
---

En los finales de reyes y peones, los dos reyes se pelean por las mismas casillas. Como un rey no puede acercarse al otro (nunca pueden quedar en casillas vecinas), muchas veces **el que tiene que mover está obligado a ceder el paso**. Esta situación se llama **zugzwang**, y el arma para provocarla es la **oposición**.

## Oposición directa

Dos reyes están en **oposición** cuando están en la misma columna (o fila) con **una sola casilla entre ellos**. Tiene la oposición el bando que **acaba de mover**, es decir, el que **no** tiene el turno.

```tablero
{ "fen": "8/8/4k3/8/4K3/4P3/8/8 b - - 0 1", "highlights": ["e4", "e6"], "arrows": [["e6", "d6", "rgba(220,38,38,0.85)"], ["e4", "f5"]], "caption": "Juegan negras: las blancas tienen la oposición. El rey negro debe apartarse y el blanco entra por el otro lado." }
```

Si en esta posición mueven las negras, pierden: tras ...Rd6 sigue Rf5, y tras ...Rf6, Rd5. El rey blanco avanza y escolta al peón. Pero si mueven las blancas, son tablas: ahora es el rey blanco el que tiene que apartarse.

## Oposición distante

Si entre los reyes hay **tres o cinco casillas** (un número impar), se habla de **oposición distante**. La idea es la misma: quien la tiene puede convertirla en oposición directa cuando los reyes se acerquen.

## Las casillas clave

Más importante que la oposición en sí son las **casillas clave** del peón: si el rey del bando fuerte llega a una de ellas, **gana siempre**, mueva quien mueva.

- Peón en la 2ª, 3ª o 4ª fila: las **tres casillas situadas dos filas por delante** (para un peón en e4: d6, e6 y f6).
- Peón en la 5ª o 6ª fila: las **seis casillas** de las dos filas siguientes (para un peón en e5: d6, e6, f6, d7, e7 y f7).

La oposición es solo el **medio** para llegar a las casillas clave (o, si defiendes, para impedirlo).

```ejercicio
{ "type": "squares", "fen": "8/8/8/8/4P3/8/8/8 w - - 0 1", "targets": ["d6", "e6", "f6"], "mode": "all", "highlights": ["e4"], "prompt": "Marca las **tres casillas clave** del peón de e4.", "explanation": "Dos filas por delante del peón: d6, e6 y f6. Si el rey blanco pisa una de ellas, el peón corona." }
```

```ejercicio
{ "type": "moves", "fen": "4k3/8/8/4K3/4P3/8/8/8 w - - 0 1", "solution": ["e5d6"], "accept": ["e5e6", "e5f6"], "prompt": "Juegan las blancas. Lleva el rey a una **casilla clave** y asegura la victoria.", "hint": "Las casillas clave del peón de e4 están en la sexta fila.", "wrong": { "e5d4": "Retroceder no tiene sentido: pierdes el control de las casillas clave y el negro hace tablas.", "e5f4": "Retroceder no tiene sentido: pierdes el control de las casillas clave y el negro hace tablas." }, "explanation": "**Rd6** (también Re6 o Rf6) pisa una casilla clave. Ahora el peón avanza escoltado por el rey y corona, haga lo que haga el negro." }
```

```ejercicio
{ "type": "moves", "fen": "8/8/4k3/8/3K4/4P3/8/8 b - - 0 1", "solution": ["e6d6"], "orientation": "black", "prompt": "Juegan las **negras** y defienden. El rey blanco quiere entrar en d5, e5 o f5 (las casillas clave del peón de e3). Haz **tablas**.", "hint": "Pon tu rey enfrente del rey blanco.", "wrong": { "e6d7": "Tras Rd5 el rey blanco pisa una casilla clave y gana.", "e6f5": "Tras Rd5 el rey blanco pisa una casilla clave y gana.", "e6f6": "Tras Rd5 el rey blanco pisa una casilla clave y gana." }, "explanation": "**...Rd6!** toma la oposición: el rey blanco no puede avanzar. Si Re4, ...Re6; si Rc4, ...Rc6. Las negras siempre se ponen enfrente y no dejan pasar al rey." }
```

```ejercicio
{ "type": "quiz", "fen": "8/8/4k3/8/4K3/4P3/8/8 w - - 0 1", "prompt": "En esta posición, ¿qué ocurre según a quién le toque mover?", "options": ["Si juegan blancas, tablas; si juegan negras, ganan las blancas", "Ganan las blancas en ambos casos", "Tablas en ambos casos", "Si juegan blancas, ganan; si juegan negras, tablas"], "answer": 0, "explanation": "Es una posición de **zugzwang mutuo**. Si mueve el blanco, el negro mantiene la oposición. Si mueve el negro, debe ceder el paso y el rey blanco llega a d5 o f5, casillas clave del peón." }
```

```ejercicio
{ "type": "moves", "fen": "4k3/8/8/8/8/8/4P3/4K3 w - - 0 1", "solution": ["e1d2"], "accept": ["e1f2"], "prompt": "Juegan las blancas. Los reyes están lejos. Elige la jugada que **gana**.", "hint": "No toques el peón: primero el rey debe llegar a las casillas clave (d4, e4, f4).", "wrong": { "e2e4": "Al adelantar el peón, sus casillas clave se alejan (d6, e6, f6) y el rey negro llega a defenderlas: tablas.", "e2e3": "Al adelantar el peón, sus casillas clave se alejan y el rey negro llega a tiempo: tablas." }, "explanation": "**Rd2** (o Rf2) acerca el rey a la cuarta fila. El rey negro no llega a tiempo de impedir que el blanco alcance una casilla clave o tome la oposición. Recuerda: **primero el rey, después el peón**." }
```

```ejercicio
{ "type": "play", "fen": "4k3/8/8/8/8/4K3/4P3/8 w - - 0 1", "goal": "promote", "maxMoves": 20, "prompt": "Gana el final de rey y peón contra rey: lleva tu rey por delante del peón, usa la oposición y **corona**." }
```
