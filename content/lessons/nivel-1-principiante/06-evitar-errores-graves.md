---
title: Evitar errores graves
summary: Piezas colgadas y amenazas olvidadas: la rutina que te evita perder partidas tontas.
tags: material, defensa
minutes: 10
---

La mayoría de las partidas entre principiantes no las gana quien juega mejor, sino quien **comete menos errores graves**: dejar una pieza colgada o no ver una amenaza del rival.

## La rutina de comprobación

Cada vez que el rival mueva, antes de pensar en tu plan, pregúntate:

1. **¿Qué amenaza su última jugada?** ¿Ataca alguna pieza? ¿Prepara un mate?
2. **¿Tengo piezas colgadas?** Repasa tus piezas: ¿alguna está atacada y sin defensa?
3. **¿Tiene él piezas colgadas?** ¡A veces el rival te regala material!

Y antes de mover, comprueba tu jugada: **¿qué jaques, capturas y amenazas tendrá el rival después?**

```tablero
{ "fen": "r3k2r/ppp2ppp/2n5/3b4/6n1/2N2Q2/PPP2PPP/R3K2R w KQkq - 0 1", "arrows": [["c3", "d5"], ["f3", "g4"]], "caption": "Dos piezas negras atacadas y sin defensa: el alfil de d5 y el caballo de g4." }
```

```ejercicio
{ "type": "squares", "fen": "r3k2r/ppp2ppp/2n5/3b4/6n1/2N2Q2/PPP2PPP/R3K2R w KQkq - 0 1", "targets": ["d5", "g4"], "mode": "all", "prompt": "Marca las piezas negras **colgadas** (atacadas por las blancas y sin ninguna defensa).", "explanation": "El alfil de d5 (atacado por el caballo y la dama) y el caballo de g4 (atacado por la dama) no tienen defensa. El caballo de c6 está defendido por el peón de b7." }
```

```ejercicio
{ "type": "moves", "fen": "r1bqk2r/pppp1ppp/2n5/2b1p3/2B1P1n1/3P4/PPP2PPP/RNBQK1NR w KQkq - 0 5", "solution": ["d1g4"], "prompt": "El rival acaba de dejar una pieza **colgada**. Aprovéchalo.", "hint": "Mira qué piezas negras están atacadas y sin defensa.", "wrong": { "c4f7": "El jaque es tentador, pero tras Rxf7 solo has cambiado alfil por peón. Hay algo mejor." }, "explanation": "Dxg4 gana un caballo entero: nadie lo defendía." }
```

```ejercicio
{ "type": "moves", "fen": "r1b2rk1/ppp2ppp/2nb4/8/2B4q/2NP4/PPP2PPP/R1BQ1RK1 w - - 0 1", "solution": ["g2g3"], "accept": ["f2f4"], "prompt": "¡Atención! Las negras amenazan algo muy grave. **Descúbrelo y defiéndete**.", "hint": "Mira la casilla h2: ¿cuántas piezas negras la atacan?", "wrong": { "c4f7": "Rxf7 y la amenaza sigue ahí: Dxh2 es mate.", "h2h3": "Tras Axh3 tu enroque queda destrozado." }, "explanation": "Las negras amenazaban **Dxh2#** (dama apoyada por el alfil de d6). 1.g3 tapa la diagonal del alfil y ataca a la dama. También servía 1.f4." }
```

```ejercicio
{ "type": "quiz", "prompt": "El rival acaba de mover. ¿Qué deberías preguntarte **primero**?", "options": ["¿Cuál es mi mejor ataque?", "¿Qué amenaza su jugada?", "¿Cuántos puntos de material tengo?"], "answer": 1, "explanation": "Si no ves lo que amenaza el rival, tu plan dará igual: perderás material o recibirás mate." }
```

```ejercicio
{ "type": "quiz", "fen": "5rk1/1p3ppp/8/3Q4/7q/8/5PPP/R5K1 w - - 0 1", "prompt": "Tu dama puede comer en b7 o en f7. ¿Qué captura es un **error grave**?", "options": ["Dxb7", "Dxf7+", "Las dos son buenas"], "answer": 1, "explanation": "El peón de f7 está defendido por la torre y el rey: tras Dxf7+ Txf7 pierdes la dama. El de b7 no tiene defensa." }
```
