/**
 * Adapter for an array of plain objects.  Auto-discovers column names from
 * the first `rowSampleSize` records (default 100) unless `columns` is
 * supplied explicitly.
 */
export function jsonAdapter(data, columns, options = {}) {
    const table = data;
    const cols = columns ? [...columns] : [];
    const sampleSize = options.rowSampleSize ?? 100;

    if (cols.length === 0) {
        const seen = new Set();
        const sampleLimit = Math.min(table.length, sampleSize);
        for (let i = 0; i < sampleLimit; i += 1) {
            for (const key of Object.keys(table[i])) {
                if (!seen.has(key)) {
                    seen.add(key);
                    cols.push(key);
                }
            }
        }
    }

    const headRow = {};
    for (const key of cols) headRow[key] = key;
    table.splice(0, 0, headRow);

    return {
        rowCount: () => table.length,
        columnCount: () => cols.length,
        sort(column, headers, footers, descending, compareFunction) {
            const heads = table.splice(0, headers);
            const foots = table.splice(table.length - footers);
            table.sort((a, b) => compareFunction(a[cols[column]], b[cols[column]]) * (descending ? -1 : 1));
            for (let j = heads.length - 1; j >= 0; j -= 1) table.unshift(heads[j]);
            for (const f of foots) table.push(f);
        },
        loadDataRange(viewArea, callback) {
            const d = [];
            for (let r = viewArea.top; r < viewArea.bottom; r += 1) {
                const row = [];
                for (let c = viewArea.left; c < viewArea.right; c += 1) {
                    row.push(table[r][cols[c]]);
                }
                d.push(row);
            }
            callback(d);
        },
    };
}
