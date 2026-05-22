// jsdom doesn't implement SVG geometry — every SVG element returns zero
// from getBBox.  Most of Scrollgrid still works (data binding, layout
// arithmetic, adapters, format rules), but text measurement and the
// crop-text fallback rely on it.  Stub a sensible value so the smoke
// tests don't divide by NaN.
if (typeof SVGElement !== 'undefined' && !SVGElement.prototype.getBBox) {
    SVGElement.prototype.getBBox = function () {
        const text = this.textContent ?? '';
        return { x: 0, y: 0, width: text.length * 7, height: 12 };
    };
}

if (typeof SVGSVGElement !== 'undefined' && !SVGSVGElement.prototype.createSVGRect) {
    SVGSVGElement.prototype.createSVGRect = function () {
        return { x: 0, y: 0, width: 0, height: 0 };
    };
}
