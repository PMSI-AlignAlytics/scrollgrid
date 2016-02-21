define(['d3', 'mock', 'sizes/initialiseColumns'], function (d3, mock) {
    "use strict";

    describe("initialiseColumns", function () {

        var underTest = Scrollgrid.prototype.internal.sizes.physical.initialiseColumns;

        beforeEach(function () {
            mock.init();
            d3.init();
        });

        it("should use the default column width for the number of columns in the outerWidth if nothing is defined", function () {
            delete mock.columns;
            mock.internal.sizes.virtual.outerWidth = 5;
            mock.defaultColumnWidth = 13;
            underTest.call(mock);
            expect(mock.columns.length).toEqual(5);
            expect(mock.columns[0].width).toEqual(13);
            expect(mock.columns[1].width).toEqual(13);
            expect(mock.columns[2].width).toEqual(13);
            expect(mock.columns[3].width).toEqual(13);
            expect(mock.columns[4].width).toEqual(13);
        });

        it("should use and defined columns", function () {
            mock.columns = [
                { width: 7 },
                null,
                { width: 17 }
            ];
            mock.internal.sizes.virtual.outerWidth = 5;
            mock.defaultColumnWidth = 13;
            underTest.call(mock);
            expect(mock.columns.length).toEqual(5);
            expect(mock.columns[0].width).toEqual(7);
            expect(mock.columns[1].width).toEqual(13);
            expect(mock.columns[2].width).toEqual(17);
            expect(mock.columns[3].width).toEqual(13);
            expect(mock.columns[4].width).toEqual(13);
        });

        it("should not call matchRule if format rules are null", function () {
            mock.formatRules = null;
            underTest.call(mock);
            expect(mock.internal.render.matchRule).not.toHaveBeenCalled();
        });

        it("should not call matchRule if format rules are zero length", function () {
            mock.formatRules = [];
            underTest.call(mock);
            expect(mock.internal.render.matchRule).not.toHaveBeenCalled();
        });

        it("should call matchRule if format rules exist", function () {
            mock.formatRules = [{}];
            underTest.call(mock);
            expect(mock.internal.render.matchRule).toHaveBeenCalled();
        });

        it("should call use the column width rule if provided", function () {
            delete mock.columns;
            mock.internal.sizes.virtual.outerWidth = 5;
            mock.defaultColumnWidth = 13;
            mock.internal.render.matchRule.and.callFake(function (ruleColumn, compareColumn) {
                return compareColumn === ruleColumn;
            });
            mock.formatRules = [{
                column: 3,
                columnWidth: 31
            }];
            underTest.call(mock);
            expect(mock.columns.length).toEqual(5);
            expect(mock.columns[0].width).toEqual(13);
            expect(mock.columns[1].width).toEqual(13);
            expect(mock.columns[2].width).toEqual(31);
            expect(mock.columns[3].width).toEqual(13);
            expect(mock.columns[4].width).toEqual(13);
        });

        it("should use the sort rule if provided", function () {
            delete mock.columns;
            mock.internal.sizes.virtual.outerWidth = 5;
            mock.defaultColumnWidth = 13;
            mock.internal.render.matchRule.and.callFake(function (ruleColumn, compareColumn) {
                return compareColumn === ruleColumn;
            });
            mock.formatRules = [{
                column: 3,
                sort: 'asc'
            }];
            underTest.call(mock);
            expect(mock.columns.length).toEqual(5);
            expect(mock.columns[0].sort).toBeUndefined();
            expect(mock.columns[1].sort).toBeUndefined();
            expect(mock.columns[2].sort).toEqual('asc');
            expect(mock.columns[3].sort).toBeUndefined();
            expect(mock.columns[4].sort).toBeUndefined();
        });

        it("should use the compare function if provided", function () {
            delete mock.columns;
            mock.internal.sizes.virtual.outerWidth = 5;
            mock.defaultColumnWidth = 13;
            mock.internal.render.matchRule.and.callFake(function (ruleColumn, compareColumn) {
                return compareColumn === ruleColumn;
            });
            mock.formatRules = [{
                column: 3,
                compareFunction: 'Comparer'
            }];
            underTest.call(mock);
            expect(mock.columns.length).toEqual(5);
            expect(mock.columns[0].compareFunction).toBeUndefined();
            expect(mock.columns[1].compareFunction).toBeUndefined();
            expect(mock.columns[2].compareFunction).toEqual('Comparer');
            expect(mock.columns[3].compareFunction).toBeUndefined();
            expect(mock.columns[4].compareFunction).toBeUndefined();
        });

    });

});