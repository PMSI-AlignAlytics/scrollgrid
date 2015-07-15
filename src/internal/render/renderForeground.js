
    // Copyright: 2015 AlignAlytics
    // License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
    // Source: /src/internal/render/renderForeground.js
    Scrollgrid.prototype.internal.render.renderForeground = function (g, viewData) {

        var self = this,
            int = self.internal,
            render = int.render,
            text;

        text = g.append("text")
            .attr("class", viewData.foregroundStyle)
            .style("text-anchor", render.getTextAnchor.call(self, viewData))
            .attr("dy", "0.35em")
            .text(render.cellWaitText)
            .attr("x", render.getTextPosition.call(self, viewData))
            .attr("y", viewData.textHeight / 2);

        viewData.getValue(viewData.rowIndex, viewData.columnIndex, function (value) {
            if (viewData.formatter) {
                text.text(viewData.formatter(value));
            } else {
                text.text(value);
            }
            render.cropText.call(this, text, viewData.textWidth - viewData.cellPadding - (!(!viewData.sortIcon || viewData.sortIcon === 'none') ? render.sortIconSize + viewData.cellPadding : 0));
        });

    };