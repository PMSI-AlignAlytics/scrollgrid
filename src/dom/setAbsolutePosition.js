export function setAbsolutePosition(element, x, y, width, height) {
    return element
        .style('position', 'absolute')
        .style('overflow', 'hidden')
        .style('left', `${x}px`)
        .style('top', `${y}px`)
        .style('width', `${width}px`)
        .style('height', `${height}px`);
}
