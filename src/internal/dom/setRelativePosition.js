
    // Copyright: 2015 AlignAlytics
    // License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
    // Source: /src/internal/dom/setRelativePosition.js
    Scrollgrid.prototype.internal.dom.setRelativePosition = function (element, x, width, height, overflow) {
        return element
            .style('overflow', overflow)
            .style('position', 'relative')
            .style('margin-left', x)
            .style('width', width + 'px')
            .style('height', height + 'px');
    };