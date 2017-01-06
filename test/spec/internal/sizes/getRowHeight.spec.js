define(['d3', 'mock', 'sizes/getRowHeight'], function (d3, mock) {
    "use strict";

    describe("getRowHeight", function () {

        var underTest = Scrollgrid.prototype.internal.sizes.getRowHeight,
            props;

        beforeEach(function () {
            mock.init();
            d3.init();

            props = mock.properties;

            props.virtualOuterHeight = 10;
            props.virtualTop = 2;
            props.virtualBottom = 3;
            props.headerRowHeight = 17;
            props.rowHeight = 23;
            props.footerRowHeight = 29;
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
