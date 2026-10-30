---
title: Contra la Francesa, el avance
summary: 1.e4 e6 2.d4 d5 3.e5: la cadena de peones, la lucha por d4 y el ataque en el flanco de rey.
tags: aperturas, francesa, e4, cadenas
minutes: 10
---

La **Defensa Francesa** empieza con 1.e4 e6 2.d4 d5. Las negras atacan e4 con un peón apoyado. Nuestra respuesta será la **variante del avance: 3.e5**.

## La cadena de peones

Con 3.e5 se forma una **cadena de peones**: d4-e5 por las blancas y e6-d5 por las negras. Una regla clásica de Nimzowitsch dice:

> **Ataca la cadena por su base.**

La **base** de la cadena blanca es **d4** (el peón que sostiene a los demás). Las negras la atacarán con **...c5**, ...Cc6, ...Db6 y a veces ...Cge7-f5. La base de la cadena negra es **e6**, y las blancas pueden atacarla con **f4-f5**, aunque normalmente prefieren usar el espacio para atacar en el flanco de rey.

```tablero
{ "fen": "r1b1kbnr/pp3ppp/1qn1p3/2ppP3/3P4/2P2N2/PP3PPP/RNBQKB1R w KQkq - 3 6", "arrows": [["c5", "d4", "rgba(220,38,38,0.85)"], ["c6", "d4", "rgba(220,38,38,0.85)"], ["b6", "d4", "rgba(220,38,38,0.85)"], ["c3", "d4", "rgba(22,163,74,0.85)"], ["f3", "d4", "rgba(22,163,74,0.85)"]], "highlights": ["d4"], "caption": "1.e4 e6 2.d4 d5 3.e5 c5 4.c3 Cc6 5.Cf3 Db6: tres piezas negras atacan d4 y dos blancas lo defienden (más la dama). Toda la apertura gira alrededor de esa casilla." }
```

```ejercicio
{ "type": "squares", "fen": "rnbqkbnr/ppp2ppp/4p3/3pP3/3P4/8/PPP2PPP/RNBQKBNR b KQkq - 0 3", "targets": ["d4"], "prompt": "Marca la **base** de la cadena de peones blanca, el punto que las negras deben atacar.", "explanation": "d4 sostiene a e5. Si cae d4, e5 se queda sin apoyo." }
```

## Objetivos de cada bando

- **Blancas**: mantener d4 con **c3** y **Cf3**, aprovechar el **espacio** en el flanco de rey (el caballo negro no puede ir a f6) y atacar allí. El peón de e5 es una cuña.
- **Negras**: presionar d4, romper con **...f6** para atacar el otro extremo, y resolver el problema de su **alfil malo de c8**, encerrado detrás de e6 y d5.

```ejercicio
{ "type": "moves", "fen": "rnbqkbnr/pp3ppp/4p3/2ppP3/3P4/8/PPP2PPP/RNBQKBNR w KQkq - 0 4", "solution": ["c2c3"], "accept": ["g1f3"], "engine": false, "prompt": "Tras 3...c5, las negras ya atacan la base. **Refuerza d4** con un peón.", "explanation": "4.c3: si las negras cambian en d4, recapturas con el peón de c3 y la cadena sigue en pie. 4.Cf3 también es habitual.", "wrong": { "d4c5": "4.dxc5 abandona la cadena: la base desaparece y e5 se queda débil. Es una línea posible, pero va contra la idea principal." } }
```

## Planes típicos

Tras 5...Db6 las blancas suelen elegir:

- **6.a3**: prepara **b4**, ganando espacio en el flanco de dama. Si las negras responden ...c4, la posición se cierra y la lucha se traslada al flanco de rey.
- **6.Ae2** o **6.Ad3**: desarrollo normal y enroque.

```tablero
{ "fen": "r3kbnr/pp1b1ppp/1qn1p3/3pP3/3P4/PNP2N2/5PPP/R1BQKB1R b KQkq - 0 9", "arrows": [["b3", "c5", "rgba(22,163,74,0.85)"], ["f1", "d3"]], "caption": "Tras 6.a3 c4 7.Cbd2 Ad7 8.b4 cxb3 9.Cxb3, las blancas tienen un caballo en b3 que vigila c5 y un centro sólido." }
```

## La trampa en d4

Aquí tienes un truco táctico que conviene conocer. Si las blancas juegan Ad3 sin cuidado, las negras pueden ganar el peón de d4… pero hay un truco escondido.

```ejercicio
{ "type": "moves", "fen": "r1b1kbnr/pp3ppp/4p3/3pP3/3q4/3B4/PP3PPP/RNBQK2R w KQkq - 0 9", "solution": ["d3b5"], "prompt": "6.Ad3 cxd4 7.cxd4 Cxd4? 8.Cxd4 Dxd4??. Las negras han ganado un peón. ¿Lo han ganado de verdad?", "hint": "La dama blanca ve la dama negra a través de la columna d. Solo falta destapar con jaque.", "explanation": "9.Ab5+! Es un **ataque a la descubierta**: el alfil da jaque y la dama de d1 ataca a la dama de d4. Las negras pierden la dama. Por eso en esta línea las negras juegan primero 7...Ad7, para quitar la casilla b5." }
```

## Errores comunes

- Con blancas: perder el control de **d4** y quedarse con un peón de e5 débil.
- Con blancas: jugar **f4** demasiado pronto, debilitando el enroque.
- Con negras: atacar d4 sin calcular trucos como **Ab5+**.
- Con negras: olvidar la ruptura **...f6**, que es la segunda forma de atacar la cadena.

```ejercicio
{ "type": "quiz", "prompt": "En la Francesa del avance, ¿cuál es el «alfil malo» de las negras?", "options": ["El alfil de f8", "El alfil de c8, porque sus peones están en casillas blancas (e6 y d5)", "No tienen alfil malo"], "answer": 1, "explanation": "El alfil de c8 se mueve por casillas blancas y está encerrado por sus propios peones de e6 y d5. Por eso las negras intentan activarlo con ...Ad7-b5 o cambiarlo." }
```
