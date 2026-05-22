import { getExistingTextBound } from '../sizes/getExistingTextBound.js';

export function autoResizeColumn(self, column) {
    const { elements } = self;
    const panels = [
        elements.top.left, elements.top, elements.top.right,
        elements.left, elements.main, elements.right,
        elements.bottom.left, elements.bottom, elements.bottom.right,
    ];

    column.width = 0;
    for (const panel of panels) {
        column.width = Math.max(column.width, getExistingTextBound(self, panel.svg, column.index).width);
    }

    self.refresh(true);
}
