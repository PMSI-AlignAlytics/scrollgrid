import { describe, expect, it } from 'vitest';

import { jsonAdapter } from '../src/adapters/json.js';
import { simpleAdapter } from '../src/adapters/simple.js';
import { defaultComparer } from '../src/interaction/defaultComparer.js';

describe('simpleAdapter', () => {
    it('reports row and column counts', () => {
        const adapter = simpleAdapter([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
        expect(adapter.rowCount()).toBe(3);
        expect(adapter.columnCount()).toBe(3);
    });

    it('infers column count from the widest row in the sample', () => {
        const adapter = simpleAdapter([[1, 2], [3, 4, 5, 6], [7]]);
        expect(adapter.columnCount()).toBe(4);
    });

    it('loads only the requested viewport range via callback', () => {
        const adapter = simpleAdapter([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
        const captured = [];
        adapter.loadDataRange({ top: 1, bottom: 3, left: 1, right: 3 }, (data) => captured.push(data));
        expect(captured).toEqual([[[5, 6], [8, 9]]]);
    });

    it('sorts the body rows but preserves header and footer slices', () => {
        const data = [
            ['header'],         // header
            [3], [1], [2],      // body
            ['footer'],         // footer
        ];
        const adapter = simpleAdapter(data);
        adapter.sort(0, 1, 1, false, defaultComparer);
        expect(data[0]).toEqual(['header']);
        expect(data[data.length - 1]).toEqual(['footer']);
        expect(data.slice(1, -1).map((r) => r[0])).toEqual([1, 2, 3]);
    });
});

describe('jsonAdapter', () => {
    it('auto-discovers column names from the sample', () => {
        const records = [{ a: 1, b: 2 }, { b: 3, c: 4 }];
        const adapter = jsonAdapter(records);
        expect(adapter.columnCount()).toBe(3);
        // jsonAdapter mutates by prepending a header row
        expect(adapter.rowCount()).toBe(3);
    });

    it('returns header row first when loading the top of the viewport', () => {
        const records = [{ name: 'Alice', age: 30 }, { name: 'Bob', age: 25 }];
        const adapter = jsonAdapter(records);
        let result;
        adapter.loadDataRange({ top: 0, bottom: 1, left: 0, right: 2 }, (d) => { result = d; });
        expect(result).toEqual([['name', 'age']]);
    });

    it('respects an explicit column list', () => {
        const records = [{ a: 1, b: 2, c: 3 }];
        const adapter = jsonAdapter(records, ['c', 'a']);
        expect(adapter.columnCount()).toBe(2);
        let result;
        adapter.loadDataRange({ top: 1, bottom: 2, left: 0, right: 2 }, (d) => { result = d; });
        expect(result).toEqual([[3, 1]]);
    });
});
