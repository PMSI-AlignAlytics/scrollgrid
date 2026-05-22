import { copyFile, mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';

const pairs = [
    ['src/scrollgrid.d.ts', 'dist/scrollgrid.d.ts'],
    ['src/react.d.ts', 'dist/react.d.ts'],
];

for (const [from, to] of pairs) {
    await mkdir(dirname(to), { recursive: true });
    await copyFile(from, to);
    process.stdout.write(`copied ${from} → ${to}\n`);
}
