
    // Copyright: 2015 AlignAlytics
    // License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
    // Source: /src/internal/interaction/sortColumn.js
    Scrollgrid.prototype.internal.interaction.sortColumn = function (index, toggle) {
        var int = this.internal,
            interaction = int.interaction,
            sizes = int.sizes,
            virtual = sizes.virtual,
            c;
        // Clear existing sorts and set the new one
        for (c = 0; c < this.columns.length; c += 1) {
            if (c !== index) {
                delete this.columns[c].sort;
            } else if (toggle) {
                this.columns[c].sort = (this.columns[c].sort === 'desc' ? 'asc' : 'desc');
            }
        }
        // Instruct the adapter to perform a sort
        this.adapter.sort(index, virtual.top, virtual.bottom, this.columns[index].sort === 'desc', this.columns[index].compareFunction || interaction.defaultComparer);
        this.refresh();
    };
