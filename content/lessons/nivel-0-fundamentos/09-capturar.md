---
title: Capturar y defender
summary: Cómo se capturan piezas y por qué hay que fijarse en si una pieza está defendida.
tags: material
minutes: 6
---

**Capturar** consiste en mover una pieza a la casilla ocupada por una pieza rival, que se retira del tablero. Capturar no es obligatorio, y al rey nunca se le captura: se le da jaque mate.

## Piezas defendidas y piezas «colgadas»

Una pieza está **defendida** si, cuando la capturan, puedes recuperar material capturando a la pieza que la ha comido. Una pieza atacada y **sin defensa** se llama **pieza colgada**: el rival puede ganarla gratis.

```tablero
{ "fen": "6k1/5ppp/2p5/3n3b/8/8/8/3QK3 w - - 0 1", "arrows": [["c6", "d5", "rgba(22,163,74,0.85)"], ["d1", "h5"]], "caption": "El caballo de d5 está defendido por el peón de c6. El alfil de h5 está colgado." }
```

Antes de capturar, pregúntate siempre: **«¿Me pueden recapturar?»**

```ejercicio
{ "type": "moves", "fen": "6k1/5ppp/2p5/3n3b/8/8/8/3QK3 w - - 0 1", "solution": ["d1h5"], "prompt": "Tu dama puede capturar dos piezas. Captura la que está **colgada**.", "wrong": { "d1d5": "¡Cuidado! El caballo está defendido por el peón de c6: después de cxd5 pierdes la dama." }, "explanation": "El alfil de h5 no tiene defensa: lo ganas gratis." }
```

```ejercicio
{ "type": "moves", "fen": "4r1k1/5ppp/8/8/4N3/B7/5PPP/6K1 b - - 0 1", "solution": ["e8e4"], "prompt": "Juegan las **negras**. Gana una pieza.", "explanation": "El caballo de e4 no está defendido: la torre lo captura gratis." }
```

```ejercicio
{ "type": "quiz", "prompt": "¿Qué es una «pieza colgada»?", "options": ["Una pieza que ya ha sido capturada", "Una pieza atacada que no está defendida", "Una pieza que no se puede mover"], "answer": 1, "explanation": "Dejar piezas colgadas es el error más frecuente de los principiantes. ¡Revisa siempre qué piezas tuyas están atacadas!" }
```
