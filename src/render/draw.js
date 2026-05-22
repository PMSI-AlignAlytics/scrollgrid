import { layoutDOM } from '../dom/layoutDOM.js';
import { addResizeHandles } from '../interaction/addResizeHandles.js';

import { getDataBounds } from './getDataBounds.js';
import { getVisibleRegion } from './getVisibleRegion.js';
import { renderRegion } from './renderRegion.js';

export function draw(self, clearCache, reviewSize) {
    const { properties: props, elements: elems } = self;
    const physicalViewArea = getVisibleRegion(self);
    const viewArea = getDataBounds(self, physicalViewArea);

    const p = viewArea.physical;
    const v = viewArea.virtual;
    const y = {
        top: { top: 0, bottom: props.virtualTop },
        middle: { top: props.virtualTop + v.top, bottom: props.virtualTop + v.bottom },
        bottom: { top: props.virtualOuterHeight - props.virtualBottom, bottom: props.virtualOuterHeight },
    };
    const x = {
        left: { left: 0, right: props.virtualLeft },
        middle: { left: props.virtualLeft + v.left, right: props.virtualLeft + v.right },
        right: { left: props.virtualOuterWidth - props.virtualRight, right: props.virtualOuterWidth },
    };

    renderRegion(self, elems.top.left, {}, x.left, y.top, clearCache);
    renderRegion(self, elems.top, { x: p.x }, x.middle, y.top, clearCache);
    renderRegion(self, elems.top.right, {}, x.right, y.top, clearCache);
    renderRegion(self, elems.left, { y: p.y }, x.left, y.middle, clearCache);
    renderRegion(self, elems.main, { x: p.x, y: p.y }, x.middle, y.middle, clearCache);
    renderRegion(self, elems.right, { y: p.y }, x.right, y.middle, clearCache);
    renderRegion(self, elems.bottom.left, {}, x.left, y.bottom, clearCache);
    renderRegion(self, elems.bottom, { x: p.x }, x.middle, y.bottom, clearCache);
    renderRegion(self, elems.bottom.right, {}, x.right, y.bottom, clearCache);

    if (props.allowColumnResizing) {
        addResizeHandles(self, elems.top.left, x.left);
        addResizeHandles(self, elems.top, x.middle, p.x);
        addResizeHandles(self, elems.top.right, x.right);
    }

    if (reviewSize) {
        const fixedSize = {};
        const totalWidth = props.physicalLeft + props.physicalTotalInnerWidth + props.physicalRight + props.verticalScrollbarWidth;
        fixedSize.width = totalWidth < elems.parent.node().offsetWidth ? totalWidth : null;
        const totalHeight = props.physicalTop + props.physicalTotalInnerHeight + props.physicalBottom + props.horizontalScrollbarHeight;
        fixedSize.height = totalHeight < elems.parent.node().offsetHeight ? totalHeight : null;
        layoutDOM(self, fixedSize);
    }
}
