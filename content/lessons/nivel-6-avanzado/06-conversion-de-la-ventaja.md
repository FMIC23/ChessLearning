---
title: Convertir la ventaja
summary: Ganar una posición ganada no es automático. La técnica para transformar la ventaja en victoria sin dar opciones al rival.
tags: estrategia, conversion, tecnica
minutes: 10
---

«Lo más difícil de ganar es una partida ganada». Seguro que te ha pasado: vas con una pieza de más, te relajas… y el rival encuentra un ataque, un jaque perpetuo o un ahogado. Convertir la ventaja es una **técnica** que se aprende.

## Las reglas de la conversión

1. **Primero, la seguridad.** Antes de buscar más, elimina el **contrajuego** del rival: protege tu rey, cubre tus piezas sueltas, para sus peones pasados.
2. **Cambia piezas, no peones.** Con ventaja material, cada cambio de piezas acerca el final, donde tu ventaja es más grande. Los peones, en cambio, son los que te permiten coronar.
3. **Cambia sobre todo las piezas activas del rival.** La dama rival es la que puede dar jaque perpetuo: ofrece su cambio.
4. **No te precipites.** No hace falta ganar en la siguiente jugada. Mejora tus piezas, y solo después pasa a la acción. Capablanca decía: «cuando tengas ventaja, no te apresures».
5. **Principio de las dos debilidades.** Si una sola debilidad rival no basta para ganar, crea una segunda en el otro flanco: el defensor no podrá cubrir ambas.

```tablero
{ "fen": "6k1/1b4pp/8/8/8/2Q5/5qPP/R6K w - - 0 1", "arrows": [["f2", "g2", "rgba(220,38,38,0.85)"], ["b7", "g2", "rgba(220,38,38,0.85)"]], "caption": "Las blancas tienen torre contra alfil, pero las negras amenazan ...Dxg2#. Antes de pensar en ganar, hay que neutralizar ese contrajuego." }
```

```ejercicio
{ "type": "moves", "fen": "6k1/1b4pp/8/8/8/2Q5/5qPP/R6K w - - 0 1", "solution": ["c3b3", "f2f7", "b3f7"], "prompt": "Juegan las blancas, con una calidad de ventaja. Las negras amenazan mate en g2. Encuentra la forma más **limpia** de convertir la ventaja.", "hint": "Busca un jaque que obligue a cambiar las damas.", "wrong": { "a1g1": "Defiende g2, pero tu torre queda pasiva y la dama negra sigue molestando. Hay algo mejor.", "c3h3": "Defiende el peón de g2, pero no elimina la dama negra, la pieza más peligrosa del rival." }, "explanation": "**Db3+!** obliga a ...Df7 (si el rey se aparta, las blancas ganan todavía más: tras ...Rf8, Dxb7 elimina el alfil que apoyaba el mate, y tras ...Rh8 hay incluso mate con Ta8+) y tras **Dxf7+** Rxf7 queda un final de torre contra alfil sin ningún contrajuego. Después llegará Ta7, atacando el alfil y los peones. Cambiar la dama rival es la manera más segura de ganar." }
```

```ejercicio
{ "type": "quiz", "prompt": "Tienes una pieza de más en el medio juego. ¿Qué cambios te convienen?", "options": ["Cambiar peones, para abrir la posición", "Cambiar piezas, sobre todo las más activas del rival", "No cambiar nada hasta dar mate"], "answer": 1, "explanation": "Cada cambio de piezas reduce el contrajuego del rival y hace más evidente tu ventaja. Con menos piezas en el tablero, una pieza de más es decisiva. Conserva los peones: son tu fuente de nuevas damas." }
```

```ejercicio
{ "type": "quiz", "prompt": "Tu rival defiende bien una debilidad en el flanco de dama y no consigues avanzar. ¿Qué dice el **principio de las dos debilidades**?", "options": ["Que debes atacar esa debilidad con más piezas", "Que debes crear una segunda debilidad en el otro flanco para que el defensor no pueda cubrir ambas", "Que la posición es tablas"], "answer": 1, "explanation": "Una sola debilidad suele poder defenderse. Pero si atacas alternativamente dos puntos alejados, las piezas defensoras no llegan a tiempo a ambos lados y la defensa se rompe." }
```

```ejercicio
{ "type": "play", "fen": "6k1/5pp1/7p/8/8/8/5PPP/3R2K1 w - - 0 1", "goal": "promote", "maxMoves": 40, "prompt": "Tienes una torre de más. Aplica la técnica: activa la torre y el rey, gana peones y **corona un peón**." }
```
