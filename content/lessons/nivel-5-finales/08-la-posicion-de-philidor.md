---
title: La posición de Philidor
summary: La defensa clave de los finales de torre: torre en la tercera fila y, cuando avance el peón, jaques por detrás.
tags: finales, finales de torre, philidor
minutes: 10
---

Si la posición de Lucena enseña a ganar, la de **Philidor** (1777) enseña a **defender** el final de torre y peón contra torre. Es una de las defensas más útiles que existen: salva muchísimas partidas.

## La defensa de Philidor

Condiciones: el rey defensor está **en la casilla de coronación** (o delante del peón) y el peón todavía no ha llegado a la sexta fila.

1. Pon tu torre en **tu tercera fila** (la sexta para las negras). Así el rey rival **no puede avanzar** a esa fila sin recibir jaques.
2. Espera con la torre en esa fila. Si el rival quiere avanzar el rey, tiene que empujar antes el peón.
3. **En cuanto el peón llegue a la sexta fila**, lleva la torre a **tu primera fila** y empieza a dar **jaques por detrás**. El rey atacante ya no puede esconderse delante de su peón.

```tablero
{ "fen": "4k3/7R/1r6/3KP3/8/8/8/8 b - - 0 1", "arrows": [["b6", "h6", "rgba(22,163,74,0.85)"]], "highlights": ["b6", "e8"], "caption": "La posición de Philidor: la torre negra en la sexta fila impide que el rey blanco avance. Tablas." }
```

```tablero
{ "fen": "4k3/7R/1r2P3/3K4/8/8/8/8 b - - 0 1", "arrows": [["b6", "b1"]], "caption": "El peón ha avanzado a e6: ahora el rey blanco no tiene dónde esconderse de los jaques. ...Tb1 y jaques por detrás." }
```

```ejercicio
{ "type": "quiz", "fen": "4k3/7R/8/3KP3/8/8/8/1r6 b - - 0 1", "orientation": "black", "prompt": "Juegan las negras. Según el método de Philidor, ¿dónde debe colocarse la torre negra?", "options": ["En la sexta fila: ...Tb6", "En la octava fila: ...Tb8", "Dando jaques desde d1"], "answer": 0, "explanation": "**...Tb6!** La torre corta al rey blanco en la quinta fila. Si las blancas juegan e6 para ganar espacio, la torre baja a b1 y da jaques por detrás." }
```

```ejercicio
{ "type": "moves", "fen": "1r2k3/7R/4P3/3K4/8/8/8/8 w - - 0 1", "solution": ["h7h8"], "prompt": "Las negras han defendido mal: su torre se ha quedado pasiva en la octava fila. Juegan las blancas. **Castiga el error**.", "hint": "La torre negra y el rey negro están en la misma fila.", "explanation": "**Th8+!** es una **enfilada**: el rey negro tiene que moverse y las blancas capturan la torre de b8. Por eso la torre del defensor debe estar activa, no encerrada en la última fila." }
```

```ejercicio
{ "type": "quiz", "fen": "4k3/7R/1r2P3/3K4/8/8/8/8 b - - 0 1", "orientation": "black", "prompt": "Juegan las negras. El peón blanco acaba de llegar a e6. ¿Qué jugada sigue el método de Philidor?", "options": ["...Tb1, para dar jaques por detrás", "...Tb8, para proteger la octava fila", "...Txe6, para eliminar el peón"], "answer": 0, "explanation": "**...Tb1!** y jaques por detrás: el rey blanco no tiene refugio, porque el peón ya no le tapa. Con ...Tb8? las blancas ganan con Th8+ (enfilada), y ...Txe6?? regala la torre tras Rxe6." }
```

```ejercicio
{ "type": "play", "fen": "4k3/7R/1r6/3KP3/8/8/8/8 b - - 0 1", "goal": "draw", "maxMoves": 20, "orientation": "black", "prompt": "Juegas con **negras**. Aplica la defensa de Philidor (torre en la sexta fila y, si el peón avanza, jaques por detrás) y **haz tablas**." }
```
