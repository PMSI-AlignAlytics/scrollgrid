
// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/render/renderBackground.js
Scrollgrid.prototype.internal.events.addEventHandlers = function (g, viewData) {
    "use strict";

    var i;

    g.attr("data-row", viewData.rowIndex)
        .attr("data-col", viewData.columnIndex);

    for (i = 0; i < this.eventHandlers.length; i += 1) {
        g.on(this.eventHandlers[i].type, this.eventHandlers[i].listener, this.eventHandlers[i].capture);
    }
};
