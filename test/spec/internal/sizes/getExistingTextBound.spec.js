define(['d3', 'mock', 'sizes/getExistingTextBound'], function (d3, mock) {
    "use strict";

    describe("getExistingTextBound", function () {

        var underTest = Scrollgrid.prototype.internal.sizes.getExistingTextBound,
            surface,
            sub;

        beforeEach(function () {
            mock.init();
            d3.init();

            surface = new d3.shape();

        });

        it("should select all text elements on the surface", function () {
            underTest.call(mock, surface);
            expect(surface.selections.text.length).toEqual(1);
        });

        it("should handle any row if row and column are not passed", function () {
            underTest.call(mock, surface);
            sub = surface.selections.text[0].filter.calls.argsFor(0)[0];
            expect(sub({ rowIndex: 123, columnIndex: 456 })).toEqual(true);
            expect(sub({ rowIndex: 321, columnIndex: 456 })).toEqual(true);
            expect(sub({ rowIndex: 123, columnIndex: 654 })).toEqual(true);
            expect(sub({ rowIndex: 321, columnIndex: 654 })).toEqual(true);
        });

        it("should handle any row if columns match", function () {
            underTest.call(mock, surface, 456);
            sub = surface.selections.text[0].filter.calls.argsFor(0)[0];
            expect(sub({ rowIndex: 123, columnIndex: 456 })).toEqual(true);
            expect(sub({ rowIndex: 321, columnIndex: 456 })).toEqual(true);
            expect(sub({ rowIndex: 123, columnIndex: 654 })).toEqual(false);
            expect(sub({ rowIndex: 321, columnIndex: 654 })).toEqual(false);
        });

        it("should handle any column if rows match", function () {
            underTest.call(mock, surface, undefined, 123);
            sub = surface.selections.text[0].filter.calls.argsFor(0)[0];
            expect(sub({ rowIndex: 123, columnIndex: 456 })).toEqual(true);
            expect(sub({ rowIndex: 321, columnIndex: 456 })).toEqual(false);
            expect(sub({ rowIndex: 123, columnIndex: 654 })).toEqual(true);
            expect(sub({ rowIndex: 321, columnIndex: 654 })).toEqual(false);
        });

        it("should handle only row and column which are passed", function () {
            underTest.call(mock, surface, 456, 123);
            sub = surface.selections.text[0].filter.calls.argsFor(0)[0];
            expect(sub({ rowIndex: 123, columnIndex: 456 })).toEqual(true);
            expect(sub({ rowIndex: 321, columnIndex: 456 })).toEqual(false);
            expect(sub({ rowIndex: 123, columnIndex: 654 })).toEqual(false);
            expect(sub({ rowIndex: 321, columnIndex: 654 })).toEqual(false);
        });

        it("should return the pushed bounds", function () {
            expect(underTest.call(mock, surface, 456, 123)).toEqual({ width: 0, height: 0 });
        });

        describe("each operation", function () {

            beforeEach(function () {
                underTest.call(mock, surface);
                sub = surface.selections.text[0].each.calls.argsFor(0)[0];
            });

            it("should pass zero if no sort icon is set", function () {
                sub({ cellPadding: 13 });
                expect(mock.internal.sizes.pushTextBound).toHaveBeenCalledWith({ width: 0, height: 0 }, d3.returnValues.select, 13, 0);
            });

            it("should pass zero if sort icon is set to none", function () {
                sub({ cellPadding: 13, sortIcon: "none" });
                expect(mock.internal.sizes.pushTextBound).toHaveBeenCalledWith({ width: 0, height: 0 }, d3.returnValues.select, 13, 0);
            });

            it("should pass size if sort icon is set", function () {
                sub({ cellPadding: 13, sortIcon: "asc" });
                expect(mock.internal.sizes.pushTextBound).toHaveBeenCalledWith({ width: 0, height: 0 }, d3.returnValues.select, 13, mock.internal.render.sortIconSize + 13);
            });

        });

    });

});