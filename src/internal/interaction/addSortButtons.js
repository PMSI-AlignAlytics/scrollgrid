
    // Copyright: 2015 AlignAlytics
    // License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
    // Source: /src/internal/interaction/addSortButtons.js
    Scrollgrid.prototype.internal.interaction.addSortButtons = function (g, data) {

        var buttons,
            self = this,
            int = self.internal,
            interaction = int.interaction;

        buttons = g
            .selectAll(".sg-no-style--sort-button-selector")
            .data(data, function (d) { return d.key; });

        buttons.enter()
            .append("rect")
            .attr("class", "sg-no-style--sort-button-selector")
            .style("opacity", 0)
            .style("cursor", "pointer")
            .on("click", function (d) { return interaction.sortColumn.call(self, d.columnIndex, true); });

        buttons.attr("x", function (d) { return d.x; })
            .attr("y", function (d) { return d.y; })
            .attr("width", function (d) { return d.boxWidth; })
            .attr("height", function (d) { return d.boxHeight; });

        buttons.exit()
            .remove();

    };