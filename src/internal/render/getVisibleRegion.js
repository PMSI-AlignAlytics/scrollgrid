
    // Copyright: 2015 AlignAlytics
    // License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
    // Source: /src/internal/render/getVisibleRegion.js
    Scrollgrid.prototype.internal.render.getVisibleRegion = function () {

        var int = this.internal,
            sizes = int.sizes,
            physical = sizes.physical,
            dom = int.dom,
            visibleRegion;

        visibleRegion = {};

        // The calculation here needs to account for really large sizes (>1m rows) where the jump on scroll is larger
        // than the number of rows shown in the window.  The clauses using client bounds here are a means to ensure
        // that the extremity is shown on scroll to the end.  It is only really a psychological difference but an important one
        visibleRegion.left = Math.max(0, physical.totalInnerWidth - dom.main.viewport.node().clientWidth) * (dom.main.viewport.node().scrollLeft / (physical.scrollerWidth - dom.main.viewport.node().clientWidth));
        visibleRegion.top = Math.max(0, physical.totalInnerHeight - dom.main.viewport.node().clientHeight) * (dom.main.viewport.node().scrollTop / (physical.scrollerHeight - dom.main.viewport.node().clientHeight));
        visibleRegion.right = visibleRegion.left + dom.main.viewport.node().clientWidth;
        visibleRegion.bottom = visibleRegion.top + dom.main.viewport.node().clientHeight;

        return visibleRegion;

    };