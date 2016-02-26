
// Copyright: 2015 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/dom/populatePanel.js
Scrollgrid.prototype.internal.dom.populatePanel = function (css) {
    "use strict";

    var dom = this.internal.dom,
        panel = {};

    panel.svg = dom.container.append('svg');
    panel.svg.attr('class', css);
    panel.transform = panel.svg.append('g');
    panel.content = panel.transform.append('g');

    return panel;
};