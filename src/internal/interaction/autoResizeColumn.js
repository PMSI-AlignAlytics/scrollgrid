
// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/interaction/autoResizeColumn.js
Scrollgrid.prototype.internal.interaction.autoResizeColumn = function (column) {
    "use strict";

    var int = this.internal,
        elems = this.elements,
        panels = [elems.top.left, elems.top, elems.top.right, elems.left, elems.main, elems.right, elems.bottom.left, elems.bottom, elems.bottom.right],
        i;

    // Do not allow the width to be less than 0
    column.width = 0;

    // Get the widest from the various panels (some panels may not apply to the given cell but those panels will return zero anyway)
    for (i = 0; i < panels.length; i += 1) {
        column.width = Math.max(column.width, int.sizes.getExistingTextBound.call(this, panels[i].svg, column.index).width);
    }

    // Update the container size because the width will have changed
    this.refresh(true);

};
