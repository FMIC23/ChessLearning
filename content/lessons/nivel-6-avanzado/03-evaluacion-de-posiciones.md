---
title: Evaluación de posiciones
summary: Material, actividad, seguridad del rey, estructura e iniciativa. Cómo decidir quién está mejor y por qué.
tags: evaluacion, estrategia
minutes: 11
---

Evaluar una posición es responder a dos preguntas: **¿quién está mejor?** y **¿por qué?** La segunda es la importante, porque te dice qué plan seguir. Los grandes jugadores repasan siempre los mismos factores.

## Los cinco factores

| Factor | Qué preguntarte |
|---|---|
| **Material** | ¿Quién tiene más? ¿Hay pareja de alfiles? |
| **Seguridad del rey** | ¿Algún rey está expuesto o le faltan defensores? |
| **Actividad de las piezas** | ¿Qué piezas están bien colocadas y cuáles no hacen nada? |
| **Estructura de peones** | ¿Hay peones débiles (aislados, doblados, retrasados)? ¿Peones pasados? |
| **Iniciativa** | ¿Quién marca el ritmo con amenazas? |

Los tres últimos se llaman factores **estáticos** o **dinámicos** según duren mucho o poco: una estructura de peones dura toda la partida; la iniciativa, si no se aprovecha, desaparece en pocas jugadas.

> El material es el factor más fácil de contar, pero **no siempre el más importante**. Un rey en peligro o una pieza enterrada pueden valer más que un peón… o que una torre.

```tablero
{ "fen": "4kb1r/p2n1ppp/4q3/4p1B1/4P3/1Q6/PPP2PPP/2KR4 w k - 0 16", "arrows": [["b3", "b8"], ["d1", "d8"]], "caption": "Morphy contra el duque de Brunswick y el conde Isouard (París, 1858). Las negras tienen más material, pero sus piezas no se han desarrollado y su rey sigue en el centro." }
```

```ejercicio
{ "type": "quiz", "fen": "4kb1r/p2n1ppp/4q3/4p1B1/4P3/1Q6/PPP2PPP/2KR4 w k - 0 16", "prompt": "Juegan las blancas. Las negras tienen dama, torre, alfil y caballo; las blancas, dama, torre y alfil. ¿Cómo evalúas la posición?", "options": ["Ventaja negra: tienen más material", "Igualdad: el material se compensa con el desarrollo", "Ganan las blancas: la actividad y el rey negro en el centro deciden"], "answer": 2, "explanation": "Las blancas dan mate en dos: **Db8+!!** Cxb8 **Td8#**. La torre negra de h8 y el alfil de f8 no participan, y el rey está atrapado en el centro. La **actividad** y la **seguridad del rey** valen más que el material." }
```

```ejercicio
{ "type": "moves", "fen": "4kb1r/p2n1ppp/4q3/4p1B1/4P3/1Q6/PPP2PPP/2KR4 w k - 0 16", "solution": ["b3b8", "d7b8", "d1d8"], "goal": "mate", "prompt": "Demuéstralo: juegan las blancas y **dan mate en dos**.", "hint": "Desvía al caballo de d7, que es lo único que tapa la columna d.", "explanation": "**Db8+!!** Cxb8 **Td8#**. La torre, protegida por el alfil de g5, da mate. Así terminó la «partida de la ópera»." }
```

```ejercicio
{ "type": "quiz", "fen": "8/p7/1p3k2/8/PP2K3/8/8/8 w - - 0 1", "prompt": "Final de peones con material igualado. Juegan las blancas. ¿Qué factor decide la evaluación?", "options": ["La estructura: las blancas tienen los peones más avanzados", "La actividad del rey: el blanco está centralizado y llega antes a los peones", "Ninguno: con material igualado es tablas"], "answer": 1, "explanation": "Tras **Rd5!** el rey blanco entra en c6 y se come los peones del flanco de dama antes de que llegue el rey negro. En los finales, la **actividad del rey** suele ser el factor decisivo." }
```

```ejercicio
{ "type": "quiz", "fen": "8/8/4k3/2b5/4P3/3BK3/8/8 w - - 0 1", "prompt": "Las blancas tienen un peón de más. ¿Cuál es la evaluación correcta?", "options": ["Ventaja decisiva blanca", "Tablas: con alfiles de distinto color el peón no puede avanzar", "Ventaja negra"], "answer": 1, "explanation": "El alfil negro controla e5, la casilla por la que debe pasar el peón, y el rey negro bloquea. El material dice «+1», pero la **naturaleza de la posición** dice tablas." }
```

```ejercicio
{ "type": "moves", "fen": "r3kb1r/pp1q1p1p/6p1/8/4N3/8/PPP2PPP/R2QKB1R w KQkq - 0 1", "solution": ["e4f6"], "prompt": "Juegan las blancas. Tienes dos jugadas forzantes: **Dxd7+** y **Cf6+**. Calcula ambas y **evalúa la posición final** de cada una antes de elegir.", "hint": "En una de ellas solo cambias damas; en la otra ganas material.", "wrong": { "d1d7": "Tras Dxd7+ Rxd7 solo has cambiado damas y no ganas nada más." }, "explanation": "**Cf6+!** es un **ataque doble** al rey y a la dama: tras ...Re7, Cxd7 (o Dxd7+) y ganas la dama. Con Dxd7+ Rxd7 simplemente se cambian las damas. Dos jugadas parecidas, dos evaluaciones finales muy distintas." }
```
