---
title: Con negras contra 1.d4, el Gambito de Dama Rehusado
summary: ...d5, ...e6, ...Cf6, ...Ae7: una defensa sólida. Cómo liberarse con ...dxc4 y ...Cd5, las rupturas ...c5 y ...e5, y la trampa del Elefante.
tags: aperturas, gambito-de-dama, d4
minutes: 11
---

Contra **1.d4** vamos a jugar una de las defensas más sólidas de la historia: el **Gambito de Dama Rehusado** (GDR). Tras 1.d4 d5 2.c4, las blancas ofrecen el peón de c4 para desviar al peón de d5 del centro. Las negras lo **rehúsan** con **2...e6**, manteniendo el punto fuerte d5.

```ejercicio
{ "type": "moves", "fen": "rnbqkbnr/ppp1pppp/8/3p4/2PP4/8/PP2PPPP/RNBQKBNR b KQkq - 0 2", "solution": ["e7e6"], "engine": false, "prompt": "1.d4 d5 2.c4. Juega la jugada del **Gambito de Dama Rehusado**.", "hint": "Defiende d5 con un peón y abre la diagonal de tu alfil de rey.", "explanation": "2...e6 apoya d5 con un peón y prepara ...Cf6, ...Ae7 y el enroque. El precio: el alfil de c8 queda encerrado detrás de e6. Ese será el gran problema a resolver.", "wrong": { "d5c4": "2...dxc4 es el Gambito de Dama Aceptado, una apertura correcta, pero no es la que vamos a jugar: entregas el centro a cambio de recuperar el peón más tarde." } }
```

## El esquema de las negras

Las negras juegan **...d5, ...e6, ...Cf6, ...Ae7, ...O-O** y, muchas veces, **...Cbd7** y **...c6**. Es un esquema muy sólido: no hay debilidades y el rey estará seguro.

```tablero
{ "fen": "r1bq1rk1/pppnbppp/4pn2/3p2B1/2PP4/2N1PN2/PP3PPP/R2QKB1R w KQ - 3 7", "arrows": [["c8", "e6", "rgba(220,38,38,0.85)"], ["c7", "c5", "rgba(22,163,74,0.85)"], ["e6", "e5", "rgba(22,163,74,0.85)"]], "caption": "La variante ortodoxa: 1.d4 d5 2.c4 e6 3.Cc3 Cf6 4.Ag5 Ae7 5.e3 O-O 6.Cf3 Cbd7. El alfil de c8 está encerrado; las rupturas ...c5 y ...e5 lo liberarán." }
```

## Objetivos de cada bando

- **Blancas**: presionar d5 (con c4, Cc3, Ag5 que clava al caballo defensor), ganar espacio y aprovechar que las negras están algo **apretadas**.
- **Negras**: aguantar d5, enrocar y luego **liberarse** con una de estas dos rupturas:
  - **...c5**: ataca el centro blanco por el flanco de dama.
  - **...e5**: abre la diagonal del alfil de c8, el «alfil malo» del GDR.

## La maniobra liberadora de Capablanca

Cuando las blancas han gastado un tiempo (por ejemplo, con Tc1 y Ad3), las negras pueden cambiar en c4 para que el alfil blanco pierda otro tiempo, y después **cambiar piezas** con ...Cd5. Con menos piezas, la falta de espacio molesta mucho menos.

```ejercicio
{ "type": "moves", "fen": "r1bq1rk1/pp1nbppp/2p1pn2/6B1/2BP4/2N1PN2/PP3PPP/2RQK2R b K - 0 9", "solution": ["f6d5"], "accept": ["a7a6", "h7h6", "c6c5"], "prompt": "7.Tc1 c6 8.Ad3 dxc4 9.Axc4. Juega la jugada de **Capablanca**: cambia piezas para liberar tu posición.", "hint": "Un caballo salta al centro y ofrece cambiar el alfil de e7 por el de g5.", "explanation": "9...Cd5! Tras 10.Axe7 Dxe7 11.O-O Cxc3 12.Txc3, las negras juegan **...e5** y el alfil de c8 por fin respira. Cambiar piezas es la mejor medicina cuando tienes poco espacio." }
```

## La variante del cambio y el ataque de minorías

Si las blancas cambian pronto con **cxd5 exd5**, la estructura cambia: las negras tienen peones en c6, d5 (y a7, b7) y las blancas en a2, b2 y d4. Las blancas suelen lanzar el **ataque de minorías**: b4-b5 para crear una debilidad en c6. Lo estudiarás a fondo en el nivel de estrategia.

```tablero
{ "fen": "r1bqrnk1/pp2bppp/2p2n2/3p2B1/3P4/2NBPN2/PPQ2PPP/1R3RK1 b - - 9 11", "arrows": [["b2", "b4", "rgba(22,163,74,0.85)"], ["b4", "b5", "rgba(22,163,74,0.85)"], ["f8", "g6"]], "caption": "Variante del cambio: las blancas preparan b4-b5 (ataque de minorías). Las negras buscan juego en el flanco de rey con ...Cg6 y ...Ce4." }
```

```ejercicio
{ "type": "quiz", "prompt": "En el GDR, ¿qué pieza negra suele ser la más difícil de activar?", "options": ["El caballo de g8", "El alfil de c8, encerrado por el peón de e6", "La torre de h8"], "answer": 1, "explanation": "Por eso las rupturas ...e5 (que abre su diagonal) y ...b6 con ...Ab7 son tan importantes para las negras." }
```

## La trampa del Elefante

Con el caballo en d7 parece que el caballo de f6 está clavado y que las blancas pueden ganar el peón de d5. ¡Es una trampa!

```ejercicio
{ "type": "moves", "fen": "r1bqkb1r/pppn1ppp/5n2/3N2B1/3P4/8/PP2PPPP/R2QKBNR b KQkq - 0 6", "solution": ["f6d5", "g5d8", "f8b4", "d1d2", "b4d2", "e1d2", "e8d8"], "prompt": "1.d4 d5 2.c4 e6 3.Cc3 Cf6 4.Ag5 Cbd7 5.cxd5 exd5 6.Cxd5??. Las blancas creen que el caballo de f6 está clavado. **Demuestra que no**.", "hint": "Si las blancas cogen tu dama, tienes un jaque con el alfil...", "explanation": "6...Cxd5! 7.Axd8 Ab4+ 8.Dd2 Axd2+ 9.Rxd2 Rxd8: las negras ganan una pieza. El caballo de f6 **no estaba clavado de verdad**, porque el jaque en b4 recupera la dama." }
```

## Errores comunes con negras

- Jugar **...dxc4 demasiado pronto** sin poder mantener el centro: las blancas ocupan el centro con e4.
- Quedarse **sin rupturas**: si nunca juegas ...c5 ni ...e5, te asfixiarás.
- Olvidar el **alfil de c8**: piensa siempre en cómo lo vas a activar (...e5, ...b6 y ...Ab7, o ...dxc4 y ...e5).
