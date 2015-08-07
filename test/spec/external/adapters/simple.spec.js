define(['d3', 'mock', 'adapters/simple'], function (d3, mock) {
    "use strict";

    describe("simple", function () {

        var underTest = Scrollgrid.adapters.simple;

        beforeEach(function () {
            mock.init();
            d3.init();
        });

        it("should not error if options are not passed", function () {
            expect(underTest.call(mock, [], [])).toBeDefined();
        });

        it("should not error if columns are not passed", function () {
            expect(underTest.call(mock, [])).toBeDefined();
        });

        it("should return the number of rows", function () {
            expect(underTest.call(mock, [
                ["A", "B", "C"],
                [1, 2, 3, 4],
                [5, 6, 7, 8, 9, 10]
            ]).rowCount()).toEqual(3);
        });

        it("should infer the number of columns from the passed data if columns are not passed", function () {
            expect(underTest.call(mock, [
                ["A", "B", "C"],
                [1, 2, 3, 4],
                [5, 6, 7, 8, 9, 10]
            ]).columnCount()).toEqual(6);
        });

        it("should infer the number of columns from the sample rows specified if columns is not passed", function () {
            expect(underTest.call(mock, [
                ["A", "B", "C"],
                [1, 2, 3, 4],
                [5, 6, 7, 8, 9, 10]
            ], { rowSampleSize: 2 }).columnCount()).toEqual(4);
        });

        it("should ignore null rows", function () {
            expect(underTest.call(mock, [
                ["A", "B", "C"],
                [1, 2, 3, 4],
                null,
                [5, 6, 7, 8, 9, 10]
            ]).columnCount()).toEqual(6);
        });

        it("should ignore non-array rows", function () {
            expect(underTest.call(mock, [
                ["A", "B", "C"],
                [1, 2, 3, 4],
                {},
                [5, 6, 7, 8, 9, 10]
            ]).columnCount()).toEqual(6);
        });

        describe("return object", function () {
            var data,
                result;

            beforeEach(function () {
                data = [
                    ["A", "B", "C"],
                    [1, 40, 300],
                    [3, 50, 700],
                    [5, 20, 400],
                    [4, 70, 200],
                    [2, 10, 100],
                    [7, 60, 600],
                    [6, 30, 500]
                ];
                result = underTest.call(mock, data);
            });

            it("should sort ignoring the header rows", function () {
                result.sort.call(mock, 1, 2, 1, false, function (a, b) { return a - b; });
                expect(data).toEqual([
                    ["A", "B", "C"],
                    [1, 40, 300],
                    [2, 10, 100],
                    [5, 20, 400],
                    [3, 50, 700],
                    [7, 60, 600],
                    [4, 70, 200],
                    [6, 30, 500]
                ]);
            });

            it("should sort descending ignoring the header rows", function () {
                result.sort.call(mock, 1, 2, 1, true, function (a, b) { return a - b; });
                expect(data).toEqual([
                    ["A", "B", "C"],
                    [1, 40, 300],
                    [4, 70, 200],
                    [7, 60, 600],
                    [3, 50, 700],
                    [5, 20, 400],
                    [2, 10, 100],
                    [6, 30, 500]
                ]);
            });

            it("should return a function which gets data from the original table", function () {
                var cb = jasmine.createSpy("Callback");
                result.loadDataRange()(2, 1, cb);
                expect(cb).toHaveBeenCalledWith(50);
            });

            it("should return zero for data out of the bounds of the data", function () {
                var cb = jasmine.createSpy("Callback");
                result.loadDataRange()(2, 5, cb);
                expect(cb).toHaveBeenCalledWith(0);
            });

        });
    });
});