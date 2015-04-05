define(['scrollgrid', 'mocks'], function (scrollgrid, mocks) {
    "use strict";

    describe("getTopMargin", function () {

        var result,
            underTest = scrollgrid.prototype.internal.dom.getTopMargin;

        beforeEach(function () {
            mocks.init();
        });

        it("should return 0 if containerSize is not passed", function () {
            result = underTest.call(mocks.scrollgrid);
            expect(result).toEqual(0);
        });

        it("should return 0 if containerSize doesn't have a height", function () {
            result = underTest.call(mocks.scrollgrid, {});
            expect(result).toEqual(0);
        });

        it("should return 0 if parent is not passed", function () {
            result = underTest.call(mocks.scrollgrid, mocks.container);
            expect(result).toEqual(0);
        });

        it("should return 0 if alignment is top", function () {
            result = underTest.call(mocks.scrollgrid, mocks.container, mocks.shape);
            expect(result).toEqual(0);
        });

        it("should default to 0 if alignment is not set", function () {
            mocks.scrollgrid.internal.sizes.physical.verticalAlignment = undefined;
            result = underTest.call(mocks.scrollgrid, mocks.container, mocks.shape);
            expect(result).toEqual(0);
        });

        it("should return half parent height minus half container height if alignment is middle", function () {
            mocks.scrollgrid.internal.sizes.physical.verticalAlignment = "middle";
            result = underTest.call(mocks.scrollgrid, mocks.container, mocks.shape);
            expect(result).toEqual(mocks.node.offsetHeight / 2 - mocks.container.height / 2);
        });

        it("should return parent height minus container height with 1 pixel margin if alignment is bottom", function () {
            mocks.scrollgrid.internal.sizes.physical.verticalAlignment = "bottom";
            result = underTest.call(mocks.scrollgrid, mocks.container, mocks.shape);
            expect(result).toEqual(mocks.node.offsetHeight - mocks.container.height - 1);
        });

    });
});