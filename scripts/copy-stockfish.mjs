// Copia el motor Stockfish (WASM, versión lite de un solo hilo) a public/ para servirlo como Web Worker.
import { copyFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = join(root, 'node_modules', 'stockfish', 'bin');
const dest = join(root, 'public', 'stockfish');
const files = ['stockfish-18-lite-single.js', 'stockfish-18-lite-single.wasm'];

mkdirSync(dest, { recursive: true });
for (const file of files) {
  const from = join(src, file);
  if (!existsSync(from)) {
    console.error(`No se encuentra ${from}. ¿Has ejecutado npm install?`);
    process.exit(1);
  }
  copyFileSync(from, join(dest, file));
}
console.log(`Stockfish copiado en ${dest}`);
