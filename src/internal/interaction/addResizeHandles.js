
    // Copyright: 2015 AlignAlytics
    // License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
    // Source: /src/internal/interaction/addResizeHandles.js
    Scrollgrid.prototype.internal.interaction.addResizeHandles = function (g, data, left) {

        var self = this,
            int = self.internal,
            style = self.style,
            sizes = int.sizes,
            interaction = int.interaction,
            physical = sizes.physical;

        // Unlike cell content we need to remove and re-add handles so they stay on top
        g.selectAll(".sg-no-style--resize-handle-selector")
            .remove();

        g.selectAll(".sg-no-style--resize-handle-selector")
            .data(data, function (d) { return d.key; })
            .enter()
            .append("rect")
            .attr("class", "sg-no-style--resize-handle-selector " + style.resizeHandle)
            .attr("transform", "translate(" + (-1 * physical.dragHandleWidth / 2) + ", 0)")
            .attr("x", function (d) { return d.x + (left ? 0 : d.boxWidth); })
            .attr("y", 0)
            .attr("width", physical.dragHandleWidth)
            .attr("height", physical.top)
            .on("dblclick", function (d) { interaction.autoResizeColumn.call(self, d); })
            .call(interaction.getColumnResizer.call(self, left));

    };