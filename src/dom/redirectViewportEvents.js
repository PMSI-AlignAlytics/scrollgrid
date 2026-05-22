import { select } from 'd3-selection';

/**
 * The main scrollable viewport sits above the SVG that contains the cell
 * shapes, so pointer events fire on the empty viewport <div> rather than on
 * the cells.  We redirect those events to whichever cell `<g>` is under the
 * pointer.
 *
 * The original implementation used `SVGSVGElement.getIntersectionList`,
 * which has been removed from modern browsers.  We instead temporarily
 * disable pointer events on the viewport, ask the document what is under
 * the pointer, and walk up to the owning cell group.
 */
export function redirectViewportEvents(self) {
    const { elements } = self;

    const makeRedirector = (eventType) => (event) => {
        // Disable pointer events on the viewport overlay so the
        // elementFromPoint lookup pierces through to the SVG below.
        const viewportNode = elements.main.viewport.node();
        const originalPointer = viewportNode.style.pointerEvents;
        viewportNode.style.pointerEvents = 'none';

        // d3.pointer gives us [x, y] in the viewport's coordinate space, but
        // for elementFromPoint we want client (viewport-of-window) coords.
        // Use the raw event clientX/Y when available.
        const cx = event.clientX ?? 0;
        const cy = event.clientY ?? 0;
        let target = document.elementFromPoint(cx, cy);

        viewportNode.style.pointerEvents = originalPointer;

        if (!target) return;

        // Walk up to a cell group (anything with a `data-row` attribute).
        while (target && target !== document.body && !(target.hasAttribute?.('data-row'))) {
            target = target.parentNode;
        }
        if (!target || target === document.body) return;

        const g = select(target);
        const handler = g.on(eventType);
        if (handler) {
            // Mirror d3.selection.on signature: (event, datum)
            handler.call(target, event, g.datum());
        }
    };

    for (const { type } of self.eventHandlers) {
        elements.main.viewport.on(type, makeRedirector(type));
    }
}
