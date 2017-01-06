define(['d3', 'mock', 'interaction/autoResizeColumn'], function (d3, mock) {
    "use strict";

    describe("autoResizeColumn", function () {

        var underTest = Scrollgrid.prototype.internal.interaction.autoResizeColumn,
            column,
            int,
            elems,
            colSizes = {};

        beforeEach(function () {
            d3.init();
            mock.init();

            int = mock.internal;
            elems = mock.elements;

            column = { index: 11 };
            colSizes[elems.top.left.svg] = {width: 2};
            colSizes[elems.top.svg] = {width: 2};
            colSizes[elems.top.right.svg] = {width: 2};
            colSizes[elems.left.svg] = {width: 2};
            colSizes[elems.main.svg] = {width: 2};
            colSizes[elems.right.svg] = {width: 2};
            colSizes[elems.bottom.left.svg] = {width: 2};
            colSizes[elems.bottom.svg] = {width: 2};
            colSizes[elems.bottom.right.svg] = {width: 2};

            int.sizes.getExistingTextBound = jasmine.createSpy("local mock getExistingTextBound").and.callFake(function (svg) {
                return colSizes[svg];
            });

        });

        it("should find the widest cell if it is in the top left panel", function () {
            colSizes[elems.top.left.svg].width = 3;
            underTest.call(mock, column);
            expect(int.sizes.getExistingTextBound).toHaveBeenCalledWith(elems.top.left.svg, column.index);
            expect(column.width).toEqual(3);
        });

        it("should find the widest cell if it is in the top panel", function () {
            colSizes[elems.top.svg].width = 3;
            underTest.call(mock, column);
            expect(int.sizes.getExistingTextBound).toHaveBeenCalledWith(elems.top.svg, column.index);
            expect(column.width).toEqual(3);
        });

        it("should find the widest cell if it is in the top right panel", function () {
            colSizes[elems.top.right.svg].width = 3;
            underTest.call(mock, column);
            expect(int.sizes.getExistingTextBound).toHaveBeenCalledWith(elems.top.right.svg, column.index);
            expect(column.width).toEqual(3);
        });

        it("should find the widest cell if it is in the left panel", function () {
            colSizes[elems.left.svg].width = 3;
            underTest.call(mock, column);
            expect(int.sizes.getExistingTextBound).toHaveBeenCalledWith(elems.left.svg, column.index);
            expect(column.width).toEqual(3);
        });

        it("should find the widest cell if it is in the main panel", function () {
            colSizes[elems.main.svg].width = 3;
            underTest.call(mock, column);
            expect(int.sizes.getExistingTextBound).toHaveBeenCalledWith(elems.main.svg, column.index);
            expect(column.width).toEqual(3);
        });

        it("should find the widest cell if it is in the right panel", function () {
            colSizes[elems.right.svg].width = 3;
            underTest.call(mock, column);
            expect(int.sizes.getExistingTextBound).toHaveBeenCalledWith(elems.right.svg, column.index);
            expect(column.width).toEqual(3);
        });

        it("should find the widest cell if it is in the bottom left panel", function () {
            colSizes[elems.bottom.left.svg].width = 3;
            underTest.call(mock, column);
            expect(int.sizes.getExistingTextBound).toHaveBeenCalledWith(elems.bottom.left.svg, column.index);
            expect(column.width).toEqual(3);
        });

        it("should find the widest cell if it is in the bottom panel", function () {
            colSizes[elems.bottom.svg].width = 3;
            underTest.call(mock, column);
            expect(int.sizes.getExistingTextBound).toHaveBeenCalledWith(elems.bottom.svg, column.index);
            expect(column.width).toEqual(3);
        });

        it("should find the widest cell if it is in the bottom right panel", function () {
            colSizes[elems.bottom.right.svg].width = 3;
            underTest.call(mock, column);
            expect(int.sizes.getExistingTextBound).toHaveBeenCalledWith(elems.bottom.right.svg, column.index);
            expect(column.width).toEqual(3);
        });

        it("should call refresh maintaining the cache", function () {
            underTest.call(mock, column);
            expect(mock.refresh).toHaveBeenCalledWith(true);
        });

    });

});
