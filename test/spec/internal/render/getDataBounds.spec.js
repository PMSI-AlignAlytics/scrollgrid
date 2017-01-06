define(['d3', 'mock', 'render/getDataBounds'], function (d3, mock) {
    "use strict";

    describe("getDataBounds", function () {

        var underTest = Scrollgrid.prototype.internal.render.getDataBounds,
            props;

        beforeEach(function () {
            var i;
            mock.init();
            d3.init();
            props = mock.properties;
            // Define a 100x200px physical grid for testing
            props.physicalTotalInnerWidth = 100;
            props.physicalTotalInnerHeight = 200;
            props.rowHeight = 10;
            // Define a 10 column by 20 row virtual grid for testing
            props.virtualInnerWidth = 10;
            props.virtualInnerHeight = 20;
            props.virtualLeft = 1;
            props.virtualRight = 1;
            props.virtualTop = 1;
            props.virtualBottom = 1;
            mock.columns = [];
            for (i = 0; i < 12; i += 1) {
                mock.columns.push({ width: 10 });
            }
        });

        it("should select the first visible row from the set", function () {
            // Call the test method with a visible range
            var result = underTest.call(mock, { top: 45 });
            expect(result.virtual.top).toEqual(3);
            expect(result.physical.y).toEqual(3 * 10 - 45);
        });

        it("should not be able to select a negative row", function () {
            // Call the test method with a visible range
            var result = underTest.call(mock, { top: -40 });
            expect(result.virtual.top).toEqual(0);
        });

        it("should select the last visible row from the set", function () {
            // Call the test method with a visible range
            var result = underTest.call(mock, { bottom: 175 });
            expect(result.virtual.bottom).toEqual(19);
        });

        it("should not be able to select a row outside the bounds", function () {
            // Call the test method with a visible range
            var result = underTest.call(mock, { bottom: 300 });
            expect(result.virtual.bottom).toEqual(20);
        });

        it("should select the first visible column from the set", function () {
            // Call the test method with a visible range
            var result = underTest.call(mock, { left: 45 });
            expect(result.virtual.left).toEqual(4);
            expect(result.physical.x).toEqual(4 * 10 - 45);
        });

        it("should not be able to select a negative column", function () {
            // Call the test method with a visible range
            var result = underTest.call(mock, { left: -40 });
            expect(result.virtual.left).toEqual(0);
        });

        it("should select the last visible row from the set", function () {
            // Call the test method with a visible range
            var result = underTest.call(mock, { right: 75 });
            expect(result.virtual.right).toEqual(9);
        });

        it("should not be able to select a row outside the bounds", function () {
            // Call the test method with a visible range
            var result = underTest.call(mock, { right: 300 });
            expect(result.virtual.right).toEqual(10);
        });

    });

});
