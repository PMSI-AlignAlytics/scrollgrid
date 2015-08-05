define(['d3', 'mock', 'adapters/json'], function (d3, mock) {
    "use strict";

    describe("json", function () {

        var underTest = Scrollgrid.adapters.json;

        beforeEach(function () {
            mock.init();
            d3.init();

            underTest();

        });


    });

});