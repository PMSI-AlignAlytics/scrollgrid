
// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/sizes/initialiseColumns.js
Scrollgrid.prototype.internal.sizes.initialiseColumns = function () {
    "use strict";

    var i,
        int = this.internal,
        props = this.properties,
        rule;

    // Initialise the columns if required
    this.columns = this.columns || [];

    for (i = 0; i < props.virtualOuterWidth; i += 1) {
        // Initialise with a default to ensure we always have a width
        this.columns[i] = this.columns[i] || {};
        this.columns[i].width = this.columns[i].width || props.defaultColumnWidth;

        if (props.formatRules && props.formatRules.length > 0) {
            for (rule = 0; rule < props.formatRules.length; rule += 1) {
                if (int.render.matchRule.call(this, props.formatRules[rule].column, i + 1, props.virtualOuterWidth)) {
                    this.columns[i] = {
                        width: props.formatRules[rule].columnWidth || this.columns[i].width,
                        index: i,
                        sort: props.formatRules[rule].sort || this.columns[i].sort,
                        compareFunction: props.formatRules[rule].compareFunction || this.columns[i].compareFunction
                    };
                }
            }
        }
    }

};
