
// Copyright: 2015 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/interaction/sortColumn.js
Scrollgrid.prototype.internal.interaction.sortColumn = function (index, toggle) {
    "use strict";

    var self = this,
        int = self.internal,
        interaction = int.interaction,
        c;

    // Clear existing sorts and set the new one
    for (c = 0; c < self.columns.length; c += 1) {
        if (c !== index) {
            delete self.columns[c].sort;
        } else if (toggle) {
            self.columns[c].sort = (self.columns[c].sort === 'desc' ? 'asc' : 'desc');
        }
    }

    // Instruct the adapter to perform a sort
    self.adapter.sort(index, self.headerRows, self.footerRows, self.columns[index].sort === 'desc', self.columns[index].compareFunction || interaction.defaultComparer);
    self.refresh(false);

};
