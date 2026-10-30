---
title: Finales de torre prácticos
summary: Torre detrás del peón pasado, torre activa y rey activo. Las reglas que más puntos dan en los finales de torre.
tags: finales, finales de torre, peon pasado
minutes: 10
---

«Todos los finales de torre son tablas», dice un viejo refrán. Es una exageración, pero tiene parte de verdad: la torre es una pieza muy buena defendiendo, y el bando que va mejor necesita conocer unas cuantas reglas para convertir su ventaja.

## Regla 1: la torre, detrás del peón pasado

Es la **regla de Tarrasch**: las torres deben ir **detrás de los peones pasados**, tanto de los propios como de los del rival.

- Detrás de **tu** peón, la torre lo empuja y gana actividad a medida que el peón avanza.
- Detrás del peón **rival**, la torre lo frena desde lejos y, cuanto más avanza el peón, más casillas controla.
- Una torre **delante** del peón pasado (propio) se queda encerrada y sin jugadas útiles.

```tablero
{ "fen": "1r6/5pkp/6p1/P7/8/6P1/5PKP/R7 b - - 0 1", "arrows": [["a1", "a5", "rgba(22,163,74,0.85)"]], "caption": "La torre blanca, detrás de su peón pasado, lo apoya en todo su camino. La torre negra tendrá que bloquearlo desde delante, en una posición pasiva." }
```

```ejercicio
{ "type": "moves", "fen": "1r6/5pkp/6p1/P7/8/6P1/5PKP/3R4 w - - 0 1", "solution": ["d1a1"], "accept": ["a5a6"], "prompt": "Juegan las blancas. Tienes un peón pasado en a5. Coloca la torre en su sitio ideal.", "hint": "Aplica la regla de Tarrasch.", "explanation": "**Ta1!** La torre se coloca detrás del peón pasado y lo apoyará hasta la coronación. La torre negra tendrá que pararlo desde delante (...Ta8) y quedará pasiva. Avanzar enseguida con a6 también es bueno, con la misma idea de Ta1 después." }
```

```ejercicio
{ "type": "moves", "fen": "8/5pkp/6p1/P7/8/6P1/1R3PKP/4r3 b - - 0 1", "solution": ["e1a1"], "orientation": "black", "prompt": "Juegan las **negras**. Las blancas tienen un peón pasado en a5. ¿Dónde debe ir tu torre?", "hint": "La regla de Tarrasch también vale para frenar los peones del rival.", "wrong": { "e1e7": "La torre se queda pasiva: las blancas avanzan el peón con la torre apoyándolo y tu torre tendrá que ponerse delante.", "e1e6": "La torre pierde tiempo: lo correcto es ponerla detrás del peón, donde lo frena desde lejos." }, "explanation": "**...Ta1!** La torre se coloca detrás del peón pasado blanco. Cuanto más avance, más casillas controlará la torre negra, y la torre blanca tendrá que estar pendiente de protegerlo." }
```

## Regla 2: torre activa

Una torre **activa** (que ataca peones, da jaques o corta al rey rival) vale mucho más que una torre pasiva que se limita a defender. Muchas veces compensa **entregar un peón** con tal de activar la torre.

## Regla 3: rey activo

Como en todos los finales, el rey debe acercarse al centro y a los peones. En los finales de torre conviene además **cortar al rey rival** con tu torre: un rey cortado a varias columnas del peón no puede ayudar en la defensa.

```ejercicio
{ "type": "quiz", "prompt": "Según la regla de Tarrasch, ¿dónde deben colocarse las torres respecto a los peones pasados?", "options": ["Delante de ellos", "Detrás de ellos, tanto de los propios como de los del rival", "A su lado, en la misma fila"], "answer": 1, "explanation": "Detrás del peón propio, la torre lo empuja; detrás del peón rival, lo frena. En ambos casos la torre gana actividad a medida que el peón avanza." }
```

```ejercicio
{ "type": "quiz", "prompt": "Estás en un final de torres. Puedes defender un peón con tu torre de forma pasiva o dejarlo caer a cambio de colocar tu torre en la séptima fila, atacando los peones rivales. ¿Qué suele ser mejor?", "options": ["Defender siempre el peón: el material es lo primero", "Activar la torre: en los finales de torre la actividad suele valer más que un peón", "Cambiar las torres cuanto antes"], "answer": 1, "explanation": "Una torre activa crea amenazas constantes y obliga al rival a defenderse. Una torre pasiva solo mira. Por eso los grandes jugadores sacrifican peones para activar la torre." }
```
