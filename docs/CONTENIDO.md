# Guía para escribir contenido didáctico

Todo el contenido vive en `content/`, separado del código. No hace falta tocar TypeScript para añadir lecciones, problemas o aperturas.

```
content/
├── lessons/
│   ├── nivel-0-fundamentos/
│   │   ├── level.json            # metadatos del nivel
│   │   ├── 01-el-tablero.md      # lecciones: el prefijo numérico fija el orden
│   │   └── ...
│   └── nivel-1-principiante/ ...
├── puzzles/                      # banco de problemas tácticos (JSON)
└── openings/                     # repertorio de aperturas (JSON)
```

## Niveles (`level.json`)

```json
{
  "id": "fundamentos",
  "number": 0,
  "title": "Fundamentos",
  "subtitle": "De cero a jugar tu primera partida",
  "description": "Texto que aparece en la tarjeta del nivel.",
  "icon": "♙"
}
```

Un nivel se desbloquea cuando el anterior está completado al menos al 80 %.

## Lecciones (`NN-slug.md`)

Cada lección es un archivo Markdown con un **frontmatter** sencillo (`clave: valor`, una por línea):

```markdown
---
title: La torre
summary: La torre se mueve en línea recta por filas y columnas.
tags: piezas
minutes: 5
---

Texto en **Markdown** (títulos `##`, listas, tablas, citas `>`...).
```

- `title` (obligatorio), `summary`, `minutes` (duración aproximada) y `tags` (separadas por comas; se usan para detectar puntos débiles).
- El identificador de la lección es `<id del nivel>/<nombre del archivo sin número>`, por ejemplo `fundamentos/la-torre`. **No cambies el nombre de un archivo publicado**: se perdería el progreso guardado de esa lección.

La lección se muestra **por pasos**: el alumno ve la teoría hasta el primer ejercicio y no avanza hasta resolverlo.

### Diagramas: bloque `tablero`

````markdown
```tablero
{ "fen": "8/8/8/8/3R4/8/8/8 w - - 0 1", "arrows": [["d4", "d8"], ["d4", "h4", "rgba(220,38,38,0.85)"]], "highlights": ["d4"], "caption": "Pie de figura" }
```
````

- `fen`: posición. Se admiten posiciones didácticas **sin reyes**.
- `arrows`: flechas `[origen, destino, color opcional]`.
- `highlights`: casillas resaltadas.
- `orientation`: `"white"` (por defecto) o `"black"`.

### Ejercicios: bloque `ejercicio`

El contenido es **JSON estricto** (comillas dobles, sin comas finales). Los textos `prompt`, `explanation` y `hint` admiten Markdown.

#### 1. Jugadas (`moves`)

````markdown
```ejercicio
{
  "type": "moves",
  "fen": "6k1/5ppp/8/8/8/8/5PPP/R5K1 w - - 0 1",
  "solution": ["a1a8"],
  "goal": "mate",
  "prompt": "Da **jaque mate** en una jugada.",
  "hint": "El rey está encerrado por sus peones.",
  "explanation": "Ta8#: el mate del pasillo.",
  "wrong": { "a1a7": "Mensaje específico para este error." }
}
```
````

- `solution`: jugadas en UCI (`e2e4`, `e7e8q`) o SAN inglés (`Nf3`). El alumno juega las posiciones 1, 3, 5... y la app responde automáticamente con las posiciones 2, 4... **Debe terminar con una jugada del alumno** (longitud impar).
- Juega el bando al que le toca mover según el FEN.
- `accept`: primeras jugadas alternativas también correctas (ejercicios de una jugada).
- `goal: "mate"`: en la última jugada se acepta **cualquier** mate.
- `wrong`: mensajes para errores típicos (clave en UCI o SAN).
- `engine: false`: omite la verificación con Stockfish (jugadas didácticas que no son la mejor objetivamente, o posiciones donde hay varias jugadas igual de buenas).

#### 2. Casillas (`squares`)

```json
{ "type": "squares", "fen": "8/8/8/8/3N4/8/8/8 w - - 0 1", "targets": "moves:d4", "mode": "all", "highlights": ["d4"], "prompt": "Marca las casillas del caballo." }
```

- `targets`: lista de casillas (`["e4", "d5"]`) o `"moves:<casilla>"` para usar las jugadas legales de la pieza de esa casilla.
- `mode`: `"all"` (marcar todas) u `"one"` (basta una). Por defecto, `"one"` si solo hay un objetivo.
- `fen` es opcional (tablero vacío por defecto).

#### 3. Test (`quiz`)

```json
{ "type": "quiz", "prompt": "¿Qué pieza puede saltar?", "options": ["Torre", "Caballo", "Alfil"], "answer": 1, "explanation": "...", "fen": "opcional" }
```

`answer` es el índice (desde 0) de la opción correcta.

#### 4. Práctica contra el ordenador (`play`)

```json
{ "type": "play", "fen": "8/8/8/4k3/8/8/8/3QK3 w - - 0 1", "goal": "mate", "maxMoves": 20, "prompt": "Da mate con rey y dama." }
```

- `goal`: `"mate"`, `"promote"` (coronar un peón), `"win"` (ventaja decisiva) o `"draw"` (aguantar las tablas).
- `maxMoves`: jugadas máximas del alumno. Stockfish defiende con la mejor jugada.
- La posición debe ser legal (con ambos reyes).

## Estilo

- Español de España, tuteando al alumno, frases cortas y claras.
- Notación española en los textos: R, D, T, A, C (`Cf3`, `Axe5`, `O-O`). En `solution` usa siempre UCI.
- Cada lección: teoría breve, 1–3 diagramas y 3–6 ejercicios variados. Explica **ideas**, no solo jugadas.

## Validación

```bash
npm run validate:content            # estructura, FEN y legalidad de todas las soluciones
npm run validate:content -- --engine # además, comprueba con Stockfish que cada solución es la mejor jugada
```

Los tests (`npm test`) también validan la estructura de todo el contenido, así que un error en un JSON hace fallar la CI.

## Problemas tácticos (`content/puzzles/*.json`)

Cada archivo contiene un **array** de problemas:

```json
[
  {
    "id": "p-pasillo-001",
    "fen": "6k1/5ppp/8/8/8/8/5PPP/R5K1 w - - 0 1",
    "moves": ["a1a8"],
    "rating": 500,
    "themes": ["mateIn1", "backRankMate"],
    "title": "El pasillo",
    "hint": "El rey negro no tiene casillas de escape.",
    "explanation": "Ta8#: los propios peones encierran al rey.",
    "source": "propio"
  }
]
```

- `moves`: UCI, alternando alumno y rival; empieza el alumno y termina el alumno (número impar).
- Con `"opponentFirst": true` el primer movimiento es del rival (formato de la base de Lichess): la app lo reproduce y luego empieza el alumno.
- `rating`: dificultad en escala Elo (400–2600). La app elige problemas cercanos a tu puntuación.
- `themes`: claves compatibles con Lichess (`fork`, `pin`, `skewer`, `discoveredAttack`, `doubleCheck`, `deflection`, `attraction`, `sacrifice`, `capturingDefender`, `hangingPiece`, `trappedPiece`, `backRankMate`, `smotheredMate`, `mateIn1`, `mateIn2`, `mateIn3`, `promotion`, `endgame`, `zwischenzug`, `clearance`, `interference`, `xRayAttack`, `quietMove`, `defensiveMove`...). Si un tema empieza por `mate`, en la última jugada se acepta cualquier mate.

### Importar la base de datos de Lichess

La base de problemas de Lichess es libre (CC0). Descarga `lichess_db_puzzle.csv.zst` de <https://database.lichess.org/#puzzles>, descomprímela y ejecuta:

```bash
npm run puzzles:import -- --input lichess_db_puzzle.csv --count 2000 --min 600 --max 2400
```

Se genera `content/puzzles/lichess.json` con una selección equilibrada por dificultad y tema.

## Aperturas (`content/openings/*.json`)

Un archivo por apertura. El repertorio se escribe como **líneas** que la app fusiona en un árbol de variantes:

```json
{
  "id": "italiana",
  "name": "Apertura Italiana",
  "eco": "C50",
  "color": "white",
  "group": "Con blancas: 1.e4",
  "summary": "Desarrollo rápido y presión sobre f7.",
  "ideas": ["El alfil de c4 apunta a **f7**...", "Plan c3 y d4..."],
  "plans": "Texto Markdown opcional con planes y estructuras.",
  "lines": [
    {
      "name": "Giuoco Piano: c3 y d4",
      "moves": "e4 e5 Nf3 Nc6 Bc4 Bc5 c3 Nf6 d4 exd4 cxd4 Bb4+ Bd2",
      "comments": { "5": "El alfil apunta a f7.", "7": "c3 prepara d4." }
    }
  ]
}
```

- `color`: bando del alumno. Cada línea debe **terminar con una jugada de ese bando**.
- `moves`: SAN en inglés (K, Q, R, B, N), separadas por espacios, desde la posición inicial.
- `comments`: clave = número de media jugada (1 = primera jugada de las blancas, 2 = respuesta de las negras...).
- En el **modo estudio** se explora el árbol con los comentarios; en el **modo test** la app juega las jugadas del rival y pregunta las tuyas.
