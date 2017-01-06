
// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/dom/redirectViewportEvents.js
Scrollgrid.prototype.internal.dom.redirectViewportEvents = function () {
    "use strict";

    var self = this,
        elems = self.elements,
        j,
        getRedirectHandler;

    getRedirectHandler = function (elems, eventType) {
        return function () {
            var mouse,
                svg,
                rpos,
                list,
                target,
                g,
                targetEventHandler;

            mouse = d3.mouse(this);

            svg = elems.main.svg.node();
            rpos = svg.createSVGRect();
            rpos.x = mouse[0];
            rpos.y = mouse[1];
            rpos.width = 1;
            rpos.height = 1;

            list = svg.getIntersectionList(rpos, null);
            if (list.length) {
                target = list[0].parentNode;
                g = d3.select(target);
                targetEventHandler = g.on(eventType);
                if (targetEventHandler) {
                    targetEventHandler.call(target, g.datum());
                }
            }
        };
    };

    for (j = 0; j < this.eventHandlers.length; j += 1) {
        elems.main.viewport.on(this.eventHandlers[j].type, getRedirectHandler(elems, this.eventHandlers[j].type));
    }
};
