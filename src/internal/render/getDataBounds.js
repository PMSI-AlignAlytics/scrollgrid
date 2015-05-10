
    // Copyright: 2015 AlignAlytics
    // License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
    // Source: /src/internal/render/getDataBounds.js
    Scrollgrid.prototype.internal.render.getDataBounds = function (physicalViewArea) {

        var i,
            int = this.internal,
            cols = this.columns,
            sizes = int.sizes,
            virtual = sizes.virtual,
            physical = sizes.physical,
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

        return bounds;

    };