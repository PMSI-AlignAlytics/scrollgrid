
// Copyright: 2015 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/dom/getTopMargin.js
Scrollgrid.prototype.internal.dom.getTopMargin = function (containerSize, parent) {
    "use strict";

    var self = this,
        topMargin = 0,
        parentHeight;

    if (containerSize && containerSize.height && parent) {
        parentHeight = parent.node().offsetHeight;
        if (self.verticalAlignment === 'middle') {
            topMargin = ((parentHeight - containerSize.height) / 2);
        } else if (self.verticalAlignment === 'bottom') {
            topMargin = parentHeight - containerSize.height - 1;
        }
    }

    return topMargin;

};