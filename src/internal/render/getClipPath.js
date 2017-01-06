
// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/render/getClipPath.js
Scrollgrid.prototype.internal.render.getClipPath = function (viewData) {
    "use strict";
    var right = (viewData.textWidth - viewData.cellPadding - (!(!viewData.sortIcon || viewData.sortIcon === 'none') ? this.properties.sortIconSize + viewData.cellPadding : 0)) + "px",
        bottom = (viewData.textHeight - viewData.cellPadding) + "px";
    return "polygon(0px 0px, " + right + " 0px, " + right + " " + bottom + ", 0px " + bottom + ")";
};
