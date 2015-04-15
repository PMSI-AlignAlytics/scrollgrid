define(['d3', 'scrollgrid_actual', 'scrollgrid_mock'], function (d3, actual, mock) {
    "use strict";

    describe("setAbsolutePosition", function () {

        var underTest = actual.prototype.internal.dom.setAbsolutePosition,
            inShape,
            outShape,
            vals = {
                x: 1,
                y: 2,
                width: 3,
                height: 4
            };

        beforeEach(function () {
            mock.init();
            inShape = new d3.shape();
            outShape = underTest.call(mock, inShape, vals.x, vals.y, vals.width, vals.height);
        });

        it("should return the passed object for chaining", function () {
            expect(outShape).toEqual(inShape);
        });

        it("should set position to absolute", function () {
            expect(outShape.styles.position).toEqual("absolute");
        });

        it("should set overflow to hidden", function () {
            expect(outShape.styles.overflow).toEqual("hidden");
        });

        it("should set left to x value and add px for cross-browser compatibility", function () {
            expect(outShape.styles.left).toEqual(vals.x + "px");
        });

        it("should set top to y value and add px for cross-browser compatibility", function () {
            expect(outShape.styles.top).toEqual(vals.y + "px");
        });

        it("should set width to width value and add px for cross-browser compatibility", function () {
            expect(outShape.styles.width).toEqual(vals.width + "px");
        });

        it("should set height to height value and add px for cross-browser compatibility", function () {
            expect(outShape.styles.height).toEqual(vals.height + "px");
        });

    });
});