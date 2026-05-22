export function getTopMargin(self, containerSize, parent) {
    const { verticalAlignment } = self.properties;
    if (!containerSize?.height || !parent) return 0;

    if (verticalAlignment === 'middle') {
        return (parent.node().offsetHeight - containerSize.height) / 2;
    }
    if (verticalAlignment === 'bottom') {
        return parent.node().offsetHeight - containerSize.height - 1;
    }
    return 0;
}
