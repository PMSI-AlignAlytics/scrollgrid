
// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/interaction/addSortButtons.js
Scrollgrid.prototype.internal.interaction.addSortButtons = function (g, viewData) {
    "use strict";

    var self = this,
        int = this.internal;

    g.append("rect")
        .attr("width", viewData.boxWidth)
        .attr("height", viewData.boxHeight)
        .style("opacity", 0)
        .style("cursor", "pointer")
        .on("click", function () { return int.interaction.sortColumn.call(self, viewData.columnIndex, true); });

};
