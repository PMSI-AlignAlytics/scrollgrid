
// Copyright: 2015 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/interaction/autoResizeColumn.js
Scrollgrid.prototype.internal.interaction.autoResizeColumn = function (column) {
    "use strict";

    var int = this.internal,
        dom = int.dom,
        sizes = int.sizes,
        panels = [dom.top.left, dom.top, dom.top.right, dom.left, dom.main, dom.right, dom.bottom.left, dom.bottom, dom.bottom.right],
        i;

    // Do not allow the width to be less than 0
    column.width = 0;

    // Get the widest from the various panels (some panels may not apply to the given cell but those panels will return zero anyway)
    for (i = 0; i < panels.length; i += 1) {
        column.width = Math.max(column.width, sizes.getExistingTextBound.call(this, panels[i].svg, column.index).width);
    }

    // Update the container size because the width will have changed
    this.refresh(true);

};
