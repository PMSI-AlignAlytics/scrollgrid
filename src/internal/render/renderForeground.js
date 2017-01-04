
// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/render/renderForeground.js
Scrollgrid.prototype.internal.render.renderForeground = function (g, viewData) {
    "use strict";

    var self = this,
        int = self.internal,
        render = int.render,
        path,
        text;

    // Clear any existing text
    g.selectAll(".sg-no-style--text-selector").remove();

    text = g.append("text")
        .attr("class", "sg-no-style--text-selector " + viewData.foregroundStyle)
        .attr("dy", "0.35em")
        .attr("x", render.getTextPosition.call(self, viewData))
        .attr("y", viewData.textHeight / 2)
        .style("text-anchor", render.getTextAnchor.call(self, viewData))
        .style("clip-path", render.getClipPath.call(self, viewData));

    if (viewData.formatter) {
        text.text(viewData.formatter(viewData.value));
    } else {
        text.text(viewData.value);
    }

    path = text.node().style.clipPath;
    // If the new clip path css doesn't work (I'm looking at you IE and Firefox) revert to the slower method
    if (!path || path === "") {
        render.cropText.call(self, text, viewData.textWidth - viewData.cellPadding - (!(!viewData.sortIcon || viewData.sortIcon === 'none') ? render.sortIconSize + viewData.cellPadding : 0));
    }
};
