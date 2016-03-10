
// Copyright: 2015 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/render/renderRegionForeground.js
Scrollgrid.prototype.internal.render.renderRegionForeground = function (bounds, cells) {
    "use strict";

    var self = this;

    this.adapter.loadDataRange.call(this, bounds, function (data) {
        cells.each(function (d) {
            var group = d3.select(this);

            // Get the value from the visible range and set it in the data object
            d.value = data[d.visibleRow][d.visibleColumn];

            if (d.renderBetween) {
                d.renderBetween.call(self, group, d);
            }
            if (d.renderForeground) {
                d.renderForeground.call(self, group, d);
            }
        });
    });
};