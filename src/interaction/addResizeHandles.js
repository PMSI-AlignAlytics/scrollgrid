import { autoResizeColumn } from './autoResizeColumn.js';
import { getColumnResizer } from './columnResize.js';

const HANDLE_SELECTOR = '.sg-no-style--handle-selector';

export function addResizeHandles(self, target, bounds, startX) {
    const { properties: props, style, columns } = self;
    let runningTotal = startX ?? 0;

    target.content.selectAll(HANDLE_SELECTOR).remove();

    target.content
        .selectAll(HANDLE_SELECTOR)
        .data(columns.slice(bounds.left, bounds.right))
        .enter()
        .append('rect')
        .attr('class', `sg-no-style--handle-selector ${style.resizeHandle}`)
        .attr('transform', `translate(${-1 * props.dragHandleWidth / 2}, 0)`)
        .attr('x', (c) => {
            runningTotal += c.width;
            c.x = runningTotal;
            return c.x;
        })
        .attr('y', 0)
        .attr('width', props.dragHandleWidth)
        .attr('height', props.physicalTop)
        .on('dblclick', (event, c) => autoResizeColumn(self, c))
        .call(getColumnResizer(self));
}
