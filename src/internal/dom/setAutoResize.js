
    // Copyright: 2015 AlignAlytics
    // License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
    // Source: /src/internal/dom/setAutoResize.js
    Scrollgrid.prototype.internal.dom.setAutoResize = function () {

        // Pick up any existing resize handlers
        var existingHandler = window.onresize;

        // Add a new handler
        window.onresize = function () {
            // Invoke the non-scrollgrid resize handlers
            if (existingHandler) {
                existingHandler();
            }
            // Call the instantiated layout refresh
            this.refresh();
        }.bind(this);

    };