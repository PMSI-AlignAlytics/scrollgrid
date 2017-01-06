
// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/interaction/addResizeHandles.js
Scrollgrid.prototype.internal.interaction.addResizeHandles = function (target, bounds, startX) {
    "use strict";

    var self = this,
        props = this.properties,
        style = this.style,
        int = this.internal,
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
        .attr("transform", "translate(" + (-1 * props.dragHandleWidth / 2) + ", 0)")
        .attr("x", function (c) {
            runningTotal += c.width;
            c.x = runningTotal;
            return c.x;
        })
        .attr("y", 0)
        .attr("width", props.dragHandleWidth)
        .attr("height", props.physicalTop)
        .on("dblclick", function (c) { int.interaction.autoResizeColumn.call(self, c); })
        .call(int.interaction.getColumnResizer.call(self));

};
