import { sortIcon } from './sortIcon.js';

export function renderSortIcon(self, d, target, sorted) {
    const { properties: props } = self;
    if (!sorted) return;
    if (d.textWidth <= d.cellPadding + props.sortIconSize) return;

    target.append('g')
        .datum(d.sortIcon)
        .attr('class', 'sg-no-style--sort-icon-selector')
        .attr('transform', `translate(${d.cellPadding + props.sortIconSize / 2},${d.textHeight / 2})`)
        .call((g) => sortIcon(self, g));
}
