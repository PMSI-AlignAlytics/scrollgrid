
    // Copyright: 2015 AlignAlytics
    // License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
    // Source: /src/internal/render/calculateCellAdjustments.js
    Scrollgrid.prototype.internal.render.calculateCellAdjustments = function (row, column) {

        var int = this.internal,
            sizes = int.sizes,
            virtual = sizes.virtual,
            physical = sizes.physical,
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
        if ((row < virtual.top || row >= virtual.outerHeight - virtual.bottom) && column === virtual.outerWidth - virtual.right - 1) {
            extension.boxWidth += physical.verticalScrollbarWidth;
        }
        // If the cell is a row header or footer and the row is the last in the dataset we need to extend the height to
        // remove the gap for the scrollbar
        if ((column < virtual.left || column >= virtual.outerWidth - virtual.right) && row === virtual.outerHeight - virtual.bottom - 1) {
            extension.boxHeight += physical.horizontalScrollbarHeight;
        }
        // If the cell is the last column header reduce height by 1 to show the bottom gridline
        if (row === virtual.top - 1) {
            extension.boxHeight -= 1;
        }
        // If the cell is the first row after a column header and there is a column header extend it up to hide the top line
        if (row === virtual.top && row > 0) {
            extension.boxHeight += 1;
            extension.y -= 1;
        }
        // If the cell is the last row header reduce width by 1 to show the right gridline
        if (column === virtual.left - 1) {
            extension.boxWidth -= 1;
        }
        // If the cell is the first column after a row header and there is a row header extend it left to hide the top line
        if (column === virtual.left && column > 0) {
            extension.boxWidth += 1;
            extension.x -= 1;
        }
        // If the cell is in the last row shrink it to show the bottom line
        if (row === virtual.outerHeight - 1) {
            extension.boxHeight -= 1;
        }
        // If the cell is in the last column shrink it to show the right line
        if (column === virtual.outerWidth - 1) {
            extension.boxWidth -= 1;
        }
        return extension;

    };