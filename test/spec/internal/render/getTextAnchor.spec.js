define(['d3', 'scrollgrid_actual', 'scrollgrid_mock'], function (d3, actual, mock) {
    "use strict";

    describe("getTextAnchor", function () {

        var underTest = actual.prototype.internal.render.getTextAnchor,
            result;

        beforeEach(function () {
            mock.init();
            d3.init();
        });

        it("should return start for left alignment", function () {
            result = underTest.call(mock, { alignment: "left" });
            expect(result).toEqual("start");
        });

        it("should return middle for center alignment", function () {
            result = underTest.call(mock, { alignment: "center" });
            expect(result).toEqual("middle");
        });

        it("should return end for right alignment", function () {
            result = underTest.call(mock, { alignment: "right" });
            expect(result).toEqual("end");
        });

        it("should default to start", function () {
            result = underTest.call(mock, {});
            expect(result).toEqual("start");
        });

    });

});