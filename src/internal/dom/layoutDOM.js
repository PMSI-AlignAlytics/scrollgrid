
    // Copyright: 2015 AlignAlytics
    // License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
    // Source: /src/internal/dom/layoutDOM.js
    Scrollgrid.prototype.internal.dom.layoutDOM = function (fixedSize) {

        var int = this.internal,
            dom = int.dom,
            sizes = int.sizes,
            physical = sizes.physical;

        // This is required so content can size relative to it
        dom.parent
            .style('position', 'relative');

        dom.container
            .style('position', 'relative')
            .style('width', (fixedSize && fixedSize.width ? fixedSize.width + 'px' : '100%'))
            .style('height', (fixedSize && fixedSize.height ? fixedSize.height + 'px' : '100%'))
            .style('font-size', 0);

        // If the fixed size is too great, reset to 100%, this gives the effect of
        // pinning the edges when they reach the limit of available space
        if (dom.container.node().offsetWidth > dom.parent.node().offsetWidth) {
            dom.container.style('width', '100%');
        }
        if (dom.container.node().offsetHeight > dom.parent.node().offsetHeight) {
            dom.container.style('height', '100%');
        }

        // Set the physical dimensions of the various data elements in memory
        sizes.calculatePhysicalBounds.call(this);

        // Set all panels
        dom.setAbsolutePosition.call(this, dom.left.svg, 0, physical.top, physical.left, physical.visibleInnerHeight);
        dom.setRelativePosition.call(this, dom.top.svg, physical.left, physical.visibleInnerWidth, physical.top, 'hidden');
        dom.setRelativePosition.call(this, dom.main.viewport, physical.left, physical.visibleInnerWidth, physical.visibleInnerHeight, 'auto');
        dom.setAbsolutePosition.call(this, dom.right.svg, physical.left + physical.visibleInnerWidth, physical.top, physical.right, physical.visibleInnerHeight);
        dom.setRelativePosition.call(this, dom.bottom.svg, physical.left, physical.visibleInnerWidth, physical.bottom, 'hidden');
        dom.setAbsolutePosition.call(this, dom.top.left.svg, 0, 0, physical.left + physical.dragHandleWidth / 2, physical.top);
        dom.setAbsolutePosition.call(this, dom.top.right.svg, physical.left + physical.visibleInnerWidth - physical.dragHandleWidth / 2, 0, physical.right + physical.dragHandleWidth / 2, physical.top);
        dom.setAbsolutePosition.call(this, dom.bottom.left.svg, 0, physical.top + physical.visibleInnerHeight, physical.left, physical.bottom);
        dom.setAbsolutePosition.call(this, dom.bottom.right.svg, physical.left + physical.visibleInnerWidth, physical.top + physical.visibleInnerHeight,  physical.right, physical.bottom);
        dom.setAbsolutePosition.call(this, dom.main.svg, physical.left, physical.top,  physical.visibleInnerWidth, physical.visibleInnerHeight);

        // Top right panel needs a small offset for the handle
        dom.top.right.transform.attr('transform', 'translate(' + physical.dragHandleWidth / 2 + ', 0)');

        // Invoke draw on scroll
        dom.main.viewport.on('scroll', this.draw.bind(this));

        // Set the scrollable area
        dom.setScrollerSize.call(this);

        // Get the scroll bar bounds
        physical.verticalScrollbarWidth = dom.main.viewport.node().offsetWidth - dom.main.viewport.node().clientWidth;
        physical.horizontalScrollbarHeight = dom.main.viewport.node().offsetHeight - dom.main.viewport.node().clientHeight;

    };