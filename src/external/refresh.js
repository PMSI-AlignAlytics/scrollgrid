
// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/external/refresh.js
Scrollgrid.prototype.refresh = function (maintainCache) {
    "use strict";

    var int = this.internal;

    // Call the instantiated layout refresh
    int.dom.layoutDOM.call(this);
    int.render.draw.call(this, !maintainCache, true);
    int.dom.setScrollerSize.call(this);

};
