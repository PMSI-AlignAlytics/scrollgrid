
// Copyright: 2015 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/render/sortIcon.js
Scrollgrid.prototype.internal.render.sortIcon = function (group) {
    "use strict";

    var int = this.internal,
        render = int.render,
        size = render.sortIconSize,
        icon = group.append("path").attr("class", this.style.sortIcon);

    if (group.datum() === 'asc') {
        icon.attr("d", "M " + (size / 2) + " 0 L " + size + " " + size + " L 0 " + size + " z");
    } else if (group.datum() === 'desc') {
        icon.attr("d", "M 0 0 L " + size + " 0 L " + (size / 2) + " " + size + " z");
    }

    // Center it around zero
    icon.attr("transform", "translate(" + icon.node().getBBox().width / -2 + "," + icon.node().getBBox().height / -2 + ")");

};