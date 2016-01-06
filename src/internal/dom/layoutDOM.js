
// Copyright: 2015 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/dom/layoutDOM.js
Scrollgrid.prototype.internal.dom.layoutDOM = function (fixedSize) {
    "use strict";

    var self = this,
        int = self.internal,
        dom = int.dom,
        sizes = int.sizes,
        render = int.render,
        physical = sizes.physical,
        topMargin;

    // This is required so content can size relative to it
    dom.parent
        .style('position', 'relative');

    topMargin = dom.getTopMargin.call(self, fixedSize, dom.parent);

    dom.container
        .style('position', 'relative')
        .style('width', (fixedSize && fixedSize.width ? fixedSize.width + 'px' : '100%'))
        .style('height', (fixedSize && fixedSize.height ? (fixedSize.height) + 'px' : '100%'))
        .style('padding-top', topMargin + 'px')
        .style('font-size', 0);

    // If the fixed size is too great, reset to 100%, this gives the effect of
    // pinning the edges when they reach the limit of available space
    if (dom.container.node().offsetWidth > dom.parent.node().offsetWidth) {
        dom.container.style('width', '100%');
    }
    if (dom.container.node().offsetHeight > dom.parent.node().offsetHeight) {
        dom.container
            .style('margin-top', '0px')
            .style('height', '100%');
    }

    // Set the physical dimensions of the various data elements in memory
    sizes.calculatePhysicalBounds.call(self, topMargin);

    // Set all panels
    dom.setAbsolutePosition.call(self, dom.left.svg, 0, physical.top + topMargin, physical.left, physical.visibleInnerHeight);
    dom.setRelativePosition.call(self, dom.top.svg, physical.left, physical.visibleInnerWidth, physical.top, 'hidden');
    dom.setRelativePosition.call(self, dom.main.viewport, physical.left, physical.visibleInnerWidth, physical.visibleInnerHeight, 'auto');
    dom.setAbsolutePosition.call(self, dom.right.svg, physical.left + physical.visibleInnerWidth, physical.top + topMargin, physical.right, physical.visibleInnerHeight);
    dom.setRelativePosition.call(self, dom.bottom.svg, physical.left, physical.visibleInnerWidth, physical.bottom, 'hidden');
    dom.setAbsolutePosition.call(self, dom.top.left.svg, 0, topMargin, physical.left + physical.dragHandleWidth / 2, physical.top);
    dom.setAbsolutePosition.call(self, dom.top.right.svg, physical.left + physical.visibleInnerWidth - physical.dragHandleWidth / 2, topMargin, physical.right + physical.dragHandleWidth / 2, physical.top);
    dom.setAbsolutePosition.call(self, dom.bottom.left.svg, 0, physical.top + physical.visibleInnerHeight + topMargin, physical.left, physical.bottom);
    dom.setAbsolutePosition.call(self, dom.bottom.right.svg, physical.left + physical.visibleInnerWidth, physical.top + physical.visibleInnerHeight + topMargin,  physical.right, physical.bottom);
    dom.setAbsolutePosition.call(self, dom.main.svg, physical.left, physical.top + topMargin,  physical.visibleInnerWidth, physical.visibleInnerHeight);

    // Style all panels
    dom.stylePanels.call(this, this.style);

    // Top right panel needs a small offset for the handle
    dom.top.right.transform.attr('transform', 'translate(' + physical.dragHandleWidth / 2 + ', 0)');

    // Invoke draw on scroll
    dom.main.viewport.on('scroll', function () { render.draw.call(self, false); });

    // Set the scrollable area
    dom.setScrollerSize.call(self);

    // Get the scroll bar bounds
    physical.verticalScrollbarWidth = dom.main.viewport.node().offsetWidth - dom.main.viewport.node().clientWidth;
    physical.horizontalScrollbarHeight = dom.main.viewport.node().offsetHeight - dom.main.viewport.node().clientHeight;

};