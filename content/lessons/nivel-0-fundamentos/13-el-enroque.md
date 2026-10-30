---
title: El enroque
summary: La jugada especial que pone al rey a salvo y activa la torre.
tags: reglas-especiales
minutes: 7
---

El **enroque** es una jugada especial en la que se mueven **el rey y una torre a la vez**. Es la única jugada en la que mueves dos piezas.

- **Enroque corto** (por el lado del rey): el rey va de e1 a **g1** y la torre de h1 a **f1**. Se escribe **O-O**.
- **Enroque largo** (por el lado de la dama): el rey va de e1 a **c1** y la torre de a1 a **d1**. Se escribe **O-O-O**.

(Para las negras es igual, en la fila 8.)

```tablero
{ "fen": "4k3/8/8/8/8/8/8/R3K2R w KQ - 0 1", "arrows": [["e1", "g1"], ["h1", "f1"], ["e1", "c1", "rgba(47,111,214,0.85)"], ["a1", "d1", "rgba(47,111,214,0.85)"]], "caption": "Naranja: enroque corto. Azul: enroque largo." }
```

## Condiciones

Solo puedes enrocar si:

1. Ni el **rey** ni **esa torre** se han movido antes en la partida.
2. **No hay piezas** entre el rey y la torre.
3. El rey **no está en jaque**.
4. El rey **no pasa por** ni **llega a** una casilla atacada.

Para enrocar en la aplicación, mueve el rey dos casillas hacia la torre.

```ejercicio
{ "type": "moves", "fen": "r3k2r/pppq1ppp/2npbn2/2b1p3/2B1P3/2NPBN2/PPPQ1PPP/R3K2R w KQkq - 0 1", "solution": ["e1g1"], "prompt": "**Enroca en corto** con las blancas.", "hint": "Mueve el rey dos casillas hacia la derecha.", "explanation": "O-O: el rey queda protegido en g1 y la torre se activa en f1.", "engine": false }
```

```ejercicio
{ "type": "moves", "fen": "r3k2r/8/8/8/8/8/8/R3K2R b KQkq - 0 1", "solution": ["e8c8"], "prompt": "Juegan negras. **Enroca en largo**.", "explanation": "O-O-O: el rey negro va a c8 y la torre a d8.", "engine": false }
```

```ejercicio
{ "type": "quiz", "fen": "4k3/8/b7/8/8/8/8/4K2R w K - 0 1", "prompt": "¿Pueden las blancas **enrocar en corto** en esta posición?", "options": ["Sí", "No, porque el rey pasaría por una casilla atacada", "No, porque el rey está en jaque"], "answer": 1, "explanation": "El alfil de a6 ataca la casilla f1, por la que tiene que pasar el rey." }
```

```ejercicio
{ "type": "quiz", "prompt": "Después del enroque corto de las blancas, ¿dónde quedan el rey y la torre?", "options": ["Rey en g1 y torre en f1", "Rey en f1 y torre en g1", "Rey en c1 y torre en d1"], "answer": 0, "explanation": "El rey salta dos casillas hacia la torre y la torre pasa al otro lado del rey." }
```
