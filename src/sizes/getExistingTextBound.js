import { select } from 'd3-selection';

import { pushTextBound } from './pushTextBound.js';

export function getExistingTextBound(self, surface, column, row) {
    const { properties: props } = self;
    let bounds = { width: 0, height: 0 };

    surface.selectAll('text')
        .filter((d) => (column === undefined || d.columnIndex === column) && (row === undefined || d.rowIndex === row))
        .each(function (d) {
            const sortIconSize = (d.sortIcon && d.sortIcon !== 'none') ? props.sortIconSize + d.cellPadding : 0;
            bounds = pushTextBound(bounds, select(this), d.cellPadding, sortIconSize);
        });

    return bounds;
}
