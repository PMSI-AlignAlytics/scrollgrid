define(['d3', 'mock', 'interaction/columnResizing'], function (d3, mock) {
    "use strict";

    describe("columnResizing", function () {

        var underTest = Scrollgrid.prototype.internal.interaction.columnResizing,
            handle,
            column,
            vals;

        beforeEach(function () {
            mock.init();
            d3.init();
            handle = new d3.shape(mock.vals);
            vals = {
                eventX: 7,
                colWidth: 13,
                dataX: 17
            };
            column = {
                x: vals.dataX,
                width: vals.colWidth
            };
            d3.event.x = vals.eventX;
        });

        it("should subtract the difference between the event x and datum x", function () {
            underTest.call(mock, handle, column);
            expect(column.width).toEqual(vals.colWidth - (vals.dataX - vals.eventX));
        });

        it("if the column width is less than zero it should be set to zero", function () {
            // As proven in the test above width normally equals width - (dataX - eventX) which in this case
            // will be 13 - (999 - 7) = -986 but we expect this to be set to zero
            column.x = 999;
            underTest.call(mock, handle, column);
            expect(column.width).toEqual(0);
        });

        it("should set the x value of the datum to the event x", function () {
            underTest.call(mock, handle, column);
            expect(column.x).toEqual(vals.eventX);
        });

        it("should update the handle x position to the new datum x value", function () {
            underTest.call(mock, handle, column);
            expect(handle.attributes.x).toBeDefined();
            expect(handle.attributes.x).toEqual(column.x);
        });

        it("should call the refresh method", function () {
            underTest.call(mock, handle, column);
            expect(mock.refresh).toHaveBeenCalled();
        });

    });

});