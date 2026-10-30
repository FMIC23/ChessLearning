---
title: Piezas activas y piezas pasivas
summary: La actividad de las piezas como ventaja, cómo detectar tu peor pieza y cómo mejorarla con maniobras.
tags: estrategia, actividad, maniobras
minutes: 8
---

Dos posiciones con el mismo material pueden ser muy distintas: lo que cuenta es **lo que hacen** tus piezas. Una pieza **activa** controla muchas casillas, participa en el plan y amenaza cosas. Una pieza **pasiva** está encerrada, defiende algo sin importancia o está lejos de la acción.

## Señales de una pieza activa

- **Caballo**: centralizado, en un puesto avanzado, cerca de las debilidades rivales.
- **Alfil**: en una diagonal larga y abierta, sin sus propios peones delante.
- **Torre**: en una columna abierta o en la séptima fila.
- **Dama**: centralizada, pero sin exponerse a ataques con ganancia de tiempo.
- **Rey**: escondido en el medio juego, **activo y centralizado en el final**.

## La pregunta mágica: ¿cuál es mi peor pieza?

Cuando no sepas qué hacer, busca tu **peor pieza** y piensa cómo mejorarla. Es uno de los consejos más útiles de la estrategia, popularizado por el maestro Silman: **mejora tu peor pieza**.

```tablero
{ "fen": "6k1/pp2bpp1/4pn1p/3pN3/3P4/1P2P2P/PB3PP1/6K1 w - - 0 1", "arrows": [["e5", "c6", "rgba(22,163,74,0.85)"], ["e5", "d7", "rgba(22,163,74,0.85)"]], "highlights": ["b2", "d4"], "caption": "El caballo de e5 es una pieza magnífica. El alfil de b2, en cambio, choca contra su propio peón de d4." }
```

```ejercicio
{ "type": "quiz", "fen": "6k1/pp2bpp1/4pn1p/3pN3/3P4/1P2P2P/PB3PP1/6K1 w - - 0 1", "prompt": "¿Cuál es la **peor pieza** de las blancas?", "options": ["El caballo de e5", "El alfil de b2", "El rey de g1"], "answer": 1, "explanation": "El alfil de b2 está bloqueado por el peón de d4 y no tiene objetivos. Un plan lógico es llevarlo a a3 (o b4 tras a3) para cambiarlo por el alfil negro de e7, que es el que defiende las casillas oscuras." }
```

```ejercicio
{ "type": "squares", "fen": "6k1/pp2bpp1/4pn1p/3pN3/3P4/1P2P2P/PB3PP1/6K1 w - - 0 1", "targets": "moves:b2", "mode": "all", "prompt": "Marca **todas las casillas** a las que puede ir el alfil de b2. Fíjate en lo poco que hace.", "explanation": "Solo a1, c1, a3 y c3. Compáralo con el caballo de e5, que ataca ocho casillas, muchas en campo rival." }
```

## Maniobras: llevar una pieza a su casilla ideal

A veces una pieza necesita **varias jugadas** para llegar a donde es útil. Las maniobras son típicas de las posiciones cerradas. Ya viste una en la Italiana: el caballo de b1 viaja por d2 y f1 hasta g3 o e3.

```tablero
{ "fen": "r1bqr1k1/bpp2pp1/p1np1n1p/4p3/4P3/1BPP1N2/PP3PPP/R1BQRNK1 w - - 0 11", "arrows": [["f1", "g3", "rgba(22,163,74,0.85)"], ["g3", "f5", "rgba(22,163,74,0.85)"]], "caption": "El caballo de f1 está de paso. Desde g3 mirará a f5 y h5, casillas desde las que presionará el enroque negro." }
```

```ejercicio
{ "type": "moves", "fen": "r1bqr1k1/bpp2pp1/p1np1n1p/4p3/4P3/1BPP1N2/PP3PPP/R1BQRNK1 w - - 0 11", "solution": ["f1g3"], "accept": ["f1e3"], "prompt": "El caballo de f1 no hace nada todavía. **Continúa la maniobra** para darle una casilla activa.", "hint": "Desde f1, el caballo puede ir a g3 o a e3.", "explanation": "11.Cg3 (o 11.Ce3): el caballo se acerca a f5 y d5, y el alfil de c1 queda libre para salir. Una maniobra de varias jugadas que transforma una pieza pasiva en una activa." }
```

## La actividad compensa material

Muchas veces es mejor tener una pieza activa que un peón de más. Una torre activa en un final de torres suele valer más que un peón: por eso los maestros prefieren **contraatacar** antes que defender pasivamente.

```ejercicio
{ "type": "quiz", "prompt": "En un final de torres, tu rival amenaza un peón. ¿Qué suele ser mejor?", "options": ["Defenderlo con la torre desde atrás, aunque quede pasiva", "Buscar contraataque con la torre activa, aunque cueste un peón", "Mover el rey hacia la esquina"], "answer": 1, "explanation": "En los finales de torres, la **actividad** es lo más importante. Una torre pasiva atada a la defensa de un peón suele acabar perdiendo." }
```

```ejercicio
{ "type": "quiz", "prompt": "¿Dónde debe estar el rey en el **final**?", "options": ["Escondido en la esquina, como en el medio juego", "Activo y centralizado: en el final es una pieza fuerte que ataca y defiende peones", "Siempre en su casilla inicial"], "answer": 1, "explanation": "Cuando las damas desaparecen ya no hay peligro de mate, y el rey se convierte en una pieza de ataque muy valiosa." }
```
