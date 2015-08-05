define(['d3', 'mock', 'sizes/calculateTextBound'], function (d3, mock) {
    "use strict";

    describe("calculateTextBound", function () {

        var underTest = Scrollgrid.prototype.internal.sizes.calculateTextBound,
            surface,
            result;

        beforeEach(function () {
            mock.init();
            d3.init();

            surface = new d3.shape();

            result = underTest(surface, "My Text To Measure");
        });

        it("should append the text to the passed surface to measure", function () {
            expect(surface.children.text[0].textValue).toEqual("My Text To Measure");
        });

        it("should remove the shape from the surface afterwards", function () {
            expect(surface.children.text[0].remove).toHaveBeenCalled();
        });

        it("should return the measured width of the text", function () {
            expect(result.width).toEqual(surface.children.text[0].bounds.width);
        });

        it("should return the measured height of the text", function () {
            expect(result.height).toEqual(surface.children.text[0].bounds.height);
        });

    });

});