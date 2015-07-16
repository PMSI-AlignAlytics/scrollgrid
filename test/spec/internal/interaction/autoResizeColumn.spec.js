define(['d3', 'scrollgrid_actual', 'scrollgrid_mock'], function (d3, actual, mock) {
    "use strict";

    describe("autoResizeColumn", function () {

        var underTest = actual.prototype.internal.interaction.autoResizeColumn,
            column,
            int,
            dom,
            sizes,
            colSizes = {};

        beforeEach(function () {
            d3.init();
            mock.init();

            int = mock.internal;
            dom = int.dom;
            sizes = int.sizes;

            column = { index: 11 };
            colSizes[dom.top.left.svg] = {width: 2};
            colSizes[dom.top.svg] = {width: 2};
            colSizes[dom.top.right.svg] = {width: 2};
            colSizes[dom.left.svg] = {width: 2};
            colSizes[dom.main.svg] = {width: 2};
            colSizes[dom.right.svg] = {width: 2};
            colSizes[dom.bottom.left.svg] = {width: 2};
            colSizes[dom.bottom.svg] = {width: 2};
            colSizes[dom.bottom.right.svg] = {width: 2};

            sizes.getExistingTextBound = jasmine.createSpy("local mock getExistingTextBound").andCallFake(function (svg) {
                return colSizes[svg];
            });

        });

        it("should find the widest cell if it is in the top left panel", function () {
            colSizes[dom.top.left.svg].width = 3;
            underTest.call(mock, column);
            expect(sizes.getExistingTextBound).toHaveBeenCalledWith(dom.top.left.svg, column.index);
            expect(column.width).toEqual(3);
        });

        it("should find the widest cell if it is in the top panel", function () {
            colSizes[dom.top.svg].width = 3;
            underTest.call(mock, column);
            expect(sizes.getExistingTextBound).toHaveBeenCalledWith(dom.top.svg, column.index);
            expect(column.width).toEqual(3);
        });

        it("should find the widest cell if it is in the top right panel", function () {
            colSizes[dom.top.right.svg].width = 3;
            underTest.call(mock, column);
            expect(sizes.getExistingTextBound).toHaveBeenCalledWith(dom.top.right.svg, column.index);
            expect(column.width).toEqual(3);
        });

        it("should find the widest cell if it is in the left panel", function () {
            colSizes[dom.left.svg].width = 3;
            underTest.call(mock, column);
            expect(sizes.getExistingTextBound).toHaveBeenCalledWith(dom.left.svg, column.index);
            expect(column.width).toEqual(3);
        });

        it("should find the widest cell if it is in the main panel", function () {
            colSizes[dom.main.svg].width = 3;
            underTest.call(mock, column);
            expect(sizes.getExistingTextBound).toHaveBeenCalledWith(dom.main.svg, column.index);
            expect(column.width).toEqual(3);
        });

        it("should find the widest cell if it is in the right panel", function () {
            colSizes[dom.right.svg].width = 3;
            underTest.call(mock, column);
            expect(sizes.getExistingTextBound).toHaveBeenCalledWith(dom.right.svg, column.index);
            expect(column.width).toEqual(3);
        });

        it("should find the widest cell if it is in the bottom left panel", function () {
            colSizes[dom.bottom.left.svg].width = 3;
            underTest.call(mock, column);
            expect(sizes.getExistingTextBound).toHaveBeenCalledWith(dom.bottom.left.svg, column.index);
            expect(column.width).toEqual(3);
        });

        it("should find the widest cell if it is in the bottom panel", function () {
            colSizes[dom.bottom.svg].width = 3;
            underTest.call(mock, column);
            expect(sizes.getExistingTextBound).toHaveBeenCalledWith(dom.bottom.svg, column.index);
            expect(column.width).toEqual(3);
        });

        it("should find the widest cell if it is in the bottom right panel", function () {
            colSizes[dom.bottom.right.svg].width = 3;
            underTest.call(mock, column);
            expect(sizes.getExistingTextBound).toHaveBeenCalledWith(dom.bottom.right.svg, column.index);
            expect(column.width).toEqual(3);
        });

        it("should call refresh maintaining the cache", function () {
            underTest.call(mock, column);
            expect(mock.refresh).toHaveBeenCalledWith(true);
        });

    });

});