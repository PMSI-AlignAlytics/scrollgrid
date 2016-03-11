define(['d3', 'mock', 'adapters/json'], function (d3, mock) {
    "use strict";

    describe("json", function () {

        var underTest = Scrollgrid.adapters.json;

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

        it("should infer the number of columns from the passed data if columns are not passed", function () {
            expect(underTest.call(mock, [
                { "A": 1, "B": 2 },
                { "A": 1, "C": 3 },
                { "D": 1 }
            ]).columnCount()).toEqual(4);
        });

        it("should infer the number of columns from the sample rows specified if columns is not passed", function () {
            expect(underTest.call(mock, [
                { "A": 1, "B": 2 },
                { "A": 1, "C": 3 },
                { "D": 1 }
            ], null, { rowSampleSize: 2 }).columnCount()).toEqual(3);
        });

        it("should not infer the number of columns from the data if columns is passed", function () {
            expect(underTest.call(mock, [
                { "A": 1, "B": 2 },
                { "A": 1, "C": 3 },
                { "D": 1 }
            ], [ "1", "2", "3", "4", "5"]).columnCount()).toEqual(5);
        });

        it("should ignore prototypical properties in rows", function () {
            var ComplexObject = function () {
                    this.A = 1;
                    this.B = 3;
                };
            ComplexObject.prototype.X = 22;

            expect(underTest.call(mock, [
                new ComplexObject(),
                { "A": 1, "C": 3 },
                { "D": 1 }
            ]).columnCount()).toEqual(4);
        });

        it("should return an extra row for the header", function () {
            var result = underTest.call(mock, [
                { "A": 1, "B": 2 },
                { "A": 1, "C": 3 },
                { "D": 1 }
            ]);
            expect(result.rowCount()).toEqual(4);
        });

        describe("return object", function () {
            var data,
                result;

            beforeEach(function () {
                data = [
                    { "A": 1, "B": 40, "C": 300 },
                    { "A": 3, "B": 50, "C": 700 },
                    { "A": 5, "B": 20, "C": 400 },
                    { "A": 4, "B": 70, "C": 200 },
                    { "A": 2, "B": 10, "C": 100 },
                    { "A": 7, "B": 60, "C": 600 },
                    { "A": 6, "B": 30, "C": 500 }
                ];
                result = underTest.call(mock, data);
            });

            it("should sort ignoring the header rows", function () {
                result.sort.call(mock, 1, 2, 1, false, function (a, b) { return a - b; });
                expect(data).toEqual([
                    { "A": "A", "B": "B", "C": "C" },
                    { "A": 1, "B": 40, "C": 300 },
                    { "A": 2, "B": 10, "C": 100 },
                    { "A": 5, "B": 20, "C": 400 },
                    { "A": 3, "B": 50, "C": 700 },
                    { "A": 7, "B": 60, "C": 600 },
                    { "A": 4, "B": 70, "C": 200 },
                    { "A": 6, "B": 30, "C": 500 }
                ]);
            });

            it("should sort descending ignoring the header rows", function () {
                result.sort.call(mock, 1, 2, 1, true, function (a, b) { return a - b; });
                expect(data).toEqual([
                    { "A": "A", "B": "B", "C": "C" },
                    { "A": 1, "B": 40, "C": 300 },
                    { "A": 4, "B": 70, "C": 200 },
                    { "A": 7, "B": 60, "C": 600 },
                    { "A": 3, "B": 50, "C": 700 },
                    { "A": 5, "B": 20, "C": 400 },
                    { "A": 2, "B": 10, "C": 100 },
                    { "A": 6, "B": 30, "C": 500 }
                ]);
            });

            it("should invoke the callback with the correct subset of data", function () {
                var cb = jasmine.createSpy("callback");
                data = [
                    { "A": 1, "B": 40, "C": 300 },
                    { "A": 3, "B": 50, "C": 700 },
                    { "A": 5, "B": 20, "C": 400 },
                    { "A": 4, "B": 70, "C": 200 },
                    { "A": 2, "B": 10, "C": 100 },
                    { "A": 7, "B": 60, "C": 600 },
                    { "A": 6, "B": 30, "C": 500 }
                ];
                result.loadDataRange({top: 0, bottom: 2, left: 0, right: 2}, cb);
                expect(cb).toHaveBeenCalledWith([["A", "B"], [1, 40]]);
            });

        });
    });
});