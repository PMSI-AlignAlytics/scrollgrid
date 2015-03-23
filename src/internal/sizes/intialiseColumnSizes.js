
    // Copyright: 2015 AlignAlytics
    // License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
    // Source: /src/internal/sizes/initialiseColumnSizes.js
    Scrollgrid.prototype.internal.sizes.physical.initialiseColumnSizes = function () {

        var i,
            int = this.internal,
            render = int.render,
            sizes = int.sizes,
            physical = sizes.physical,
            virtual = sizes.virtual,
            rule,
            width;

        // Initialise the columns if required
        this.columns = this.columns || [];

        for (i = 0; i < virtual.outerWidth; i += 1) {
            // Initialise with a default to ensure we always have a width
            width = physical.defaultColumnWidth;
            if (render.formatRules && render.formatRules.length > 0) {
                // Iterate backwards because we can exit as soon
                // as a rule matches (as long as only one property is set here)
                // if adding an additional rule here, reverse the array order because
                // later rules should override earlier rules
                for (rule = render.formatRules.length - 1; rule >= 0; rule -= 1) {
                    if (render.formatRules[rule].columnWidth && render.matchRule.call(this, render.formatRules[rule].column, i + 1, virtual.outerWidth)) {
                        width = render.formatRules[rule].columnWidth;
                        break;
                    }
                }
            }
            this.columns[i] = {
                width: width
            };
        }

    };