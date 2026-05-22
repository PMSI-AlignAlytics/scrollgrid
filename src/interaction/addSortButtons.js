import { sortColumn } from './sortColumn.js';

export function addSortButtons(self, g, viewData) {
    g.append('rect')
        .attr('width', viewData.boxWidth)
        .attr('height', viewData.boxHeight)
        .style('opacity', 0)
        .style('cursor', 'pointer')
        .on('click', () => sortColumn(self, viewData.columnIndex, true));
}
