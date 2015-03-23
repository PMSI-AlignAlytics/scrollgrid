
    // Copyright: 2015 AlignAlytics
    // License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
    // Source: /src/internal/interaction/columnResizing.js
    Scrollgrid.prototype.internal.interaction.columnResizing = function (shape, d, invert) {

        // Some resize handle should be inverted
        if (invert) {
            d.column.width += d.x - d3.event.x;
        } else {
            d.column.width -= d.x - d3.event.x;
        }

        // Update the x coordinate for the drag
        d.x = d3.event.x;

        // If the column width is below 0 reset it, negative widths cause problems
        if (d.column.width < 0) {
            d.column.width = 0;
        }

        // Move the drag handle itself
        shape.attr('x', d.x);

        // Update the container size because the width will have changed
        this.internal.dom.layoutDOM.call(this);

        // Redraw
        this.draw();

    };