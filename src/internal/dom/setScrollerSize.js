
    // Copyright: 2015 AlignAlytics
    // License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
    // Source: /src/internal/dom/setScrollerSize.js
    Scrollgrid.prototype.internal.dom.setScrollerSize = function () {
        var int = this.internal,
            dom = int.dom,
            sizes = int.sizes,
            physical = sizes.physical;

        // There is an inherent div size limit which varies by browser,
        // this is set to 1,000,000px here which should fall within any limit
        // this is reversed in the render.
        physical.scrollerWidth = Math.min(physical.totalInnerWidth, physical.divSizeLimit);
        physical.scrollerHeight = Math.min(physical.totalInnerHeight, physical.divSizeLimit);

        dom.main.scroller
            .style('width', physical.scrollerWidth + 'px')
            .style('height', physical.scrollerHeight + 'px');

    };