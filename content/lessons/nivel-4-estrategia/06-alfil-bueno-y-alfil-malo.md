---
title: Alfil bueno y alfil malo
summary: Por qué un alfil rodeado de sus propios peones en casillas de su color es una pieza pobre, y qué hacer con él.
tags: estrategia, alfiles, estructura-de-peones
minutes: 8
---

Un alfil solo puede moverse por casillas de **un color**. Si tus peones están fijos en casillas de ese mismo color, le tapan el camino: es un **alfil malo**. Si tus peones están en casillas del color contrario, el alfil tiene diagonales libres: es un **alfil bueno**.

> Regla práctica: **pon tus peones en casillas del color contrario al de tu alfil**.

```tablero
{ "fen": "8/3bk3/1p1p1p2/1P1Pp1p1/P3P1P1/3K1P2/8/5B2 w - - 0 1", "highlights": ["a4", "b5", "d5", "e4", "f3", "g4"], "caption": "Todos los peones blancos están en casillas blancas, igual que su alfil: alfil malo. Los peones negros están en casillas oscuras y su alfil, de casillas blancas, es bueno." }
```

```ejercicio
{ "type": "quiz", "fen": "8/3bk3/1p1p1p2/1P1Pp1p1/P3P1P1/3K1P2/8/5B2 w - - 0 1", "prompt": "¿Quién tiene el **alfil malo**?", "options": ["Las blancas: sus peones están en casillas del mismo color que su alfil", "Las negras: su alfil está en la segunda fila", "Ninguno: los dos alfiles son del mismo color"], "answer": 0, "explanation": "El alfil blanco de casillas claras choca contra sus peones de a4, b5, d5, e4, f3 y g4, todos en casillas claras. Además, el alfil negro sí puede atacar esos peones de casillas claras, y el blanco apenas tiene casillas para defenderlos." }
```

```ejercicio
{ "type": "squares", "fen": "8/3bk3/1p1p1p2/1P1Pp1p1/P3P1P1/3K1P2/8/5B2 w - - 0 1", "targets": "moves:f1", "mode": "all", "prompt": "Marca **todas las casillas** a las que puede ir el alfil blanco ahora mismo.", "explanation": "Solo e2, g2 y h3. Un alfil en el centro de un tablero vacío controla hasta 13 casillas; este, tres. Así de pobre es un alfil malo." }
```

## Alfil malo no siempre significa pieza mala

Un alfil «malo» puede ser útil si **defiende** los peones o si está **fuera de la cadena** de peones. Por ejemplo, en la Caro-Kann las negras sacan el alfil a f5 **antes** de jugar ...e6: el alfil es técnicamente «malo» (sus peones de c6, d5 y e6 están en casillas claras), pero está fuera de la cadena y es activo.

## La Francesa: el alfil malo típico

```tablero
{ "fen": "r1bqkbnr/pp3ppp/2n1p3/2ppP3/3P4/2P2N2/PP3PPP/RNBQKB1R b KQkq - 2 5", "arrows": [["c8", "d7"], ["d7", "b5", "rgba(22,163,74,0.85)"]], "highlights": ["c8", "e6", "d5"], "caption": "El alfil de c8 está encerrado por los peones de e6 y d5. Un plan clásico es ...Ad7 y ...Ab5 para cambiarlo por el alfil bueno de las blancas." }
```

```ejercicio
{ "type": "quiz", "fen": "r1bqkbnr/pp3ppp/2n1p3/2ppP3/3P4/2P2N2/PP3PPP/RNBQKB1R b KQkq - 2 5", "prompt": "¿Qué alfil negro es el **malo** en esta Francesa?", "options": ["El de f8", "El de c8", "Los dos son igual de malos"], "answer": 1, "explanation": "Los peones negros de d5 y e6 están en casillas claras, igual que el alfil de c8. El de f8 (casillas oscuras) tiene más futuro, por ejemplo en d6 o e7, o tras ...f6 y la apertura del centro." }
```

## Qué hacer con un alfil malo

1. **Cambiarlo** por una pieza activa del rival (por ejemplo, por el alfil bueno rival).
2. **Sacarlo fuera** de la cadena de peones, delante de ellos.
3. **Mover los peones** a casillas del otro color, si la estructura lo permite.
4. Y al revés: si el rival tiene un alfil malo, **evita cambiarlo** y fija sus peones en casillas de su color.

```ejercicio
{ "type": "quiz", "prompt": "Tienes un alfil de casillas oscuras. ¿Dónde te conviene poner tus peones centrales, en general?", "options": ["En casillas oscuras, para que el alfil los defienda", "En casillas claras, para que el alfil tenga diagonales libres y los peones controlen las casillas que el alfil no puede", "Da igual"], "answer": 1, "explanation": "Así alfil y peones se complementan: los peones controlan las casillas claras y el alfil, las oscuras. ¡Un equipo completo!" }
```
