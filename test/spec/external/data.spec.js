define(['d3', 'mock', 'external/data'], function (d3, mock) {
    "use strict";

    describe("data", function () {

        var underTest = Scrollgrid.prototype.data,
            result,
            simpleAdapter = Scrollgrid.adapters.simple,
            mockSimple;

        beforeEach(function () {
            mock.init();
            d3.init();
            // Reset the adapter
            Scrollgrid.adapters.simple = simpleAdapter;
            // Adapter fixture
            mockSimple = {
                rowCount: jasmine.createSpy("rowCount").and.returnValue(71),
                columnCount: jasmine.createSpy("columnCount").and.returnValue(73)
            };
        });

        it("should not refresh if no parameter is passed", function () {
            underTest.call(mock);
            expect(mock.refresh).not.toHaveBeenCalled();
        });

        it("should use the simple adapter if an array is passed", function () {
            Scrollgrid.adapters.simple = jasmine.createSpy("Simple").and.returnValue(mockSimple);
            result = underTest.call(mock, [1, 2, 3]);
            expect(Scrollgrid.adapters.simple).toHaveBeenCalledWith([1, 2, 3]);
            expect(result).toEqual(mockSimple);
        });

        it("should return the passed adapter if passed", function () {
            Scrollgrid.adapters.simple = jasmine.createSpy("Simple").and.returnValue(mockSimple);
            result = underTest.call(mock, mockSimple);
            expect(Scrollgrid.adapters.simple).not.toHaveBeenCalledWith(mockSimple);
            expect(result).toEqual(mockSimple);
        });

        it("should set the outer height from the adapter", function () {
            result = underTest.call(mock, mockSimple);
            expect(mock.internal.sizes.virtual.outerHeight).toEqual(71);
        });

        it("should set the outer width from the adapter", function () {
            result = underTest.call(mock, mockSimple);
            expect(mock.internal.sizes.virtual.outerWidth).toEqual(73);
        });

        it("should initialise columns", function () {
            result = underTest.call(mock, mockSimple);
            expect(mock.internal.sizes.physical.initialiseColumns).toHaveBeenCalled();
        });

        it("should sort any columns with sort defined", function () {
            mock.columns = [
                { sort: 'none'},
                { sort: 'asc'},
                { sort: null},
                {},
                { sort: 'desc'},
                { sort: 'incorrect string' }
            ];
            result = underTest.call(mock, mockSimple);
            expect(mock.internal.interaction.sortColumn.calls.count()).toEqual(2);
            expect(mock.internal.interaction.sortColumn.calls.argsFor(0)).toEqual([1, false]);
            expect(mock.internal.interaction.sortColumn.calls.argsFor(1)).toEqual([4, false]);
        });

        it("should calculate the inner width", function () {
            mock.headerColumns = 5;
            mock.footerColumns = 7;
            result = underTest.call(mock, mockSimple);
            expect(mock.internal.sizes.virtual.innerWidth).toEqual(73 - 5 - 7);
        });

        it("should calculate the inner height", function () {
            mock.headerRows = 11;
            mock.footerRows = 13;
            result = underTest.call(mock, mockSimple);
            expect(mock.internal.sizes.virtual.innerHeight).toEqual(71 - 11 - 13);
        });


    });

});