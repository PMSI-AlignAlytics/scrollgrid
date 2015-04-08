define(['scrollgrid', 'mocks'], function (scrollgrid, mocks) {
    "use strict";

    describe("getTopMargin", function () {

        var result,
            underTest = scrollgrid.prototype.internal.dom.getTopMargin,
            mockPhys;

        beforeEach(function () {
            mocks.init();
            mockPhys = mocks.scrollgrid.internal.sizes.physical;
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
            result = underTest.call(mocks.scrollgrid, {});
            expect(result).toEqual(0);
        });

        it("should return 0 if alignment is top", function () {
            result = underTest.call(mocks.scrollgrid, {}, new mocks.shape());
            expect(result).toEqual(0);
        });

        it("should default to 0 if alignment is not set", function () {
            mockPhys.verticalAlignment = undefined;
            result = underTest.call(mocks.scrollgrid, {}, new mocks.shape());
            expect(result).toEqual(0);
        });

        it("should return half parent height minus half container height if alignment is middle", function () {
            mockPhys.verticalAlignment = "middle";
            result = underTest.call(mocks.scrollgrid, { height: mocks.vals.containerHeight }, new mocks.shape());
            expect(result).toEqual(mocks.vals.nodeOffsetHeight / 2 - mocks.vals.containerHeight / 2);
        });

        it("should return parent height minus container height with 1 pixel margin if alignment is bottom", function () {
            mockPhys.verticalAlignment = "bottom";
            result = underTest.call(mocks.scrollgrid, { height: mocks.vals.containerHeight }, new mocks.shape());
            expect(result).toEqual(mocks.vals.nodeOffsetHeight - mocks.vals.containerHeight - 1);
        });

    });
});