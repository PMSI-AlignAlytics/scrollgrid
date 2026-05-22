import { cropText } from './cropText.js';
import { getClipPath } from './getClipPath.js';
import { getTextAnchor } from './getTextAnchor.js';
import { getTextPosition } from './getTextPosition.js';

const TEXT_SELECTOR = '.sg-no-style--text-selector';

/**
 * Default cell-foreground renderer.  Invoked as
 * `renderForeground.call(scrollgridInstance, g, viewData)` so that
 * user-supplied renderers (via format rules) get the v3-compatible
 * `this === scrollgrid` signature.
 */
export function renderForeground(g, viewData) {
    const self = this;
    const { properties: props } = self;

    g.selectAll(TEXT_SELECTOR).remove();

    const text = g.append('text')
        .attr('class', `sg-no-style--text-selector ${viewData.foregroundStyle}`)
        .attr('dy', '0.35em')
        .attr('x', getTextPosition(self, viewData))
        .attr('y', viewData.textHeight / 2)
        .style('text-anchor', getTextAnchor(viewData))
        .style('clip-path', getClipPath(self, viewData));

    text.text(viewData.formatter ? viewData.formatter(viewData.value) : viewData.value);

    const path = text.node().style.clipPath;
    if (!path) {
        const sortGap = (viewData.sortIcon && viewData.sortIcon !== 'none')
            ? props.sortIconSize + viewData.cellPadding
            : 0;
        cropText(text, viewData.textWidth - viewData.cellPadding - sortGap);
    }
}
