---
title: Trampas clásicas de apertura
summary: El mate de Legal, el ataque Fegatello, la trampa de Blackburne-Shilling y cómo defenderse del mate del pastor.
tags: aperturas, trampas, tactica
minutes: 10
---

Las trampas de apertura enseñan mucho: casi todas castigan una **violación de los principios** (sacar la dama pronto, comer material sin desarrollarse, olvidar el punto f7...). Conocerlas te sirve para dos cosas: **no caer** y **aprovecharlas** si el rival se equivoca.

Ya has visto dos en las lecciones anteriores: el **Arca de Noé** (Española) y la trampa del **Elefante** (Gambito de Dama). Aquí tienes otras cuatro muy famosas.

## 1. El mate de Legal

Las negras clavan el caballo de f3 contra la dama con ...Ag4. Pero una clavada contra la dama **no es absoluta**: el caballo puede moverse si con ello se gana algo mejor que la dama.

```tablero
{ "fen": "rn1qkbnr/ppp2p1p/3p2p1/4p3/2B1P1b1/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 0 5", "arrows": [["g4", "d1", "rgba(220,38,38,0.85)"], ["f3", "e5", "rgba(22,163,74,0.85)"]], "caption": "1.e4 e5 2.Cf3 d6 3.Ac4 Ag4 4.Cc3 g6?. El caballo de f3 parece clavado." }
```

```ejercicio
{ "type": "moves", "fen": "rn1qkbnr/ppp2p1p/3p2p1/4p3/2B1P1b1/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 0 5", "solution": ["f3e5", "g4d1", "c4f7", "e8e7", "c3d5"], "goal": "mate", "prompt": "Juega el **mate de Legal**: sacrifica la dama y da mate.", "hint": "Rompe la clavada: Cxe5. Si las negras cogen la dama, tus piezas menores dan mate.", "explanation": "5.Cxe5! Axd1? 6.Axf7+ Re7 7.Cd5#. Tres piezas menores dan mate al rey negro. Si las negras no cogen la dama (5...dxe5 6.Dxg4), las blancas simplemente han ganado un peón.", "wrong": { "h2h3": "Normal, pero hay algo mucho más fuerte: el caballo de f3 no está clavado de verdad." } }
```

## 2. El ataque Fegatello (Fried Liver)

En la defensa de los Dos Caballos, si las negras recapturan en d5 con el caballo, el punto f7 se queda sin defensa suficiente.

```ejercicio
{ "type": "moves", "fen": "r1bqkb1r/ppp2ppp/2n5/3np1N1/2B5/8/PPPP1PPP/RNBQK2R w KQkq - 0 6", "solution": ["g5f7"], "accept": ["d2d4"], "prompt": "1.e4 e5 2.Cf3 Cc6 3.Ac4 Cf6 4.Cg5 d5 5.exd5 Cxd5?. Lanza el **ataque Fegatello**.", "hint": "Sacrifica el caballo en f7 para sacar al rey negro al centro.", "explanation": "6.Cxf7! Rxf7 7.Df3+ Re6 8.Cc3: el caballo de d5 está clavado y atacado tres veces, y el rey negro está en medio del tablero. El ataque blanco es muy peligroso. También es muy fuerte 6.d4!, abriendo el centro. Por eso con negras se juega 5...Ca5!" }
```

## 3. La trampa de Blackburne-Shilling

Esta la ponen las negras. Tras 3...Cd4!? (una jugada dudosa que pierde tiempo), las blancas ven el peón de e5 «gratis»...

```tablero
{ "fen": "r1bqkbnr/pppp1ppp/8/4N3/2BnP3/8/PPPP1PPP/RNBQK2R b KQkq - 0 4", "arrows": [["d8", "g5", "rgba(22,163,74,0.85)"], ["g5", "g2", "rgba(220,38,38,0.85)"], ["g5", "e5", "rgba(220,38,38,0.85)"]], "caption": "1.e4 e5 2.Cf3 Cc6 3.Ac4 Cd4 4.Cxe5?. Las blancas se han comido el peón. Error." }
```

```ejercicio
{ "type": "moves", "fen": "r1bqkbnr/pppp1ppp/8/4N3/2BnP3/8/PPPP1PPP/RNBQK2R b KQkq - 0 4", "solution": ["d8g5", "e5f7", "g5g2", "h1f1", "g2e4", "c4e2", "d4f3"], "goal": "mate", "prompt": "Juegan negras. Castiga 4.Cxe5? con la **trampa de Blackburne-Shilling**: ataque doble y, si las blancas siguen comiendo, mate.", "hint": "La dama ataca a la vez el caballo de e5 y el peón de g2.", "explanation": "4...Dg5! ataca e5 y g2. Si 5.Cxf7? Dxg2 6.Tf1 Dxe4+ 7.Ae2 Cf3#: el rey blanco está rodeado por sus propias piezas y el caballo da mate. La mejor defensa blanca era 5.Axf7+, devolviendo material." }
```

## 4. El mate del pastor... y cómo evitarlo

El «mate del pastor» (1.e4 e5 2.Dh5 Cc6 3.Ac4 Cf6?? 4.Dxf7#) es la primera trampa que aprende todo el mundo. La amenaza es **Dxf7#**, porque f7 solo está defendido por el rey.

```ejercicio
{ "type": "moves", "fen": "r1bqkbnr/pppp1ppp/2n5/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR b KQkq - 3 3", "solution": ["g7g6"], "accept": ["d8e7"], "prompt": "1.e4 e5 2.Dh5 Cc6 3.Ac4. Juegan negras: las blancas amenazan **Dxf7#**. Defiéndete de la mejor forma.", "hint": "Puedes atacar a la dama a la vez que tapas su camino a f7.", "explanation": "3...g6! ataca a la dama y corta la diagonal h5-f7. Después llegarán ...Cf6 y ...Ag7 **con ganancia de tiempo**: la dama blanca salió demasiado pronto y ahora tendrá que volver a moverse. 3...De7 también defiende.", "wrong": { "g8f6": "¡Mate! 4.Dxf7#. El caballo ataca a la dama, pero no defiende f7." } }
```

```ejercicio
{ "type": "quiz", "prompt": "¿Qué tienen en común casi todas las trampas de apertura?", "options": ["Solo funcionan contra principiantes que no saben mover las piezas", "Castigan errores de principios: comer material sin desarrollarse, sacar la dama pronto, descuidar f7/f2 o confiar en clavadas que no son absolutas", "Siempre las ponen las blancas"], "answer": 1, "explanation": "Si respetas los principios y antes de comer algo te preguntas «¿qué quiere mi rival?», caerás en muy pocas trampas." }
```
