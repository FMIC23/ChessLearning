---
title: Las tablas
summary: Las partidas también pueden terminar en empate. Conoce el ahogado y las demás formas de tablas.
tags: tablas
minutes: 7
---

Una partida termina en **tablas** (empate) en estos casos:

1. **Rey ahogado**: el jugador al que le toca mover **no tiene ninguna jugada legal** y su rey **no está en jaque**.
2. **Material insuficiente**: ningún bando puede dar mate. Por ejemplo, rey contra rey, o rey y alfil contra rey, o rey y caballo contra rey.
3. **Triple repetición**: la misma posición se repite tres veces con el mismo jugador al turno.
4. **Regla de los 50 movimientos**: pasan 50 jugadas de cada bando sin capturas ni movimientos de peón.
5. **Acuerdo** entre los jugadores.

```tablero
{ "fen": "7k/8/6Q1/8/8/8/8/K7 b - - 0 1", "highlights": ["h8"], "caption": "Juegan negras: el rey no está en jaque, pero no tiene ninguna casilla. ¡Ahogado!" }
```

El ahogado es la trampa favorita del bando que va perdiendo. Cuando tengas mucha ventaja, **asegúrate de que el rival siempre tenga alguna jugada** hasta que le des mate.

```ejercicio
{ "type": "quiz", "fen": "7k/8/6Q1/8/8/8/8/K7 b - - 0 1", "prompt": "Juegan las negras. ¿Cómo termina la partida?", "options": ["Ganan las blancas por jaque mate", "Tablas por rey ahogado", "Las negras pueden seguir jugando"], "answer": 1, "explanation": "El rey negro no está en jaque y no tiene ninguna casilla libre: es ahogado y, por tanto, tablas." }
```

```ejercicio
{ "type": "moves", "fen": "7k/8/6K1/8/8/8/8/5Q2 w - - 0 1", "solution": ["f1f8"], "goal": "mate", "prompt": "Da **jaque mate** en una jugada. ¡Cuidado con el ahogado!", "wrong": { "f1f7": "¡Ahogado! El rey negro no tiene jugadas y no está en jaque: son tablas. Busca el mate." }, "explanation": "Df8#: la dama da jaque por la fila 8 y el rey blanco cubre g7 y h7." }
```

```ejercicio
{ "type": "quiz", "prompt": "¿Cuál de estos finales es **tablas por material insuficiente**?", "options": ["Rey y alfil contra rey", "Rey y torre contra rey", "Rey y peón contra rey", "Rey y dama contra rey"], "answer": 0, "explanation": "Con un solo alfil (o un solo caballo) es imposible dar mate. Con torre o dama sí, y el peón puede convertirse en dama." }
```

```ejercicio
{ "type": "quiz", "prompt": "¿Cuál es la condición del **ahogado**?", "options": ["El rey está en jaque y no puede escapar", "El jugador al turno no tiene jugadas legales y su rey no está en jaque", "Solo quedan los dos reyes"], "answer": 1, "explanation": "Si estuviera en jaque sin escapatoria, sería mate. Sin jaque y sin jugadas, es ahogado." }
```
