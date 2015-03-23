
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
            .attr("y", function (d) { return d.y + d.height / 2; })
            .text(function (d) { return d.value; });

        cells.exit()
            .remove();

        return cells;

    };