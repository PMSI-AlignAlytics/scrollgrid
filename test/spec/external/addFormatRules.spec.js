define(['d3', 'mock', 'external/addFormatRules'], function (d3, mock) {
    "use strict";

    describe("addFormatRules", function () {

        var underTest = Scrollgrid.prototype.addFormatRules;

        beforeEach(function () {
            mock.init();
            d3.init();
        });

        it("should not refresh if true is passed to the 'silent' argument", function () {
            underTest.call(mock, {}, true);
            expect(mock.refresh).not.toHaveBeenCalled();
        });

        it("should return the format rules if no parameter is passed", function () {
            expect(underTest.call(mock)).toEqual(['A', 'B', 'C']);
        });

        it("should append to the format rules if a single value is passed", function () {
            expect(underTest.call(mock, 'D')).toEqual(['A', 'B', 'C', 'D']);
        });

        it("should append to the format rules if an array is passed", function () {
            expect(underTest.call(mock, ['D', 'E'])).toEqual(['A', 'B', 'C', 'D', 'E']);
        });

        it("should call the initialise columns method", function () {
            underTest.call(mock, ['D', 'E']);
            expect(mock.internal.sizes.physical.initialiseColumns).toHaveBeenCalled();
        });

        it("should call refresh when a parameter is passed", function () {
            underTest.call(mock, ['D', 'E']);
            expect(mock.refresh).toHaveBeenCalled();
        });

    });

});