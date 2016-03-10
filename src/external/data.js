
// Copyright: 2015 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/external/data.js
Scrollgrid.prototype.data = function (data, silent) {
    "use strict";

    var int = this.internal,
        sizes = int.sizes,
        physical = sizes.physical,
        virtual = sizes.virtual,
        interaction = int.interaction,
        c;

    if (data) {

        // If the dataAdapter is an array, treat it as the data itself and instantiate with the default adapter
        if (Object.prototype.toString.call(data) === '[object Array]') {
            this.adapter = Scrollgrid.adapters.simple(data);
        } else {
            this.adapter = data;
        }
        virtual.outerHeight = this.adapter.rowCount();
        virtual.outerWidth = this.adapter.columnCount();

        // Set up the columns
        physical.initialiseColumns.call(this);

        // If any of the columns have a sort it should be applied
        for (c = 0; c < this.columns.length; c += 1) {
            if (this.columns[c].sort === 'asc' || this.columns[c].sort === 'desc') {
                interaction.sortColumn.call(this, c, false);
            }
        }

        // Calculate the bounds of the data displayable in the main grid
        virtual.innerWidth = virtual.outerWidth - virtual.left - virtual.right;
        virtual.innerHeight = virtual.outerHeight - virtual.top - virtual.bottom;

        // Render the control
        if (!silent) {
            this.refresh(false);
        }

    }

    return this.adapter;

};