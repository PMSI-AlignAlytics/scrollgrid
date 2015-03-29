
    // Copyright: 2015 AlignAlytics
    // License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
    // Source: /src/external/data.js
    Scrollgrid.prototype.data = function (data) {
        var int = this.internal,
            sizes = int.sizes,
            physical = sizes.physical,
            virtual = sizes.virtual;

        if (data) {

            // If the dataAdapter is an array, treat it as the data itself and instantiate with the default adapter
            if (Object.prototype.toString.call(data) === '[object Array]') {
                this.adapter = Scrollgrid.adapters.simple(data);
            } else {
                this.adapter = data;
            }
            virtual.outerHeight = this.adapter.rowCount();
            virtual.outerWidth = this.adapter.columnCount();

            // Set up the column sizes
            physical.initialiseColumnSizes.call(this);

            // Calculate the bounds of the data displayable in the main grid
            virtual.innerWidth = virtual.outerWidth - virtual.left - virtual.right;
            virtual.innerHeight = virtual.outerHeight - virtual.top - virtual.bottom;

            // Render the control
            this.refresh();

        }

        return this.adapter;

    };