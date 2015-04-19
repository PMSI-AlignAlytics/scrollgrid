define(['d3', 'scrollgrid_actual', 'scrollgrid_mock'], function (d3, actual, mock) {
    "use strict";

    describe("columnResizing", function () {

        var underTest = actual.prototype.internal.interaction.columnResizing,
            handle,
            datum,
            vals;

        beforeEach(function () {
            mock.init();
            d3.init();
            handle = new d3.shape();
            vals = {
                eventX: 7,
                colWidth: 13,
                dataX: 17
            };
            datum = {
                x: vals.dataX,
                column: {
                    width: vals.colWidth
                }
            };
            d3.event.x = vals.eventX;
        });

        it("should add the difference between the event x and datum x if inversion is set", function () {
            underTest.call(mock, handle, datum, true);
            expect(datum.column.width).toEqual(vals.colWidth + (vals.dataX - vals.eventX));
        });

        it("should subtract the difference between the event x and datum x if inversion is not set", function () {
            underTest.call(mock, handle, datum, false);
            expect(datum.column.width).toEqual(vals.colWidth - (vals.dataX - vals.eventX));
        });

        it("if the column width is less than zero it should be set to zero", function () {
            // As proven in the test above width normally equals width - (dataX - eventX) which in this case
            // will be 13 - (999 - 7) = -986 but we expect this to be set to zero
            datum.x = 999;
            underTest.call(mock, handle, datum, false);
            expect(datum.column.width).toEqual(0);
        });

        it("should set the x value of the datum to the event x", function () {
            underTest.call(mock, handle, datum, false);
            expect(datum.x).toEqual(vals.eventX);
        });

        it("should update the handle x position to the new datum x value", function () {
            underTest.call(mock, handle, datum, false);
            expect(handle.attributes.x).toBeDefined();
            expect(handle.attributes.x).toEqual(datum.x);
        });

        it("should call the refresh method", function () {
            underTest.call(mock, handle, datum, false);
            expect(mock.refresh).toHaveBeenCalled();
        });

    });

});