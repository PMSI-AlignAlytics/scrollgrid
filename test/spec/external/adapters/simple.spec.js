define(['d3', 'scrollgrid', 'adapters/simple'], function (d3, mock) {
    "use strict";

    describe("simple", function () {

        var underTest = Scrollgrid.adapters.simple;

        beforeEach(function () {
            mock.init();
            d3.init();

            underTest();

        });


    });

});