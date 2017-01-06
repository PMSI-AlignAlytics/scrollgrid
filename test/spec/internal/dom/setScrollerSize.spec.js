define(['mock', 'dom/setScrollerSize'], function (mock) {
    "use strict";

    describe("setScrollerSize", function () {

        var underTest = Scrollgrid.prototype.internal.dom.setScrollerSize,
            elems;

        beforeEach(function () {
            mock.init();
            elems = mock.elements;
        });

        it("should set width to total inner width and add px for cross-browser compatibility", function () {
            underTest.call(mock);
            expect(elems.main.scroller.styles.width).toEqual(mock.vals.totalInnerWidth + "px");
        });

        it("should set height to total inner height and add px for cross-browser compatibility", function () {
            underTest.call(mock);
            expect(elems.main.scroller.styles.height).toEqual(mock.vals.totalInnerHeight + "px");
        });

    });
});
