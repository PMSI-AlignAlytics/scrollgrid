
// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/render/getTextPosition.js
Scrollgrid.prototype.internal.render.getTextPosition = function (d) {
    "use strict";

    var int = this.internal,
        render = int.render,
        x = 0;

    if (d.alignment === 'center') {
        x += d.textWidth / 2;
    } else if (d.alignment === 'right') {
        x += d.textWidth - d.cellPadding;
    } else {
        x += d.cellPadding;
        if (d.sortIcon && d.sortIcon !== 'none') {
            x += render.sortIconSize + d.cellPadding;
        }
    }

    return x;

};