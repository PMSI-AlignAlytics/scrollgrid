
    // Copyright: 2015 AlignAlytics
    // License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
    // Source: /src/internal/render/renderBackground.js
    Scrollgrid.prototype.internal.render.renderBackground = function (g, viewData) {

        var cells;

        cells = g
            .selectAll(".gi-no-style--background-selector")
            .data(viewData, function (d) { return d.key; });

        cells.enter()
            .append("rect")
            .attr("class", function (d) { return "gi-no-style--background-selector " + d.backgroundStyle; });

        cells.attr("x", function (d) { return d.x; })
            .attr("y", function (d) { return d.y; })
            .attr("width", function (d) { return d.width; })
            .attr("height", function (d) { return d.height; });

        cells.exit()
            .remove();

        return cells;

    };