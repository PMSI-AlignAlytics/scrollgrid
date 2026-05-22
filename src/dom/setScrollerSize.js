export function setScrollerSize(self) {
    const { elements, properties } = self;
    elements.main.scroller
        .style('width', `${properties.physicalTotalInnerWidth}px`)
        .style('height', `${properties.physicalTotalInnerHeight}px`);
}
