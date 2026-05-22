export function sortIcon(self, group) {
    const icon = group.append('path').attr('class', self.style.sortIcon);
    const size = self.properties.sortIconSize;

    if (group.datum() === 'asc') {
        icon.attr('d', `M ${size / 2} 0 L ${size} ${size} L 0 ${size} z`);
    } else if (group.datum() === 'desc') {
        icon.attr('d', `M 0 0 L ${size} 0 L ${size / 2} ${size} z`);
    }

    const bbox = icon.node().getBBox();
    icon.attr('transform', `translate(${bbox.width / -2},${bbox.height / -2})`);
}
