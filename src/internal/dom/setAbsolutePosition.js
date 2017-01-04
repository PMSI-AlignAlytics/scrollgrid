
// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/dom/setAbsolutePosition.js
Scrollgrid.prototype.internal.dom.setAbsolutePosition = function (element, x, y, width, height) {
    "use strict";

    return element
        .style('position', 'absolute')
        .style('overflow', 'hidden')
        .style('left', x + 'px')
        .style('top', y + 'px')
        .style('width', width + 'px')
        .style('height', height + 'px');
};