define(['d3', 'mock', 'render/getDataInBounds'], function (d3, mock) {
    "use strict";

    describe("getDataInBounds", function () {

        var underTest = Scrollgrid.prototype.internal.render.getDataInBounds,
            viewArea,
            result,
            render,
            physical;

        beforeEach(function () {
            mock.init();
            d3.init();
            render = mock.internal.render;
            physical = mock.internal.sizes.physical;
            viewArea = {
                left: 1,
                top: 2,
                right: 3,
                bottom: 4,
                startX: 100,
                startY: 200
            };
            result = underTest.call(mock, viewArea);
        });

        it("should pass the view area to the adapter to load the data or the area", function () {
            expect(mock.adapter.loadDataRange).toHaveBeenCalledWith(viewArea);
        });

        it("should return an array for every cell in the view area", function () {
            expect(result.length).toEqual(4); // (right - left) * (bottom - top)
        });

        it("should get row height for each row", function () {
            expect(physical.getRowHeight.calls.count()).toEqual(2);
            expect(physical.getRowHeight).toHaveBeenCalledWith(2);
            expect(physical.getRowHeight).toHaveBeenCalledWith(3);
        });

        it("should call calculate cell adjustments for every cell", function () {
            expect(render.calculateCellAdjustments.calls.count()).toEqual(4);
            expect(render.calculateCellAdjustments).toHaveBeenCalledWith(2, 1);
            expect(render.calculateCellAdjustments).toHaveBeenCalledWith(2, 2);
            expect(render.calculateCellAdjustments).toHaveBeenCalledWith(3, 1);
            expect(render.calculateCellAdjustments).toHaveBeenCalledWith(3, 2);
        });

        it("should contain a key based on all values which invalidate cache", function () {
            expect(result[0].key).toEqual("1_2_186_sort icon");
            expect(result[1].key).toEqual("2_2_190_sort icon");
            expect(result[2].key).toEqual("1_3_186_sort icon");
            expect(result[3].key).toEqual("2_3_190_sort icon");
        });

        it("should contain physical x position for each element", function () {
            expect(result[0].x).toEqual(viewArea.startX + mock.vals.adjX + 0.5);
            expect(result[1].x).toEqual(viewArea.startX + mock.columns[1].width + mock.vals.adjX + 0.5);
            expect(result[2].x).toEqual(viewArea.startX + mock.vals.adjX + 0.5);
            expect(result[3].x).toEqual(viewArea.startX + mock.columns[1].width + mock.vals.adjX + 0.5);
        });

        it("should default to zero for the start x position", function () {
            mock.init();
            delete viewArea.startX;
            result = underTest.call(mock, viewArea);
            expect(result[0].x).toEqual(mock.vals.adjX + 0.5);
            expect(result[1].x).toEqual(mock.columns[1].width + mock.vals.adjX + 0.5);
            expect(result[2].x).toEqual(mock.vals.adjX + 0.5);
            expect(result[3].x).toEqual(mock.columns[1].width + mock.vals.adjX + 0.5);
        });

        it("should contain physical y position for each element", function () {
            expect(result[0].y).toEqual(viewArea.startY + mock.vals.adjY + 0.5);
            expect(result[1].y).toEqual(viewArea.startY + mock.vals.adjY + 0.5);
            expect(result[2].y).toEqual(viewArea.startY + mock.vals.physRowHeight + mock.vals.adjY + 0.5);
            expect(result[3].y).toEqual(viewArea.startY + mock.vals.physRowHeight + mock.vals.adjY + 0.5);
        });

        it("should contain box width for each element", function () {
            expect(result[0].boxWidth).toEqual(mock.columns[1].width + mock.vals.adjBoxWidth);
            expect(result[1].boxWidth).toEqual(mock.columns[2].width + mock.vals.adjBoxWidth);
            expect(result[2].boxWidth).toEqual(mock.columns[1].width + mock.vals.adjBoxWidth);
            expect(result[3].boxWidth).toEqual(mock.columns[2].width + mock.vals.adjBoxWidth);
        });

        it("should contain box height for each element", function () {
            expect(result[0].boxHeight).toEqual(mock.vals.physRowHeight + mock.vals.adjBoxHeight);
            expect(result[1].boxHeight).toEqual(mock.vals.physRowHeight + mock.vals.adjBoxHeight);
            expect(result[2].boxHeight).toEqual(mock.vals.physRowHeight + mock.vals.adjBoxHeight);
            expect(result[3].boxHeight).toEqual(mock.vals.physRowHeight + mock.vals.adjBoxHeight);
        });

        it("should contain text width for each element", function () {
            expect(result[0].textWidth).toEqual(mock.columns[1].width + mock.vals.adjTextWidth);
            expect(result[1].textWidth).toEqual(mock.columns[2].width + mock.vals.adjTextWidth);
            expect(result[2].textWidth).toEqual(mock.columns[1].width + mock.vals.adjTextWidth);
            expect(result[3].textWidth).toEqual(mock.columns[2].width + mock.vals.adjTextWidth);
        });

        it("should contain text height for each element", function () {
            expect(result[0].textHeight).toEqual(mock.vals.physRowHeight + mock.vals.adjTextHeight);
            expect(result[1].textHeight).toEqual(mock.vals.physRowHeight + mock.vals.adjTextHeight);
            expect(result[2].textHeight).toEqual(mock.vals.physRowHeight + mock.vals.adjTextHeight);
            expect(result[3].textHeight).toEqual(mock.vals.physRowHeight + mock.vals.adjTextHeight);
        });

        it("should have background class for each element", function () {
            expect(result[0].backgroundStyle).toContain('back-r3');
            expect(result[0].backgroundStyle).toContain('back-c2');
            expect(result[1].backgroundStyle).toContain('back-r3');
            expect(result[1].backgroundStyle).toContain('back-c3');
            expect(result[2].backgroundStyle).toContain('back-r4');
            expect(result[2].backgroundStyle).toContain('back-c2');
            expect(result[3].backgroundStyle).toContain('back-r4');
            expect(result[3].backgroundStyle).toContain('back-c3');
        });

        it("should have foreground class for each element", function () {
            expect(result[0].foregroundStyle).toContain('fore-r3');
            expect(result[0].foregroundStyle).toContain('fore-c2');
            expect(result[1].foregroundStyle).toContain('fore-r3');
            expect(result[1].foregroundStyle).toContain('fore-c3');
            expect(result[2].foregroundStyle).toContain('fore-r4');
            expect(result[2].foregroundStyle).toContain('fore-c2');
            expect(result[3].foregroundStyle).toContain('fore-r4');
            expect(result[3].foregroundStyle).toContain('fore-c3');
        });

        it("should apply the sort icon from the adjustments", function () {
            expect(result[0].sortIcon).toEqual(mock.vals.sortIcon);
            expect(result[1].sortIcon).toEqual(mock.vals.sortIcon);
            expect(result[2].sortIcon).toEqual(mock.vals.sortIcon);
            expect(result[3].sortIcon).toEqual(mock.vals.sortIcon);
        });

        it("should set the sort icon to none if none is set", function () {
            mock.init();
            mock.internal.render.calculateCellAdjustments = jasmine.createSpy("calculate cell with no icon").and.returnValue({});
            result = underTest.call(mock, viewArea);
            expect(result[0].sortIcon).toEqual("none");
            expect(result[1].sortIcon).toEqual("none");
            expect(result[2].sortIcon).toEqual("none");
            expect(result[3].sortIcon).toEqual("none");
        });

        it("should set the cell padding", function () {
            expect(result[0].cellPadding).toEqual(mock.vals.cellPadding);
            expect(result[1].cellPadding).toEqual(mock.vals.cellPadding);
            expect(result[2].cellPadding).toEqual(mock.vals.cellPadding);
            expect(result[3].cellPadding).toEqual(mock.vals.cellPadding);
        });

        it("should set left alignment", function () {
            expect(result[0].alignment).toEqual("left");
            expect(result[1].alignment).toEqual("left");
            expect(result[2].alignment).toEqual("left");
            expect(result[3].alignment).toEqual("left");
        });

        it("should set row index", function () {
            expect(result[0].rowIndex).toEqual(2);
            expect(result[1].rowIndex).toEqual(2);
            expect(result[2].rowIndex).toEqual(3);
            expect(result[3].rowIndex).toEqual(3);
        });

        it("should set column index", function () {
            expect(result[0].columnIndex).toEqual(1);
            expect(result[1].columnIndex).toEqual(2);
            expect(result[2].columnIndex).toEqual(1);
            expect(result[3].columnIndex).toEqual(2);
        });

        it("should set column", function () {
            expect(result[0].column).toEqual(mock.columns[1]);
            expect(result[1].column).toEqual(mock.columns[2]);
            expect(result[2].column).toEqual(mock.columns[1]);
            expect(result[3].column).toEqual(mock.columns[2]);
        });

        it("should set a null formatter", function () {
            expect(result[0].formatter).toBeNull();
            expect(result[1].formatter).toBeNull();
            expect(result[2].formatter).toBeNull();
            expect(result[3].formatter).toBeNull();
        });

        it("should set the load method", function () {
            expect(result[0].getValue).toEqual("getValue method");
            expect(result[1].getValue).toEqual("getValue method");
            expect(result[2].getValue).toEqual("getValue method");
            expect(result[3].getValue).toEqual("getValue method");
        });

        it("should call the apply rules method passing the returned dataset", function () {
            expect(render.applyRules).toHaveBeenCalledWith(result);
        });

    });

});