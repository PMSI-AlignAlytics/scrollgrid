
// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/dom/setRelativePosition.js
Scrollgrid.prototype.internal.dom.setRelativePosition = function (element, x, width, height, overflow) {
    "use strict";

    return element
        .style('overflow', overflow)
        .style('position', 'relative')
        .style('margin-left', x + 'px')
        .style('width', width + 'px')
        .style('height', height + 'px');
};