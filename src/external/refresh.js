
// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/external/refresh.js
Scrollgrid.prototype.refresh = function (maintainCache) {
    "use strict";

    var int = this.internal,
        render = int.render,
        dom = int.dom;

    // Call the instantiated layout refresh
    dom.layoutDOM.call(this);
    render.draw.call(this, !maintainCache, true);
    dom.setScrollerSize.call(this);

};
