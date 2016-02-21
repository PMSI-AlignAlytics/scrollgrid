define(['d3', 'mock', 'render/calculateCellAdjustments'], function (d3, mock) {
    "use strict";

    describe("calculateCellAdjustments", function () {

        var underTest = Scrollgrid.prototype.internal.render.calculateCellAdjustments,
            virtual;

        beforeEach(function () {
            mock.init();
            d3.init();
            virtual = mock.internal.sizes.virtual;
            // Describe a 10x10 grid with a single row and column header or footer
            virtual.outerHeight = 10;
            virtual.outerWidth = 10;
            mock.headerRows = 1;
            mock.headerColumns = 1;
            mock.footerColumns = 1;
            mock.footerRows = 1;
        });

        it("should not apply cell adjustments to any non special cells", function () {
            var result = underTest.call(mock, 5, 5);
            expect(result.x).toEqual(0);
            expect(result.y).toEqual(0);
            expect(result.boxHeight).toEqual(0);
            expect(result.boxWidth).toEqual(0);
            expect(result.textHeight).toEqual(0);
            expect(result.textWidth).toEqual(0);
        });

        it("should add scrollbar width to the last column header before the row footer", function () {
            var result = underTest.call(mock, 0, 8);
            expect(result.boxWidth).toEqual(mock.vals.verticalScrollbarWidth);
        });

        it("should add scrollbar width to the last column footer before the row footer", function () {
            var result = underTest.call(mock, 9, 8);
            expect(result.boxWidth).toEqual(mock.vals.verticalScrollbarWidth);
        });

        it("should add scrollbar height to the last row header before the column footer", function () {
            var result = underTest.call(mock, 8, 0);
            expect(result.boxHeight).toEqual(mock.vals.horizontalScrollbarHeight);
        });

        it("should add scrollbar height to the last row footer before the column footer", function () {
            var result = underTest.call(mock, 8, 9);
            expect(result.boxHeight).toEqual(mock.vals.horizontalScrollbarHeight);
        });

        it("should decrease the row height for the last header row so that its line is visible above the fixed area", function () {
            var result = underTest.call(mock, 0, 5);
            expect(result.boxHeight).toEqual(-1);
        });

        it("should decrease the column width for the last header column so that its line is visible before the fixed area", function () {
            var result = underTest.call(mock, 5, 0);
            expect(result.boxWidth).toEqual(-1);
        });

        it("should decrease the column width for the last column so that its line is visible", function () {
            var result = underTest.call(mock, 5, 9);
            expect(result.boxWidth).toEqual(-1);
        });

        it("should shift the first row after the header so that the top line is not visible (because the header line is already visible", function () {
            var result = underTest.call(mock, 1, 5);
            expect(result.boxHeight).toEqual(1);
            expect(result.y).toEqual(-1);
        });

        it("should shift the first column after the header so that the left line is not visible (because the header line is already visible", function () {
            var result = underTest.call(mock, 5, 1);
            expect(result.boxWidth).toEqual(1);
            expect(result.x).toEqual(-1);
        });

        it("should add the sort icon for the last column header if one is defined", function () {
            mock.columns[5] = { sort: "Mock Sort Icon" };
            var result = underTest.call(mock, 0, 5);
            expect(result.sortIcon).toEqual("Mock Sort Icon");
        });

        it("should not add the sort icon for the column if one is defined but cell is not last header", function () {
            mock.columns[5] = { sort: "Mock Sort Icon" };
            var result = underTest.call(mock, 5, 5);
            expect(result.sortIcon).not.toBeDefined();
        });
    });

});