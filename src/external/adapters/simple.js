
// Copyright: 2015 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/external/adapters/simple.js
Scrollgrid.adapters.simple = function (data, options) {
    "use strict";

    options = options || {};

    var columnCount = 0,
        table = data,
        sampleSize = options.rowSampleSize || 100,
        i;

    // Find the longest length of the data sub arrays
    for (i = 0; i < Math.min(table.length, sampleSize); i += 1) {
        if (table[i] && Object.prototype.toString.call(table[i]) === '[object Array]') {
            if (table[i].length > columnCount) {
                columnCount = table[i].length;
            }
        }
    }

    return {
        rowCount: function () { return table.length; },
        columnCount: function () { return columnCount; },
        sort: function (column, headers, footers, descending, compareFunction) {
            var heads = table.splice(0, headers),
                foots = table.splice(table.length - footers),
                j;
            table.sort(function (a, b) {
                return compareFunction(a[column], b[column]) * (descending ? -1 : 1);
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
                callback(table[row][column]);
            };
        }
    };

};