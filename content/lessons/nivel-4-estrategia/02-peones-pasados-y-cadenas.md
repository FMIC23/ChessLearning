---
title: Peones pasados y cadenas de peones
summary: El peón pasado como arma ganadora, cómo crearlo con una ruptura, y cómo atacar una cadena de peones por su base.
tags: estrategia, estructura-de-peones, peon-pasado, cadenas
minutes: 10
---

## El peón pasado

Un peón es **pasado** cuando ningún peón rival puede impedir su avance: no hay peones enemigos delante de él **ni en su columna ni en las columnas vecinas**.

Los peones pasados son una ventaja enorme, sobre todo en el final: obligan al rival a vigilarlos con piezas, que se vuelven pasivas.

> «Los peones pasados deben ser empujados.» — Aron Nimzowitsch

```tablero
{ "fen": "6k1/5ppp/8/3P4/P3P3/8/5PPP/6K1 w - - 0 1", "arrows": [["a4", "a8", "rgba(22,163,74,0.85)"], ["d5", "d8", "rgba(22,163,74,0.85)"], ["f7", "e6", "rgba(220,38,38,0.85)"]], "caption": "a4 y d5 son peones pasados. El peón de e4 no lo es: el peón negro de f7 vigila e6." }
```

```ejercicio
{ "type": "squares", "fen": "6k1/5ppp/8/3P4/P3P3/8/5PPP/6K1 w - - 0 1", "targets": ["a4", "d5"], "mode": "all", "prompt": "Marca **todos los peones pasados** de las blancas.", "explanation": "a4 y d5 no tienen peones negros delante, ni en su columna ni en las vecinas. El peón de e4 no es pasado porque el peón negro de f7 controla e6.", "hint": "Comprueba la columna del peón y las dos de al lado." }
```

### Tipos de peón pasado

- **Peón pasado protegido**: está defendido por otro peón. El rey rival no puede comérselo.
- **Peón pasado alejado**: está lejos del resto de peones. Sirve como **señuelo**: el rey rival tiene que ir a pararlo y abandona el otro flanco.
- **Peones pasados ligados**: dos peones pasados en columnas vecinas. Avanzan juntos y son muy difíciles de parar.

```ejercicio
{ "type": "quiz", "prompt": "Tu rival tiene un peón pasado. ¿Qué es lo más importante?", "options": ["Atacarlo con el rey en cuanto puedas, aunque abandones tus peones", "Bloquearlo: poner una pieza (idealmente un caballo) en la casilla de delante", "Ignorarlo hasta que llegue a la séptima fila"], "answer": 1, "explanation": "Un peón pasado bloqueado deja de ser peligroso. Nimzowitsch insistía en ello: primero se bloquea, luego se ataca." }
```

## Crear un peón pasado: la ruptura

A veces puedes **crear** un peón pasado sacrificando peones. El ejemplo clásico es este: tres peones contra tres, y los reyes demasiado lejos.

```ejercicio
{ "type": "moves", "fen": "8/ppp3k1/8/PPP5/8/8/6K1/8 w - - 0 1", "solution": ["b5b6", "a7b6", "c5c6", "b7c6", "a5a6"], "prompt": "Juegan blancas. **Crea un peón pasado** que corone, aunque tengas que sacrificar peones.", "hint": "Empieza por el peón del centro: b6.", "explanation": "1.b6! Si 1...axb6 2.c6! bxc6 3.a6 y el peón corona. Si 1...cxb6, entonces 2.a6! bxa6 3.c6. El rey negro llega tarde. ¡Tres peones que valen menos que uno pasado!", "wrong": { "a5a6": "1.a6? bxa6 y ahora no hay ruptura: las negras se defienden.", "c5c6": "1.c6? bxc6 y la ruptura ya no funciona." } }
```

## Cadenas de peones

Una **cadena** es una diagonal de peones que se protegen entre sí, como d4-e5 (blancas) frente a e6-d5 (negras) en la Francesa. Tiene dos partes:

- La **base**: el peón de atrás, que no está protegido por otro peón.
- La **cabeza**: el peón más avanzado.

```tablero
{ "fen": "rnbqkbnr/ppp2ppp/4p3/3pP3/3P4/8/PPP2PPP/RNBQKBNR b KQkq - 0 3", "arrows": [["c7", "c5", "rgba(220,38,38,0.85)"], ["f7", "f6", "rgba(220,38,38,0.85)"]], "highlights": ["d4", "e5"], "caption": "La cadena d4-e5 de la Francesa del avance. Las negras atacarán la base d4 con ...c5 (y luego ...Cc6, ...Db6) y la cabeza e5 con ...f6." }
```

Reglas prácticas:

1. **Ataca la cadena por la base**: si cae la base, toda la cadena se tambalea.
2. La cadena indica **dónde atacar**: normalmente en el flanco hacia el que «apunta». La cadena blanca d4-e5 apunta al flanco de rey: las blancas atacan allí, y las negras en el flanco de dama.

```ejercicio
{ "type": "quiz", "fen": "rnbqkbnr/ppp2ppp/4p3/3pP3/3P4/8/PPP2PPP/RNBQKBNR b KQkq - 0 3", "prompt": "¿Cuál es la **base** de la cadena de peones blanca, y con qué peón la atacan las negras?", "options": ["e5, con ...f6", "d4, con ...c5", "c2, con ...b5"], "answer": 1, "explanation": "d4 sostiene a e5 y no está protegido por ningún peón: es la base. Las negras la atacan con ...c5. Por eso las blancas suelen responder c3, para alargar la cadena y reforzar d4." }
```

```ejercicio
{ "type": "quiz", "prompt": "Tienes un peón pasado protegido en el final. ¿Por qué es tan fuerte?", "options": ["Porque el rey rival no puede capturarlo y tiene que vigilarlo siempre", "Porque corona más rápido que un peón normal", "Porque se puede mover dos casillas"], "answer": 0, "explanation": "El peón protegido ata al rey rival: si se aleja para atacar tus otros peones, el pasado avanza. Tu rey queda libre para ir a por los peones contrarios." }
```
