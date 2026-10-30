---
title: Profilaxis avanzada
summary: Antes de jugar, pregúntate qué quiere tu rival. Impedir sus planes es a menudo la mejor jugada.
tags: estrategia, profilaxis, defensa
minutes: 10
---

La **profilaxis** consiste en impedir los planes del rival **antes** de que pueda llevarlos a cabo. El gran teórico Aron Nimzowitsch la convirtió en un principio, y jugadores como Petrosian o Karpov la llevaron a la perfección: sus rivales sentían que no podían hacer nada.

## La pregunta mágica

Antes de cada jugada, hazte esta pregunta: **«Si ahora le tocara jugar a mi rival, ¿qué haría?»**

- Si la respuesta es **una amenaza táctica** (un mate, una horquilla, ganar una pieza), tienes que pararla.
- Si es **un plan** (llevar un caballo a una casilla fuerte, abrir una columna, avanzar un peón), piensa si puedes impedirlo con una jugada que además mejore tu posición.

## Ejemplos de jugadas profilácticas

- Abrir una **salida al rey** (h3 o g3) antes de que el rival amenace mate en la primera fila.
- Controlar la **casilla fuerte** a la que quiere ir un caballo rival.
- Llevar el rey o una torre **lejos de una columna** que se va a abrir.
- Cambiar la **pieza más peligrosa** del rival.

```tablero
{ "fen": "r4rk1/ppp2ppp/3b4/8/7q/2N5/PPP2PPP/R1BQR1K1 w - - 0 1", "arrows": [["d6", "h2", "rgba(220,38,38,0.85)"], ["h4", "h2", "rgba(220,38,38,0.85)"]], "caption": "La dama y el alfil negros apuntan a h2. Antes de pensar en tus planes, ocúpate de los suyos." }
```

```ejercicio
{ "type": "quiz", "fen": "r4rk1/ppp2ppp/3b4/8/7q/2N5/PPP2PPP/R1BQR1K1 w - - 0 1", "prompt": "Juegan las blancas. ¿Qué quieren hacer las negras?", "options": ["...Dxh2+, ganando un peón y dejando al rey blanco al descubierto", "...Tae8, para cambiar las torres", "...c5, para ganar espacio"], "answer": 0, "explanation": "La batería de dama y alfil sobre h2 amenaza **...Dxh2+**. Tras Rf1, la dama negra sigue dando jaques y el rey blanco se queda sin protección." }
```

```ejercicio
{ "type": "moves", "fen": "r4rk1/ppp2ppp/3b4/8/7q/2N5/PPP2PPP/R1BQR1K1 w - - 0 1", "solution": ["g2g3"], "accept": ["h2h3", "f2f4"], "prompt": "Juegan las blancas, que tienen una pieza de más. **Neutraliza la amenaza** del rival y conservarás la ventaja.", "hint": "El objetivo de las negras es el peón de h2.", "wrong": { "c1g5": "Atacar la dama parece natural, pero tras ...Dxh2+ Rf1 Dh1+ Re2 Dh5+ las negras recuperan la pieza y el rey blanco queda muy expuesto." }, "explanation": "**g3** (también h3 o f4) corta la diagonal del alfil o protege h2. Después las blancas pueden desarrollarse tranquilamente con Ad2 y coordinar sus piezas. Primero, frenar al rival; después, tus planes." }
```

```ejercicio
{ "type": "squares", "fen": "r4rk1/pp1b1ppp/3pn3/2p1p3/2P1P3/2N5/PP2BPPP/R4RK1 w - - 0 1", "targets": ["d4"], "mode": "one", "highlights": ["e6"], "prompt": "Antes de mover, piensa en tu rival. El caballo negro de e6 busca una **casilla fuerte** en tu campo, donde ningún peón blanco pueda echarlo. Márcala.", "explanation": "La casilla **d4**: los peones negros de c5 y e5 la protegen y las blancas ya no tienen peones en las columnas c y e capaces de atacarla (c4 y e4 están más avanzados). Una idea profiláctica es **Ag4**, para cambiar ese caballo antes de que llegue a d4, o preparar Cd5 para ocupar tú primero las casillas centrales." }
```

```ejercicio
{ "type": "quiz", "prompt": "¿Cuál de estas jugadas es un ejemplo típico de **profilaxis**?", "options": ["Dar un jaque para ganar tiempo", "Jugar h3 para dar una salida al rey antes de que el rival amenace mate en la primera fila", "Capturar un peón que el rival ha dejado sin defensa"], "answer": 1, "explanation": "La profilaxis se anticipa al plan del rival. Una casilla de escape para el rey elimina para siempre muchas combinaciones de mate del pasillo." }
```
