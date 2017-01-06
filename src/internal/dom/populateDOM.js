
// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/dom/populateDOM.js
Scrollgrid.prototype.internal.dom.populateDOM = function () {
    "use strict";

    var int = this.internal,
        elems = this.elements;

    // Get the parent container
    elems.parent = d3.select(this.target);
    // Add a container to the target which will house everything
    elems.container = elems.parent.append('div');

    // Populate the 5 regions of the control
    elems.left = int.dom.populatePanel.call(this);
    elems.top = int.dom.populatePanel.call(this);
    elems.top.left = int.dom.populatePanel.call(this);
    elems.top.right = int.dom.populatePanel.call(this);
    elems.main = int.dom.populatePanel.call(this);

    // Add the viewport which is the fixed area with scroll bars
    elems.main.viewport = elems.container.append('div');

    elems.right = int.dom.populatePanel.call(this);
    elems.bottom = int.dom.populatePanel.call(this);
    elems.bottom.left = int.dom.populatePanel.call(this);
    elems.bottom.right = int.dom.populatePanel.call(this);

    // The scroller is going to be as large as the virtual size of
    // the data (as if it had all been rendered) this is so that
    // the scroll bars behave as expected
    elems.main.scroller = elems.main.viewport.append('div');

};
