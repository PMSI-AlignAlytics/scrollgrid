
// Copyright: 2015 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/dom/populateDOM.js
Scrollgrid.prototype.internal.dom.populateDOM = function () {
    "use strict";

    var self = this,
        int = self.internal,
        style = self.style,
        dom = int.dom;

    // Get the parent container
    dom.parent = d3.select(self.target);
    // Add a container to the target which will house everything
    dom.container = dom.parent.append('div');

    // Populate the 5 regions of the control
    dom.left = dom.populatePanel.call(self, style.left.panel);
    dom.top = dom.populatePanel.call(self, style.top.panel);
    dom.top.left = dom.populatePanel.call(self, style.top.left.panel);
    dom.top.right = dom.populatePanel.call(self, style.top.right.panel);
    dom.main = dom.populatePanel.call(self, style.main.panel);

    // Add the viewport which is the fixed area with scroll bars
    dom.main.viewport = dom.container.append('div');

    dom.right = dom.populatePanel.call(self, style.right.panel);
    dom.bottom = dom.populatePanel.call(self, style.bottom.panel);
    dom.bottom.left = dom.populatePanel.call(self, style.bottom.left.panel);
    dom.bottom.right = dom.populatePanel.call(self, style.bottom.right.panel);

    // The scroller is going to be as large as the virtual size of
    // the data (as if it had all been rendered) this is so that
    // the scroll bars behave as expected
    dom.main.scroller = dom.main.viewport.append('div');

};