
// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/dom/getTopMargin.js
Scrollgrid.prototype.internal.dom.getTopMargin = function (containerSize, parent) {
    "use strict";

    var props = this.properties,
        topMargin = 0,
        parentHeight;

    if (containerSize && containerSize.height && parent) {
        if (props.verticalAlignment === 'middle') {
            // This is duplicated in the conditions rather than outside the if because
            // it is costly and will not be used for most tables
            parentHeight = parent.node().offsetHeight;
            topMargin = ((parentHeight - containerSize.height) / 2);
        } else if (props.verticalAlignment === 'bottom') {
            // This is duplicated in the conditions rather than outside the if because
            // it is costly and will not be used for most tables
            parentHeight = parent.node().offsetHeight;
            topMargin = parentHeight - containerSize.height - 1;
        }
    }

    return topMargin;

};
