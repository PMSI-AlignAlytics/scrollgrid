define(['d3', 'mock', 'external/formatRules'], function (d3, mock) {
    "use strict";

    describe("formatRules", function () {

        var underTest = Scrollgrid.prototype.formatRules;

        beforeEach(function () {
            mock.init();
            d3.init();
        });

        it("should return the column resizing value if no parameter is passed", function () {
            expect(underTest.call(mock)).toEqual(['A', 'B', 'C']);
        });

        it("should update the column resizing value to a passed parameter", function () {
            underTest.call(mock, ['X', 'Y', 'Z']);
            expect(mock.internal.render.formatRules).toEqual(['X', 'Y', 'Z']);
        });

        it("should return the context when a parameter is passed", function () {
            expect(underTest.call(mock, ['X', 'Y', 'Z'])).toEqual(mock);
        });

        it("should call refresh when a parameter is passed", function () {
            underTest.call(mock, ['X', 'Y', 'Z']);
            expect(mock.refresh).toHaveBeenCalled();
        });

        it("should not call refresh when a parameter is not passed", function () {
            underTest.call(mock);
            expect(mock.refresh).not.toHaveBeenCalled();
        });

    });
});