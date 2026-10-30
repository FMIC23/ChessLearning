---
title: El rey activo
summary: En el final el rey deja de esconderse y se convierte en una pieza de ataque. Aprende a centralizarlo.
tags: finales, rey activo
minutes: 8
---

Durante la apertura y el medio juego el rey vive escondido detrás de sus peones: hay demasiadas piezas enemigas que podrían darle mate. Pero cuando se cambian las damas y casi todas las piezas, **el peligro desaparece** y el rey se transforma en una pieza fuerte: en el final vale aproximadamente lo mismo que una pieza menor o incluso más.

## Tres tareas del rey en el final

1. **Centralizarse**: desde el centro llega rápido a cualquier flanco.
2. **Atacar peones débiles** del rival e infiltrarse en su campo.
3. **Escoltar a sus peones pasados** o **bloquear** los del rival.

> Regla de oro: en cuanto se cambian las damas, pregúntate «¿dónde está mejor mi rey?». Muchas veces la primera jugada del final debe ser una jugada de rey.

```tablero
{ "fen": "8/p7/1p3k2/8/PP2K3/8/8/8 w - - 0 1", "arrows": [["e4", "d5"], ["d5", "c6"]], "highlights": ["d5", "c6"], "caption": "El rey blanco está centralizado y el negro está lejos. La ruta e4-d5-c6 lleva a los peones negros." }
```

Fíjate en la diferencia: el rey blanco está a un paso del flanco de dama, mientras que el negro, en f6, tardaría varias jugadas en defender sus peones. En los finales de peones **cada tiempo cuenta**.

```ejercicio
{ "type": "moves", "fen": "8/p7/1p3k2/8/PP2K3/8/8/8 w - - 0 1", "solution": ["e4d5"], "prompt": "Juegan las blancas. Activa el rey y **gana el final**.", "hint": "El rey debe ir a por los peones negros por la casilla más directa.", "wrong": { "e4d4": "Demasiado tímido: tras ...Re6 el rey negro llega a tiempo de defender y es tablas.", "a4a5": "Cambiar peones simplifica a un final de tablas. Primero, el rey." }, "explanation": "**Rd5!** El rey amenaza entrar en c6 y comerse los peones del flanco de dama. El rey negro está demasiado lejos para ayudar: el rey activo decide." }
```

## Rey activo contra rey pasivo

Cuando los dos reyes compiten por las mismas casillas, gana el que **llega primero** a la casilla importante. Una sola jugada de rey mal elegida puede regalar la entrada al rival.

```ejercicio
{ "type": "quiz", "fen": "8/8/3k4/p1p5/P1P5/3K4/8/8 w - - 0 1", "prompt": "Juegan las blancas. Los peones están bloqueados y todo gira en torno a las casillas d4 y e5. ¿Qué jugada **pierde**?", "options": ["Rd2", "Re2", "Re3", "Re4"], "answer": 2, "explanation": "Tras **Re3?** las negras responden **...Re5!** y amenazan ...Rd4, entrando a comerse el peón de c4. Con Re4 las blancas ocupan ellas mismas la casilla central, y con Rd2 o Re2 pueden responder a ...Re5 con Re3. Los reyes pelean por las casillas de entrada." }
```

```ejercicio
{ "type": "quiz", "prompt": "Se acaban de cambiar las damas y quedan torres y peones. ¿Cuál suele ser el mejor plan para tu rey?", "options": ["Dejarlo enrocado: sigue siendo peligroso sacarlo", "Acercarlo al centro para que participe en la lucha", "Llevarlo a una esquina, lo más lejos posible de las torres rivales"], "answer": 1, "explanation": "Sin damas, el riesgo de mate es pequeño. Un rey centralizado defiende sus peones, ataca los del rival y apoya a los peones pasados." }
```

```ejercicio
{ "type": "play", "fen": "8/p7/1p3k2/8/PP2K3/8/8/8 w - - 0 1", "goal": "promote", "maxMoves": 25, "prompt": "Ahora juega la posición completa contra el ordenador: activa el rey, gana los peones del flanco de dama y **corona un peón**." }
```
