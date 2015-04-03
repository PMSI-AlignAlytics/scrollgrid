
    // Copyright: 2015 AlignAlytics
    // License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
    // Source: /src/internal/render/cropText.js
    Scrollgrid.prototype.internal.render.cropText = function (textShape, width) {

        var textWidth = textShape.node().getBBox().width,
            text = textShape.text(),
            avgChar = textWidth / text.length,
            // Deliberately overestimate to start with and reduce toward target
            chars = Math.ceil(width / avgChar) + 1;

        // Store the unabbreviated text
        textShape.datum().originalText = text;

        // Handle cases where chars is < 0 (negative width) so it never enters while loop
        if (chars <= 0) {
            textShape.text("");
        }

        while (textWidth > width && chars >= 0) {
            if (chars === 0) {
                textShape.text("");
            } else {
                textShape.text(text.substring(0, chars));
            }
            textWidth = textShape.node().getBBox().width;
            chars -= 1;
        }

    };