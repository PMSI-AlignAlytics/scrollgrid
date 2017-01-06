
// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/render/renderSortIcon.js
Scrollgrid.prototype.internal.render.renderSortIcon = function (d, target, sorted) {
    "use strict";

    var self = this,
        int = this.internal,
        props = this.properties;

    if (sorted && d.textWidth > d.cellPadding + props.sortIconSize) {
        target.append("g")
            .datum(d.sortIcon)
            .attr("class", "sg-no-style--sort-icon-selector")
            .attr("transform", "translate(" + (d.cellPadding + props.sortIconSize / 2) + "," + (d.textHeight / 2) + ")")
            .call(function (d) { return int.render.sortIcon.call(self, d); });
    }

};
