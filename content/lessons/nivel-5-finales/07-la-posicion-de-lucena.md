---
title: La posición de Lucena
summary: La posición ganadora más importante de los finales de torre. Aprende a «construir el puente».
tags: finales, finales de torre, lucena
minutes: 10
---

Los **finales de torre** son los más frecuentes del ajedrez: aparecen en casi la mitad de las partidas que llegan al final. Y dentro de ellos, el más importante es **torre y peón contra torre**. Hay dos posiciones que todo jugador debe conocer: la de **Lucena** (cómo ganar) y la de **Philidor** (cómo defender).

## La posición

En la posición de Lucena:

- El peón está en la **séptima fila** y su rey en la casilla de coronación, delante del peón.
- El rey defensor está **cortado** por la torre al menos a una columna de distancia.
- La torre defensora da jaques por el lado para que el rey no salga.

```tablero
{ "fen": "1K1k4/1P6/8/8/8/8/r7/2R5 w - - 0 1", "arrows": [["c1", "d1"], ["d1", "d4"]], "caption": "La posición de Lucena. El rey blanco no puede salir de b8 sin recibir jaques. La solución: Td1+ y Td4, construyendo el puente." }
```

## Construir el puente

El método tiene tres pasos:

1. **Td1+**: alejas un poco más al rey rival con un jaque.
2. **Td4!**: llevas la torre a la **cuarta fila**. Es el «puente».
3. El rey sale (**Rc7, Rb6, Rc6, Rb5**...) y, cuando la torre rival siga dando jaques, **tu torre se interpone** en b4. ¡Ya no hay más jaques y el peón corona!

```tablero
{ "fen": "8/1P6/4k3/1K6/3R4/8/8/1r6 w - - 0 1", "arrows": [["d4", "b4"]], "highlights": ["b4"], "caption": "El rey ha salido y la torre negra da jaque desde b1. Ahora Tb4 tapa el jaque: el puente está construido." }
```

```ejercicio
{ "type": "quiz", "fen": "1K1k4/1P6/8/8/8/8/r7/2R5 w - - 0 1", "prompt": "Juegan las blancas en la posición de Lucena. ¿Cuál es la primera jugada del método clásico?", "options": ["Ra8, esperando a que las negras se equivoquen", "Td1+, alejando al rey negro", "Tc8+, ofreciendo el cambio de torres"], "answer": 1, "explanation": "**Td1+** obliga al rey negro a apartarse a la columna e. Después, **Td4** prepara el puente. Fíjate en que ahora el rey blanco no puede salir: c7 y c8 están controladas por el rey negro y a7 por la torre. Ra8 no hace ningún progreso, y Tc8+?? pierde la torre tras ...Rxc8." }
```

```ejercicio
{ "type": "moves", "fen": "8/1P6/4k3/1K6/3R4/8/8/1r6 w - - 0 1", "solution": ["d4b4"], "prompt": "Juegan las blancas. La torre negra acaba de dar jaque desde b1. **Completa el puente** y gana.", "hint": "Tu torre está en la cuarta fila precisamente para esto.", "wrong": { "b5c4": "El rey se aleja del peón: la torre negra captura en b7 y es tablas.", "b5c5": "El rey se aleja del peón: la torre negra captura en b7 y es tablas." }, "explanation": "**Tb4!** Tapa el jaque con la torre protegida por el rey. Las negras ya no pueden dar más jaques por la columna b y el peón corona. ¡Esto es construir el puente!" }
```

```ejercicio
{ "type": "quiz", "prompt": "¿Por qué la torre del bando fuerte va precisamente a la **cuarta fila** en el método de Lucena?", "options": ["Porque así protege el peón desde lejos", "Para poder interponerse en la columna del rey cuando este haya bajado hasta la quinta fila", "Para dar mate al rey rival"], "answer": 1, "explanation": "El rey baja dando zigzag (Rc7, Rb6, Rc6, Rb5) y, cuando la torre rival vuelve a dar jaque, la torre propia se interpone en b4, protegida por el rey." }
```

```ejercicio
{ "type": "play", "fen": "1K1k4/1P6/8/8/8/8/r7/2R5 w - - 0 1", "goal": "promote", "maxMoves": 15, "prompt": "Juega tú la posición de Lucena contra el ordenador: aleja al rey rival, **construye el puente** y corona el peón." }
```
