define(['d3', 'mock', 'render/matchRule'], function (d3, mock) {
    "use strict";

    describe("matchRule", function () {

        var underTest = Scrollgrid.prototype.internal.render.matchRule;

        beforeEach(function () {
            mock.init();
            d3.init();
        });

        it("should always match the * selector", function () {
            expect(underTest.call(mock, "*", 11, 100)).toEqual(true);
        });

        it("should match a single value for a direct value", function () {
            expect(underTest.call(mock, "11", 11, 100)).toEqual(true);
        });

        it("should not match a different single value for a direct value", function () {
            expect(underTest.call(mock, "12", 11, 100)).toEqual(false);
        });

        it("should match -1 with the extreme value", function () {
            expect(underTest.call(mock, "-1", 100, 100)).toEqual(true);
        });

        it("should match -1 with the extreme value minus 1", function () {
            expect(underTest.call(mock, "-1", 99, 100)).toEqual(false);
        });

        it("should match -1 with literal minus 1", function () {
            expect(underTest.call(mock, "-1", -1, 100)).toEqual(false);
        });

        it("should match first element in a comma separated array of values", function () {
            expect(underTest.call(mock, "1,3,-2", 1, 100)).toEqual(true);
        });

        it("should match second element in a comma separated array of values", function () {
            expect(underTest.call(mock, "1,3,-2", 3, 100)).toEqual(true);
        });

        it("should match negative element in a comma separated array of values", function () {
            expect(underTest.call(mock, "1,3,-2", 99, 100)).toEqual(true);
        });

        it("should not match non-matching element in a comma separated array of values", function () {
            expect(underTest.call(mock, "1,3,-2", 2, 100)).toEqual(false);
        });

        it("should match first element of an array of elements", function () {
            expect(underTest.call(mock, "2:4", 2, 100)).toEqual(true);
        });

        it("should match middle element of an array of elements", function () {
            expect(underTest.call(mock, "2:4", 3, 100)).toEqual(true);
        });

        it("should match last element of an array of elements", function () {
            expect(underTest.call(mock, "2:4", 4, 100)).toEqual(true);
        });

        it("should not match outside element of an array of elements", function () {
            expect(underTest.call(mock, "2:4", 5, 100)).toEqual(false);
        });

        it("should match first element in a negative array of elements", function () {
            expect(underTest.call(mock, "-92:-90", 9, 100)).toEqual(true);
        });

        it("should match middle element in a negative array of elements", function () {
            expect(underTest.call(mock, "-92:-90", 10, 100)).toEqual(true);
        });

        it("should match last element in a negative array of elements", function () {
            expect(underTest.call(mock, "-92:-90", 11, 100)).toEqual(true);
        });

        it("should not match external element in a negative array of elements", function () {
            expect(underTest.call(mock, "-92:-90", 12, 100)).toEqual(false);
        });

        it("should match array of elements as part of a list", function () {
            expect(underTest.call(mock, "1,5:6,9", 5, 100)).toEqual(true);
        });

        it("should not match elements outside array of elements as part of a list", function () {
            expect(underTest.call(mock, "1,5:6,9", 4, 100)).toEqual(false);
        });

        it("should match the first element in a skipped array", function () {
            expect(underTest.call(mock, "1(2)10", 1, 100)).toEqual(true);
        });

        it("should not match a skipped element in a skipped array", function () {
            expect(underTest.call(mock, "1(2)10", 2, 100)).toEqual(false);
        });

        it("should match an unskipped element in a skipped array", function () {
            expect(underTest.call(mock, "1(2)10", 3, 100)).toEqual(true);
        });

        it("should match whole array when skip value is less than 1", function () {
            expect(underTest.call(mock, "1(0)10", 2, 100)).toEqual(true);
        });

    });

});
