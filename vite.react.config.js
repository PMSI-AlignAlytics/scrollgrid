import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        lib: {
            entry: resolve(import.meta.dirname, 'src/react.jsx'),
            name: 'ScrollgridReact',
            formats: ['es', 'cjs'],
            fileName: (format) => format === 'es' ? 'react.js' : 'react.cjs',
        },
        sourcemap: true,
        emptyOutDir: false,
        rollupOptions: {
            external: ['react', 'react-dom', 'scrollgrid', 'd3-selection', 'd3-drag', /^\.\/scrollgrid/, /^\.\.\//],
            output: {
                exports: 'named',
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                },
            },
        },
    },
});
