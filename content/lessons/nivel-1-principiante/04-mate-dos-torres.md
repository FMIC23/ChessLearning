---
title: Mate con dos torres
summary: La «escalera»: dos torres se turnan para empujar al rey hasta la banda.
tags: mate, finales
minutes: 8
---

Con dos torres el mate es muy rápido y **no necesitas al rey**. Se usa la técnica de la **escalera**:

- Una torre **corta** al rey rival por una fila.
- La otra da **jaque** en la fila siguiente, obligándole a retroceder.
- Ahora la primera torre sube **dos filas** y da jaque... y así sucesivamente, como si subieran una escalera.

```tablero
{ "fen": "8/8/8/4k3/8/R7/1R6/6K1 w - - 0 1", "arrows": [["a3", "a4"], ["b2", "b5"]], "caption": "La escalera: Ta4 corta la cuarta fila; después Tb5+ hace retroceder al rey, y así hasta la octava fila." }
```

## Cuidado con el rey rival

Si el rey rival se acerca a una de tus torres para atacarla, **llévala al otro extremo** del tablero, lo más lejos posible del rey, y sigue con la escalera.

```tablero
{ "fen": "R5k1/1R6/8/8/8/8/8/6K1 b - - 0 1", "caption": "El mate final: una torre controla la séptima fila y la otra da jaque en la octava." }
```

```ejercicio
{ "type": "moves", "fen": "6k1/R7/8/8/8/8/8/1R4K1 w - - 0 1", "solution": ["b1b8"], "goal": "mate", "prompt": "Da **jaque mate** con las torres.", "hint": "Una torre ya corta la séptima fila.", "explanation": "Tb8#: la torre de a7 vigila la séptima fila y la otra da jaque en la octava." }
```

```ejercicio
{ "type": "moves", "fen": "8/8/8/8/8/R2R4/2K5/7k w - - 0 1", "solution": ["d3d2", "h1g1", "a3a1"], "goal": "mate", "prompt": "Mate en **dos** con la escalera.", "hint": "Corta primero la segunda fila.", "explanation": "1.Td2 encierra al rey en la primera fila. Tras 1...Rg1, 2.Ta1# es mate." }
```

```ejercicio
{ "type": "moves", "fen": "6k1/8/8/3R1R2/8/8/4K3/8 w - - 0 1", "solution": ["d5d7", "g8h8", "f5f8"], "goal": "mate", "prompt": "Mate en **dos**. Sube una torre a la séptima fila.", "hint": "Una torre en la séptima corta al rey; la otra dará el jaque.", "explanation": "1.Td7 encierra al rey en la octava fila. Juegue lo que juegue, la otra torre da mate en la octava (por ejemplo, 2.Tf8#)." }
```

```ejercicio
{ "type": "quiz", "prompt": "El rey rival se acerca y ataca una de tus torres. ¿Qué haces?", "options": ["Protejo la torre con la otra torre", "Llevo la torre al otro extremo del tablero y sigo con la escalera", "Doy jaque con la torre atacada aunque la capturen"], "answer": 1, "explanation": "Alejando la torre del rey rival la pones a salvo y puedes seguir con la escalera sin perder tiempo." }
```

```ejercicio
{ "type": "play", "fen": "8/8/4k3/8/8/8/8/R3K2R w - - 0 1", "goal": "mate", "maxMoves": 12, "prompt": "Practica contra el ordenador: **da mate con las dos torres** en 12 jugadas como máximo usando la escalera." }
```
