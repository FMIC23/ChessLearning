---
title: La posición inicial
summary: Las piezas de cada bando y dónde se colocan al empezar la partida.
tags: tablero
minutes: 5
---

Cada jugador empieza con **16 piezas**: un rey, una dama, dos torres, dos alfiles, dos caballos y ocho peones.

| Pieza | Cantidad | Símbolo en notación |
|---|---|---|
| Rey | 1 | R |
| Dama | 1 | D |
| Torre | 2 | T |
| Alfil | 2 | A |
| Caballo | 2 | C |
| Peón | 8 | (sin letra) |

```tablero
{ "fen": "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1", "caption": "La posición inicial." }
```

## Cómo se colocan

- En la **primera fila** (fila 1 para las blancas, fila 8 para las negras) van, de fuera hacia dentro: **torres** en las esquinas, después los **caballos** y después los **alfiles**.
- La **dama** va en la casilla **de su color**: la dama blanca en d1 (casilla clara) y la dama negra en d8 (casilla oscura).
- El **rey** ocupa la casilla que queda libre, al lado de la dama: e1 y e8.
- Los **peones** ocupan toda la segunda fila (fila 2 las blancas y fila 7 las negras).

Las **blancas mueven siempre primero**, y después los jugadores se alternan: una jugada cada uno.

```ejercicio
{ "type": "squares", "prompt": "¿Dónde se coloca la **dama blanca**? Haz clic en su casilla.", "targets": ["d1"], "explanation": "La dama va en la casilla de su color: la dama blanca, en la casilla clara d1." }
```

```ejercicio
{ "type": "squares", "prompt": "¿Dónde empieza el **rey negro**? Haz clic en su casilla.", "targets": ["e8"], "explanation": "Los reyes empiezan en la columna e: el blanco en e1 y el negro en e8, uno frente al otro." }
```

```ejercicio
{ "type": "squares", "fen": "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1", "prompt": "Marca las casillas de los dos **caballos blancos**.", "targets": ["b1", "g1"], "mode": "all", "explanation": "Los caballos empiezan en b1 y g1 (y en b8 y g8 los negros)." }
```

```ejercicio
{ "type": "quiz", "prompt": "¿Qué bando hace la primera jugada de la partida?", "options": ["Las negras", "Las blancas", "Se sortea en cada partida"], "answer": 1, "explanation": "Las blancas siempre mueven primero. Lo que se sortea es quién juega con blancas." }
```

```ejercicio
{ "type": "quiz", "prompt": "¿Cuántos peones tiene cada jugador al empezar?", "options": ["6", "8", "10", "16"], "answer": 1, "explanation": "Ocho peones por bando, que ocupan toda la segunda fila." }
```
