
// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/interaction/getColumnResizer.js
Scrollgrid.prototype.internal.interaction.getColumnResizer = function () {
    "use strict";

    var int = this.internal,
        self = this;

    return d3.behavior.drag()
        .origin(function (c) { return c; })
        .on('dragstart', function () { int.interaction.columnResizeStart.call(self, d3.select(this)); })
        .on('drag', function (c) { int.interaction.columnResizing.call(self, d3.select(this), c); })
        .on('dragend', function () { int.interaction.columnResizeEnd.call(self, d3.select(this)); });

};
