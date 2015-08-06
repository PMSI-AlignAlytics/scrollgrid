define(['d3', 'mock', 'sizes/pushTextBound'], function (d3, mock) {
    "use strict";

    describe("pushTextBound", function () {

        var underTest = Scrollgrid.prototype.internal.sizes.pushTextBound,
            currentBounds,
            shape,
            cellPadding,
            sortIconSize;

        beforeEach(function () {
            mock.init();
            d3.init();

            sortIconSize = 3;
            cellPadding = 7;
            currentBounds = {
                height: 17,
                width: 19
            };
            shape = new d3.shape(mock.vals);

        });

        it("should use the original text if defined", function () {
            shape.dataPoint = {
                originalText: "My Original Text"
            };
            shape.textValue = "My Abbr...";
            underTest.call(mock, currentBounds, shape, cellPadding, sortIconSize);
            expect(shape.text.calls.argsFor(0)).toEqual([]);
            expect(shape.text.calls.argsFor(1)).toEqual(["My Original Text"]);
            expect(shape.text.calls.argsFor(2)).toEqual(["My Abbr..."]);
        });

        it("should use the cell text if original text is not defined", function () {
            shape.dataPoint = {};
            shape.textValue = "My Abbr...";
            underTest.call(mock, currentBounds, shape, cellPadding, sortIconSize);
            expect(shape.text.calls.argsFor(0)).toEqual([]);
            expect(shape.text.calls.argsFor(1)).toEqual([]);
            expect(shape.text.calls.argsFor(2)).toEqual(["My Abbr..."]);
            expect(shape.text.calls.argsFor(3)).toEqual(["My Abbr..."]);
        });

        it("should return 2 * padding + bounds width + sort icon size if greater than current width", function () {
            var text = "Text";
            shape.dataPoint = { originalText: text };
            shape.textValue = text;
            shape.characterWidth = 1;
            expect(underTest.call(mock, currentBounds, shape, cellPadding, sortIconSize).width).toEqual(2 * 7 + 4 + 3);
        });

        it("should return current width if wider than 2 * padding + bounds width + sort icon size", function () {
            var text = "T";
            shape.dataPoint = { originalText: text };
            shape.textValue = text;
            shape.characterWidth = 1;
            expect(underTest.call(mock, currentBounds, shape, cellPadding, sortIconSize).width).toEqual(19);
        });

        it("should return bounds height if greater than current height", function () {
            shape.bounds.height = 18;
            expect(underTest.call(mock, currentBounds, shape, cellPadding, sortIconSize).height).toEqual(18);
        });

        it("should return current height if greater than bounds height", function () {
            shape.bounds.height = 16;
            expect(underTest.call(mock, currentBounds, shape, cellPadding, sortIconSize).height).toEqual(17);
        });
    });

});