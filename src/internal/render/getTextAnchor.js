
// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/render/getTextAnchor.js
Scrollgrid.prototype.internal.render.getTextAnchor = function (d) {
    "use strict";

    var anchor = 'start';

    if (d.alignment === 'center') {
        anchor = 'middle';
    } else if (d.alignment === 'right') {
        anchor = 'end';
    }

    return anchor;

};