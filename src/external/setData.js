
    // Copyright: 2015 AlignAlytics
    // License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
    // Source: /src/external/setData.js
    Scrollgrid.prototype.setData = function (data) {
        var int = this.internal,
            sizes = int.sizes,
            virtual = sizes.virtual;

        // If the dataAdapter is an array, treat it as the data itself and instantiate with the default adapter
        if (data && Object.prototype.toString.call(data) === '[object Array]' && data.length > virtual.top + virtual.bottom) {
            this.adapter = new Scrollgrid.adapters.simple(data);
        } else {
            this.adapter = data;
        }
        virtual.outerHeight = this.adapter.getRowCount();
        virtual.outerWidth = this.adapter.getColumnCount();
    };