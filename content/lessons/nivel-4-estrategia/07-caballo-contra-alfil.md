---
title: Caballo contra alfil
summary: Cuándo es mejor el caballo y cuándo el alfil: posiciones abiertas y cerradas, puestos avanzados y peones en los dos flancos.
tags: estrategia, alfiles, caballos
minutes: 8
---

Alfil y caballo valen más o menos lo mismo (unos 3 peones), pero son piezas **muy diferentes**. Saber cuál es mejor en cada posición te ayudará a decidir qué cambios hacer.

## Las virtudes de cada pieza

| Alfil | Caballo |
|---|---|
| Largo alcance: cruza el tablero de una jugada | Corto alcance: lento para cambiar de flanco |
| Solo controla casillas de un color | Controla casillas de los dos colores |
| Le gustan las posiciones **abiertas** | Le gustan las posiciones **cerradas** |
| Muy bueno con peones en **los dos flancos** | Necesita **puestos avanzados** (casillas fijas y protegidas) |
| Sufre si sus peones están en su color | Puede saltar por encima de los peones |

## El caballo bueno contra el alfil malo

Este es el escenario soñado para el caballo: posición cerrada, un puesto avanzado en el centro y el alfil rival bloqueado por sus propios peones.

```tablero
{ "fen": "8/4bkpp/p2p4/1p1Np3/4P3/1P3K2/P4PPP/8 w - - 0 1", "arrows": [["d5", "c7", "rgba(22,163,74,0.85)"], ["d5", "b6", "rgba(22,163,74,0.85)"]], "highlights": ["d5", "d6", "e5"], "caption": "El caballo de d5 es intocable y ataca casillas profundas. El alfil de e7 está encerrado por los peones negros de d6 y e5, en casillas oscuras como él." }
```

```ejercicio
{ "type": "quiz", "fen": "8/4bkpp/p2p4/1p1Np3/4P3/1P3K2/P4PPP/8 w - - 0 1", "prompt": "¿Quién está mejor en este final?", "options": ["Las blancas: su caballo es mucho más activo que el alfil negro", "Las negras: el alfil siempre es mejor que el caballo", "Está igualado: el material es el mismo"], "answer": 0, "explanation": "Con material igual, la calidad de las piezas decide. El caballo de d5 domina y el alfil de e7 solo puede defender. Las blancas tienen una ventaja clara." }
```

```ejercicio
{ "type": "squares", "fen": "8/4bkpp/p2p4/1p1Np3/4P3/1P3K2/P4PPP/8 w - - 0 1", "targets": "moves:d5", "mode": "all", "prompt": "Marca **todas las casillas** a las que puede saltar el caballo de d5.", "explanation": "b4, b6, c3, c7, e3, e7, f4 y f6: ocho casillas, varias en el campo negro. Fíjate en que desde c7 atacaría el peón de a6 y el de b5." }
```

```ejercicio
{ "type": "moves", "fen": "8/4bkpp/p2p4/1p1Np3/4P3/1P3K2/P4PPP/8 w - - 0 1", "solution": ["d5c7"], "accept": ["d5b4"], "prompt": "El alfil negro no puede defender los peones del flanco de dama. **Usa el caballo para ganar un peón**.", "hint": "Busca una casilla desde la que el caballo ataque a6 y b5 a la vez.", "explanation": "1.Cc7! ataca a6 y b5. El alfil negro no llega a defender las casillas claras y las blancas ganan un peón. 1.Cb4 también gana el peón de a6. El alfil malo es incapaz de proteger peones en casillas de color contrario al suyo." }
```

## Cuando el alfil es mejor

En posiciones **abiertas** y con **peones en los dos flancos**, el alfil suele ser superior: llega a todas partes rápidamente, mientras que el caballo tarda varias jugadas en cambiar de flanco.

```tablero
{ "fen": "8/p4pk1/6p1/8/2b5/8/P4PPP/1N4K1 w - - 0 1", "arrows": [["c4", "a2", "rgba(220,38,38,0.85)"], ["c4", "f1"]], "caption": "Peones en los dos flancos y posición abierta: el alfil negro ataca a2 y vigila el otro flanco a la vez. El caballo de b1 es lento y pasivo." }
```

```ejercicio
{ "type": "quiz", "prompt": "Tienes alfil contra caballo y la posición es muy **abierta**, con peones en ambos flancos. ¿Qué te conviene?", "options": ["Cerrar la posición con tus peones", "Mantenerla abierta y crear objetivos en los dos flancos", "Cambiar tu alfil por el caballo"], "answer": 1, "explanation": "El alfil brilla en posiciones abiertas porque puede atacar y defender en ambos flancos a la vez. Si cierras la posición, ayudas al caballo." }
```

## Resumen práctico

- ¿Posición **cerrada** y puestos avanzados? Prefiere el **caballo**.
- ¿Posición **abierta** y peones en ambos flancos? Prefiere el **alfil**.
- ¿Tienes la **pareja de alfiles**? En posiciones abiertas es una ventaja considerable: evita cambiar uno sin motivo.
