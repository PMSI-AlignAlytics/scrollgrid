define(['d3', 'mock', 'sizes/pushTextBound'], function (d3, mock) {
    "use strict";

    describe("pushTextBound", function () {

        var underTest = Scrollgrid.prototype.internal.sizes.pushTextBound;

        beforeEach(function () {
            mock.init();
            d3.init();

            underTest();

        });


    });

});