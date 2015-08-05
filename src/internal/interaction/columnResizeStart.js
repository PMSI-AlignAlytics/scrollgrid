
// Copyright: 2015 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/interaction/columnResizeStart.js
Scrollgrid.prototype.internal.interaction.columnResizeStart = function (shape) {
    "use strict";

    d3.event.sourceEvent.stopPropagation();
    shape.classed('dragging', true);

};