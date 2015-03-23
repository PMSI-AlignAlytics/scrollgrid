
    // Copyright: 2015 AlignAlytics
    // License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
    // Source: /src/internal/render/getTextPosition.js
    Scrollgrid.prototype.internal.render.getTextPosition = function (d) {
        var x = d.x;
        if (d.alignment === 'center') {
            x += d.width / 2;
        } else if (d.alignment === 'right') {
            x += d.width - d.cellPadding;
        } else {
            x += d.cellPadding;
        }
        return x;
    };