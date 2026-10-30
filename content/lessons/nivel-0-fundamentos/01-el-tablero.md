---
title: El tablero y las coordenadas
summary: Conoce las 64 casillas, las columnas, las filas y cómo se nombra cada casilla.
tags: tablero
minutes: 5
---

El ajedrez se juega en un **tablero de 64 casillas** (8 × 8) que alternan entre claras y oscuras. Juegan dos bandos, **blancas** y **negras**, y cada jugador se sienta en un lado.

Para colocar bien el tablero recuerda: **la casilla de la esquina inferior derecha de cada jugador es clara**. («Blanco a la derecha».)

## Columnas, filas y diagonales

- Las **columnas** son las líneas verticales. Se nombran con letras de la **a** a la **h**, de izquierda a derecha desde el lado de las blancas.
- Las **filas** son las líneas horizontales. Se numeran del **1** al **8**, empezando por el lado de las blancas.
- Las **diagonales** son líneas de casillas del mismo color que se tocan por las esquinas.

Cada casilla tiene un nombre único: **la letra de su columna seguida del número de su fila**. Por ejemplo, la casilla resaltada es **e4**.

```tablero
{ "fen": "8/8/8/8/8/8/8/8 w - - 0 1", "highlights": ["e4"], "caption": "La casilla e4: columna e, fila 4." }
```

Aprender las coordenadas es muy útil: te permitirá leer libros, seguir partidas y anotar las tuyas. ¡Vamos a practicar!

```ejercicio
{ "type": "squares", "prompt": "Haz clic en la casilla **e4**.", "targets": ["e4"], "explanation": "Columna **e** (la quinta desde la izquierda) y fila **4**." }
```

```ejercicio
{ "type": "squares", "prompt": "Ahora haz clic en la casilla **d5**.", "targets": ["d5"], "explanation": "e4, d4, e5 y d5 son las **casillas centrales**, muy importantes, como verás más adelante." }
```

```ejercicio
{ "type": "squares", "prompt": "Haz clic en la casilla **h1**, la esquina inferior derecha del lado de las blancas.", "targets": ["h1"], "explanation": "Fíjate: h1 es una casilla **clara**. Así compruebas que el tablero está bien colocado." }
```

```ejercicio
{ "type": "squares", "prompt": "Marca **todas las casillas de la columna c**.", "targets": ["c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8"], "mode": "all", "explanation": "Una columna tiene 8 casillas, de c1 a c8." }
```

```ejercicio
{ "type": "squares", "prompt": "Marca todas las casillas de la **gran diagonal** que va de **a1** a **h8**.", "targets": ["a1", "b2", "c3", "d4", "e5", "f6", "g7", "h8"], "mode": "all", "explanation": "Las diagonales siempre están formadas por casillas del mismo color. Esta es una de las dos diagonales más largas del tablero." }
```

```ejercicio
{ "type": "quiz", "prompt": "¿De qué color es la casilla **a1**?", "options": ["Clara", "Oscura"], "answer": 1, "explanation": "a1 es oscura y h1 es clara. Si a tu derecha tienes una casilla clara, el tablero está bien colocado." }
```
