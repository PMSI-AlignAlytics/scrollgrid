import { drag } from 'd3-drag';
import { select } from 'd3-selection';

/**
 * Drag behaviour for the resize handle.  In d3 v3 the equivalent was
 * `d3.behavior.drag().origin(c => c).on('dragstart'/'drag'/'dragend', …)`.
 * v7 renames `origin` to `subject`, no longer relies on a `d3.event`
 * global (event is passed as first arg), and uses the event names
 * `start`, `drag`, `end`.
 */
export function getColumnResizer(self) {
    return drag()
        .subject((event, c) => c)
        .on('start', function (event) { columnResizeStart(select(this), event); })
        .on('drag', function (event, c) { columnResizing(self, select(this), c, event); })
        .on('end', function () { columnResizeEnd(select(this)); });
}

export function columnResizeStart(shape, event) {
    event.sourceEvent?.stopPropagation?.();
    shape.classed('dragging', true);
}

export function columnResizing(self, shape, column, event) {
    column.width -= column.x - event.x;
    column.x = event.x;
    if (column.width < 0) column.width = 0;
    shape.attr('x', column.x);
    self.refresh(true);
}

export function columnResizeEnd(shape) {
    shape.classed('dragging', false);
}
