
// Copyright: 2015 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/render/renderSortIcon.js
Scrollgrid.prototype.internal.render.renderSortIcon = function (d, target, sorted) {
    "use strict";

    var self = this,
        int = self.internal,
        render = int.render;

    if (sorted && d.textWidth > d.cellPadding + self.sortIconSize) {
        target.append("g")
            .datum(d.sortIcon)
            .attr("class", "sg-no-style--sort-icon-selector")
            .attr("transform", "translate(" + (d.cellPadding + self.sortIconSize / 2) + "," + (d.textHeight / 2) + ")")
            .call(function (d) { return render.sortIcon.call(self, d); });
    }

};