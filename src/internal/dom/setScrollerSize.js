
// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/dom/setScrollerSize.js
Scrollgrid.prototype.internal.dom.setScrollerSize = function () {
    "use strict";

    var int = this.internal,
        dom = int.dom,
        sizes = int.sizes,
        physical = sizes.physical;

    dom.main.scroller
        .style('width', physical.totalInnerWidth + 'px')
        .style('height', physical.totalInnerHeight + 'px');

};