define(['d3', 'mock', 'sizes/calculatePhysicalBounds'], function (d3, mock) {
    "use strict";

    describe("calculatePhysicalBounds", function () {

        var underTest = Scrollgrid.prototype.internal.sizes.calculatePhysicalBounds,
            int,
            sizes,
            physical,
            virtual,
            dom,
            topMargin;

        beforeEach(function () {

            mock.init();
            d3.init();

            int = mock.internal;
            sizes = int.sizes;
            physical = sizes.physical;
            virtual = sizes.virtual;
            dom = int.dom;

            mock.columns = [
                { width: 1 }, { width: 2 }, { width: 3 }, { width: 5 }, { width: 7 },
                { width: 11 }, { width: 13 }, { width: 17 }, { width: 23 }, { width: 37 }
            ];

            virtual.left = 4;
            virtual.right = 2;
            virtual.outerWidth = 10;
            virtual.top = 2;
            virtual.bottom = 3;
            virtual.innerHeight = 5;
            physical.headerRowHeight = 41;
            physical.footerRowHeight = 43;
            physical.rowHeight = 47;
            dom.container.nodeObject.offsetHeight = 49;
            dom.container.nodeObject.offsetWidth = 51;
            topMargin = 53;

            underTest.call(mock, topMargin);

        });

        it("should calculate physical left as the sum of column widths before the left most cell", function () {
            expect(physical.left).toEqual(1 + 2 + 3 + 5);
        });

        it("should calculate physical inner width as the sum of column widths between left and right most cells", function () {
            expect(physical.totalInnerWidth).toEqual(7 + 11 + 13 + 17);
        });

        it("should calculate the physical right bound as the column widths after the right most cell", function () {
            expect(physical.right).toEqual(23 + 37);
        });

        it("should calculate the physical height of the column header", function () {
            expect(physical.top).toEqual(2 * 41);
        });

        it("should calculate the physical height of column footer", function () {
            expect(physical.bottom).toEqual(3 * 43);
        });

        it("should calculate the width of the visible area", function () {
            expect(physical.visibleInnerWidth).toEqual(51 - physical.left - physical.right);
        });

        it("should calculate the height of the visible area", function () {
            expect(physical.visibleInnerHeight).toEqual(49 - 53 - physical.top - physical.bottom);
        });

        it("should calculate the height of the visible area", function () {
            expect(physical.totalInnerHeight).toEqual(5 * 47);
        });

    });

});