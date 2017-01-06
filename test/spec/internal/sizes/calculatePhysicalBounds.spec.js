define(['d3', 'mock', 'sizes/calculatePhysicalBounds'], function (d3, mock) {
    "use strict";

    describe("calculatePhysicalBounds", function () {

        var underTest = Scrollgrid.prototype.internal.sizes.calculatePhysicalBounds,
            elems,
            props,
            topMargin;

        beforeEach(function () {

            mock.init();
            d3.init();

            elems = mock.elements;
            props = mock.properties;

            mock.columns = [
                { width: 1 }, { width: 2 }, { width: 3 }, { width: 5 }, { width: 7 },
                { width: 11 }, { width: 13 }, { width: 17 }, { width: 23 }, { width: 37 }
            ];

            props.virtualLeft = 4;
            props.virtualRight = 2;
            props.virtualOuterWidth = 10;
            props.virtualTop = 2;
            props.virtualBottom = 3;
            props.virtualInnerHeight = 5;
            props.headerRowHeight = 41;
            props.footerRowHeight = 43;
            props.rowHeight = 47;
            elems.container.nodeObject.offsetHeight = 49;
            elems.container.nodeObject.offsetWidth = 51;
            topMargin = 53;

            underTest.call(mock, topMargin);

        });

        it("should calculate physical left as the sum of column widths before the left most cell", function () {
            expect(props.physicalLeft).toEqual(1 + 2 + 3 + 5);
        });

        it("should calculate physical inner width as the sum of column widths between left and right most cells", function () {
            expect(props.physicalTotalInnerWidth).toEqual(7 + 11 + 13 + 17);
        });

        it("should calculate the physical right bound as the column widths after the right most cell", function () {
            expect(props.physicalRight).toEqual(23 + 37);
        });

        it("should calculate the physical height of the column header", function () {
            expect(props.physicalTop).toEqual(2 * 41);
        });

        it("should calculate the physical height of column footer", function () {
            expect(props.physicalBottom).toEqual(3 * 43);
        });

        it("should calculate the width of the visible area", function () {
            expect(props.physicalVisibleInnerWidth).toEqual(51 - props.physicalLeft - props.physicalRight);
        });

        it("should calculate the height of the visible area", function () {
            expect(props.physicalVisibleInnerHeight).toEqual(49 - 53 - props.physicalTop - props.physicalBottom);
        });

        it("should calculate the height of the visible area", function () {
            expect(props.physicalTotalInnerHeight).toEqual(5 * 47);
        });

    });

});
