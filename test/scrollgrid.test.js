import { describe, expect, it, beforeEach } from 'vitest';

import { Scrollgrid } from '../src/scrollgrid.js';

function mount() {
    document.body.innerHTML = '<div id="t" style="width:600px;height:400px;"></div>';
    // jsdom doesn't compute layout, so manually patch offsetWidth/offsetHeight.
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', { configurable: true, get() { return 600; } });
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', { configurable: true, get() { return 400; } });
    Object.defineProperty(HTMLElement.prototype, 'clientWidth', { configurable: true, get() { return 600; } });
    Object.defineProperty(HTMLElement.prototype, 'clientHeight', { configurable: true, get() { return 400; } });
}

describe('Scrollgrid', () => {
    beforeEach(mount);

    it('constructs with an array of arrays', () => {
        const grid = new Scrollgrid({
            target: '#t',
            data: [['a', 'b', 'c'], [1, 2, 3], [4, 5, 6]],
            headerRows: 1,
        });
        expect(grid.adapter).toBeDefined();
        expect(grid.adapter.rowCount()).toBe(3);
        expect(grid.adapter.columnCount()).toBe(3);
        expect(grid.columns.length).toBe(3);
    });

    it('exposes `Scrollgrid.init` as a constructor shortcut', () => {
        const grid = Scrollgrid.init('#t', { data: [[1, 2], [3, 4]] });
        expect(grid).toBeInstanceOf(Scrollgrid);
    });

    it('honours an explicit `allowColumnResizing: false`', () => {
        // Regression: legacy code used `options.allowX || true` which masked
        // false values.  The rewrite uses `??` so false is respected.
        const grid = new Scrollgrid({
            target: '#t',
            data: [[1, 2], [3, 4]],
            allowColumnResizing: false,
            allowSorting: false,
        });
        expect(grid.properties.allowColumnResizing).toBe(false);
        expect(grid.properties.allowSorting).toBe(false);
    });

    it('supports legacy `Scrollgrid.adapters.simple` access', () => {
        const adapter = Scrollgrid.adapters.simple([[1, 2], [3, 4]]);
        expect(adapter.rowCount()).toBe(2);
        expect(adapter.columnCount()).toBe(2);
    });

    it('updates virtualInnerWidth when headerColumns changes', () => {
        const grid = new Scrollgrid({
            target: '#t',
            data: [[1, 2, 3, 4], [5, 6, 7, 8]],
        });
        const initial = grid.properties.virtualInnerWidth;
        grid.headerColumns(1, true);
        expect(grid.properties.virtualInnerWidth).toBe(initial - 1);
    });
});
