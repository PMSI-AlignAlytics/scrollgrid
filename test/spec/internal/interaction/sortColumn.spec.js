define(['d3', 'mock', 'interaction/sortColumn'], function (d3, mock) {
    "use strict";

    describe("sortColumn", function () {

        var underTest = Scrollgrid.prototype.internal.interaction.sortColumn;

        beforeEach(function () {
            mock.init();
            d3.init();
        });

        it("should remove the sort property from every column except the passed index", function () {
            mock.columns[0].sort = 'asc';
            mock.columns[1].sort = 'asc';
            mock.columns[2].sort = 'asc';
            underTest.call(mock, 1);
            expect(mock.columns[0].sort).toBeUndefined();
            expect(mock.columns[1].sort).toBeDefined();
            expect(mock.columns[2].sort).toBeUndefined();
        });

        it("if toggle is false the sort value should remain", function () {
            mock.columns[1].sort = 'asc';
            underTest.call(mock, 1, false);
            expect(mock.columns[1].sort).toEqual('asc');
        });

        it("if toggle is true and the sort value was asc it should be changed to desc", function () {
            mock.columns[1].sort = 'asc';
            underTest.call(mock, 1, true);
            expect(mock.columns[1].sort).toEqual('desc');
        });

        it("if toggle is true and the sort value was desc it should be changed to asc", function () {
            mock.columns[1].sort = 'desc';
            underTest.call(mock, 1, true);
            expect(mock.columns[1].sort).toEqual('asc');
        });

        it("it should call the sort method of the adapter ascending", function () {
            mock.columns[1] = { sort: 'asc', compareFunction: 'comparer' };
            underTest.call(mock, 1, false);
            expect(mock.adapter.sort).toHaveBeenCalledWith(1, mock.vals.virtTop, mock.vals.virtBottom, false, 'comparer');
        });

        it("it should call the sort method of the adapter descending", function () {
            mock.columns[1] = { sort: 'desc', compareFunction: 'comparer' };
            underTest.call(mock, 1, false);
            expect(mock.adapter.sort).toHaveBeenCalledWith(1, mock.vals.virtTop, mock.vals.virtBottom, true, 'comparer');
        });

        it("it should fall back to the default comparer if none is specified", function () {
            mock.columns[1] = { sort: 'desc' };
            underTest.call(mock, 1, false);
            expect(mock.adapter.sort).toHaveBeenCalledWith(1, mock.vals.virtTop, mock.vals.virtBottom, true, mock.internal.interaction.defaultComparer);
        });

    });

});