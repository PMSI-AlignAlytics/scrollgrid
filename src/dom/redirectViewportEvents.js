import { select } from 'd3-selection';

/**
 * The main scrollable viewport sits above the SVG that contains the cell
 * shapes, so pointer events fire on the empty viewport <div> rather than
 * on the cells themselves.  We forward those events to whichever cell
 * `<g>` is under the pointer.
 *
 * Discrete events (`click`, `dblclick`, `mousedown`, `mouseup`,
 * `contextmenu`) are forwarded one-for-one to the cell under the pointer.
 *
 * Hover semantics are subtle: because the viewport is an empty <div>
 * with no inner DOM, the native `mouseover` / `mouseout` events only fire
 * on its outer boundary — moving *between cells* inside the viewport
 * never triggers them.  We instead listen for `mousemove`, remember the
 * datum of the cell the pointer was last over, and synthesise
 * `mouseover` / `mouseout` whenever the underlying cell changes.
 * `mouseleave` clears the tracking state so the last cell gets a final
 * `mouseout` when the pointer leaves the viewport entirely.
 *
 * `mousemove` is also forwarded to the current cell, allowing the new
 * `onCellMouseMove` React prop.
 *
 * Hover state persists across refreshes because a re-render typically
 * destroys and re-creates the cell DOM nodes.  We compare by
 * `rowIndex`/`columnIndex` rather than DOM identity so the synthesis
 * survives the cell churn caused by a refresh inside a hover handler
 * (e.g. when the consumer pushes a `backgroundStyle` rule for the
 * hovered row).
 */
export function redirectViewportEvents(self) {
    const { elements } = self;

    // Persist `lastDatum` on the instance so it survives the
    // redirectViewportEvents() calls that layoutDOM() makes on every
    // refresh.  Without persistence, refresh-on-hover loses track of
    // the previous cell and never fires its `mouseout`, leaving stale
    // highlights when the pointer eventually leaves the grid.
    if (!self._redirectorState) self._redirectorState = { lastDatum: null };
    const state = self._redirectorState;

    const DISCRETE_EVENTS = new Set([
        'click', 'dblclick', 'mousedown', 'mouseup', 'contextmenu',
    ]);

    const findDatumAt = (event) => {
        const viewportNode = elements.main.viewport.node();
        const originalPointer = viewportNode.style.pointerEvents;
        viewportNode.style.pointerEvents = 'none';

        const target = document.elementFromPoint(event.clientX ?? 0, event.clientY ?? 0);

        viewportNode.style.pointerEvents = originalPointer;

        if (!target) return null;

        let current = target;
        while (current && current !== document.body && !(current.hasAttribute?.('data-row'))) {
            current = current.parentNode;
        }
        if (!current || current === document.body) return null;
        return select(current).datum();
    };

    const sameCell = (a, b) => {
        if (a === b) return true;
        if (!a || !b) return false;
        return a.rowIndex === b.rowIndex && a.columnIndex === b.columnIndex;
    };

    const dispatch = (eventType, event, datum) => {
        if (!datum) return;
        for (const { type, listener } of self.eventHandlers) {
            if (type === eventType) listener(event, datum);
        }
    };

    const onMove = (event) => {
        const datum = findDatumAt(event);
        if (!sameCell(datum, state.lastDatum)) {
            if (state.lastDatum) dispatch('mouseout', event, state.lastDatum);
            if (datum) dispatch('mouseover', event, datum);
        }
        state.lastDatum = datum;
        if (datum) dispatch('mousemove', event, datum);
    };

    const onLeave = (event) => {
        if (state.lastDatum) {
            dispatch('mouseout', event, state.lastDatum);
            state.lastDatum = null;
        }
    };

    elements.main.viewport.on('mousemove', onMove);
    elements.main.viewport.on('mouseleave', onLeave);

    // Forward discrete events through the same elementFromPoint walk,
    // but without the synthesised state-tracking.
    const seen = new Set();
    for (const { type } of self.eventHandlers) {
        if (DISCRETE_EVENTS.has(type) && !seen.has(type)) {
            seen.add(type);
            elements.main.viewport.on(type, (event) => {
                const datum = findDatumAt(event);
                if (datum) dispatch(type, event, datum);
            });
        }
    }
}
