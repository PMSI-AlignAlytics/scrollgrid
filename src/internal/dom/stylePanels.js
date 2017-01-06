
// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/dom/stylePanels.js
Scrollgrid.prototype.internal.dom.stylePanels = function (style) {
    "use strict";

    var elems = this.elements;

    this.style = style || this.style;

    elems.left.svg.attr('class', this.style.left.panel);
    elems.top.svg.attr('class', this.style.top.panel);
    elems.right.svg.attr('class', this.style.right.panel);
    elems.bottom.svg.attr('class', this.style.bottom.panel);
    elems.top.left.svg.attr('class', this.style.top.left.panel);
    elems.top.right.svg.attr('class', this.style.top.right.panel);
    elems.bottom.left.svg.attr('class', this.style.bottom.left.panel);
    elems.bottom.right.svg.attr('class', this.style.bottom.right.panel);
    elems.main.svg.attr('class', this.style.main.panel);

};
