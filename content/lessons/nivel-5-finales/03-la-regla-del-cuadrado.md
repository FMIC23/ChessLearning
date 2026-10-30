---
title: La regla del cuadrado
summary: Un truco visual para saber, sin calcular, si un rey alcanza a un peón pasado.
tags: finales, regla del cuadrado, finales de peones
minutes: 8
---

Un peón pasado corre hacia la coronación y el rey rival intenta atraparlo. ¿Llega a tiempo? En lugar de contar jugada por jugada, usa la **regla del cuadrado**:

1. Traza una línea desde el peón hasta su casilla de coronación.
2. Con esa línea como lado, dibuja un **cuadrado** hacia el lado del rey rival.
3. Si el rey **está dentro del cuadrado** (o puede entrar con su jugada, si le toca mover), **atrapa al peón**. Si no, el peón corona.

```tablero
{ "fen": "8/8/4k3/P7/8/8/8/6K1 w - - 0 1", "highlights": ["a5", "b5", "c5", "d5", "a8", "b8", "c8", "d8", "a6", "a7", "d6", "d7"], "caption": "El cuadrado del peón de a5 va de a5 a d8. Juegan blancas: tras a6, el cuadrado se encoge (a6-c8) y el rey negro de e6 se queda fuera." }
```

Cuando el peón avanza, su cuadrado **se encoge**. Por eso importa mucho a quién le toca mover:

- Si mueve el bando del peón, primero avanza el peón y luego miras si el rey está en el **nuevo** cuadrado.
- Si mueve el rey, basta con que pueda **entrar** en el cuadrado con esa jugada.

> Ojo con el peón en su casilla inicial: como puede avanzar dos pasos, el cuadrado se cuenta **como si ya estuviera en la tercera fila** (en la sexta, si es negro).

```ejercicio
{ "type": "moves", "fen": "8/8/4k3/P7/8/8/8/6K1 w - - 0 1", "solution": ["a5a6"], "prompt": "Juegan las blancas. ¿Puede el peón de a5 coronar solo? Encuentra la jugada **ganadora**.", "hint": "Comprueba si el rey negro está en el cuadrado del peón después de su avance.", "wrong": { "g1f2": "Pierdes un tiempo: ...Rd6 mete al rey negro en el cuadrado y atrapa al peón.", "g1h2": "Pierdes un tiempo: ...Rd6 mete al rey negro en el cuadrado y atrapa al peón.", "g1f1": "Pierdes un tiempo: ...Rd6 mete al rey negro en el cuadrado y atrapa al peón." }, "explanation": "**a6!** El nuevo cuadrado es a6-c8 y el rey negro, en e6, no puede entrar con una sola jugada. El peón corona." }
```

```ejercicio
{ "type": "moves", "fen": "8/8/4k3/P7/8/8/8/6K1 b - - 0 1", "solution": ["e6d6"], "accept": ["e6d5", "e6d7"], "orientation": "black", "prompt": "Ahora juegan las **negras** en la misma posición. Atrapa al peón.", "hint": "El cuadrado del peón de a5 llega hasta la columna d.", "wrong": { "e6f7": "Te alejas del cuadrado: tras a6 el peón ya no se puede alcanzar.", "e6e5": "La columna e está fuera del cuadrado (a5-d8): tras a6 el peón corona." }, "explanation": "**...Rd6** (también ...Rd5 o ...Rd7) entra en el cuadrado a5-d8. A partir de aquí el rey negro sigue al peón y lo captura." }
```

```ejercicio
{ "type": "quiz", "fen": "8/8/8/8/8/8/1P6/8 w - - 0 1", "prompt": "El peón blanco está en b2, su casilla inicial. ¿Desde qué casilla debes trazar su cuadrado?", "options": ["Desde b2 (cuadrado b2-h8)", "Desde b3 (cuadrado b3-g8)", "Desde b4 (cuadrado b4-f8)"], "answer": 1, "explanation": "Como puede avanzar dos casillas de golpe, el peón en su casilla inicial se comporta como si estuviera en b3." }
```

## El milagro de Réti

El rey puede perseguir **dos objetivos a la vez**. En diagonal, un rey recorre la misma distancia que en línea recta, así que puede acercarse al peón rival y, al mismo tiempo, al suyo propio.

```ejercicio
{ "type": "moves", "fen": "7K/8/k1P5/7p/8/8/8/8 w - - 0 1", "solution": ["h8g7"], "prompt": "Juegan las blancas. Parece imposible: el rey blanco no alcanza el peón de h5 y el negro va a capturar el de c6. ¡Encuentra las **tablas**!", "hint": "Muévete en diagonal: acércate a la vez al peón negro y al tuyo.", "wrong": { "h8h7": "Perseguir el peón por la columna h no sirve: llegas tarde.", "c6c7": "El rey negro captura el peón con ...Rb7 y tu rey sigue lejos del peón de h5." }, "explanation": "**Rg7!** Este es el famoso estudio de Réti (1921). Tras ...h4 sigue Rf6 y el rey amenaza entrar en el cuadrado del peón (Rg5) y también ayudar a su peón (Re7). Si las negras persiguen el peón de c6, el rey blanco alcanza el de h. ¡Tablas!" }
```

```ejercicio
{ "type": "play", "fen": "7K/8/k1P5/7p/8/8/8/8 w - - 0 1", "goal": "draw", "maxMoves": 10, "prompt": "Juega la maniobra de Réti contra el ordenador y **consigue las tablas**." }
```
