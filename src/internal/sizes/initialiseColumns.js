
    // Copyright: 2015 AlignAlytics
    // License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
    // Source: /src/internal/sizes/initialiseColumns.js
    Scrollgrid.prototype.internal.sizes.physical.initialiseColumns = function () {

        var i,
            int = this.internal,
            render = int.render,
            sizes = int.sizes,
            physical = sizes.physical,
            virtual = sizes.virtual,
            rule;

        // Initialise the columns if required
        this.columns = this.columns || [];

        for (i = 0; i < virtual.outerWidth; i += 1) {
            // Initialise with a default to ensure we always have a width
            this.columns[i] = this.columns[i] || {};
            this.columns[i].width = this.columns[i].width || physical.defaultColumnWidth;

            if (render.formatRules && render.formatRules.length > 0) {
                for (rule = 0; rule < render.formatRules.length; rule += 1) {
                    if (render.matchRule.call(this, render.formatRules[rule].column, i + 1, virtual.outerWidth)) {
                        this.columns[i] = {
                            width: render.formatRules[rule].columnWidth || this.columns[i].width,
                            sort: render.formatRules[rule].sort || this.columns[i].sort,
                            compareFunction: render.formatRules[rule].compareFunction || this.columns[i].compareFunction
                        };
                    }
                }
            }
        }

    };