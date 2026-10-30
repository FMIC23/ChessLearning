---
title: Cómo pensar una jugada
summary: Un proceso sencillo de cuatro pasos para elegir tus jugadas sin despistes.
tags: estrategia, tactica
minutes: 10
---

Elegir una jugada no es adivinar. Los buenos jugadores siguen, casi sin darse cuenta, un **proceso** parecido a este:

## 1. ¿Qué quiere el rival?

Mira su última jugada. ¿Qué ataca? ¿Qué amenaza hacer en la siguiente? Si hay una amenaza seria, quizá tengas que atenderla antes que nada.

## 2. Busca jugadas forzadas: jaques, capturas y amenazas

Repasa, en este orden, **todos tus jaques, todas tus capturas y tus amenazas**. Son las jugadas que obligan al rival a responder, y ahí se esconden casi todas las combinaciones.

## 3. Elige candidatas y compáralas

Escoge dos o tres jugadas que te parezcan buenas. Para cada una, piensa la mejor respuesta del rival. Si no hay nada forzado, busca **mejorar tu peor pieza** o seguir los principios (desarrollo, centro, seguridad del rey).

## 4. Comprobación final

Antes de tocar la pieza: **¿deja algo colgado?, ¿permite un jaque o una captura peligrosa?** Este último vistazo evita la mayoría de los errores graves.

```tablero
{ "fen": "r4rk1/ppp2ppp/2n4B/8/3Q4/8/PPP2PPP/6K1 w - - 0 1", "arrows": [["c6", "d4", "rgba(220,38,38,0.85)"], ["d4", "g7"]], "caption": "El caballo ataca tu dama (paso 1)... pero antes de huir, busca tus jaques (paso 2)." }
```

```ejercicio
{ "type": "moves", "fen": "r4rk1/ppp2ppp/2n4B/8/3Q4/8/PPP2PPP/6K1 w - - 0 1", "solution": ["d4g7"], "goal": "mate", "prompt": "Tu dama está atacada por el caballo. Antes de retirarla, **busca un jaque**.", "hint": "La dama y el alfil de h6 apuntan al mismo punto.", "wrong": { "d4g4": "La dama está a salvo, pero te has perdido un mate en una jugada.", "d4e4": "La dama está a salvo, pero te has perdido un mate en una jugada." }, "explanation": "Dxg7#: la dama, protegida por el alfil, da mate. Quien solo piensa en defenderse no lo ve: por eso se buscan siempre **primero los jaques**." }
```

```ejercicio
{ "type": "quiz", "prompt": "¿En qué orden conviene revisar las jugadas forzadas?", "options": ["Amenazas, capturas, jaques", "Jaques, capturas, amenazas", "Da igual el orden"], "answer": 1, "explanation": "Los jaques son las jugadas más forzantes (el rival tiene que responder sí o sí), después las capturas y, por último, las amenazas." }
```

```ejercicio
{ "type": "quiz", "prompt": "Has encontrado una jugada que te gusta mucho. ¿Qué haces antes de jugarla?", "options": ["La juego rápido, antes de que se me olvide", "Compruebo qué jaques, capturas y amenazas tendrá el rival después", "Busco una jugada todavía más bonita"], "answer": 1, "explanation": "La comprobación final es el paso que más partidas salva. Un segundo de revisión vale más que cualquier idea brillante." }
```

```ejercicio
{ "type": "quiz", "fen": "r1bqkbnr/pppp1ppp/2n5/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR b KQkq - 3 3", "prompt": "Juegan las negras. ¿Qué **amenazan** las blancas?", "options": ["Dxh7, ganando un peón", "Dxf7#, jaque mate", "Nada en especial"], "answer": 1, "explanation": "La dama y el alfil atacan f7, defendido solo por el rey: Dxf7 sería mate. Ver esta amenaza (paso 1) es más urgente que cualquier plan." }
```

```ejercicio
{ "type": "squares", "fen": "r3k2r/ppp2ppp/2n5/3b4/6n1/2N2Q2/PPP2PPP/R3K2R b KQkq - 0 1", "targets": ["f3"], "prompt": "Juegan las negras. Aplica el paso 2: ¿cuál es la pieza blanca **más valiosa** que puede capturar el alfil de d5? Marca su casilla.", "explanation": "Axf3 captura la dama blanca. Buscar las capturas, incluso las que parecen imposibles, es parte del proceso." }
```
