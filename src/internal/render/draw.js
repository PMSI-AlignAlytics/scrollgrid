
// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/render/draw.js
Scrollgrid.prototype.internal.render.draw = function (clearCache, reviewSize) {
    "use strict";

    var int = this.internal,
        props = this.properties,
        elems = this.elements,
        physicalViewArea = int.render.getVisibleRegion.call(this),
        viewArea = int.render.getDataBounds.call(this, physicalViewArea),
        totalWidth,
        totalHeight,
        fixedSize = {},
        p = viewArea.physical,
        v = viewArea.virtual,
        y = {
            top: { top: 0, bottom: props.virtualTop },
            middle: { top: props.virtualTop + v.top, bottom: props.virtualTop + v.bottom },
            bottom: { top: props.virtualOuterHeight - props.virtualBottom, bottom: props.virtualOuterHeight }
        },
        x = {
            left: { left: 0, right: props.virtualLeft },
            middle: { left: props.virtualLeft + v.left, right: props.virtualLeft + v.right },
            right: { left: props.virtualOuterWidth - props.virtualRight, right: props.virtualOuterWidth }
        };

    // Draw the separate regions
    int.render.renderRegion.call(this, elems.top.left, {}, x.left, y.top, clearCache);
    int.render.renderRegion.call(this, elems.top, { x: p.x }, x.middle, y.top, clearCache);
    int.render.renderRegion.call(this, elems.top.right, {}, x.right, y.top, clearCache);
    int.render.renderRegion.call(this, elems.left, { y: p.y }, x.left, y.middle, clearCache);
    int.render.renderRegion.call(this, elems.main, { x: p.x, y: p.y }, x.middle, y.middle, clearCache);
    int.render.renderRegion.call(this, elems.right, { y: p.y }, x.right, y.middle, clearCache);
    int.render.renderRegion.call(this, elems.bottom.left, {}, x.left, y.bottom, clearCache);
    int.render.renderRegion.call(this, elems.bottom, { x: p.x }, x.middle, y.bottom, clearCache);
    int.render.renderRegion.call(this, elems.bottom.right, {}, x.right, y.bottom, clearCache);

    // Add resize handles
    if (props.allowColumnResizing) {
        int.interaction.addResizeHandles.call(this, elems.top.left, x.left);
        int.interaction.addResizeHandles.call(this, elems.top, x.middle, p.x);
        int.interaction.addResizeHandles.call(this, elems.top.right, x.right);
    }

    // Calculate if the rendering means that the width of the
    // whole table should change and layout accordingly, this only runs if the flag is set
    // this is because it can be slow to run when scrolling
    if (reviewSize) {
        totalWidth = (props.physicalLeft + props.physicalTotalInnerWidth + props.physicalRight + props.verticalScrollbarWidth);
        fixedSize.width = (totalWidth < elems.parent.node().offsetWidth ? totalWidth : null);
        totalHeight = (props.physicalTop + props.physicalTotalInnerHeight + props.physicalBottom + props.horizontalScrollbarHeight);
        fixedSize.height = (totalHeight < elems.parent.node().offsetHeight ? totalHeight : null);
        int.dom.layoutDOM.call(this, fixedSize);
    }

};
