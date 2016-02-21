define(['d3', 'mock', 'sizes/getRowHeight'], function (d3, mock) {
    "use strict";

    describe("getRowHeight", function () {

        var underTest = Scrollgrid.prototype.internal.sizes.physical.getRowHeight,
            int,
            sizes;

        beforeEach(function () {
            mock.init();
            d3.init();

            int = mock.internal;
            sizes = int.sizes;

            sizes.virtual.outerHeight = 10;
            mock.headerRows = 2;
            mock.footerRows = 3;
            mock.headerRowHeight = 17;
            mock.rowHeight = 23;
            mock.footerRowHeight = 29;
        });

        it("should return the header row height for a header row", function () {
            expect(underTest.call(mock, 1)).toEqual(17);
        });

        it("should return the standard row height for a body row", function () {
            expect(underTest.call(mock, 4)).toEqual(23);
        });

        it("should return the standard row height for a body row", function () {
            expect(underTest.call(mock, 8)).toEqual(29);
        });

    });

});