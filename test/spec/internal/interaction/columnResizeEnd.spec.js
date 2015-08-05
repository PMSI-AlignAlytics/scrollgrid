define(['d3', 'mock', 'interaction/columnResizeEnd'], function (d3, mock) {
    "use strict";

    describe("columnResizeEnd", function () {

        var underTest = Scrollgrid.prototype.internal.interaction.columnResizeEnd,
            handle;

        beforeEach(function () {
            mock.init();
            handle = new d3.shape(mock.vals);
        });

        it("should remove the 'dragging' class", function () {
            underTest.call(mock, handle);
            expect(handle.classed).toHaveBeenCalledWith("dragging", false);
        });

    });

});