import { describe, expect, it } from 'vitest';

import { defaultComparer } from '../src/interaction/defaultComparer.js';

describe('defaultComparer', () => {
    it('orders numbers numerically (not lexically)', () => {
        expect(defaultComparer(2, 10)).toBeLessThan(0);
        expect(defaultComparer(10, 2)).toBeGreaterThan(0);
        expect(defaultComparer(7, 7)).toBe(0);
    });

    it('orders dates chronologically', () => {
        expect(defaultComparer('2024-01-01', '2024-02-01')).toBeLessThan(0);
        expect(defaultComparer('2024-02-01', '2024-01-01')).toBeGreaterThan(0);
    });

    it('falls back to lexicographic comparison for non-numeric, non-date values', () => {
        expect(defaultComparer('apple', 'banana')).toBeLessThan(0);
        expect(defaultComparer('banana', 'apple')).toBeGreaterThan(0);
        expect(defaultComparer('pear', 'pear')).toBe(0);
    });
});
