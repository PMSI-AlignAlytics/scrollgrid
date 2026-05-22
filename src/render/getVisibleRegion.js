export function getVisibleRegion(self) {
    const viewport = self.elements.main.viewport.node();
    const left = viewport.scrollLeft;
    const top = viewport.scrollTop;
    return {
        left,
        top,
        right: left + viewport.clientWidth,
        bottom: top + viewport.clientHeight,
    };
}
