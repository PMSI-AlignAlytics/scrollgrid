
    // Copyright: 2015 AlignAlytics
    // License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
    // Source: /src/external/adapters/json.js
    Scrollgrid.adapters.json = function (data, columns, options) {

        options = options || {};

        var columnLookup = {},
            cols = columns || [],
            table = data,
            key,
            sampleSize = options.rowSampleSize || 100,
            i;

        // If columns aren't provided find them from the data
        if (cols.length === 0) {
            for (i = 0; i < Math.min(table.length, sampleSize); i += 1) {
                for (key in table[i]) {
                    if (table[i].hasOwnProperty(key)) {
                        if (columnLookup[key] === undefined) {
                            columnLookup[key] = cols.length;
                            cols.push(key);
                        }
                    }
                }
            }
        }

        return {
            rowCount: function () { return table.length; },
            columnCount: function () { return cols.length; },
            sort: function (column, descending, predicate) {
                table.sort(function (a, b) {
                    return predicate(a[cols[column]], b[cols[column]]) * (descending ? -1 : 1);
                });
            },
            loadDataRange: function () {
                return function (row, column, callback) {
                    if (row === 0) {
                        callback(cols[column]);
                    } else {
                        callback(table[row][cols[column]] || 0);
                    }
                };
            }
        };

    };