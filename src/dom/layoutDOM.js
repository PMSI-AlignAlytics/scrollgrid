import { calculatePhysicalBounds } from '../sizes/calculatePhysicalBounds.js';
import { draw } from '../render/draw.js';
import { getTopMargin } from './getTopMargin.js';
import { redirectViewportEvents } from './redirectViewportEvents.js';
import { setAbsolutePosition } from './setAbsolutePosition.js';
import { setRelativePosition } from './setRelativePosition.js';
import { setScrollerSize } from './setScrollerSize.js';
import { stylePanels } from './stylePanels.js';

export function layoutDOM(self, fixedSize) {
    const { properties: props, elements: elems } = self;

    elems.parent.style('position', 'relative');

    const topMargin = getTopMargin(self, fixedSize, elems.parent);

    elems.container
        .style('position', 'relative')
        .style('width', fixedSize?.width ? `${fixedSize.width}px` : '100%')
        .style('height', fixedSize?.height ? `${fixedSize.height}px` : '100%')
        .style('padding-top', `${topMargin}px`)
        .style('font-size', 0);

    // If the requested fixed size exceeds the parent, pin to 100%.
    if (elems.container.node().offsetWidth > elems.parent.node().offsetWidth) {
        elems.container.style('width', '100%');
    }
    if (elems.container.node().offsetHeight > elems.parent.node().offsetHeight) {
        elems.container
            .style('margin-top', '0px')
            .style('height', '100%');
    }

    calculatePhysicalBounds(self, topMargin);

    setAbsolutePosition(elems.left.svg, 0, props.physicalTop + topMargin, props.physicalLeft, props.physicalVisibleInnerHeight);
    setRelativePosition(elems.top.svg, props.physicalLeft, props.physicalVisibleInnerWidth, props.physicalTop, 'hidden');
    setRelativePosition(elems.main.viewport, props.physicalLeft, props.physicalVisibleInnerWidth, props.physicalVisibleInnerHeight, 'auto');
    setAbsolutePosition(elems.right.svg, props.physicalLeft + props.physicalVisibleInnerWidth, props.physicalTop + topMargin, props.physicalRight, props.physicalVisibleInnerHeight);
    setRelativePosition(elems.bottom.svg, props.physicalLeft, props.physicalVisibleInnerWidth, props.physicalBottom, 'hidden');
    setAbsolutePosition(elems.top.left.svg, 0, topMargin, props.physicalLeft + props.dragHandleWidth / 2, props.physicalTop);
    setAbsolutePosition(elems.top.right.svg, props.physicalLeft + props.physicalVisibleInnerWidth - props.dragHandleWidth / 2, topMargin, props.physicalRight + props.dragHandleWidth / 2, props.physicalTop);
    setAbsolutePosition(elems.bottom.left.svg, 0, props.physicalTop + props.physicalVisibleInnerHeight + topMargin, props.physicalLeft, props.physicalBottom);
    setAbsolutePosition(elems.bottom.right.svg, props.physicalLeft + props.physicalVisibleInnerWidth, props.physicalTop + props.physicalVisibleInnerHeight + topMargin, props.physicalRight, props.physicalBottom);
    setAbsolutePosition(elems.main.svg, props.physicalLeft, props.physicalTop + topMargin, props.physicalVisibleInnerWidth, props.physicalVisibleInnerHeight);

    stylePanels(self);

    // Top-right panel needs a small offset for the drag handle.
    elems.top.right.transform.attr('transform', `translate(${props.dragHandleWidth / 2}, 0)`);

    elems.main.viewport.on('scroll', () => draw(self, false, false));

    redirectViewportEvents(self);

    setScrollerSize(self);

    // Measure scroll-bar widths the same way the original did.
    props.verticalScrollbarWidth = elems.main.viewport.node().offsetWidth - elems.main.viewport.node().clientWidth;
    props.horizontalScrollbarHeight = elems.main.viewport.node().offsetHeight - elems.main.viewport.node().clientHeight;
}
