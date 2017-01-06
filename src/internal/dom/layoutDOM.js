
// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/dom/layoutDOM.js
Scrollgrid.prototype.internal.dom.layoutDOM = function (fixedSize) {
    "use strict";

    var self = this,
        int = self.internal,
        props = self.properties,
        elems = self.elements,
        topMargin;

    // This is required so content can size relative to it
    elems.parent
        .style('position', 'relative');

    topMargin = int.dom.getTopMargin.call(self, fixedSize, elems.parent);

    elems.container
        .style('position', 'relative')
        .style('width', (fixedSize && fixedSize.width ? fixedSize.width + 'px' : '100%'))
        .style('height', (fixedSize && fixedSize.height ? (fixedSize.height) + 'px' : '100%'))
        .style('padding-top', topMargin + 'px')
        .style('font-size', 0);

    // If the fixed size is too great, reset to 100%, this gives the effect of
    // pinning the edges when they reach the limit of available space
    if (elems.container.node().offsetWidth > elems.parent.node().offsetWidth) {
        elems.container.style('width', '100%');
    }
    if (elems.container.node().offsetHeight > elems.parent.node().offsetHeight) {
        elems.container
            .style('margin-top', '0px')
            .style('height', '100%');
    }

    // Set the physical dimensions of the various data elements in memory
    int.sizes.calculatePhysicalBounds.call(self, topMargin);

    // Set all panels
    int.dom.setAbsolutePosition.call(self, elems.left.svg, 0, props.physicalTop + topMargin, props.physicalLeft, props.physicalVisibleInnerHeight);
    int.dom.setRelativePosition.call(self, elems.top.svg, props.physicalLeft, props.physicalVisibleInnerWidth, props.physicalTop, 'hidden');
    int.dom.setRelativePosition.call(self, elems.main.viewport, props.physicalLeft, props.physicalVisibleInnerWidth, props.physicalVisibleInnerHeight, 'auto');
    int.dom.setAbsolutePosition.call(self, elems.right.svg, props.physicalLeft + props.physicalVisibleInnerWidth, props.physicalTop + topMargin, props.physicalRight, props.physicalVisibleInnerHeight);
    int.dom.setRelativePosition.call(self, elems.bottom.svg, props.physicalLeft, props.physicalVisibleInnerWidth, props.physicalBottom, 'hidden');
    int.dom.setAbsolutePosition.call(self, elems.top.left.svg, 0, topMargin, props.physicalLeft + props.dragHandleWidth / 2, props.physicalTop);
    int.dom.setAbsolutePosition.call(self, elems.top.right.svg, props.physicalLeft + props.physicalVisibleInnerWidth - props.dragHandleWidth / 2, topMargin, props.physicalRight + props.dragHandleWidth / 2, props.physicalTop);
    int.dom.setAbsolutePosition.call(self, elems.bottom.left.svg, 0, props.physicalTop + props.physicalVisibleInnerHeight + topMargin, props.physicalLeft, props.physicalBottom);
    int.dom.setAbsolutePosition.call(self, elems.bottom.right.svg, props.physicalLeft + props.physicalVisibleInnerWidth, props.physicalTop + props.physicalVisibleInnerHeight + topMargin,  props.physicalRight, props.physicalBottom);
    int.dom.setAbsolutePosition.call(self, elems.main.svg, props.physicalLeft, props.physicalTop + topMargin, props.physicalVisibleInnerWidth, props.physicalVisibleInnerHeight);

    // Style all panels
    int.dom.stylePanels.call(this, this.style);

    // Top right panel needs a small offset for the handle
    elems.top.right.transform.attr('transform', 'translate(' + props.dragHandleWidth / 2 + ', 0)');

    // Invoke draw on scroll
    elems.main.viewport.on('scroll', function () { int.render.draw.call(self, false, false); });

    // Invoke eventHandlers of the target group behind the main viewport
    int.dom.redirectViewportEvents.call(self);

    // Set the scrollable area
    int.dom.setScrollerSize.call(self);

    // Get the scroll bar bounds
    props.verticalScrollbarWidth = elems.main.viewport.node().offsetWidth - elems.main.viewport.node().clientWidth;
    props.horizontalScrollbarHeight = elems.main.viewport.node().offsetHeight - elems.main.viewport.node().clientHeight;

};
