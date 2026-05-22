import { describe, expect, it } from 'vitest';

import { calculateCellAdjustments } from '../src/render/calculateCellAdjustments.js';

function makeSelf(overrides = {}) {
    return {
        columns: Array.from({ length: 20 }, () => ({ width: 50 })),
        properties: {
            virtualTop: 1,
            virtualBottom: 1,
            virtualLeft: 1,
            virtualRight: 1,
            virtualOuterHeight: 10,
            virtualOuterWidth: 10,
            verticalScrollbarWidth: 17,
            horizontalScrollbarHeight: 17,
            ...overrides,
        },
    };
}

describe('calculateCellAdjustments', () => {
    it('expands the last header column to cover the scroll-bar gap', () => {
        const self = makeSelf();
        // last column of the body when looking at a header row.
        const ext = calculateCellAdjustments(self, 0, 8);
        expect(ext.boxWidth).toBeGreaterThanOrEqual(17);
    });

    it('expands the last body row to cover the horizontal scroll-bar', () => {
        const self = makeSelf();
        const ext = calculateCellAdjustments(self, 8, 0);
        expect(ext.boxHeight).toBeGreaterThanOrEqual(17);
    });

    it('attaches the column sort icon hint to the last header row', () => {
        const self = makeSelf();
        self.columns[3] = { width: 50, sort: 'asc' };
        const ext = calculateCellAdjustments(self, 0, 3);
        expect(ext.sortIcon).toBe('asc');
    });

    it('does not attach a sort icon to non-header rows', () => {
        const self = makeSelf();
        self.columns[3] = { width: 50, sort: 'asc' };
        const ext = calculateCellAdjustments(self, 5, 3);
        expect(ext.sortIcon).toBeUndefined();
    });
});
