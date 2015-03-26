
    // Copyright: 2015 AlignAlytics
    // License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
    // Source: /src/internal/render/renderForeground.js
    Scrollgrid.prototype.internal.render.renderForeground = function (g, viewData) {

        var int = this.internal,
            render = int.render,
            cells;

        cells = g
            .selectAll(".gi-no-style--text-selector")
            .data(viewData, function (d) { return d.key; });

        cells.enter()
            .append("text")
            .attr("class", function (d) { return "gi-no-style--text-selector " + d.foregroundStyle; })
            .style("text-anchor", render.getTextAnchor.bind(this))
            .attr("dy", "0.35em");

        cells.attr("x", render.getTextPosition.bind(this))
            .attr("y", function (d) { return d.y + d.textHeight / 2; })
            .each(function (d) {
                var shape = d3.select(this);
                shape.text(render.cellWaitText);
                d.getValue(d.rowIndex, d.columnIndex, function (value) {
                    if (d.formatter) {
                        shape.text(d.formatter(value));
                    } else {
                        shape.text(value);
                    }
                });
            });

        cells.exit()
            .remove();

        return cells;

    };