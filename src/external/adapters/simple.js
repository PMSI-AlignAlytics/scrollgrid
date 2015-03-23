
    // Copyright: 2015 AlignAlytics
    // License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
    // Source: /src/external/adapters/simple.js
    Scrollgrid.adapters.simple = function (data) {

        var int = this.internal,
            inconsistent = false,
            valid = true,
            columnCount = 0,
            table = data,
            i;

        // Find the longest length of the data sub arrays
        for (i = 0; i < table.length; i += 1) {
            if (table[i] && Object.prototype.toString.call(table[i]) === '[object Array]') {
                inconsistent = columnCount && (inconsistent || columnCount !== table[i].length);
                if (!columnCount || table[i].length > columnCount) {
                    columnCount = table[i].length;
                }
            } else {
                valid = false;
                int.raise("Invalid data row found");
                break;
            }
        }

        // Check that the table has some width
        if (valid && columnCount > 0) {
            // The table is valid but may have inconsistent widths which will be filled out here
            if (inconsistent) {
                for (i = 0; i < table.length; i += 1) {
                    while (table[i].length < columnCount) {
                        table[i].push("");
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
            return columnCount;
        };

        this.loadDataRange = function () {
            return function (row, column, callback) {
                callback(table[row][column]);
            };
        };

    };