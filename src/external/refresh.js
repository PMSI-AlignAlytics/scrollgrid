
    // Copyright: 2015 AlignAlytics
    // License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
    // Source: /src/external/refresh.js
    Scrollgrid.prototype.refresh = function () {
        var int = this.internal,
            dom = int.dom;
        // Call the instantiated layout refresh
        dom.layoutDOM.call(this);
        this.draw();
        dom.setScrollerSize.call(this);
    };