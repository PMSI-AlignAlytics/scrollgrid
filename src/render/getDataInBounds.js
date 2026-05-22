import { getRowHeight } from '../sizes/getRowHeight.js';

import { applyRules } from './applyRules.js';
import { calculateCellAdjustments } from './calculateCellAdjustments.js';
import { renderBackground } from './renderBackground.js';
import { renderForeground } from './renderForeground.js';

export function getDataInBounds(self, viewArea) {
    const { properties: props, columns: cols } = self;
    const visibleData = [];

    let runningY = viewArea.startY ?? 0;
    let i = 0;
    let vr = 0;

    for (let r = viewArea.top ?? 0; r < (viewArea.bottom ?? 0); r += 1) {
        const rowHeight = getRowHeight(self, r);
        let runningX = viewArea.startX ?? 0;
        let vc = 0;

        for (let c = viewArea.left ?? 0; c < (viewArea.right ?? 0); c += 1, i += 1) {
            const adjustments = calculateCellAdjustments(self, r, c);
            const column = cols[c];
            const x = Math.floor(runningX) + adjustments.x + 0.5;
            const cell = {
                x,
                y: Math.floor(runningY) + adjustments.y + 0.5,
                visibleRow: vr,
                visibleColumn: vc,
                boxWidth: Math.ceil(column.width) + adjustments.boxWidth,
                boxHeight: Math.ceil(rowHeight) + adjustments.boxHeight,
                textWidth: Math.ceil(column.width) + adjustments.textWidth,
                textHeight: Math.ceil(rowHeight) + adjustments.textHeight,
                backgroundStyle: `${self.style.cellBackgroundPrefix}r${r + 1} ${self.style.cellBackgroundPrefix}c${c + 1}`,
                foregroundStyle: `${self.style.cellForegroundPrefix}r${r + 1} ${self.style.cellForegroundPrefix}c${c + 1}`,
                sortIcon: adjustments.sortIcon ?? 'none',
                cellPadding: props.cellPadding,
                alignment: 'left',
                rowIndex: r,
                columnIndex: c,
                column,
                formatter: null,
                renderForeground,
                renderBetween: null,
                renderBackground,
            };
            // Key drives the d3 join — any change here triggers an enter
            // (which re-creates the cell <g>).  This is the cache mechanism.
            cell.key = `${cell.columnIndex}_${cell.rowIndex}_${cell.boxHeight}_${cell.boxWidth}_${cell.sortIcon}`;
            visibleData[i] = cell;

            vc += 1;
            runningX += column.width;
        }
        vr += 1;
        runningY += rowHeight;
    }

    applyRules(self, visibleData);
    return visibleData;
}
