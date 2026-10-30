---
title: El sistema Londres, 1.c4 y 1.Cf3
summary: Un plan sencillo contra el Londres (…c5 y …Db6 contra b2) y cómo llevar 1.c4 y 1.Cf3 a terreno conocido.
tags: aperturas, londres, d4, flanco
minutes: 8
---

No todos los rivales jugarán 1.d4 seguido de 2.c4. Muchos jugadores de club usan el **sistema Londres** y otros empiezan con **1.c4** (Inglesa) o **1.Cf3** (Reti). No necesitas aprender mucha teoría nueva: basta con un plan claro.

## El sistema Londres

Las blancas juegan d4, **Af4**, e3, c3, Cf3, Cbd2 y Ad3, casi sin importar lo que hagan las negras. Es una construcción muy sólida, pero tiene un punto flaco: al sacar el alfil de c1 a f4, el **peón de b2** se queda sin defensa.

```tablero
{ "fen": "r1b1kb1r/pp2pppp/1qn2n2/2pp4/3P1B2/2P1P3/PP1N1PPP/R2QKBNR w KQkq - 3 6", "arrows": [["b6", "b2", "rgba(220,38,38,0.85)"], ["c5", "d4", "rgba(220,38,38,0.85)"]], "highlights": ["b2"], "caption": "1.d4 d5 2.Af4 Cf6 3.e3 c5 4.c3 Cc6 5.Cd2 Db6: la presión negra sobre b2 y d4 obliga a las blancas a tomar decisiones incómodas." }
```

Un plan sencillo y eficaz para las negras:

1. **...d5** y **...Cf6** (o ...Cc6).
2. **...c5**, atacando la base d4, como en la Francesa.
3. **...Db6**, atacando b2 y d4 a la vez.
4. Desarrollo con ...e6, ...Ad6 (para cambiar el alfil de f4) y enroque.

```ejercicio
{ "type": "moves", "fen": "rnbqkbnr/ppp1pppp/8/3p4/3P1B2/8/PPP1PPPP/RN1QKBNR b KQkq - 1 2", "solution": ["c7c5"], "accept": ["g8f6"], "engine": false, "prompt": "1.d4 d5 2.Af4. Juega la jugada que **ataca enseguida el centro blanco**.", "hint": "Un peón del flanco de dama ataca d4.", "explanation": "2...c5! golpea d4 antes de que las blancas completen su construcción. Si 3.e3 Cc6 y luego ...Db6, el peón de b2 sufrirá." }
```

```ejercicio
{ "type": "moves", "fen": "r1b1kbnr/pp2pppp/1qn5/2pp4/3P1B2/3BPN2/PPP2PPP/RN1QK2R b KQkq - 4 5", "solution": ["b6b2"], "accept": ["c5c4"], "prompt": "1.d4 d5 2.Af4 c5 3.e3 Cc6 4.Cf3 Db6 5.Ad3?. Las blancas han olvidado defender algo. **Aprovéchalo**.", "hint": "¿Quién defiende el peón de b2?", "explanation": "5...Dxb2! gana un peón y ataca a la vez la torre de a1 y el caballo de b1. También es muy fuerte 5...c4, que gana tiempo contra el alfil y mantiene la amenaza sobre b2. Contra el Londres, **mira siempre b2**." }
```

## Contra 1.c4: la Inglesa

Tienes dos caminos sencillos:

- **1...e5**: una «Siciliana invertida». Juegas como las blancas de una Siciliana, con un tiempo menos, pero con posiciones sanas: ...Cf6, ...Cc6, ...Ab4 o ...d5.
- **1...e6** y **...d5** (o 1...Cf6 y ...e6): si las blancas juegan d4, **transpones al Gambito de Dama Rehusado** que ya conoces.

```ejercicio
{ "type": "quiz", "fen": "rnbqkbnr/pppp1ppp/8/4p3/2P5/8/PP1PPPPP/RNBQKBNR w KQkq - 0 2", "prompt": "¿Cómo se suele llamar la posición tras 1.c4 e5?", "options": ["Siciliana invertida", "Defensa Francesa", "Gambito de Rey"], "answer": 0, "explanation": "Es como una Siciliana (1.e4 c5) pero con los colores cambiados: las blancas tienen el peón en c4 y las negras en e5." }
```

## Contra 1.Cf3

Juega **1...d5** seguido de ...Cf6, ...e6, ...Ae7 y ...O-O. Si las blancas juegan c4 y d4, estarás en un GDR. Si juegan g3, Ag2 y O-O (el esquema Reti o Catalán), tu esquema sigue siendo sólido: completa el desarrollo y prepara **...c5**.

```tablero
{ "fen": "rnbq1rk1/ppp1bppp/4pn2/3p4/8/3P1NP1/PPP1PPBP/RNBQ1RK1 w - - 1 6", "arrows": [["c7", "c5", "rgba(22,163,74,0.85)"]], "caption": "1.Cf3 d5 2.g3 Cf6 3.Ag2 e6 4.O-O Ae7 5.d3 O-O: un esquema sencillo y sólido para las negras. Después llegará ...c5 con un buen centro." }
```

```ejercicio
{ "type": "quiz", "prompt": "Juegas el GDR contra 1.d4. Tu rival abre con 1.Cf3 y sigue con c4 y d4. ¿Qué ocurre?", "options": ["Tienes que aprender una apertura completamente nueva", "Puedes transponer al Gambito de Dama Rehusado jugando ...d5, ...e6 y ...Cf6", "Las negras siempre están peor"], "answer": 1, "explanation": "El orden de jugadas cambia, pero la posición final es la misma. Por eso conviene pensar en esquemas y estructuras, no en listas de jugadas." }
```

## Errores comunes

- Contra el Londres, jugar **pasivamente** y dejar que las blancas completen su esquema ideal con Ce5, f4 y ataque.
- Olvidar que ...Ad6 **cambia el alfil de f4**, la pieza más importante del sistema Londres.
- Contra 1.c4 o 1.Cf3, **ponerse nervioso** por no conocer la teoría: tus principios y tus esquemas bastan.
