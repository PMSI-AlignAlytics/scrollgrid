
    // Copyright: 2015 AlignAlytics
    // License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
    // Source: /src/internal/sizes/calculateTextBound.js
    Scrollgrid.prototype.internal.sizes.calculateTextBound = function (surface, text) {

        var toMeasure,
            bounds,
            returnBounds = { width: 0, height: 0 };

        // Append some text for measuring
        toMeasure = surface.append('text').text(text);
        // Get the bounds
        bounds = toMeasure.node().getBBox();
        // Parse into a simpler object because the BBox object
        // has some IE restrictions
        returnBounds.width = bounds.width;
        returnBounds.height = bounds.height;
        // Remove from the dom
        toMeasure.remove();

        return returnBounds;

    };