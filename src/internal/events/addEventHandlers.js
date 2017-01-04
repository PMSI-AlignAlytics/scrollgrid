
// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/render/renderBackground.js
Scrollgrid.prototype.internal.events.addEventHandlers = function (g, viewData) {
    "use strict";

    var self = this,
        int = self.internal,
        eventHandlers = int.eventHandlers,
        n = eventHandlers.length,
        i,
        eventHandler;

    g.attr("data-row", viewData.rowIndex)
        .attr("data-col", viewData.columnIndex);

    for (i = 0; i < n; i += 1) {
        eventHandler = eventHandlers[i];
        g.on(eventHandler.type, eventHandler.listener, eventHandler.capture);
    }
};


