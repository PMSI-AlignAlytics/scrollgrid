define(['d3', 'scrollgrid_actual', 'scrollgrid_mock'], function (d3, actual, mock) {
    "use strict";

    describe("getTextPosition", function () {

        var underTest = actual.prototype.internal.render.getTextPosition,
            result,
            datum;

        beforeEach(function () {
            mock.init();
            d3.init();
            datum = {
                alignment: "left",
                x: 11,
                cellPadding: 13,
                textWidth: 17
            };
        });

        it("should left align text plus padding for left alignment", function () {
            result = underTest.call(mock, datum);
            expect(result).toEqual(datum.x + datum.cellPadding);
        });

        it("should default to left alignment", function () {
            delete datum.alignment;
            result = underTest.call(mock, datum);
            expect(result).toEqual(datum.x + datum.cellPadding);
        });

        it("should include the sort icon size and another cell padding for left alignment", function () {
            datum.sortIcon = "sort icon";
            result = underTest.call(mock, datum);
            expect(result).toEqual(datum.x + mock.vals.sortIconSize + 2 * datum.cellPadding);
        });

        it("should set the x position to the center of the cell for center alignment", function () {
            datum.alignment = "center";
            result = underTest.call(mock, datum);
            expect(result).toEqual(datum.x + datum.textWidth / 2);
        });

        it("should set the x position to the right of the cell minus the padding", function () {
            datum.alignment = "right";
            result = underTest.call(mock, datum);
            expect(result).toEqual(datum.x + datum.textWidth - datum.cellPadding);
        });

    });

});