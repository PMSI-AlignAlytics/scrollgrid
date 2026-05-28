import { beforeEach, describe, expect, it, vi } from 'vitest';

import { Scrollgrid } from '../src/scrollgrid.js';

// jsdom doesn't lay anything out, so we feed it the same offset/client
// dimensions the other scrollgrid tests do.
function patchLayout() {
    document.body.innerHTML = '<div id="t" style="width:600px;height:400px;"></div>';
    for (const prop of ['offsetWidth', 'offsetHeight', 'clientWidth', 'clientHeight']) {
        Object.defineProperty(HTMLElement.prototype, prop, {
            configurable: true,
            get() { return prop.includes('Width') ? 600 : 400; },
        });
    }
}

function buildGrid({ onMouseOver, onMouseOut, onMouseMove } = {}) {
    const grid = new Scrollgrid({
        target: '#t',
        data: [
            ['Header A', 'Header B'],
            [11, 12],
            [21, 22],
            [31, 32],
        ],
        headerRows: 1,
    });
    if (onMouseOver) grid.on('mouseover', onMouseOver);
    if (onMouseOut) grid.on('mouseout', onMouseOut);
    if (onMouseMove) grid.on('mousemove', onMouseMove);
    grid.refresh();
    return grid;
}

function fakeCell({ rowIndex, columnIndex }) {
    const el = document.createElement('div');
    el.setAttribute('data-row', String(rowIndex));
    el.setAttribute('data-col', String(columnIndex));
    el.__data__ = { rowIndex, columnIndex, value: `r${rowIndex}c${columnIndex}` };
    // d3-selection reads __data__ via selection.datum()
    document.body.appendChild(el);
    return el;
}

describe('redirectViewportEvents — hover synthesis', () => {
    let originalElementFromPoint;

    beforeEach(() => {
        patchLayout();
        originalElementFromPoint = document.elementFromPoint;
    });

    function stubPointerLookup(pointerTo) {
        document.elementFromPoint = vi.fn(() => pointerTo());
    }

    function dispatch(viewportNode, type, x = 0, y = 0) {
        const event = new MouseEvent(type, { clientX: x, clientY: y, bubbles: true });
        viewportNode.dispatchEvent(event);
    }

    it('fires mouseover only once per cell as the pointer moves across cells', () => {
        const overs = [];
        const grid = buildGrid({
            onMouseOver: (_event, cell) => overs.push(cell.rowIndex),
        });
        const viewport = grid.elements.main.viewport.node();

        const cellA = fakeCell({ rowIndex: 1, columnIndex: 0 });
        const cellB = fakeCell({ rowIndex: 2, columnIndex: 0 });
        let current = cellA;
        stubPointerLookup(() => current);

        dispatch(viewport, 'mousemove');         // enters A
        dispatch(viewport, 'mousemove');         // still on A — no extra over
        current = cellB;
        dispatch(viewport, 'mousemove');         // moves to B
        current = cellA;
        dispatch(viewport, 'mousemove');         // back to A

        expect(overs).toEqual([1, 2, 1]);

        document.elementFromPoint = originalElementFromPoint;
    });

    it('fires mouseout for the previous cell when the pointer moves to a different cell', () => {
        const outs = [];
        const grid = buildGrid({
            onMouseOut: (_event, cell) => outs.push(cell.rowIndex),
        });
        const viewport = grid.elements.main.viewport.node();

        const cellA = fakeCell({ rowIndex: 1, columnIndex: 0 });
        const cellB = fakeCell({ rowIndex: 2, columnIndex: 0 });
        let current = cellA;
        stubPointerLookup(() => current);

        dispatch(viewport, 'mousemove');         // over A — no out yet
        current = cellB;
        dispatch(viewport, 'mousemove');         // moves to B → out for A
        current = cellA;
        dispatch(viewport, 'mousemove');         // back to A → out for B

        expect(outs).toEqual([1, 2]);

        document.elementFromPoint = originalElementFromPoint;
    });

    it('fires a final mouseout on mouseleave', () => {
        const outs = [];
        const grid = buildGrid({
            onMouseOut: (_event, cell) => outs.push(cell.rowIndex),
        });
        const viewport = grid.elements.main.viewport.node();

        const cellA = fakeCell({ rowIndex: 2, columnIndex: 0 });
        stubPointerLookup(() => cellA);
        dispatch(viewport, 'mousemove');
        // Pointer leaves the viewport entirely.
        viewport.dispatchEvent(new MouseEvent('mouseleave', { clientX: 0, clientY: 0 }));

        expect(outs).toEqual([2]);

        document.elementFromPoint = originalElementFromPoint;
    });

    it('survives a refresh between hover events (rowIndex-keyed identity)', () => {
        // Simulates the React hover-highlight pattern: the consumer's
        // mouseover handler triggers a refresh, which destroys the cell
        // DOM nodes and rebuilds them.  The redirector must compare by
        // row/column index rather than DOM identity, otherwise the
        // mouseout from the original cell never fires.
        const overs = [];
        const outs = [];
        const grid = buildGrid({
            onMouseOver: (_event, cell) => overs.push(cell.rowIndex),
            onMouseOut: (_event, cell) => outs.push(cell.rowIndex),
        });
        const viewport = grid.elements.main.viewport.node();

        let current = fakeCell({ rowIndex: 1, columnIndex: 0 });
        stubPointerLookup(() => current);
        dispatch(viewport, 'mousemove');

        // Simulate a refresh-driven cell churn: replace the DOM node
        // representing row 1, but keep the pointer over a fresh node
        // for row 2.
        current = fakeCell({ rowIndex: 2, columnIndex: 0 });
        dispatch(viewport, 'mousemove');

        expect(overs).toEqual([1, 2]);
        expect(outs).toEqual([1]);

        document.elementFromPoint = originalElementFromPoint;
    });
});
