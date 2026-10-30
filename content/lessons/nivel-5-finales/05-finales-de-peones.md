---
title: Finales de peones
summary: Peón pasado alejado, ruptura de peones y triangulación. Las armas que deciden los finales de peones.
tags: finales, finales de peones, peon pasado
minutes: 12
---

En los finales de peones **no hay piezas que arreglen los errores**: un solo tiempo decide entre ganar y perder. Por eso conviene conocer unos cuantos patrones que se repiten una y otra vez.

## El peón pasado alejado

Un **peón pasado alejado** es un peón pasado situado lejos del resto de peones y, sobre todo, lejos de los reyes. Es una ventaja enorme aunque el material esté igualado: el rey rival tiene que ir a pararlo, y mientras tanto **tu rey se come los peones del otro flanco**.

```tablero
{ "fen": "8/5ppp/4k3/8/P7/4K3/6PP/8 w - - 0 1", "arrows": [["a4", "a8"], ["e3", "f4"]], "highlights": ["a4"], "caption": "Tres peones contra tres, pero el peón de a4 es un peón pasado alejado: el rey negro tendrá que perseguirlo y el blanco entrará en el flanco de rey." }
```

```ejercicio
{ "type": "moves", "fen": "8/5k2/8/p3P3/P7/2K5/8/8 w - - 0 1", "solution": ["c3d3"], "accept": ["c3d4", "c3c4"], "prompt": "Juegan las blancas. Tu peón de e5 está lejos del flanco de dama. ¿Cuál es el plan **ganador**?", "hint": "El peón de e5 es un cebo: el rey negro tiene que ir a por él.", "wrong": { "c3b3": "Demasiado lento: el rey negro captura el peón de e5 y vuelve a tiempo de defender a5." }, "explanation": "**Rd3** (también Rd4 o Rc4): el rey blanco se dirige a ir a b5 para comerse el peón de a5. El rey negro tendrá que elegir entre capturar el peón de e5 y defender su peón de a5: no puede hacer ambas cosas. Así funciona el peón pasado alejado." }
```

## La ruptura de peones

Cuando los peones de los dos bandos están frente a frente, a veces un **sacrificio de peones** crea un peón pasado imparable. El ejemplo clásico son tres peones contra tres:

```tablero
{ "fen": "7k/ppp5/8/PPP5/8/8/8/7K w - - 0 1", "arrows": [["b5", "b6"]], "caption": "Juegan blancas: con b6 rompen la cadena negra y uno de los peones blancos corona." }
```

```ejercicio
{ "type": "moves", "fen": "7k/ppp5/8/PPP5/8/8/8/7K w - - 0 1", "solution": ["b5b6", "c7b6", "a5a6", "b7a6", "c5c6"], "prompt": "Juegan las blancas. Los reyes están lejos. **Fuerza la coronación** con una ruptura de peones.", "hint": "Empieza por el peón central de los tres.", "wrong": { "a5a6": "Tras ...bxa6 no consigues un peón pasado.", "c5c6": "Tras ...bxc6 no consigues un peón pasado." }, "explanation": "**b6!** cxb6 **a6!** bxa6 **c6!** y el peón de c corona: los reyes están demasiado lejos. Si 1...axb6, entonces 2.c6! bxc6 3.a6 con la misma idea." }
```

## La triangulación

A veces llegas a una posición en la que **ganarías si le tocara mover al rival**. Si tu rey tiene más espacio que el suyo, puedes **perder un tiempo** recorriendo un triángulo de tres casillas mientras el rey rival solo puede ir y volver entre dos. Al acabar el triángulo, la posición es la misma… pero ahora le toca mover al rival, que está en zugzwang.

```tablero
{ "fen": "8/8/8/8/3K4/8/8/8 w - - 0 1", "arrows": [["d4", "c4"], ["c4", "c3"], ["c3", "d4"]], "highlights": ["d4", "c4", "c3"], "caption": "La triangulación: el rey recorre d4-c4-c3-d4 en tres jugadas y vuelve a la casilla de partida con el turno cambiado." }
```

```ejercicio
{ "type": "quiz", "prompt": "¿Para qué sirve la **triangulación**?", "options": ["Para coronar un peón más rápido", "Para ceder el turno al rival y ponerlo en zugzwang", "Para proteger un peón con el rey en diagonal"], "answer": 1, "explanation": "Con tres jugadas de rey vuelves a la misma posición, pero el rival (que solo podía ir y volver) ha gastado dos. Has «perdido» un tiempo a propósito para que le toque mover a él." }
```

```ejercicio
{ "type": "quiz", "fen": "8/5ppp/4k3/8/P7/4K3/6PP/8 w - - 0 1", "prompt": "En esta posición, ¿por qué las blancas están mejor si el material está igualado?", "options": ["Porque su rey está más avanzado", "Porque tienen un peón pasado alejado que desviará al rey negro", "Porque las negras tienen un peón doblado"], "answer": 1, "explanation": "El peón de a4 es un peón pasado alejado. El rey negro tendrá que ir a la columna a para pararlo y, mientras, el rey blanco entrará en el flanco de rey y se comerá los peones negros." }
```

```ejercicio
{ "type": "play", "fen": "8/5ppp/4k3/8/P7/4K3/6PP/8 w - - 0 1", "goal": "promote", "maxMoves": 30, "prompt": "Aprovecha el **peón pasado alejado**: usa el peón de a para desviar al rey negro, ataca los peones del flanco de rey con tu rey y **corona**." }
```
