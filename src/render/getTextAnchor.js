export function getTextAnchor(d) {
    if (d.alignment === 'center') return 'middle';
    if (d.alignment === 'right') return 'end';
    return 'start';
}
