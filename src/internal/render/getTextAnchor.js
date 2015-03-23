
    // Copyright: 2015 AlignAlytics
    // License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
    // Source: /src/internal/render/getTextAnchor.js
    Scrollgrid.prototype.internal.render.getTextAnchor = function (d) {
        var anchor = 'start';
        if (d.alignment === 'center') {
            anchor = 'middle';
        } else if (d.alignment === 'right') {
            anchor = 'end';
        }
        return anchor;
    };