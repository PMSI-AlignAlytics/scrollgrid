
// Copyright: 2015 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/interaction/getColumnResizer.js
Scrollgrid.prototype.internal.interaction.getColumnResizer = function () {
    "use strict";

    var int = this.internal,
        interaction = int.interaction,
        self = this;

    return d3.behavior.drag()
        .origin(function (c) { return c; })
        .on('dragstart', function () { interaction.columnResizeStart.call(self, d3.select(this)); })
        .on('drag', function (c) { interaction.columnResizing.call(self, d3.select(this), c); })
        .on('dragend', function () { interaction.columnResizeEnd.call(self, d3.select(this)); });

};