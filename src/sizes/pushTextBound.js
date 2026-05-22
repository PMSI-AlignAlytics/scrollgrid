export function pushTextBound(currentBounds, shape, cellPadding, sortIconSize) {
    const cellText = shape.text();
    // Temporarily restore the unabbreviated text so getBBox returns the
    // true width.
    shape.text(shape.datum().originalText ?? shape.text());

    const b = shape.node().getBBox();
    const width = b.width + 2 * cellPadding + sortIconSize;
    if (width > currentBounds.width) currentBounds.width = width;
    if (b.height > currentBounds.height) currentBounds.height = b.height;

    shape.text(cellText);
    return currentBounds;
}
