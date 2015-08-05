define(['d3', 'scrollgrid', 'interaction/columnResizeStart'], function (d3, mock) {
    "use strict";

    describe("columnResizeStart", function () {

        var underTest = Scrollgrid.prototype.internal.interaction.columnResizeStart,
            handle;

        beforeEach(function () {
            mock.init();
            handle = new d3.shape(mock.vals);
        });

        it("should add the 'dragging' class", function () {
            underTest.call(mock, handle);
            expect(handle.classed).toHaveBeenCalledWith("dragging", true);
        });

        it("should stop event propagation", function () {
            underTest.call(mock, handle);
            expect(d3.event.sourceEvent.stopPropagation).toHaveBeenCalled();
        });

    });

});