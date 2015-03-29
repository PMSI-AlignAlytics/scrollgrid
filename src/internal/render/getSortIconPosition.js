
    // Copyright: 2015 AlignAlytics
    // License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
    // Source: /src/internal/render/getSortIconPosition.js
    Scrollgrid.prototype.internal.render.getSortIconPosition = function (d) {
        var int = this.internal,
            render = int.render,
            x = d.x;
        if (d.alignment === 'right') {
            x += d.textWidth - d.cellPadding - render.sortIconSize / 2;
        } else {
            x += d.cellPadding + render.sortIconSize / 2;
        }
        return x;
    };