define(['d3', 'scrollgrid_actual', 'scrollgrid_mock'], function (d3, actual, mock) {
    "use strict";

    describe("columnResizeEnd", function () {

        var underTest = actual.prototype.internal.interaction.columnResizeEnd,
            handle;

        beforeEach(function () {
            mock.init();
            handle = new d3.shape();
        });

        it("should remove the 'dragging' class", function () {
            underTest.call(mock, handle);
            expect(handle.classed).toHaveBeenCalledWith("dragging", false);
        });

    });

});