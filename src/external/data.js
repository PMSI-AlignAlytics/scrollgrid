
// Copyright: 2015 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/external/data.js
Scrollgrid.prototype.data = function (data) {
    "use strict";

    var self = this,
        int = self.internal,
        sizes = int.sizes,
        physical = sizes.physical,
        virtual = sizes.virtual,
        interaction = int.interaction,
        c;

    if (data) {

        // If the dataAdapter is an array, treat it as the data itself and instantiate with the default adapter
        if (Object.prototype.toString.call(data) === '[object Array]') {
            self.adapter = Scrollgrid.adapters.simple(data);
        } else {
            self.adapter = data;
        }
        virtual.outerHeight = self.adapter.rowCount();
        virtual.outerWidth = self.adapter.columnCount();

        // Set up the columns
        physical.initialiseColumns.call(self);

        // If any of the columns have a sort it should be applied
        for (c = 0; c < self.columns.length; c += 1) {
            if (self.columns[c].sort === 'asc' || self.columns[c].sort === 'desc') {
                interaction.sortColumn.call(self, c, false);
            }
        }

        // Calculate the bounds of the data displayable in the main grid
        virtual.innerWidth = virtual.outerWidth - self.headerColumns - self.footerColumns;
        virtual.innerHeight = virtual.outerHeight - self.headerRows - self.footerRows;

        // Render the control
        self.refresh(false);

    }

    return self.adapter;

};