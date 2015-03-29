
    // Copyright: 2015 AlignAlytics
    // License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
    // Source: /src/external/adapters/simple.js
    Scrollgrid.adapters.simple = function (data, options) {

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
            sort: function (column, descending, predicate) {
                table.sort(function (a, b) {
                    return predicate(a[column], b[column]) * (descending ? -1 : 1);
                });
            },
            loadDataRange: function () {
                return function (row, column, callback) {
                    callback(table[row][column]);
                };
            }
        };

    };