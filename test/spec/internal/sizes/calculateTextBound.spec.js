define(['d3', 'scrollgrid', 'sizes/calculateTextBound'], function (d3, mock) {
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