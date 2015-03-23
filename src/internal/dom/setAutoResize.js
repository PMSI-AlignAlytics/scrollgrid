
    // Copyright: 2015 AlignAlytics
    // License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
    // Source: /src/internal/dom/setAutoResize.js
    Scrollgrid.prototype.internal.dom.setAutoResize = function () {

        // Pick up any existing resize handlers
        var existingHandler = window.onresize,
            int = this.internal,
            dom = int.dom;

        // Add a new handler
        window.onresize = function () {
            // Invoke the non-scrollgrid resize handlers
            if (existingHandler) {
                existingHandler();
            }
            // Call the instantiated layout refresh
            dom.layoutDOM.call(this);
            this.draw();
            dom.setScrollerSize.call(this);
        }.bind(this);

    };