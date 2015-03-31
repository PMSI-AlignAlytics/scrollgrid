
    // Copyright: 2015 AlignAlytics
    // License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
    // Source: /src/internal/dom/getTopMargin.js
    Scrollgrid.prototype.internal.dom.getTopMargin = function (containerSize, parent) {

        var int = this.internal,
            sizes = int.sizes,
            physical = sizes.physical,
            topMargin = 0,
            parentHeight;

        if (containerSize && containerSize.height && parent) {
            parentHeight = parent.node().offsetHeight;
            if (physical.verticalAlignment === 'middle') {
                topMargin = ((parentHeight - containerSize.height) / 2);
            } else if (physical.verticalAlignment === 'bottom') {
                topMargin = parentHeight - containerSize.height - 1;
            }
        }

        return topMargin;

    };