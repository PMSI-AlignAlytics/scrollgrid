
// Copyright: 2015 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/external/adapters/json.js
Scrollgrid.adapters.json = function (data, columns, options) {
    "use strict";

    options = options || {};

    var columnLookup = {},
        headRow = {},
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

    for (i = 0; i < cols.length; i += 1) {
        headRow[cols[i]] = cols[i];
    }

    table.splice(0, 0, headRow);

    return {
        rowCount: function () { return table.length; },
        columnCount: function () { return cols.length; },
        sort: function (column, headers, footers, descending, compareFunction) {
            var heads = table.splice(0, headers),
                foots = table.splice(table.length - footers),
                j;
            table.sort(function (a, b) {
                return compareFunction(a[cols[column]], b[cols[column]]) * (descending ? -1 : 1);
            });
            for (j = heads.length - 1; j >= 0; j -= 1) {
                table.splice(0, 0, heads[j]);
            }
            for (j = 0; j < foots.length; j += 1) {
                table.push(foots[j]);
            }
        },
        loadDataRange: function () {
            return function (row, column, callback) {
                callback(table[row][cols[column]] || 0);
            };
        }
    };
};