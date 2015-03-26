
    // Copyright: 2015 AlignAlytics
    // License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
    // Source: /src/internal/render/getDataInBounds.js
    Scrollgrid.prototype.internal.render.getDataInBounds = function (viewArea) {

        var i, r, c, x,
            int = this.internal,
            sizes = int.sizes,
            render = int.render,
            physical = sizes.physical,
            cols = this.columns,
            column,
            runningX,
            runningY,
            rowHeight = 0,
            visibleData = [],
            adjustments,
            getValue;

        runningY = viewArea.startY;

        // Load the data range and get the accessor
        getValue = this.adapter.loadDataRange(viewArea);

        for (r = viewArea.top || 0, i = 0; r < viewArea.bottom || 0; r += 1) {
            rowHeight = physical.getRowHeight.call(this, r);
            runningX = viewArea.startX || 0;
            for (c = viewArea.left || 0; c < viewArea.right || 0; c += 1, i += 1) {
                // Get any measurement modifiers based on cell position
                adjustments = render.calculateCellAdjustments.call(this, r, c);
                // Get the column definition
                column = cols[c];
                // Get the x position of the cell
                x = Math.floor(runningX) + adjustments.x + 0.5;
                // Using direct assignment for speed
                visibleData[i] = {
                    key: c + '_' + r,
                    x: x,
                    y: Math.floor(runningY) + adjustments.y + 0.5,
                    boxWidth: Math.ceil(column.width) + adjustments.boxWidth,
                    boxHeight: Math.ceil(rowHeight) + adjustments.boxHeight,
                    textWidth: Math.ceil(column.width) + adjustments.textWidth,
                    textHeight: Math.ceil(rowHeight) + adjustments.textHeight,
                    backgroundStyle: this.style.cellBackgroundPrefix + 'r' + (r + 1) + '-c' + (c + 1),
                    foregroundStyle: this.style.cellForegroundPrefix + 'r' + (r + 1) + '-c' + (c + 1),
                    cellPadding: physical.cellPadding,
                    alignment: 'left',
                    rowIndex: r,
                    columnIndex: c,
                    column: column,
                    formatter: null,
                    getValue: getValue
                };
                runningX += column.width;
            }
            runningY += rowHeight;
        }

        // Modify the data based on the user rules
        render.applyRules.call(this, visibleData);

        return visibleData;

    };