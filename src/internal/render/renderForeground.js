
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
            .style("text-anchor", function (d) { return render.getTextAnchor.call(self, d); })
            .attr("dy", "0.35em")
            .text(render.cellWaitText);

        cells.attr("x", function (d) { return render.getTextPosition.call(self, d); })
            .attr("y", function (d) { return d.y + d.textHeight / 2; })
            .each(function (d) {
                var text = d3.select(this),
                    sorted = !(!d.sortIcon || d.sortIcon === 'none');
                render.renderText.call(self, d, text, sorted);
                render.renderSortIcon.call(self, d, g, sorted);
            });

        cells.exit()
            .remove();

        return cells;

    };