---
title: El mate del pastor
summary: La trampa más famosa de la apertura y cómo defenderte de ella.
tags: apertura, mate
minutes: 8
---

El **mate del pastor** es un mate rápido contra el punto **f7** (o f2, si juegas con blancas). Ese peón es el más débil al principio porque **solo lo defiende el rey**.

La idea es atacar f7 con la **dama y el alfil** a la vez: 1.e4 e5 2.Ac4 Cc6 3.Dh5 Cf6?? 4.Dxf7#.

```tablero
{ "fen": "r1bqkb1r/pppp1Qpp/2n2n2/4p3/2B1P3/8/PPPP1PPP/RNB1K1NR b KQkq - 0 4", "arrows": [["c4", "f7"]], "highlights": ["f7"], "caption": "Mate del pastor: la dama captura en f7 protegida por el alfil. El rey negro no puede capturarla ni huir." }
```

## Cómo defenderte

Cuando veas la dama y el alfil apuntando a f7, **defiende ese punto** o **tapa el ataque**:

- Tras 3.Dh5, juega **3...g6** (atacando a la dama) o **3...De7** (defendiendo f7 y e5).
- Si la dama vuelve a amenazar con 4.Df3, juega **4...Cf6**: tapa la columna f y desarrolla una pieza.

Luego aprovecha que el rival ha sacado la dama pronto: desarrolla tus piezas **atacándola** para ganar tiempo.

```ejercicio
{ "type": "moves", "fen": "r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 4 4", "solution": ["h5f7"], "goal": "mate", "prompt": "Las negras se han descuidado. Da **jaque mate** en una jugada.", "explanation": "Dxf7#: la dama, protegida por el alfil de c4, da mate. El rey no puede capturarla y no tiene casillas." }
```

```ejercicio
{ "type": "moves", "fen": "r1bqkbnr/pppp1ppp/2n5/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR b KQkq - 3 3", "solution": ["g7g6"], "accept": ["d8e7", "d8f6", "g8h6"], "prompt": "Juegan las **negras**. Las blancas amenazan **Dxf7#**. Defiéndete.", "hint": "Puedes atacar a la dama o defender f7 con la tuya.", "wrong": { "g8f6": "¡Dxf7 mate! El caballo ataca a la dama, pero no defiende f7." }, "explanation": "3...g6 echa a la dama de h5. También valen 3...De7, 3...Df6 y 3...Ch6, que defienden f7." }
```

```ejercicio
{ "type": "moves", "fen": "r1bqkbnr/pppp1p1p/2n3p1/4p3/2B1P3/5Q2/PPPP1PPP/RNB1K1NR b KQkq - 1 4", "solution": ["g8f6"], "accept": ["d8f6", "d8e7", "g8h6"], "prompt": "Juegan las **negras**. La dama ha vuelto a apuntar a f7. Defiéndete **desarrollando una pieza**.", "hint": "Una pieza puede ponerse en medio de la columna f.", "wrong": { "d7d6": "¡Dxf7 mate! No has defendido f7.", "f8g7": "¡Dxf7 mate! No has defendido f7." }, "explanation": "4...Cf6 tapa la columna f, desarrolla el caballo y amenaza con ...Cd4 atacando a la dama. ¡Las negras ya están mejor! (4...Ch6, 4...Df6 y 4...De7 también defienden.)" }
```

```ejercicio
{ "type": "quiz", "prompt": "Al principio de la partida, ¿qué pieza defiende el peón de f7?", "options": ["La dama", "Solo el rey", "El caballo de g8"], "answer": 1, "explanation": "Solo el rey defiende f7 (y f2 en el bando blanco). Por eso es el punto favorito de los ataques rápidos." }
```

```ejercicio
{ "type": "quiz", "prompt": "Tu rival intenta el mate del pastor pero te defiendes bien. ¿Quién suele estar mejor después?", "options": ["Quien intentó el mate, porque tiene la dama activa", "Quien se defendió, porque ganará tiempo atacando a la dama", "Están exactamente igual"], "answer": 1, "explanation": "Sacar la dama tan pronto rompe los principios de apertura: tus piezas se desarrollarán atacándola y ganarás tiempo." }
```
