
// Copyright: 2015 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/render/getDataInBounds.js
Scrollgrid.prototype.internal.render.getDataInBounds = function (viewArea) {
    "use strict";

    var i, r, c, vc, vr = 0,
        int = this.internal,
        sizes = int.sizes,
        render = int.render,
        physical = sizes.physical,
        virtual = sizes.virtual,
        cols = this.columns,
        runningX,
        runningY,
        cap,
        rowHeight = 0,
        visibleData = [],
        adjustments;

    runningY = viewArea.startY;

    for (r = viewArea.top || 0, i = 0; r < viewArea.bottom || 0; r += 1) {
        rowHeight = physical.getRowHeight.call(this, r);
        runningX = viewArea.startX || 0;
        vc = 0;
        for (c = viewArea.left || 0; c < viewArea.right || 0; c += 1) {

            // Check for and ignore any cells which are consumed by a merge
            if (!render.isMergeVictim.call(this, r + 1, c + 1)) {

                // Using direct assignment for speed
                visibleData[i] = {
                    x: Math.floor(runningX) + 0.5,
                    y: Math.floor(runningY) + 0.5,
                    visibleRow: vr,
                    visibleColumn: vc,
                    boxWidth: Math.ceil(cols[c].width),
                    boxHeight: Math.ceil(rowHeight),
                    textWidth: Math.ceil(cols[c].width),
                    textHeight: Math.ceil(rowHeight),
                    backgroundStyle: this.style.cellBackgroundPrefix + 'r' + (r + 1) + ' ' + this.style.cellBackgroundPrefix + 'c' + (c + 1),
                    foregroundStyle: this.style.cellForegroundPrefix + 'r' + (r + 1) + ' ' + this.style.cellForegroundPrefix + 'c' + (c + 1),
                    cellPadding: physical.cellPadding,
                    alignment: 'left',
                    rowIndex: r,
                    columnIndex: c,
                    column: cols[c],
                    columnSpan: 1,
                    rowSpan: 1,
                    formatter: null,
                    renderForeground: render.renderForeground,
                    renderBetween: null,
                    renderBackground: render.renderBackground
                };

                // Increment i
                i += 1;
            }
            vc += 1;
            runningX += cols[c].width;
        }
        vr += 1;
        runningY += rowHeight;
    }

    // Modify the data based on the user rules
    render.applyRules.call(this, visibleData);

    // This has to be done after applying rules as box size depends on column and row span rules
    for (i = 0; i < visibleData.length; i += 1) {

        // Get any measurement modifiers based on cell position of the bottom right of the span, capped at the
        // edge of the current fixed panel
        if (visibleData[i].rowIndex < virtual.top) {
            cap = virtual.top;
        } else if (visibleData[i].rowIndex < virtual.outerHeight - virtual.bottom) {
            cap = virtual.outerHeight - virtual.bottom;
        } else {
            cap = virtual.outerHeight;
        }
        r = Math.min(visibleData[i].rowIndex + (visibleData[i].rowSpan || 1) - 1, cap);

        if (visibleData[i].columnIndex < virtual.left) {
            cap = virtual.left;
        } else if (visibleData[i].columnIndex < virtual.outerWidth - virtual.right) {
            cap = virtual.outerWidth - virtual.right;
        } else {
            cap = virtual.outerWidth;
        }
        c = Math.min(visibleData[i].columnIndex + (visibleData[i].columnSpan || 1) - 1, cap);

        adjustments = render.calculateCellAdjustments.call(this, r, c);

        // Update data with adjustments
        visibleData[i].x += adjustments.x;
        visibleData[i].y += adjustments.y;
        visibleData[i].boxWidth += adjustments.boxWidth;
        visibleData[i].boxHeight += adjustments.boxHeight;
        visibleData[i].textWidth += adjustments.textWidth;
        visibleData[i].textHeight += adjustments.textHeight;
        visibleData[i].sortIcon = adjustments.sortIcon || 'none';

        // We abuse the key here, cells will be rendered on enter only, we therefore
        // want to key by any value which should result in a redraw of a particular cell,
        // this has huge performance benefits.
        visibleData[i].key = visibleData[i].columnIndex + '_' + visibleData[i].rowIndex + "_" + visibleData[i].boxHeight + "_" + visibleData[i].boxWidth + "_" + visibleData[i].sortIcon;
    }

    return visibleData;

};