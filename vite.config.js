import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        lib: {
            entry: resolve(import.meta.dirname, 'src/index.js'),
            name: 'Scrollgrid',
            formats: ['es', 'umd'],
            fileName: (format) => format === 'es' ? 'scrollgrid.js' : 'scrollgrid.umd.cjs',
        },
        sourcemap: true,
        emptyOutDir: false,
        rollupOptions: {
            external: ['d3-selection', 'd3-drag'],
            output: {
                globals: {
                    'd3-selection': 'd3',
                    'd3-drag': 'd3',
                },
                exports: 'named',
                assetFileNames: (asset) => asset.name === 'style.css' ? 'scrollgrid.css' : asset.name,
            },
        },
    },
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: ['./test/setup.js'],
    },
});
