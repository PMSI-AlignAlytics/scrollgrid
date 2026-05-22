export function addEventHandlers(self, g, viewData) {
    g.attr('data-row', viewData.rowIndex)
        .attr('data-col', viewData.columnIndex);

    for (const { type, listener } of self.eventHandlers) {
        g.on(type, listener);
    }
}
