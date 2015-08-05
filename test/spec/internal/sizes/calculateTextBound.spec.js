define(['d3', 'mock', 'sizes/calculateTextBound'], function (d3, mock) {
    "use strict";

    describe("calculateTextBound", function () {

        var underTest = Scrollgrid.prototype.internal.sizes.calculateTextBound;

        beforeEach(function () {
            mock.init();
            d3.init();

            underTest();

        });


    });

});