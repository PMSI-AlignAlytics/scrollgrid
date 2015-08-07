define(['d3', 'mock', 'external/refresh'], function (d3, mock) {
    "use strict";

    describe("data", function () {

        var underTest = Scrollgrid.prototype.refresh;

        beforeEach(function () {
            mock.init();
            d3.init();
        });

        it("should call layoutDOM", function () {
            underTest.call(mock);
            expect(mock.internal.dom.layoutDOM).toHaveBeenCalled();
        });

        it("should call draw with no clear cache if maintain cache is passed true", function () {
            underTest.call(mock, true);
            expect(mock.internal.render.draw).toHaveBeenCalledWith(false);
        });

        it("should call draw with clear cache if maintain cache is passed false", function () {
            underTest.call(mock, false);
            expect(mock.internal.render.draw).toHaveBeenCalledWith(true);
        });

        it("should call setScrollerSize", function () {
            underTest.call(mock);
            expect(mock.internal.dom.setScrollerSize).toHaveBeenCalled();
        });

    });

});