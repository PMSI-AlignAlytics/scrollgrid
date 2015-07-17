define(['d3', 'scrollgrid_actual', 'scrollgrid_mock'], function (d3, actual, mock) {
    "use strict";

    describe("cropText", function () {

        var underTest = actual.prototype.internal.render.cropText,
            textShape,
            exampleText;

        beforeEach(function () {
            mock.init();
            d3.init();
            textShape = new d3.shape(mock.vals);
            exampleText = "Example Text Value";
            textShape.text(exampleText);
        });

        it("should store the original text in the datum of the shape", function () {
            underTest.call(mock, textShape, 100);
            expect(textShape.dataPoint.originalText).toEqual(exampleText);
        });

        it("should not crop the text if the size exceeds the width of the text", function () {
            textShape.bounds.width = 99;
            underTest.call(mock, textShape, 100);
            expect(textShape.text()).toEqual(exampleText);
        });

        it("should crop the text if the size is smaller than the width of the text", function () {
            textShape.characterWidth = 10;
            underTest.call(mock, textShape, 100);
            expect(textShape.text()).toEqual(exampleText.substring(0, 10));
        });

        it("should return an empty string for zero width", function () {
            underTest.call(mock, textShape, 0);
            expect(textShape.text()).toEqual("");
        });

        it("should return an empty string for negative width", function () {
            underTest.call(mock, textShape, -100);
            expect(textShape.text()).toEqual("");
        });

        it("should return an empty string if no characters fit", function () {
            textShape.characterWidth = 101;
            underTest.call(mock, textShape, 100);
            expect(textShape.text()).toEqual("");
        });

    });

});