import { describe, expect, it } from 'vitest';

import { buildRowOffsets, findBodyRowAtOffset } from '../src/sizes/buildRowOffsets.js';

function makeSelf(overrides = {}) {
    return {
        properties: {
            virtualOuterHeight: 10,
            virtualTop: 1,
            virtualBottom: 1,
            virtualInnerHeight: 8,
            headerRowHeight: 40,
            rowHeight: 20,
            footerRowHeight: 30,
            formatRules: [],
            ...overrides,
        },
    };
}

describe('buildRowOffsets', () => {
    it('builds a strictly increasing prefix sum with the band defaults', () => {
        const self = makeSelf();
        buildRowOffsets(self);
        const o = self.properties.rowOffsets;
        // 1 header (40) + 8 body (20) + 1 footer (30) = 230
        expect(o[0]).toBe(0);
        expect(o[1]).toBe(40);
        expect(o[9]).toBe(40 + 8 * 20);
        expect(o[10]).toBe(40 + 8 * 20 + 30);
    });

    it('honours a `rowHeight` format rule', () => {
        const self = makeSelf({
            formatRules: [{ row: '2:9', rowHeight: 50 }],
        });
        buildRowOffsets(self);
        const o = self.properties.rowOffsets;
        // rows 2..9 (1-based) → body rows index 1..8 here → all 8 body rows
        expect(o[10]).toBe(40 + 8 * 50 + 30);
    });

    it('lets the last matching rule win when multiple rules overlap', () => {
        const self = makeSelf({
            formatRules: [
                { row: '*', rowHeight: 24 },
                { row: '-1', rowHeight: 80 }, // footer row
            ],
        });
        buildRowOffsets(self);
        const o = self.properties.rowOffsets;
        // last body row uses 24, footer overridden to 80
        expect(o[10] - o[9]).toBe(80);
        expect(o[9] - o[8]).toBe(24);
    });

    it('handles every-Nth selectors over the body band', () => {
        const self = makeSelf({
            virtualOuterHeight: 6,
            virtualTop: 0,
            virtualBottom: 0,
            virtualInnerHeight: 6,
            formatRules: [{ row: '1(2)-1', rowHeight: 50 }],
        });
        buildRowOffsets(self);
        const o = self.properties.rowOffsets;
        // Rows 1, 3, 5 (1-based) -> 50; rows 2, 4, 6 -> 20
        expect(o[1] - o[0]).toBe(50);
        expect(o[2] - o[1]).toBe(20);
        expect(o[3] - o[2]).toBe(50);
        expect(o[4] - o[3]).toBe(20);
        expect(o[5] - o[4]).toBe(50);
        expect(o[6] - o[5]).toBe(20);
    });

    it('survives an empty grid', () => {
        const self = makeSelf({ virtualOuterHeight: 0, virtualInnerHeight: 0 });
        buildRowOffsets(self);
        expect(self.properties.rowOffsets.length).toBeGreaterThan(0);
    });
});

describe('findBodyRowAtOffset', () => {
    it('returns the body row index that contains a given y in body coords', () => {
        // 1 header (40), 8 body (20 each), 1 footer (30)
        const self = makeSelf();
        buildRowOffsets(self);
        // Body row 0 spans [0, 20)
        expect(findBodyRowAtOffset(self, 0)).toBe(0);
        expect(findBodyRowAtOffset(self, 19)).toBe(0);
        expect(findBodyRowAtOffset(self, 20)).toBe(1);
        expect(findBodyRowAtOffset(self, 79)).toBe(3);
        expect(findBodyRowAtOffset(self, 80)).toBe(4);
    });

    it('works on a body with mixed heights', () => {
        // Row heights: header 40, body [50, 20, 60, 20, 20, 20, 20, 80], footer 30
        const self = makeSelf({
            formatRules: [
                { row: '2', rowHeight: 50 },
                { row: '4', rowHeight: 60 },
                { row: '-2', rowHeight: 80 },
            ],
        });
        buildRowOffsets(self);
        // Body coords:
        // body row 0 -> [0, 50)    (rule on row 2 = first body row)
        // body row 1 -> [50, 70)
        // body row 2 -> [70, 130)  (rule on row 4 = third body row)
        // body row 3 -> [130, 150)
        // ...
        expect(findBodyRowAtOffset(self, 0)).toBe(0);
        expect(findBodyRowAtOffset(self, 50)).toBe(1);
        expect(findBodyRowAtOffset(self, 70)).toBe(2);
        expect(findBodyRowAtOffset(self, 129)).toBe(2);
        expect(findBodyRowAtOffset(self, 130)).toBe(3);
    });

    it('stays fast on large grids (binary search)', () => {
        const N = 100_000;
        const self = makeSelf({
            virtualOuterHeight: N,
            virtualTop: 0,
            virtualBottom: 0,
            virtualInnerHeight: N,
            formatRules: [{ row: '1(7)-1', rowHeight: 35 }],
        });
        buildRowOffsets(self);
        const total = self.properties.rowOffsets[N];
        // Spot-check a handful of positions.  This is really just an
        // anti-regression assertion that lookups stay O(log n) — running
        // a million queries should finish in a few ms.
        const start = performance.now();
        for (let i = 0; i < 1_000_000; i += 1) {
            findBodyRowAtOffset(self, (i * 37) % total);
        }
        const elapsed = performance.now() - start;
        expect(elapsed).toBeLessThan(2000); // generous; typically <300ms
    });
});
