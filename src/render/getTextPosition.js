export function getTextPosition(self, d) {
    const { properties: props } = self;
    if (d.alignment === 'center') return d.textWidth / 2;
    if (d.alignment === 'right') return d.textWidth - d.cellPadding;

    let x = d.cellPadding;
    if (d.sortIcon && d.sortIcon !== 'none') {
        x += props.sortIconSize + d.cellPadding;
    }
    return x;
}
