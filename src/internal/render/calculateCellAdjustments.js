
// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/render/calculateCellAdjustments.js
Scrollgrid.prototype.internal.render.calculateCellAdjustments = function (row, column) {
    "use strict";

    var props = this.properties,
        extension = {
            x: 0,
            y: 0,
            boxHeight: 0,
            boxWidth: 0,
            textHeight: 0,
            textWidth: 0
        };

    // If the cell is a columns header or footer and the column is the last in the dataset we need to extend the width
    // to remove the gap for the scrollbar
    if ((row < props.virtualTop || row >= props.virtualOuterHeight - props.virtualBottom) && column === props.virtualOuterWidth - props.virtualRight - 1) {
        extension.boxWidth += props.verticalScrollbarWidth;
    }
    // If the cell is a row header or footer and the row is the last in the dataset we need to extend the height to
    // remove the gap for the scrollbar
    if ((column < props.virtualLeft || column >= props.virtualOuterWidth - props.virtualRight) && row === props.virtualOuterHeight - props.virtualBottom - 1) {
        extension.boxHeight += props.horizontalScrollbarHeight;
    }
    // If the cell is the last column header reduce height by 1 to show the bottom gridline
    if (row === props.virtualTop - 1) {
        extension.boxHeight -= 1;
    }
    // If the cell is the first row after a column header and there is a column header extend it up to hide the top line
    if (row === props.virtualTop && row > 0) {
        extension.boxHeight += 1;
        extension.y -= 1;
    }
    // If the cell is the last row header reduce width by 1 to show the right gridline
    if (column === props.virtualLeft - 1) {
        extension.boxWidth -= 1;
    }
    // If the cell is the first column after a row header and there is a row header extend it left to hide the top line
    if (column === props.virtualLeft && column > 0) {
        extension.boxWidth += 1;
        extension.x -= 1;
    }
    // If the cell is in the last row shrink it to show the bottom line
    if (row === props.virtualOuterHeight - 1) {
        extension.boxHeight -= 1;
    }
    // If the cell is in the last column shrink it to show the right line
    if (column === props.virtualOuterWidth - 1) {
        extension.boxWidth -= 1;
    }
    // If the cell is in the last row of the column headers and the column is being sorted
    if (row === props.virtualTop - 1) {
        // Set the sort icon to that of the column
        extension.sortIcon = (this.columns[column] ? this.columns[column].sort : undefined);
    }

    return extension;

};
