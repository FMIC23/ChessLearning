---
title: Defender posiciones difíciles
summary: Jaque perpetuo, ahogado, fortalezas y contraataque. Cómo salvar partidas que parecen perdidas.
tags: defensa, tablas, perpetuo
minutes: 11
---

Todos los jugadores pasan por posiciones malas. Los buenos defensores no se rinden: **buscan recursos** y ponen problemas al rival en cada jugada. Muchas partidas «perdidas» acaban en tablas o incluso en victoria porque el rival se relaja.

## Recursos defensivos

- **Jaque perpetuo**: si el rey rival no puede escapar de tus jaques, la partida es tablas por repetición.
- **Ahogado**: con muy poco material, intenta quedarte sin jugadas legales. Una torre «loca» que da jaques sin parar es un recurso clásico: si la capturan, es ahogado.
- **Fortaleza**: una posición en la que, aunque el rival tenga más material, no puede penetrar. Recuerda el alfil del color equivocado o los alfiles de distinto color.
- **Contraataque**: a veces la mejor defensa es crear tus propias amenazas para que el rival no tenga tiempo de ejecutar las suyas.
- **Cambiar a un final de tablas teóricas**: conocer los finales (Philidor, peón de torre…) te dice a qué posición tienes que llegar.

## La actitud

- **No te precipites**: el defensor tiene que ser paciente.
- **Pon problemas**: elige las jugadas que obligan al rival a encontrar la única buena.
- **Busca el mejor resultado posible**: si la victoria ya no es posible, juega por las tablas con toda tu energía.

```tablero
{ "fen": "6k1/6p1/8/8/8/8/qr4PP/4Q2K w - - 0 1", "arrows": [["e1", "e8"], ["e8", "h5"]], "caption": "Las blancas tienen una torre menos y están perdidas… salvo que encuentren un jaque perpetuo entre e8 y h5." }
```

```ejercicio
{ "type": "moves", "fen": "6k1/6p1/8/8/8/8/qr4PP/4Q2K w - - 0 1", "solution": ["e1e8", "g8h7", "e8h5", "h7g8", "h5e8"], "prompt": "Juegan las blancas, con una torre de menos. **Salva la partida.**", "hint": "El rey negro no tiene refugio: busca una serie de jaques que se repita.", "wrong": { "h2h3": "Demasiado pasivo: las negras consolidan con ...Tb1 y ganan.", "e1g1": "Pasivo: las negras cambian damas o siguen atacando y ganan con la torre de más." }, "explanation": "**De8+** Rh7 **Dh5+** Rg8 **De8+**: el rey negro solo puede ir de g8 a h7 y viceversa. Es un **jaque perpetuo** y la partida termina en tablas por repetición." }
```

```ejercicio
{ "type": "moves", "fen": "7k/5Q2/6K1/8/8/8/8/2r5 b - - 0 1", "solution": ["c1g1", "g6h5", "g1g5", "h5h4", "g5g4"], "orientation": "black", "prompt": "Juegan las **negras**, que están a punto de recibir mate. Su rey no tiene ninguna jugada. ¿Puedes aprovecharlo? **Haz tablas.**", "hint": "Si tu torre desaparece, no te quedará ninguna jugada legal…", "wrong": { "c1c6": "Tras Rf5 el rey blanco escapa de los jaques y las negras quedan perdidas.", "c1c4": "¡Df8#! Necesitas dar jaque en cada jugada." }, "explanation": "**...Tg1+** Rh5 **...Tg5+** Rh4 **...Tg4+**: es la **torre loca**. Si el blanco la captura (Rxg4), el rey negro no tiene jugadas y es **ahogado**. Si no la captura, la torre sigue dando jaques. ¡Tablas!" }
```

```ejercicio
{ "type": "quiz", "prompt": "¿Qué es una **fortaleza** en ajedrez?", "options": ["Un enroque con todos los peones sin mover", "Una posición defensiva en la que el rival no puede progresar aunque tenga más material", "Un ataque con muchas piezas contra el rey"], "answer": 1, "explanation": "En una fortaleza el bando débil mantiene una barrera que el rival no puede romper: por ejemplo, el rey en la esquina contra el alfil del color equivocado y el peón de torre." }
```

```ejercicio
{ "type": "quiz", "prompt": "Estás peor y tu rival prepara un ataque lento en el flanco de rey. Tienes la posibilidad de abrir una columna en el flanco de dama, donde está su rey. ¿Qué principio defensivo aplica?", "options": ["Defenderse pasivamente con todas las piezas en el flanco de rey", "El contraataque: crear amenazas propias para que el rival no tenga tiempo de atacar", "Ofrecer tablas"], "answer": 1, "explanation": "Una defensa puramente pasiva acaba cediendo. Si creas amenazas reales contra el rey rival, tu adversario tendrá que dedicar jugadas a defenderse y su ataque perderá fuerza." }
```

```ejercicio
{ "type": "play", "fen": "6k1/6p1/8/8/8/8/qr4PP/4Q2K w - - 0 1", "goal": "draw", "maxMoves": 10, "prompt": "Juega contra el ordenador con una torre de menos y **consigue las tablas** con el jaque perpetuo." }
```
