define(['d3', 'mock', 'external/refresh'], function (d3, mock) {
    "use strict";

    describe("data", function () {

        var underTest = Scrollgrid.refresh;

        beforeEach(function () {
            mock.init();
            d3.init();

            underTest();

        });


    });

});