define(['d3', 'mock', 'sizes/calculatePhysicalBounds'], function (d3, mock) {
    "use strict";

    describe("calculatePhysicalBounds", function () {

        var underTest = Scrollgrid.prototype.internal.sizes.calculatePhysicalBounds;

        beforeEach(function () {
            mock.init();
            d3.init();

            underTest();

        });


    });

});