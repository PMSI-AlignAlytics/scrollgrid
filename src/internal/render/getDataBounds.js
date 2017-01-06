
// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/render/getDataBounds.js
Scrollgrid.prototype.internal.render.getDataBounds = function (physicalViewArea) {
    "use strict";

    var i,
        props = this.properties,
        cols = this.columns,
        runningX = 0,
        columnWidth,
        left,
        right,
        bounds = {
            physical: {
                x: 0,
                y: 0
            },
            virtual: {
                top: Math.max(Math.floor(props.virtualInnerHeight * (physicalViewArea.top / props.physicalTotalInnerHeight) - 1), 0),
                bottom: Math.min(Math.ceil(props.virtualInnerHeight * (physicalViewArea.bottom / props.physicalTotalInnerHeight) + 1), props.virtualInnerHeight)
            }
        };

    bounds.physical.y = bounds.virtual.top * props.rowHeight - physicalViewArea.top;
    for (i = 0; i < props.virtualInnerWidth; i += 1) {
        columnWidth = cols[i + props.virtualLeft].width;
        if (left === undefined && (i === props.virtualInnerWidth - 1 || runningX + columnWidth > physicalViewArea.left)) {
            left = i;
            bounds.physical.x = runningX - physicalViewArea.left;
        }
        if (right === undefined && (i === props.virtualInnerWidth - 1 || runningX + columnWidth > physicalViewArea.right)) {
            right = i + 1;
            break;
        }
        runningX += columnWidth;
    }

    bounds.virtual.left = Math.max(Math.floor(left), 0);
    bounds.virtual.right = Math.min(Math.ceil(right + 1), props.virtualInnerWidth);

    return bounds;

};
