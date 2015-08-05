define(['d3', 'scrollgrid', 'render/getVisibleRegion'], function (d3, mock) {
    "use strict";

    describe("getTextPosition", function () {

        var underTest = Scrollgrid.prototype.internal.render.getVisibleRegion,
            result;

        beforeEach(function () {
            mock.init();
            d3.init();
            result = underTest.call(mock);
        });

        it("should use the scroll left for the left of the visible region", function () {
            expect(result.left).toEqual(mock.vals.nodeScrollLeft);
        });

        it("should use the scroll top for the top of the visible region", function () {
            expect(result.top).toEqual(mock.vals.nodeScrollTop);
        });

        it("should use the scroll left plus the visible region width for the right of the visible region", function () {
            expect(result.right).toEqual(mock.vals.nodeScrollLeft + mock.vals.nodeClientWidth);
        });

        it("should use the scroll top plus the visible region height for the bottom of the visible region", function () {
            expect(result.right).toEqual(mock.vals.nodeScrollTop + mock.vals.nodeClientHeight);
        });

    });

});