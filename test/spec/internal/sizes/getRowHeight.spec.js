define(['d3', 'mock', 'sizes/getRowHeight'], function (d3, mock) {
    "use strict";

    describe("getRowHeight", function () {

        var underTest = Scrollgrid.prototype.internal.sizes.getRowHeight;

        beforeEach(function () {
            mock.init();
            d3.init();

            underTest();

        });


    });

});