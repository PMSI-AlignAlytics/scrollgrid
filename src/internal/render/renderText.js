
    // Copyright: 2015 AlignAlytics
    // License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
    // Source: /src/internal/render/renderText.js
    Scrollgrid.prototype.internal.render.renderText = function (d, target, sorted) {
        var int = this.internal,
            render = int.render;
        d.getValue(d.rowIndex, d.columnIndex, function (value) {
            if (d.formatter) {
                target.text(d.formatter(value));
            } else {
                target.text(value);
            }
            render.cropText.call(this, target, d.textWidth - d.cellPadding - (sorted ? render.sortIconSize + d.cellPadding : 0));
        });
    };