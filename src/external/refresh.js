
// Copyright: 2015 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/external/refresh.js
Scrollgrid.prototype.refresh = function (maintainCache) {
    "use strict";

    var self = this,
        int = self.internal,
        render = int.render,
        dom = int.dom;

    // Call the instantiated layout refresh
    dom.layoutDOM.call(self);
    render.draw.call(self, !maintainCache);
    dom.setScrollerSize.call(self);

};