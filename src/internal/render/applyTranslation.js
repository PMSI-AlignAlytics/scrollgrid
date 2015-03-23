
    // Copyright: 2015 AlignAlytics
    // License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
    // Source: /src/internal/render/applyTranslation.js
    Scrollgrid.prototype.internal.render.applyTranslation = function (x, y) {

        var dom = this.internal.dom;

        dom.main.transform.attr('transform', 'translate(' + (-1 * x) + ', ' + (-1 * y) + ')');
        dom.top.transform.attr('transform', 'translate(' + (-1 * x) + ', 0)');
        dom.bottom.transform.attr('transform', 'translate(' + (-1 * x) + ', 0)');
        dom.left.transform.attr('transform', 'translate(0, ' + (-1 * y) + ')');
        dom.right.transform.attr('transform', 'translate(0, ' + (-1 * y) + ')');

    };
