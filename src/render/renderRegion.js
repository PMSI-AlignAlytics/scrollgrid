import { select } from 'd3-selection';

import { addEventHandlers } from '../events.js';
import { addSortButtons } from '../interaction/addSortButtons.js';

import { getDataInBounds } from './getDataInBounds.js';
import { renderRegionForeground } from './renderRegionForeground.js';
import { renderSortIcon } from './renderSortIcon.js';

const CELL_SELECTOR = '.sg-no-style--cell-selector';

/**
 * Render a single region (one of the 9 panels — top-left, top, top-right,
 * left, main, right, bottom-left, bottom, bottom-right).
 *
 * Key difference from the d3 v3 original: in v3 the `cells` variable
 * automatically merged the entering elements after `.enter().append()`.
 * In v4+ you must call `enter.merge(update)` explicitly.
 */
export function renderRegion(self, target, physicalOffset, xVirtual, yVirtual, clearCache) {
    if ((xVirtual.left ?? 0) === (xVirtual.right ?? 0)) return;
    if ((yVirtual.top ?? 0) === (yVirtual.bottom ?? 0)) return;

    const { properties: props, elements: elems } = self;

    const bounds = {
        startX: physicalOffset.x ?? 0,
        startY: physicalOffset.y ?? 0,
        top: yVirtual.top ?? 0,
        bottom: yVirtual.bottom ?? 0,
        left: xVirtual.left ?? 0,
        right: xVirtual.right ?? 0,
    };

    const metadata = getDataInBounds(self, bounds);

    if (clearCache) {
        target.content.selectAll(CELL_SELECTOR).remove();
    }

    const update = target.content
        .selectAll(CELL_SELECTOR)
        .data(metadata, (d) => d.key);

    const enter = update.enter()
        .append('g')
        .attr('class', 'sg-no-style--cell-selector')
        .each(function (d) {
            const group = select(this);
            if (d.renderBackground) d.renderBackground.call(self, group, d);
            renderSortIcon(self, d, group, !(d.sortIcon === undefined || d.sortIcon === 'none'));

            const isHeader = target === elems.top || target === elems.top.left || target === elems.top.right;
            if (props.allowSorting && isHeader) {
                addSortButtons(self, group, d);
            }
            addEventHandlers(self, group, d);
        });

    const cells = enter.merge(update);

    renderRegionForeground(self, bounds, cells);

    cells.attr('transform', (d) => `translate(${d.x},${d.y})`);

    update.exit().remove();
}
