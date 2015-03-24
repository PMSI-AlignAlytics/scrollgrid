
    // Copyright: 2015 AlignAlytics
    // License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
    // Source: /src/external/adapters/json.js
    Scrollgrid.adapters.json = function (data, columns) {

        var columnLookup = {},
            cols = columns || [],
            table = data,
            key,
            i;

        // If columns aren't provided find them from the data (only sample first 100 rows)
        if (cols.length === 0) {
            for (i = 0; i < Math.min(table.length, 100); i += 1) {
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

        // Return the total number of rows including headers and footers
        this.getRowCount = function () {
            return table.length;
        };

        // Return the total number of columns including headers and footers
        this.getColumnCount = function () {
            return cols.length;
        };

        this.loadDataRange = function () {
            return function (row, column, callback) {
                if (row === 0) {
                    callback(cols[column]);
                } else {
                    callback(table[row][cols[column]] || 0);
                }
            };
        };

    };