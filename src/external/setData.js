
    // Copyright: 2015 AlignAlytics
    // License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
    // Source: /src/external/setData.js
    Scrollgrid.prototype.setData = function (data) {
        var i,
            int = this.internal,
            sizes = int.sizes,
            virtual = sizes.virtual,
            inconsistent = false,
            valid = false;

        // Invalidate if the data object is not an array
        if (data && Object.prototype.toString.call(data) === '[object Array]' && data.length > virtual.top + virtual.bottom) {

            virtual.outerHeight = data.length;
            valid = true;

            // Find the longest length of the data sub arrays
            for (i = 0; i < data.length; i += 1) {
                if (data[i] && Object.prototype.toString.call(data[i]) === '[object Array]') {
                    inconsistent = virtual.outerWidth && (inconsistent || virtual.outerWidth !== data[i].length);
                    if (!virtual.outerWidth || data[i].length > virtual.outerWidth) {
                        virtual.outerWidth = data[i].length;
                    }
                } else {
                    valid = false;
                    break;
                }
            }

            // Check that the data has some width
            if (valid && virtual.outerWidth > 0) {

                // The data is valid but may have inconsistent widths which will be filled out here
                if (inconsistent) {
                    for (i = 0; i < data.length; i += 1) {
                        while (data[i].length < virtual.outerWidth) {
                            data[i].push("");
                        }
                    }
                }

                // Set the instance data
                this.data = data;
                // This data is valid and can now be used
                valid = true;

            }
        }

        return valid;

    };