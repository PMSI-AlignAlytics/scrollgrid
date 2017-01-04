
// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/render/renderBackground.js
Scrollgrid.prototype.internal.render.renderBackground = function (g, viewData) {
    "use strict";

    g.append("rect")
        .attr("class", viewData.backgroundStyle)
        .attr("width", viewData.boxWidth)
        .attr("height", viewData.boxHeight);

};