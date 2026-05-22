export function calculateTextBound(surface, text) {
    const toMeasure = surface.append('text').text(text);
    const bbox = toMeasure.node().getBBox();
    const result = { width: bbox.width, height: bbox.height };
    toMeasure.remove();
    return result;
}
