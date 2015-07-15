
    // Copyright: 2015 AlignAlytics
    // License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
    // Source: /src/internal/interaction/columnResizing.js
    Scrollgrid.prototype.internal.interaction.columnResizing = function (shape, column) {

        // Some resize handle should be inverted
        column.width -= column.x - d3.event.x;

        // Update the x coordinate for the drag
        column.x = d3.event.x;

        // If the column width is below 0 reset it, negative widths cause problems
        if (column.width < 0) {
            column.width = 0;
        }

        // Move the drag handle itself
        shape.attr('x', column.x);

        // Redraw
        this.refresh(true);

    };