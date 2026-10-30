---
title: Torre contra peón
summary: Normalmente gana la torre, pero no siempre. Aprende a cortar al rey, a acercar el tuyo y los trucos del bando del peón.
tags: finales, torre contra peon, finales de torre
minutes: 9
---

Una torre vale mucho más que un peón, pero si el peón está avanzado y su rey lo apoya, la torre puede quedarse sin tiempo para ganar. Este final aparece a menudo después de que un bando entrega su torre por el último peón rival.

## Cuándo gana la torre

- Si **tu rey está delante del peón** (o llega a tiempo), la torre gana fácilmente.
- Si el rey rival está **cortado** por la torre a una o más columnas (o filas) del peón, normalmente también ganas.
- Si el peón ya está en la **sexta o séptima fila** apoyado por su rey y tu rey está lejos, lo normal es que sea tablas.

## El método

1. **Corta** al rey rival con la torre para que no pueda acompañar a su peón.
2. **Acerca tu rey** al peón lo más rápido posible. ¡Cada tiempo cuenta!
3. Coloca la torre **detrás del peón** para frenarlo desde lejos.

```tablero
{ "fen": "8/8/2K5/8/5k2/4p3/8/R7 w - - 0 1", "arrows": [["c6", "d5"], ["d5", "d4"]], "caption": "Juegan blancas. La torre ya controla la primera fila; lo urgente es acercar el rey al peón." }
```

```ejercicio
{ "type": "moves", "fen": "8/8/2K5/8/5k2/4p3/8/R7 w - - 0 1", "solution": ["c6d5"], "accept": ["c6c5", "c6b5"], "prompt": "Juegan las blancas. La torre ya vigila la casilla de coronación. ¿Cuál es la jugada **ganadora**?", "hint": "La torre sola no puede ganar el peón si el rey negro lo defiende. Necesitas ayuda.", "wrong": { "a1a8": "Pierdes un tiempo valioso: tras ...e2 y ...Rf3 el rey negro defiende el peón y tendrás que entregar la torre. Tablas.", "a1f1": "El jaque no consigue nada: el rey negro se acerca al peón y tu rey sigue lejos." }, "explanation": "**Rd5!** (también Rc5 o Rb5) acerca el rey al peón. Tras ...e2 sigue Rd4 y el rey blanco llega a tiempo de ayudar a la torre a ganar el peón." }
```

## Los trucos del bando del peón

Aunque vaya perdiendo, el bando del peón tiene recursos: el **ahogado** y la **promoción a una pieza menor**. El ejemplo más famoso es la **posición de Saavedra** (1895), donde el peón vence a la torre.

```ejercicio
{ "type": "moves", "fen": "8/2P5/8/8/3r4/8/2K5/k7 w - - 0 1", "solution": ["c7c8r"], "prompt": "Juegan las blancas (final de la posición de Saavedra). La torre negra ha ido a d4 preparando una trampa. ¡**Corona** de la mejor manera!", "hint": "Si coronas dama, ...Tc4+ y tras Dxc4 el rey negro está ahogado.", "wrong": { "c7c8q": "¡Ahogado! Tras ...Tc4+ Dxc4 el rey negro no tiene jugadas: tablas." }, "explanation": "**c8=T!!** Coronar torre evita el ahogado. Ahora las blancas amenazan Ta8#. Si ...Ta4, sigue Rb3! con doble amenaza: Tc1# y Rxa4. ¡El peón ha vencido a la torre!" }
```

```ejercicio
{ "type": "quiz", "prompt": "Tienes torre contra peón. El peón negro está en la segunda fila, apoyado por su rey, y tu rey está muy lejos. ¿Qué es lo más probable?", "options": ["Ganas siempre: la torre vale mucho más", "Tablas: la torre tendrá que entregarse por el peón", "Pierdes siempre"], "answer": 1, "explanation": "Con el peón a punto de coronar y su rey al lado, la torre solo puede sacrificarse por él. Por eso es tan importante **cortar al rey** y **acercar el tuyo** a tiempo." }
```

```ejercicio
{ "type": "quiz", "prompt": "¿Cuál es la mejor posición para la torre cuando quieres frenar un peón pasado?", "options": ["Delante del peón, bloqueándolo", "Detrás del peón", "En la fila de al lado"], "answer": 1, "explanation": "Desde detrás, la torre controla todo el camino del peón, y cuanto más avanza el peón, más casillas domina la torre. Es la famosa regla de Tarrasch." }
```

```ejercicio
{ "type": "play", "fen": "8/8/2K5/8/5k2/4p3/8/R7 w - - 0 1", "goal": "win", "maxMoves": 15, "prompt": "Gana el final de torre contra peón: acerca el rey, coordínalo con la torre y **captura el peón** (o impide su coronación) para quedarte con ventaja decisiva." }
```
