define(['d3', 'scrollgrid', 'sizes/getExistingTextBound'], function (d3, mock) {
    "use strict";

    describe("getExistingTextBound", function () {

        var underTest = Scrollgrid.prototype.internal.sizes.getExistingTextBound;

        beforeEach(function () {
            mock.init();
            d3.init();

            underTest();

        });


    });

});