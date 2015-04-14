
    // Copyright: 2015 AlignAlytics
    // License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
    // Source: /src/internal/interaction/autoResizeColumn.js
    Scrollgrid.prototype.internal.interaction.autoResizeColumn = function (d) {

        var int = this.internal,
            dom = int.dom,
            widestInView = 0,
            sizes = int.sizes;

        if (d.column) {

            widestInView = Math.max(widestInView, sizes.getExistingTextBound.call(this, dom.top.left.svg, d.columnIndex).width);
            widestInView = Math.max(widestInView, sizes.getExistingTextBound.call(this, dom.top.svg, d.columnIndex).width);
            widestInView = Math.max(widestInView, sizes.getExistingTextBound.call(this, dom.top.right.svg, d.columnIndex).width);
            widestInView = Math.max(widestInView, sizes.getExistingTextBound.call(this, dom.left.svg, d.columnIndex).width);
            widestInView = Math.max(widestInView, sizes.getExistingTextBound.call(this, dom.main.svg, d.columnIndex).width);
            widestInView = Math.max(widestInView, sizes.getExistingTextBound.call(this, dom.right.svg, d.columnIndex).width);
            widestInView = Math.max(widestInView, sizes.getExistingTextBound.call(this, dom.bottom.left.svg, d.columnIndex).width);
            widestInView = Math.max(widestInView, sizes.getExistingTextBound.call(this, dom.bottom.svg, d.columnIndex).width);
            widestInView = Math.max(widestInView, sizes.getExistingTextBound.call(this, dom.bottom.right.svg, d.columnIndex).width);

            // Set the column to the widest width
            d.column.width = widestInView;

            // Update the container size because the width will have changed
            this.refresh();

        }
    };
