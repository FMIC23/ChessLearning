---
title: Eliminación del defensor
summary: Captura la pieza que defiende algo importante y lo que protegía caerá.
tags: eliminacion del defensor, tactica
minutes: 10
---

A veces una pieza o casilla rival solo tiene **un defensor**. Si **capturas a ese defensor** (aunque te cueste un cambio o incluso material), lo que protegía queda indefenso.

La idea se parece a la desviación, pero aquí no obligas a la pieza a moverse: **la eliminas directamente**.

```tablero
{ "fen": "r4rk1/pp3ppp/5n2/6BQ/8/3B4/PP3PPP/6K1 w - - 0 1", "arrows": [["d3", "h7"], ["h5", "h7"], ["f6", "h7", "rgba(220,38,38,0.85)"]], "caption": "El caballo de f6 es el único defensor de h7. Si desaparece, Dxh7 será mate." }
```

Pasos para encontrar esta táctica:

1. Localiza un **objetivo**: una pieza valiosa o una casilla de mate.
2. Cuenta sus **defensores**. Si solo hay uno, ¡apunta hacia él!
3. Busca cómo **capturarlo**, aunque tengas que dar algo de material.

```ejercicio
{ "type": "moves", "fen": "r4rk1/pp3ppp/5n2/6BQ/8/3B4/PP3PPP/6K1 w - - 0 1", "solution": ["g5f6"], "prompt": "**Elimina al defensor** de h7.", "hint": "¿Qué pieza negra impide Dxh7#?", "explanation": "Axf6! elimina el caballo y amenaza Dxh7#. Si 1...gxf6, 2.Dxh7# es mate; las negras pierden una pieza y quedan con el rey destrozado." }
```

```ejercicio
{ "type": "moves", "fen": "2r2rk1/pp3ppp/5n2/3b2B1/8/2N5/PP3PPP/2R1R1K1 w - - 0 1", "solution": ["g5f6"], "prompt": "El alfil de d5 solo tiene un defensor. **Elimínalo** y gana material.", "hint": "¿Quién defiende el alfil de d5?", "explanation": "Axf6! elimina el caballo que defendía d5. Si 1...gxf6, 2.Cxd5 gana el alfil; si el alfil se va, las blancas se quedan con una pieza de más." }
```

```ejercicio
{ "type": "moves", "fen": "r3r1k1/ppq2ppp/8/8/8/8/PP2QPPP/4R1K1 w - - 0 1", "solution": ["e2e8", "a8e8", "e1e8"], "goal": "mate", "prompt": "La torre de e8 defiende la última fila. **Elimínala**, aunque cueste la dama.", "hint": "La última fila negra no tiene escapatoria.", "explanation": "1.Dxe8+! Txe8 2.Txe8#. La dama elimina al defensor de la octava fila y la torre da el mate del pasillo." }
```

```ejercicio
{ "type": "moves", "fen": "3q1rk1/pp3ppp/5n2/8/4N2Q/3B4/PP3PPP/6K1 w - - 0 1", "solution": ["e4f6", "g7f6", "h4h7"], "goal": "mate", "prompt": "Mate en **dos**. Empieza eliminando al defensor de h7 **con jaque**.", "hint": "Tu caballo puede capturar en f6.", "explanation": "1.Cxf6+! (si 1...Dxf6 o 1...gxf6, 2.Dxh7#; si 1...Rh8, 2.Dxh7# igualmente). El caballo de f6 era lo único que defendía h7." }
```

```ejercicio
{ "type": "quiz", "prompt": "¿Cuál es la diferencia principal entre la **desviación** y la **eliminación del defensor**?", "options": ["En la eliminación capturas al defensor; en la desviación lo obligas a moverse", "En la desviación siempre se sacrifica la dama", "Son exactamente lo mismo"], "answer": 0, "explanation": "En los dos casos el objetivo se queda sin defensa, pero el método cambia: capturar el defensor o forzarle a irse." }
```
