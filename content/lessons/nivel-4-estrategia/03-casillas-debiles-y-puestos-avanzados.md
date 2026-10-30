---
title: Casillas débiles y puestos avanzados
summary: Agujeros que ningún peón puede defender, puestos avanzados para tus caballos y las casillas débiles alrededor del rey.
tags: estrategia, casillas-debiles, puestos-avanzados
minutes: 9
---

Una **casilla débil** (o **agujero**) es una casilla que **ya no puede ser defendida por ningún peón**. Como los peones no retroceden, esa debilidad es permanente: el rival puede instalar allí una pieza sin miedo a que la expulsen.

## El puesto avanzado

Cuando una casilla débil del rival está en su mitad del tablero y además la apoya uno de tus peones, se convierte en un **puesto avanzado**. Es el sitio ideal para un **caballo**: desde allí ataca casillas profundas del campo rival y no hay forma de echarlo con peones.

```tablero
{ "fen": "rn1q1rk1/1p2bppp/p2pbn2/4p3/4P3/1NN1B3/PPP1BPPP/R2Q1RK1 w - - 6 10", "arrows": [["c3", "d5", "rgba(22,163,74,0.85)"], ["e4", "d5", "rgba(22,163,74,0.85)"]], "highlights": ["d5"], "caption": "La casilla d5 en la Najdorf: no hay peón negro en c y el de e5 ya pasó de largo. Ningún peón negro podrá atacar nunca d5." }
```

```ejercicio
{ "type": "squares", "fen": "rn1q1rk1/1p2bppp/p2pbn2/4p3/4P3/1NN1B3/PPP1BPPP/R2Q1RK1 w - - 6 10", "targets": ["d5"], "prompt": "Marca el **puesto avanzado** de las blancas: la casilla del campo negro que ningún peón negro puede atacar y que tu peón de e4 apoya.", "explanation": "d5. Las negras la vigilan con piezas (el caballo de f6 y el alfil de e6), y por eso en estas posiciones se lucha tanto por esa casilla: las blancas intentan cambiar esos defensores para instalar un caballo en d5." }
```

Fíjate en lo que ocurre en la partida: las negras defienden d5 con piezas, así que las blancas intentan **cambiar los defensores** de d5. Por ejemplo, con un alfil en g5 que cambie el caballo de f6.

```ejercicio
{ "type": "moves", "fen": "rn1q1rk1/1p2bppp/p2pbn2/4p1B1/4P3/1NN5/PPP1BPPP/R2Q1RK1 w - - 6 10", "solution": ["g5f6"], "prompt": "Las negras defienden d5 con el caballo de f6 y el alfil de e6. **Elimina uno de los defensores** de la casilla d5.", "hint": "Tu alfil de g5 puede capturar a un defensor.", "explanation": "10.Axf6! Axf6 y ahora el caballo de f6 ya no vigila d5. El plan blanco es Cd5, a4-a5 y dejar a las negras con un alfil de casillas oscuras pasivo, encerrado por sus peones de d6 y e5. Cambiar un alfil por un caballo está justificado cuando así **conquistas una casilla clave**." }
```

## Casillas débiles alrededor del rey

Cuando un bando mueve los peones de su enroque, aparecen agujeros cerca de su rey. El caso típico es el **fianchetto sin su alfil**: si las negras juegan ...g6 y luego cambian el alfil de g7, las casillas **f6 y h6** quedan sin defensa de peones.

```tablero
{ "fen": "r2q1rk1/pp1b1p1p/2npp1p1/8/3NP3/4B3/PPPQ1PPP/2KR3R w - - 0 1", "arrows": [["d2", "h6", "rgba(220,38,38,0.85)"], ["e3", "h6", "rgba(220,38,38,0.85)"]], "highlights": ["f6", "h6"], "caption": "El alfil negro de g7 ha desaparecido. f6 y h6 son agujeros y las piezas blancas apuntan hacia ellos." }
```

```ejercicio
{ "type": "squares", "fen": "r2q1rk1/pp1b1p1p/2npp1p1/8/3NP3/4B3/PPPQ1PPP/2KR3R w - - 0 1", "targets": ["f6", "h6"], "mode": "all", "prompt": "Marca las **dos casillas de la sexta fila**, junto al enroque negro, que ya ningún peón negro puede defender.", "hint": "Piensa en qué casillas controlaba el peón de g7 antes de avanzar a g6.", "explanation": "f6 y h6. El peón de g7 las defendía; al jugar ...g6, y sin el alfil de casillas oscuras, quedan como agujeros permanentes." }
```

```ejercicio
{ "type": "moves", "fen": "r2q1rk1/pp1b1p1p/2npp1p1/8/3NP3/4B3/PPPQ1PPP/2KR3R w - - 0 1", "solution": ["e3h6"], "accept": ["d4b5"], "prompt": "Aprovecha la debilidad de las casillas oscuras: **ocupa uno de los agujeros** con ganancia de tiempo.", "hint": "Tu alfil puede saltar a la casilla débil atacando una torre.", "explanation": "1.Ah6! ocupa el agujero y ataca a la torre de f8. Las negras pierden la calidad o tienen que mover la torre, y entonces la dama blanca llegará a h6 con un ataque muy peligroso sobre el rey." }
```

## Cómo evitar crear casillas débiles

- No muevas los peones de tu enroque **sin necesidad**.
- Si haces fianchetto, **cuida tu alfil**: es el guardián de las casillas que dejaste.
- Antes de avanzar un peón, mira qué casillas **deja de controlar** para siempre.

```ejercicio
{ "type": "quiz", "prompt": "¿Qué pieza aprovecha mejor un puesto avanzado?", "options": ["La torre, porque es la más fuerte", "El caballo, porque desde una casilla central protegida ataca muchas casillas y no lo pueden expulsar", "El rey, porque necesita estar en el centro"], "answer": 1, "explanation": "Un caballo en un puesto avanzado puede ser más fuerte que una torre. Los alfiles también lo aprovechan, pero el caballo, de corto alcance, es el que más necesita casillas avanzadas y seguras." }
```
