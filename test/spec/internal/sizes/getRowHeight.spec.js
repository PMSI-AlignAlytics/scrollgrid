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
            sizes.virtual.top = 2;
            sizes.virtual.bottom = 3;
            sizes.physical.headerRowHeight = 17;
            sizes.physical.rowHeight = 23;
            sizes.physical.footerRowHeight = 29;
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