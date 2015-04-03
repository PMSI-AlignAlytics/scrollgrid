
    // Copyright: 2015 AlignAlytics
    // License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
    // Source: /src/internal/render/renderForeground.js
    Scrollgrid.prototype.internal.render.renderForeground = function (g, viewData) {

        var self = this,
            int = self.internal,
            render = int.render,
            cells;

        g.selectAll(".sg-no-style--sort-icon-selector").remove();

        cells = g
            .selectAll(".sg-no-style--text-selector")
            .data(viewData, function (d) { return d.key; });

        cells.enter()
            .append("text")
            .attr("class", function (d) { return "sg-no-style--text-selector " + d.foregroundStyle; })
            .style("text-anchor", render.getTextAnchor.bind(self))
            .attr("dy", "0.35em");

        cells.attr("x", render.getTextPosition.bind(self))
            .attr("y", function (d) { return d.y + d.textHeight / 2; })
            .each(function (d) {
                var shape = d3.select(this),
                    sorted = d.sortIcon && d.sortIcon !== 'none';
                shape.text(render.cellWaitText);
                d.getValue(d.rowIndex, d.columnIndex, function (value) {
                    if (d.formatter) {
                        shape.text(d.formatter(value));
                    } else {
                        shape.text(value);
                    }
                    render.cropText.call(self, shape, d.textWidth - d.cellPadding - (sorted ? render.sortIconSize + d.cellPadding : 0));
                });
                // Add a sort icon for the last row of the headers
                if (sorted && d.textWidth > d.cellPadding + render.sortIconSize) {
                    g.append("g")
                        .datum(d.sortIcon)
                        .attr("class", "sg-no-style--sort-icon-selector")
                        .attr("transform", "translate(" + (d.x + d.cellPadding + render.sortIconSize / 2) + "," + (d.y + d.textHeight / 2) + ")")
                        .call(render.sortIcon.bind(self));
                }

            });

        cells.exit()
            .remove();

        return cells;

    };