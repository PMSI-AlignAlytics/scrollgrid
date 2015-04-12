define(['scrollgrid_actual', 'scrollgrid_mock'], function (actual, mock) {
    "use strict";

    describe("setScrollerSize", function () {

        var underTest = actual.prototype.internal.dom.setScrollerSize,
            mockDom;

        beforeEach(function () {
            mock.init();
            mockDom = mock.internal.dom;
        });

        it("should set width to total inner width and add px for cross-browser compatibility", function () {
            underTest.call(mock);
            expect(mockDom.main.scroller.styles.width).toEqual(mock.vals.totalInnerWidth + "px");
        });

        it("should set height to total inner height and add px for cross-browser compatibility", function () {
            underTest.call(mock);
            expect(mockDom.main.scroller.styles.height).toEqual(mock.vals.totalInnerHeight + "px");
        });

    });
});