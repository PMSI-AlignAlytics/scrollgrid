import { describe, expect, it } from 'vitest';

import { matchRule } from '../src/render/matchRule.js';

describe('matchRule', () => {
    it('matches everything when the selector is missing or "*"', () => {
        expect(matchRule(undefined, 1, 10)).toBe(true);
        expect(matchRule('*', 5, 10)).toBe(true);
    });

    it('matches a single index', () => {
        expect(matchRule('3', 3, 10)).toBe(true);
        expect(matchRule('3', 4, 10)).toBe(false);
    });

    it('matches comma-separated indices', () => {
        expect(matchRule('1,3,5', 3, 10)).toBe(true);
        expect(matchRule('1,3,5', 4, 10)).toBe(false);
    });

    it('matches an inclusive range', () => {
        for (const v of [3, 4, 5]) expect(matchRule('3:5', v, 10)).toBe(true);
        expect(matchRule('3:5', 6, 10)).toBe(false);
    });

    it('treats negative indices as offsets from the end', () => {
        expect(matchRule('-1', 10, 10)).toBe(true);
        expect(matchRule('-2:-1', 9, 10)).toBe(true);
        expect(matchRule('-2:-1', 10, 10)).toBe(true);
        expect(matchRule('-2:-1', 8, 10)).toBe(false);
    });

    it('supports every-nth selectors', () => {
        // 1(2)9 => 1, 3, 5, 7, 9
        for (const v of [1, 3, 5, 7, 9]) expect(matchRule('1(2)9', v, 10)).toBe(true);
        for (const v of [2, 4, 6, 8, 10]) expect(matchRule('1(2)9', v, 10)).toBe(false);
    });

    it('matches any of the comma-separated parts (OR)', () => {
        expect(matchRule('1:2,-1', 1, 10)).toBe(true);
        expect(matchRule('1:2,-1', 2, 10)).toBe(true);
        expect(matchRule('1:2,-1', 10, 10)).toBe(true);
        expect(matchRule('1:2,-1', 5, 10)).toBe(false);
    });
});
