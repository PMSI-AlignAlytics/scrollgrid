define(['scrollgrid_actual', 'scrollgrid_mock'], function (actual, mock) {
    "use strict";

    describe("setRelativePosition", function () {

        var underTest = actual.prototype.internal.dom.setRelativePosition,
            inShape,
            outShape,
            vals = {
                x: 1,
                width: 2,
                height: 3,
                overflow: "test overflow setting"
            };

        beforeEach(function () {
            mock.init();
            inShape = new mock.shape();
            outShape = underTest.call(mock, inShape, vals.x, vals.width, vals.height, vals.overflow);
        });

        it("should return the passed object for chaining", function () {
            expect(outShape).toEqual(inShape);
        });

        it("should set position to relative", function () {
            expect(outShape.styles.position).toEqual("relative");
        });

        it("should set overflow to passed value", function () {
            expect(outShape.styles.overflow).toEqual(vals.overflow);
        });

        it("should set left margin to x value and add px for cross-browser compatibility", function () {
            expect(outShape.styles["margin-left"]).toEqual(vals.x + "px");
        });

        it("should set width to width value and add px for cross-browser compatibility", function () {
            expect(outShape.styles.width).toEqual(vals.width + "px");
        });

        it("should set height to height value and add px for cross-browser compatibility", function () {
            expect(outShape.styles.height).toEqual(vals.height + "px");
        });

    });
});