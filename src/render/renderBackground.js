/**
 * Default cell-background renderer.  Invoked as
 * `renderBackground.call(scrollgridInstance, g, viewData)` so that
 * user-supplied renderers (via format rules) get the v3-compatible
 * `this === scrollgrid` signature.
 */
export function renderBackground(g, viewData) {
    g.append('rect')
        .attr('class', viewData.backgroundStyle)
        .attr('width', viewData.boxWidth)
        .attr('height', viewData.boxHeight);
}
