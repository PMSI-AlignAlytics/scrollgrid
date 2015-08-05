define(['d3', 'scrollgrid', 'external/data'], function (d3, mock) {
    "use strict";

    describe("data", function () {

        var underTest = Scrollgrid.data;

        beforeEach(function () {
            mock.init();
            d3.init();

            underTest();

        });


    });

});