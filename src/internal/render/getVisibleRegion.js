
// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/render/getVisibleRegion.js
Scrollgrid.prototype.internal.render.getVisibleRegion = function () {
    "use strict";

    var int = this.internal,
        dom = int.dom,
        visibleRegion;

    visibleRegion = {};

    visibleRegion.left = dom.main.viewport.node().scrollLeft;
    visibleRegion.top = dom.main.viewport.node().scrollTop;
    visibleRegion.right = visibleRegion.left + dom.main.viewport.node().clientWidth;
    visibleRegion.bottom = visibleRegion.top + dom.main.viewport.node().clientHeight;

    return visibleRegion;

};