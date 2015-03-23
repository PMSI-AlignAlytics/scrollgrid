
    // Copyright: 2015 AlignAlytics
    // License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
    // Source: /src/internal/interaction/getColumnResizer.js
    Scrollgrid.prototype.internal.interaction.getColumnResizer = function (invert) {

        var int = this.internal,
            interaction = int.interaction,
            self = this;

        return d3.behavior.drag()
            .origin(function (d) { return d; })
            .on('dragstart', function (d) { interaction.columnResizeStart.call(self, d3.select(this), d); })
            .on('drag', function (d) { interaction.columnResizing.call(self, d3.select(this), d, invert); })
            .on('dragend', function (d) { interaction.columnResizeEnd.call(self, d3.select(this), d); });

    };