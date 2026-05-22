import { describe, expect, it } from 'vitest';

import { getRowHeight } from '../src/sizes/getRowHeight.js';

const self = {
    properties: {
        virtualTop: 2,
        virtualBottom: 1,
        virtualOuterHeight: 10,
        headerRowHeight: 40,
        rowHeight: 20,
        footerRowHeight: 30,
    },
};

describe('getRowHeight', () => {
    it('returns headerRowHeight for rows inside the header band', () => {
        expect(getRowHeight(self, 0)).toBe(40);
        expect(getRowHeight(self, 1)).toBe(40);
    });

    it('returns rowHeight for body rows', () => {
        expect(getRowHeight(self, 2)).toBe(20);
        expect(getRowHeight(self, 8)).toBe(20);
    });

    it('returns footerRowHeight for footer rows', () => {
        expect(getRowHeight(self, 9)).toBe(30);
    });
});
