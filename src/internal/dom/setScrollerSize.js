
// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/dom/setScrollerSize.js
Scrollgrid.prototype.internal.dom.setScrollerSize = function () {
    "use strict";

    var elems = this.elements,
        props = this.properties;

    elems.main.scroller
        .style('width', props.physicalTotalInnerWidth + 'px')
        .style('height', props.physicalTotalInnerHeight + 'px');

};
