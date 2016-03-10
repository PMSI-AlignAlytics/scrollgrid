define(['d3', 'mock', 'external/allowSorting'], function (d3, mock) {
    "use strict";

    describe("allowSorting", function () {

        var underTest = Scrollgrid.prototype.allowSorting;

        beforeEach(function () {
            mock.init();
            d3.init();
        });

        it("should not refresh if true is passed to the 'silent' argument", function () {
            underTest.call(mock, true, true);
            expect(mock.refresh).not.toHaveBeenCalled();
        });

        it("should return the column resizing value if no parameter is passed", function () {
            expect(underTest.call(mock)).toEqual(true);
        });

        it("should update the column resizing value to a passed parameter", function () {
            underTest.call(mock, false);
            expect(mock.internal.interaction.allowSorting).toEqual(false);
        });

        it("should return the context when a parameter is passed", function () {
            expect(underTest.call(mock, false)).toEqual(mock);
        });

        it("should call refresh when a parameter is passed", function () {
            underTest.call(mock, false);
            expect(mock.refresh).toHaveBeenCalled();
        });

        it("should not call refresh when a parameter is not passed", function () {
            underTest.call(mock);
            expect(mock.refresh).not.toHaveBeenCalled();
        });

    });
});