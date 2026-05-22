export function getClipPath(self, viewData) {
    const sortGap = (viewData.sortIcon && viewData.sortIcon !== 'none')
        ? self.properties.sortIconSize + viewData.cellPadding
        : 0;
    const right = `${viewData.textWidth - viewData.cellPadding - sortGap}px`;
    const bottom = `${viewData.textHeight - viewData.cellPadding}px`;
    return `polygon(0px 0px, ${right} 0px, ${right} ${bottom}, 0px ${bottom})`;
}
