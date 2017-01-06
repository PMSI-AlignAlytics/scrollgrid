
// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/render/getVisibleRegion.js
Scrollgrid.prototype.internal.render.getVisibleRegion = function () {
    "use strict";

    var elems = this.elements,
        visibleRegion;

    visibleRegion = {};

    visibleRegion.left = elems.main.viewport.node().scrollLeft;
    visibleRegion.top = elems.main.viewport.node().scrollTop;
    visibleRegion.right = visibleRegion.left + elems.main.viewport.node().clientWidth;
    visibleRegion.bottom = visibleRegion.top + elems.main.viewport.node().clientHeight;

    return visibleRegion;

};
