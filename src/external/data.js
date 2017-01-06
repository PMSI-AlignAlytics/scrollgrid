
// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/external/data.js
Scrollgrid.prototype.data = function (data, silent) {
    "use strict";

    var props = this.properties,
        int = this.internal,
        c;

    if (data) {

        // If the dataAdapter is an array, treat it as the data itself and instantiate with the default adapter
        if (Object.prototype.toString.call(data) === '[object Array]') {
            this.adapter = Scrollgrid.adapters.simple(data);
        } else {
            this.adapter = data;
        }
        props.virtualOuterHeight = this.adapter.rowCount();
        props.virtualOuterWidth = this.adapter.columnCount();

        // Set up the columns
        int.sizes.initialiseColumns.call(this);

        // If any of the columns have a sort it should be applied
        for (c = 0; c < this.columns.length; c += 1) {
            if (this.columns[c].sort === 'asc' || this.columns[c].sort === 'desc') {
                int.interaction.sortColumn.call(this, c, false);
            }
        }

        // Calculate the bounds of the data displayable in the main grid
        props.virtualInnerWidth = props.virtualOuterWidth - props.virtualLeft - props.virtualRight;
        props.virtualInnerHeight = props.virtualOuterHeight - props.virtualTop - props.virtualBottom;

        // Render the control
        if (!silent) {
            this.refresh(false);
        }

    }

    return this.adapter;

};
