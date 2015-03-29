
    // Copyright: 2015 AlignAlytics
    // License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
    // Source: /src/internal/interaction/addResizeHandles.js
    Scrollgrid.prototype.internal.interaction.addResizeHandles = function (g, data, left) {

        var handles,
            int = this.internal,
            style = this.style,
            sizes = int.sizes,
            interaction = int.interaction,
            physical = sizes.physical;

        handles = g
            .selectAll(".sg-no-style--resize-handle-selector")
            .data(data, function (d) { return d.key; });

        handles.enter()
            .append("rect")
            .attr("class", "sg-no-style--resize-handle-selector " + style.resizeHandle)
            .attr("transform", "translate(" + (-1 * physical.dragHandleWidth / 2) + ", 0)")
            .attr("y", 0)
            .attr("width", physical.dragHandleWidth)
            .attr("height", physical.top)
            .on("dblclick", interaction.autoResizeColumn.bind(this))
            .call(interaction.getColumnResizer.call(this, left));

        handles
            .attr("x", function (d) { return d.x + (left ? 0 : d.boxWidth); });

        handles.exit()
            .remove();

    };