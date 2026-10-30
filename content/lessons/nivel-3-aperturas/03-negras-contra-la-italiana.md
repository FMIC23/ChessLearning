---
title: Con negras contra la Italiana
summary: Cómo responder con 1...e5 a la Italiana: ...Ac5 y ...Cf6, la liberación ...d5 y la defensa de los Dos Caballos.
tags: aperturas, italiana, e5
minutes: 10
---

Con negras, contra 1.e4 vamos a jugar **1...e5**: la respuesta más clásica y sana. Tras 2.Cf3 Cc6 3.Ac4 tienes dos jugadas naturales:

- **3...Ac5**: el Giuoco Piano. Simétrico y sólido.
- **3...Cf6**: la defensa de los Dos Caballos. Más activa: contraataca el peón de e4.

## Objetivos de las negras

1. **Mantener el peón de e5** o, si cae el centro, contraatacarlo.
2. **Liberarse con ...d5** en cuanto sea posible: es la ruptura clave de las negras en casi todas las líneas.
3. **Vigilar f7**, el punto débil, sobre todo mientras el rey siga en e8.

## Contra el plan c3-d4

Tras 4.c3 Cf6 5.d4 exd4 6.cxd4, el jaque **6...Ab4+** es la respuesta típica: el alfil sale con ganancia de tiempo y, tras 7.Ad2 Axd2+ 8.Cbxd2, las negras golpean el centro.

```ejercicio
{ "type": "moves", "fen": "r1bqk2r/pppp1ppp/2n2n2/8/2BPP3/5N2/PP1N1PPP/R2QK2R b KQkq - 0 8", "solution": ["d7d5"], "accept": ["f6e4"], "prompt": "Juegan negras (1.e4 e5 2.Cf3 Cc6 3.Ac4 Ac5 4.c3 Cf6 5.d4 exd4 6.cxd4 Ab4+ 7.Ad2 Axd2+ 8.Cbxd2). **Golpea el centro blanco**.", "hint": "La ruptura liberadora de las negras en la Italiana.", "explanation": "8...d5! rompe el centro: tras 9.exd5 Cxd5 las negras tienen buen juego y las blancas se quedan con un **peón aislado** en d4. También es posible 8...Cxe4, que lleva a posiciones parecidas.", "wrong": { "e8g8": "Enrocar es natural, pero permite 9.d5 y las blancas ganan espacio. Primero hay que golpear el centro." } }
```

Si las blancas empujan **6.e5** en lugar de cambiar, la respuesta es la misma idea: atacar el centro.

```ejercicio
{ "type": "moves", "fen": "r1bqk2r/pppp1ppp/2n2n2/2b1P3/2Bp4/2P2N2/PP3PPP/RNBQK2R b KQkq - 0 6", "solution": ["d7d5"], "prompt": "Tras 4.c3 Cf6 5.d4 exd4 6.e5, el caballo de f6 está atacado. ¿Cuál es la mejor respuesta?", "hint": "No hace falta retirar el caballo: contraataca.", "explanation": "6...d5! ataca al alfil de c4. Tras 7.Ab5 Ce4, el caballo está muy bien situado en el centro y las negras están cómodas.", "wrong": { "f6e4": "6...Ce4? permite 7.Ad5!, con gran ventaja blanca.", "f6g4": "El caballo queda descolocado en g4. La respuesta temática es ...d5." } }
```

## Contra el Pianissimo (4.d3)

Si las blancas juegan despacio con d3, las negras también pueden ir despacio:

- **...d6, ...O-O, ...a6 y ...Aa7**: el alfil se esconde en a7 para que no lo cambien con Ca4 o d4.
- **...h6**: evita la clavada Ag5.
- **...Ce7-g6**: el caballo se recoloca hacia el flanco de rey.
- La ruptura **...d5** sigue siendo el objetivo cuando esté bien preparada.

```tablero
{ "fen": "r1bq1rk1/bpp2ppp/p1np1n2/4p3/4P3/1BPP1N2/PP1N1PPP/R1BQR1K1 b - - 3 9", "arrows": [["a7", "f2"], ["h7", "h6", "rgba(22,163,74,0.85)"]], "highlights": ["a7"], "caption": "Esquema típico del Pianissimo: el alfil en a7 sigue apuntando a f2 y no se le puede atacar con peones. ...h6 evita Ag5." }
```

```ejercicio
{ "type": "quiz", "fen": "r1bq1rk1/bpp2ppp/p1np1n2/4p3/4P3/1BPP1N2/PP1N1PPP/R1BQR1K1 b - - 3 9", "prompt": "¿Por qué las negras han jugado ...a6 y ...Aa7?", "options": ["Para atacar al rey blanco con el peón de a", "Para conservar el alfil: en a7 no lo pueden atacar con b4 o d4 ni cambiar fácilmente", "Porque el alfil estaba atacado por el peón de c3"], "answer": 1, "explanation": "En c5 el alfil podría ser atacado con d4 o b4. En a7 sigue presionando f2 sin que lo molesten." }
```

## La defensa de los Dos Caballos y el peligro de Cg5

Con **3...Cf6** contraatacas e4, pero tienes que conocer la respuesta agresiva **4.Cg5**, que ataca f7 con caballo y alfil. La defensa correcta es **4...d5!** y, tras 5.exd5, **5...Ca5!**, atacando al alfil.

```tablero
{ "fen": "r1bqkb1r/pppp1ppp/2n2n2/4p1N1/2B1P3/8/PPPP1PPP/RNBQK2R b KQkq - 5 4", "arrows": [["g5", "f7", "rgba(220,38,38,0.85)"], ["c4", "f7", "rgba(220,38,38,0.85)"], ["d7", "d5", "rgba(22,163,74,0.85)"]], "caption": "4.Cg5 amenaza Cxf7, ganando la dama y la torre. 4...d5! tapa la diagonal del alfil." }
```

```ejercicio
{ "type": "moves", "fen": "r1bqkb1r/pppp1ppp/2n2n2/4p1N1/2B1P3/8/PPPP1PPP/RNBQK2R b KQkq - 5 4", "solution": ["d7d5", "e4d5", "c6a5"], "prompt": "Juegan negras tras 4.Cg5. Defiende f7 como un profesional (dos jugadas).", "hint": "Primero corta la diagonal del alfil; después, ataca al alfil.", "explanation": "4...d5 5.exd5 Ca5! El caballo ataca al alfil de c4 y las negras sacrifican un peón a cambio de desarrollo rápido. **Ojo:** 5...Cxd5? permite el famoso ataque **Fegatello** (6.Cxf7!).", "wrong": { "f8c5": "4...Ac5 es la arriesgada variante Traxler. Mucho más sólida es 4...d5.", "d8e7": "No defiende bien: 5.Axf7+ gana un peón y deja al rey negro expuesto." } }
```

## Errores comunes con negras

- Jugar pasivamente (...d6, ...h6, ...a6) **sin preparar nunca ...d5**.
- Olvidar la debilidad de **f7** y permitir Cg5 con ataque doble.
- Dejar el alfil en c5 cuando las blancas pueden jugar d4 con ganancia de tiempo.
- Enrocar **antes** de reaccionar en el centro cuando las blancas ya amenazan d5 o e5.
