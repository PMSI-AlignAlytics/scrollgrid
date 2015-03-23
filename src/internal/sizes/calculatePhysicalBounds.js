
    // Copyright: 2015 AlignAlytics
    // License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
    // Source: /src/internal/sizes/calculatePhysicalBounds.js
    Scrollgrid.prototype.internal.sizes.calculatePhysicalBounds = function () {

        var int = this.internal,
            sizes = int.sizes,
            virtual = sizes.virtual,
            physical = sizes.physical,
            i;

        // Variable column widths mean horizontal sizes cost O(n) to calculate
        physical.left = 0;
        for (i = 0; i < virtual.left; i += 1) {
            physical.left += this.columns[i].width;
        }
        physical.totalInnerWidth = 0;
        for (i = virtual.left; i < virtual.outerWidth - virtual.right; i += 1) {
            physical.totalInnerWidth += this.columns[i].width;
        }
        physical.right = 0;
        for (i = virtual.outerWidth - virtual.right; i < virtual.outerWidth; i += 1) {
            physical.right += this.columns[i].width;
        }

        // Keeping static row height means vertical position calculations can stay O(1)
        physical.top = virtual.top * physical.headerRowHeight;
        physical.bottom = virtual.bottom * physical.footerRowHeight;
        physical.visibleInnerWidth = int.dom.container.node().offsetWidth - physical.left - physical.right;
        physical.visibleInnerHeight = int.dom.container.node().offsetHeight - physical.top - physical.bottom;
        physical.totalInnerHeight = virtual.innerHeight * physical.rowHeight;

    };