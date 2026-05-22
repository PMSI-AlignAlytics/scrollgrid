/**
 * Default in-memory adapter for arrays of arrays.  The first row is the
 * header row.
 */
export function simpleAdapter(data, options = {}) {
    const table = data;
    const sampleSize = options.rowSampleSize ?? 100;

    let columnCount = 0;
    const sampleLimit = Math.min(table.length, sampleSize);
    for (let i = 0; i < sampleLimit; i += 1) {
        if (Array.isArray(table[i]) && table[i].length > columnCount) {
            columnCount = table[i].length;
        }
    }

    return {
        rowCount: () => table.length,
        columnCount: () => columnCount,
        sort(column, headers, footers, descending, compareFunction) {
            const heads = table.splice(0, headers);
            const foots = table.splice(table.length - footers);
            table.sort((a, b) => compareFunction(a[column], b[column]) * (descending ? -1 : 1));
            for (let j = heads.length - 1; j >= 0; j -= 1) table.unshift(heads[j]);
            for (const f of foots) table.push(f);
        },
        loadDataRange(viewArea, callback) {
            const d = [];
            for (let r = viewArea.top; r < viewArea.bottom; r += 1) {
                const row = [];
                for (let c = viewArea.left; c < viewArea.right; c += 1) {
                    row.push(table[r][c]);
                }
                d.push(row);
            }
            callback(d);
        },
    };
}
