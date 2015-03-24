
    // Copyright: 2015 AlignAlytics
    // License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
    // Source: /src/external/adapters/pivot.js
    Scrollgrid.adapters.pivot = function (data, rowDimensions, columnDimensions, valueDimensions, options) {

        options = options || {};

        var d,
            r,
            c,
            i,
            //measTitle = options.measureTitle || 'Measure',
            //valueTitle = options.valueTitle || 'Value',
            valueOrientation = options.valueOrientation || 'columns',
            rowKey = [],
            rowLookup = {},
            rowValueKey = [],
            colKey = [],
            colValueKey = [],
            colLookup = {},
            rows = [],
            columnCount = 0;

        // Avoid any case errors with string options
        valueOrientation = valueOrientation.toLowerCase();

        // Force into arrays
        rowDimensions = [].concat(rowDimensions);
        columnDimensions = [].concat(columnDimensions);
        valueDimensions = [].concat(valueDimensions);

        for (c = 0; c < columnDimensions.length; c += 1) {
            rows.push([]);
            for (r = 0; r < rowDimensions.length; r += 1) {
                rows[rows.length - 1].push(rowDimensions[r]);
            }
        }
        columnCount = rowDimensions[r];

        if (data && data.length > 0) {
            for (d = 0; d < data.length; d += 1) {
                rowKey = [];
                colKey = [];
                for (i = 0; i < rowDimensions.length; i += 1) {
                    rowKey.push(data[d][rowDimensions[i]]);
                }
                for (i = 0; i < columnDimensions.length; i += 1) {
                    colKey.push(data[d][columnDimensions[i]]);
                }
                if (valueOrientation === 'columns') {
                    if (rowLookup[rowKey] === undefined) {
                        rowLookup[rowKey] = rows.length;
                        rows.push([].concat(rowKey));
                    }
                    for (i = 0; i < valueDimensions.length; i += 1) {
                        colValueKey = colKey.concat(valueDimensions[i]);
                        if (colLookup[colValueKey] === undefined) {
                            colLookup[colValueKey] = columnCount;
                            columnCount += 1;
                        }
                        rows[rowLookup[rowKey]][colLookup[colValueKey]] = (rows[rowLookup[rowKey]][colLookup[colValueKey]] || 0) + data[d][valueDimensions[i]];
                    }
                } else {
                    if (colLookup[colKey] === undefined) {
                        colLookup[colKey] = columnCount;
                        columnCount += 1;
                    }
                    for (i = 0; i < valueDimensions.length; i += 1) {
                        rowValueKey = rowKey.concat(valueDimensions[i]);
                        if (rowLookup[rowValueKey] === undefined) {
                            rowLookup[rowValueKey] = rows.length;
                            rows.push([].concat(rowValueKey));
                        }
                        rows[rowLookup[rowValueKey]][colLookup[colKey]] = (rows[rowLookup[rowValueKey]][colLookup[colKey]] || 0) + data[d][valueDimensions[i]];
                    }
                }
            }
        }

        // Return the total number of rows including headers and footers
        this.getRowCount = function () {
            return rows.length;
        };

        // Return the total number of columns including headers and footers
        this.getColumnCount = function () {
            return columnCount;
        };

        this.loadDataRange = function () {
            return function (row, column, callback) {
                callback(rows[row][column]);
            };
        };

    };