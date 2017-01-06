define(['d3', 'mock', 'external/on'], function (d3, mock) {
    "use strict";

    describe("on", function () {

        var underTest = Scrollgrid.prototype.on;

        beforeEach(function () {
            mock.init();
            d3.init();
        });

        it("should append to internal eventHandlers array", function () {
            var type = "click",
                listener = function () {
                    return "clicked";
                },
                capture = false;

            underTest.call(mock, type, listener, capture);
            expect(mock.eventHandlers[0].type).toEqual(type);
        });
    });

});
