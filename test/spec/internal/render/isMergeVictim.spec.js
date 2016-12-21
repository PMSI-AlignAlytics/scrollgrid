/*
define(['d3', 'mock', 'render/isMergeVictim'], function (d3, mock) {
    "use strict";

    describe("isMergeVictim", function () {

        var underTest = Scrollgrid.prototype.internal.render.isMergeVictim;

        beforeEach(function () {
            var i;
            mock.init();
            d3.init();
        });

        it("should select the first visible row from the set", function () {
            // Call the test method with a visible range
            var result = underTest.call(mock, { top: 45 });
            expect(result.virtual.top).toEqual(3);
            expect(result.physical.y).toEqual(3 * 10 - 45);
        });

    });

});*/
