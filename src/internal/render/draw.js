
// Copyright: 2015 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/render/draw.js
Scrollgrid.prototype.internal.render.draw = function (clearCache) {
    "use strict";

    var self = this,
        int = self.internal,
        render = int.render,
        interaction = int.interaction,
        sizes = int.sizes,
        dom = int.dom,
        virtual = sizes.virtual,
        physical = sizes.physical,
        physicalViewArea = render.getVisibleRegion.call(self),
        viewArea = render.getDataBounds.call(self, physicalViewArea),
        totalWidth,
        totalHeight,
        fixedSize = {},
        p = viewArea.physical,
        v = viewArea.virtual,
        y = {
            top: { top: 0, bottom: self.headerRows },
            middle: { top: self.headerRows + v.top, bottom: self.headerRows + v.bottom },
            bottom: { top: virtual.outerHeight - self.footerRows, bottom: virtual.outerHeight }
        },
        x = {
            left: { left: 0, right: self.headerColumns },
            middle: { left: self.headerColumns + v.left, right: self.headerColumns + v.right },
            right: { left: virtual.outerWidth -  self.footerColumns, right: virtual.outerWidth }
        };

    // Draw the separate regions
    render.renderRegion.call(self, dom.top.left, {}, x.left, y.top, clearCache);
    render.renderRegion.call(self, dom.top, { x: p.x }, x.middle, y.top, clearCache);
    render.renderRegion.call(self, dom.top.right, {}, x.right, y.top, clearCache);
    render.renderRegion.call(self, dom.left, { y: p.y }, x.left, y.middle, clearCache);
    render.renderRegion.call(self, dom.main, { x: p.x, y: p.y }, x.middle, y.middle, clearCache);
    render.renderRegion.call(self, dom.right, { y: p.y }, x.right, y.middle, clearCache);
    render.renderRegion.call(self, dom.bottom.left, {}, x.left, y.bottom, clearCache);
    render.renderRegion.call(self, dom.bottom, { x: p.x }, x.middle, y.bottom, clearCache);
    render.renderRegion.call(self, dom.bottom.right, {}, x.right, y.bottom, clearCache);

    // Add resize handles
    interaction.addResizeHandles.call(self, dom.top.left, x.left);
    interaction.addResizeHandles.call(self, dom.top, x.middle, p.x);
    interaction.addResizeHandles.call(self, dom.top.right, x.right);

    // Calculate if the rendering means that the width of the
    // whole table should change and layout accordingly
    totalWidth = (physical.left + physical.totalInnerWidth + physical.right + physical.verticalScrollbarWidth);
    fixedSize.width = (totalWidth < dom.parent.node().offsetWidth ? totalWidth : null);
    totalHeight = (physical.top + physical.totalInnerHeight + physical.bottom + physical.horizontalScrollbarHeight);
    fixedSize.height = (totalHeight < dom.parent.node().offsetHeight ? totalHeight : null);
    dom.layoutDOM.call(self, fixedSize);

};