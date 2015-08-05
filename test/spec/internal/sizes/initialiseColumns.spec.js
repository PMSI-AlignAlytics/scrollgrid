define(['d3', 'mock', 'sizes/initialiseColumns'], function (d3, mock) {
    "use strict";

    describe("initialiseColumns", function () {

        var underTest = Scrollgrid.prototype.internal.sizes.initialiseColumns;

        beforeEach(function () {
            mock.init();
            d3.init();

            underTest();

        });


    });

});