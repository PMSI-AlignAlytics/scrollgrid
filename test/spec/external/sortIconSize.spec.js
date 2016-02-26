define(['d3', 'mock', 'external/sortIconSize'], function (d3, mock) {
    "use strict";

    describe("sortIconSize", function () {

        var underTest = Scrollgrid.prototype.sortIconSize;

        beforeEach(function () {
            mock.init();
            d3.init();
        });

        it("should return the private value if no parameter is passed", function () {
            expect(underTest.call(mock)).toEqual(mock.vals.sortIconSize);
        });

        it("should update the private value to a passed parameter", function () {
            underTest.call(mock, 13);
            expect(mock.internal.render.sortIconSize).toEqual(13);
        });

        it("should return the context when a parameter is passed", function () {
            expect(underTest.call(mock, 13)).toEqual(mock);
        });

        it("should call refresh when a parameter is passed", function () {
            underTest.call(mock, 13);
            expect(mock.refresh).toHaveBeenCalled();
        });

        it("should not call refresh when a parameter is not passed", function () {
            underTest.call(mock);
            expect(mock.refresh).not.toHaveBeenCalled();
        });

    });

});