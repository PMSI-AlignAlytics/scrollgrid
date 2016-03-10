
// Copyright: 2015 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/render/renderForeground.js
Scrollgrid.prototype.internal.render.renderForeground = function (g, viewData) {
    "use strict";

    var self = this,
        int = self.internal,
        render = int.render,
        text;

    // Clear any existing text
    g.selectAll(".sg-no-style--text-selector").remove();

    text = g.append("text")
        .attr("class", "sg-no-style--text-selector " + viewData.foregroundStyle)
        .attr("dy", "0.35em")
        .attr("x", render.getTextPosition.call(self, viewData))
        .attr("y", viewData.textHeight / 2)
        .style("text-anchor", render.getTextAnchor.call(self, viewData));

    if (viewData.formatter) {
        text.text(viewData.formatter(viewData.value));
    } else {
        text.text(viewData.value);
    }
    render.cropText.call(this, text, viewData.textWidth - viewData.cellPadding - (!(!viewData.sortIcon || viewData.sortIcon === 'none') ? render.sortIconSize + viewData.cellPadding : 0));

};