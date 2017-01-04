
// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/dom/stylePanels.js
Scrollgrid.prototype.internal.dom.stylePanels = function (style) {
    "use strict";

    var int = this.internal,
        dom = int.dom;

    this.style = style || this.style;

    dom.left.svg.attr('class', this.style.left.panel);
    dom.top.svg.attr('class', this.style.top.panel);
    dom.right.svg.attr('class', this.style.right.panel);
    dom.bottom.svg.attr('class', this.style.bottom.panel);
    dom.top.left.svg.attr('class', this.style.top.left.panel);
    dom.top.right.svg.attr('class', this.style.top.right.panel);
    dom.bottom.left.svg.attr('class', this.style.bottom.left.panel);
    dom.bottom.right.svg.attr('class', this.style.bottom.right.panel);
    dom.main.svg.attr('class', this.style.main.panel);

};