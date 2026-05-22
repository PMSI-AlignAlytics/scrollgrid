/**
 * Fallback when the browser doesn't support SVG `clip-path: polygon(...)`.
 * Truncates the rendered string until it fits.
 */
export function cropText(textShape, width) {
    let textWidth = textShape.node().getBBox().width;
    const text = textShape.text();
    const avgChar = textWidth / text.length;
    let chars = Math.ceil(width / avgChar) + 1;

    textShape.datum().originalText = text;

    if (chars <= 0) {
        textShape.text('');
        return;
    }

    while (textWidth > width && chars >= 0) {
        textShape.text(chars === 0 ? '' : text.substring(0, chars));
        textWidth = textShape.node().getBBox().width;
        chars -= 1;
    }
}
