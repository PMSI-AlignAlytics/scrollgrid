
// Copyright: 2015 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/sizes/initialiseColumns.js
Scrollgrid.prototype.internal.sizes.physical.initialiseColumns = function () {
    "use strict";

    var i,
        self = this,
        int = self.internal,
        render = int.render,
        sizes = int.sizes,
        virtual = sizes.virtual,
        rule;

    // Initialise the columns if required
    self.columns = self.columns || [];

    for (i = 0; i < virtual.outerWidth; i += 1) {
        // Initialise with a default to ensure we always have a width
        self.columns[i] = self.columns[i] || {};
        self.columns[i].width = self.columns[i].width || self.defaultColumnWidth;

        if (self.formatRules && self.formatRules.length > 0) {
            for (rule = 0; rule < self.formatRules.length; rule += 1) {
                if (render.matchRule.call(self, self.formatRules[rule].column, i + 1, virtual.outerWidth)) {
                    self.columns[i] = {
                        width: self.formatRules[rule].columnWidth || self.columns[i].width,
                        index: i,
                        sort: self.formatRules[rule].sort || self.columns[i].sort,
                        compareFunction: self.formatRules[rule].compareFunction || self.columns[i].compareFunction
                    };
                }
            }
        }
    }

};