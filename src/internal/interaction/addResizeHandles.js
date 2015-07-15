
    // Copyright: 2015 AlignAlytics
    // License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
    // Source: /src/internal/interaction/addResizeHandles.js
    Scrollgrid.prototype.internal.interaction.addResizeHandles = function (target, bounds, startX) {

        var self = this,
            int = self.internal,
            style = self.style,
            sizes = int.sizes,
            interaction = int.interaction,
            physical = sizes.physical,
            runningTotal = startX || 0;

        target.content
            .selectAll(".sg-no-style--handle-selector")
            .remove();

        target.content
            .selectAll(".sg-no-style--handle-selector")
            .data(this.columns.slice(bounds.left, bounds.right))
            .enter()
            .append("rect")
            .attr("class", "sg-no-style--handle-selector " + style.resizeHandle)
            .attr("transform", "translate(" + (-1 * physical.dragHandleWidth / 2) + ", 0)")
            .attr("x", function (c) {
                runningTotal += c.width;
                c.x = runningTotal;
                return c.x;
            })
            .attr("y", 0)
            .attr("width", physical.dragHandleWidth)
            .attr("height", physical.top)
            .on("dblclick", function (c) { interaction.autoResizeColumn.call(self, c); })
            .call(interaction.getColumnResizer.call(self));

    };