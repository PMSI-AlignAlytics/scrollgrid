
// Copyright: 2015 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/render/getDataBounds.js
Scrollgrid.prototype.internal.render.getDataBounds = function (physicalViewArea) {
    "use strict";

    var i,
        int = this.internal,
        cols = this.columns,
        sizes = int.sizes,
        virtual = sizes.virtual,
        physical = sizes.physical,
        render = int.render,
        runningX = 0,
        rule,
        columnWidth,
        left,
        right,
        bounds = {
            physical: {
                x: 0,
                y: 0
            },
            virtual: {
                top: Math.max(Math.floor(virtual.innerHeight * (physicalViewArea.top / physical.totalInnerHeight) - 1), 0),
                bottom: Math.min(Math.ceil(virtual.innerHeight * (physicalViewArea.bottom / physical.totalInnerHeight) + 1), virtual.innerHeight)
            }
        };

    bounds.physical.y = bounds.virtual.top * physical.rowHeight - physicalViewArea.top;
    for (i = 0; i < virtual.innerWidth; i += 1) {
        columnWidth = cols[i + virtual.left].width;
        if (left === undefined && (i === virtual.innerWidth - 1 || runningX + columnWidth > physicalViewArea.left)) {
            left = i;
            bounds.physical.x = runningX - physicalViewArea.left;
        }
        if (right === undefined && (i === virtual.innerWidth - 1 || runningX + columnWidth > physicalViewArea.right)) {
            right = i + 1;
            break;
        }
        runningX += columnWidth;
    }

    bounds.virtual.left = Math.max(Math.floor(left), 0);
    bounds.virtual.right = Math.min(Math.ceil(right + 1), virtual.innerWidth);

    // Check for rules with spans intersecting the top or left edges of the bounds and stretch accordingly
    // We don't need to stretch the bottom or right as the top left cell in each case contains the information
    // we are interested in
    if (render.formatRules) {
        i = 0;
        while (i < render.formatRules.length && bounds.virtual.left > 0) {
            rule = render.formatRules[i];
            // If the left hand edge matches a span push the bound out by one and run the same rule again.  There is no
            // need to recheck earlier rules as the bounds will only move in one direction
            if (rule.columnSpan && render.matchRule.call(this, rule.column, bounds.virtual.left, virtual.outerWidth, rule.columnSpan)) {
                bounds.virtual.left -= 1;
                bounds.physical.x -= cols[bounds.virtual.left].width;
            } else {
                i += 1;
            }
        }
        i = 0;
        while (i < render.formatRules.length && bounds.virtual.top > 0) {
            rule = render.formatRules[i];
            // If the left hand edge matches a span push the bound out by one and run the same rule again.  There is no
            // need to recheck earlier rules as the bounds will only move in one direction
            if (rule.rowSpan && render.matchRule.call(this, rule.row, bounds.virtual.top, virtual.outerHeight, rule.rowSpan)) {
                bounds.virtual.top -= 1;
                bounds.physical.y -= physical.getRowHeight.call(this, bounds.virtual.top);
            } else {
                i += 1;
            }
        }
    }

    return bounds;

};
