export function setRelativePosition(element, x, width, height, overflow) {
    return element
        .style('overflow', overflow)
        .style('position', 'relative')
        .style('margin-left', `${x}px`)
        .style('width', `${width}px`)
        .style('height', `${height}px`);
}
