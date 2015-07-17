define(['d3', 'scrollgrid_actual', 'scrollgrid_mock'], function (d3, actual, mock) {
    "use strict";

    describe("getTopMargin", function () {

        var result,
            underTest = actual.prototype.internal.dom.getTopMargin,
            mockPhys;

        beforeEach(function () {
            mock.init();
            mockPhys = mock.internal.sizes.physical;
        });

        it("should return 0 if containerSize is not passed", function () {
            result = underTest.call(mock);
            expect(result).toEqual(0);
        });

        it("should return 0 if containerSize doesn't have a height", function () {
            result = underTest.call(mock, {});
            expect(result).toEqual(0);
        });

        it("should return 0 if parent is not passed", function () {
            result = underTest.call(mock, { height: mock.vals.containerHeight });
            expect(result).toEqual(0);
        });

        it("should default to 0 if alignment is not set", function () {
            mockPhys.verticalAlignment = undefined;
            result = underTest.call(mock, { height: mock.vals.containerHeight }, new d3.shape(mock.vals));
            expect(result).toEqual(0);
        });

        it("should return 0 if alignment is top", function () {
            mockPhys.verticalAlignment = "top";
            result = underTest.call(mock, { height: mock.vals.containerHeight }, new d3.shape(mock.vals));
            expect(result).toEqual(0);
        });

        it("should return half parent height minus half container height if alignment is middle", function () {
            mockPhys.verticalAlignment = "middle";
            result = underTest.call(mock, { height: mock.vals.containerHeight }, new d3.shape(mock.vals));
            expect(result).toEqual(mock.vals.nodeOffsetHeight / 2 - mock.vals.containerHeight / 2);
        });

        it("should return parent height minus container height with 1 pixel margin if alignment is bottom", function () {
            mockPhys.verticalAlignment = "bottom";
            result = underTest.call(mock, { height: mock.vals.containerHeight }, new d3.shape(mock.vals));
            expect(result).toEqual(mock.vals.nodeOffsetHeight - mock.vals.containerHeight - 1);
        });

    });
});