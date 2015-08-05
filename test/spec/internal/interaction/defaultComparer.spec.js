define(['interaction/defaultComparer'], function () {
    "use strict";

    describe("defaultComparer", function () {

        var underTest = Scrollgrid.prototype.internal.interaction.defaultComparer;

        it("should return zero if two matching dates are passed", function () {
            var result = underTest(new Date("2012-06-01"), new Date("2012-06-01"));
            expect(result).toEqual(0);
        });

        it("should return a negative number if 'a' is a date earlier than 'b'", function () {
            var result = underTest(new Date("2012-05-01"), new Date("2012-06-01"));
            expect(result).toBeLessThan(0);
        });

        it("should return a positive number if 'a' is a date later than 'b'", function () {
            var result = underTest(new Date("2012-06-01"), new Date("2012-05-01"));
            expect(result).toBeGreaterThan(0);
        });

        it("should return zero if two matching date strings are passed", function () {
            var result = underTest("2012-06-01", "2012-06-01");
            expect(result).toEqual(0);
        });

        it("should return a negative number if 'a' is a date string earlier than 'b'", function () {
            var result = underTest("2012-05-01", "2012-06-01");
            expect(result).toBeLessThan(0);
        });

        it("should return a positive number if 'a' is a date string later than 'b'", function () {
            var result = underTest("2012-06-01", "2012-05-01");
            expect(result).toBeGreaterThan(0);
        });

        it("should return zero if two matching numbers are passed", function () {
            var result = underTest(123.456, 123.456);
            expect(result).toEqual(0);
        });

        it("should return a negative number if 'a' is a number less than 'b'", function () {
            var result = underTest(-34.56, 1.234);
            expect(result).toBeLessThan(0);
        });

        it("should return a positive number if 'a' is a number greater than 'b'", function () {
            var result = underTest(1.234, -34.56);
            expect(result).toBeGreaterThan(0);
        });

        it("should return zero if two matching number strings are passed", function () {
            var result = underTest("123.456", "123.456");
            expect(result).toEqual(0);
        });

        it("should return a negative number if 'a' is a number string less than 'b'", function () {
            var result = underTest("-34.56", "1.234");
            expect(result).toBeLessThan(0);
        });

        it("should return a positive number if 'a' is a number string greater than 'b'", function () {
            var result = underTest("1.234", "-34.56");
            expect(result).toBeGreaterThan(0);
        });

        it("should return zero if two matching strings are passed", function () {
            var result = underTest("Apples", "Apples");
            expect(result).toEqual(0);
        });

        it("should return a negative number if 'a' is a string alphabetically less than 'b'", function () {
            var result = underTest("Apples", "Bananas");
            expect(result).toBeLessThan(0);
        });

        it("should return a positive number if 'a' is a string alphabetically greater than 'b'", function () {
            var result = underTest("Bananas", "Apples");
            expect(result).toBeGreaterThan(0);
        });

    });

});