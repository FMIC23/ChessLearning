---
title: Rey y peón contra rey
summary: El final más básico de todos. Cuándo se gana, cuándo es tablas y la excepción del peón de torre.
tags: finales, rey y peon, oposicion
minutes: 10
---

Rey y peón contra rey es el final que **más veces vas a encontrarte** al final de una partida, porque muchos finales complejos acaban simplificándose en él. Domínalo y sabrás si te conviene cambiar las últimas piezas.

## El bando fuerte: el rey por delante

La clave no es empujar el peón, sino **colocar el rey delante de él**:

- Si el rey del bando fuerte llega a una **casilla clave**, gana.
- Si el rey atacante llega a la **sexta fila delante de su peón** (para peones que no son de torre), gana mueva quien mueva.
- El peón avanza **cuando el rey ya le ha abierto camino**.

```tablero
{ "fen": "4k3/8/4K3/4P3/8/8/8/8 w - - 0 1", "highlights": ["e6"], "arrows": [["e6", "d7"], ["e6", "f7"]], "caption": "El rey blanco está en la sexta fila delante del peón: gana aunque le toque mover. Tras Rd6 o Rf6 recupera la oposición cuando haga falta." }
```

## El bando débil: enfrente del peón

Quien defiende debe colocar su rey **delante del peón** y, cuando los reyes se acercan, **tomar la oposición**. Si el peón llega a la séptima fila dando jaque y el rey defensor se coloca en la casilla de coronación, el rey atacante tiene que tener cuidado con el **ahogado**.

```ejercicio
{ "type": "moves", "fen": "3k4/8/8/3K4/3P4/8/8/8 w - - 0 1", "solution": ["d5e6"], "accept": ["d5d6", "d5c6"], "prompt": "Juegan las blancas. Lleva el rey a la **sexta fila** y gana.", "hint": "Las casillas clave del peón de d4 son c6, d6 y e6.", "wrong": { "d5c5": "Te apartas de las casillas clave. El rey negro llega a d6 o c6 y hace tablas.", "d5e5": "Te apartas de las casillas clave. El rey negro llega a d6 o e6 y hace tablas." }, "explanation": "**Re6** (también Rd6 o Rc6): el rey está en una casilla clave, delante del peón. Ahora el peón avanza escoltado y corona." }
```

```ejercicio
{ "type": "moves", "fen": "8/4k3/8/3KP3/8/8/8/8 b - - 0 1", "solution": ["e7d7"], "orientation": "black", "prompt": "Juegan las **negras**. El rey blanco quiere llegar a d6 o f6. Encuentra la **única** jugada que hace tablas.", "hint": "Toma la oposición frente al rey blanco.", "wrong": { "e7f7": "Tras Rd6 el rey blanco entra en la sexta fila delante del peón: está perdido.", "e7d8": "Tras Re6 el rey blanco ocupa la sexta fila delante de su peón: está perdido.", "e7f8": "Tras Rd6 el rey blanco entra en la sexta fila: está perdido.", "e7e8": "Tras Rd6 el rey blanco toma la oposición y entra: está perdido." }, "explanation": "**...Rd7!** El rey negro se pone enfrente del rey blanco (oposición). Si Re4, ...Re6 bloquea; si e6+, ...Re7 y el rey negro se queda delante del peón. ¡Tablas!" }
```

## La excepción: el peón de torre

Con un **peón de torre** (columna a o h) las reglas cambian. Si el rey defensor llega a la **esquina de coronación**, es tablas incluso aunque el rey atacante esté al lado: o el rey defensor no sale de la esquina, o el bando fuerte da ahogado.

```tablero
{ "fen": "7k/8/6K1/7P/8/8/8/8 w - - 0 1", "highlights": ["h8"], "caption": "Peón de torre con el rey negro en la esquina: tablas. Si h6, ...Rg8; h7+, ...Rh8 y el blanco solo puede ahogar." }
```

Con un peón de torre, las casillas clave son las dos casillas de la columna vecina en las filas séptima y octava: para el peón de h, **g7 y g8**; para el de a, **b7 y b8**.

```ejercicio
{ "type": "squares", "fen": "8/8/8/8/P7/8/8/8 w - - 0 1", "targets": ["b7", "b8"], "mode": "all", "highlights": ["a4"], "prompt": "Marca las **casillas clave** del peón de torre de a4.", "explanation": "Si el rey blanco llega a b7 o b8, impide que el rey negro se meta en la esquina de a8 y el peón corona." }
```

```ejercicio
{ "type": "quiz", "fen": "7k/8/6K1/7P/8/8/8/8 w - - 0 1", "prompt": "Juegan las blancas. ¿Cuál es el resultado con juego correcto?", "options": ["Ganan las blancas con h6 y h7", "Tablas: el rey negro no sale de la esquina", "Ganan las blancas llevando el rey a f7"], "answer": 1, "explanation": "Si Rf7, el rey negro va a h7 y vuelve a la esquina. Si h6, ...Rg8; h7+, ...Rh8 y solo queda Rh6, ahogado. Con peón de torre y el rey defensor en la esquina, siempre son tablas." }
```

```ejercicio
{ "type": "play", "fen": "8/4k3/8/8/4P3/4K3/8/8 b - - 0 1", "goal": "draw", "maxMoves": 15, "orientation": "black", "prompt": "Juegas con **negras**. Defiende el final de rey y peón contra rey: mantén tu rey delante del peón, toma la oposición y **haz tablas**." }
```
