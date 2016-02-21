
// Copyright: 2015 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/render/renderForeground.js
Scrollgrid.prototype.internal.render.renderForeground = function (g, viewData) {
    "use strict";

    var self = this,
        int = self.internal,
        render = int.render,
        text;

    text = g.append("text")
        .attr("class", viewData.foregroundStyle)
        .attr("dy", "0.35em")
        .attr("x", render.getTextPosition.call(self, viewData))
        .attr("y", viewData.textHeight / 2)
        .style("text-anchor", render.getTextAnchor.call(self, viewData))
        .text(self.cellWaitText);

    viewData.getValue(viewData.rowIndex, viewData.columnIndex, function (value) {
        if (viewData.formatter) {
            text.text(viewData.formatter(value));
        } else {
            text.text(value);
        }
        render.cropText.call(self, text, viewData.textWidth - viewData.cellPadding - (!(!viewData.sortIcon || viewData.sortIcon === 'none') ? self.sortIconSize + viewData.cellPadding : 0));
    });

};