define(['d3', 'scrollgrid', 'interaction/getColumnResizer'], function (d3, mock) {
    "use strict";

    describe("getColumnResizer", function () {

        var underTest = Scrollgrid.prototype.internal.interaction.getColumnResizer,
            interaction;

        beforeEach(function () {
            mock.init();
            d3.init();
            interaction = mock.internal.interaction;
        });

        it("should call the drag method of the d3 behaviour object", function () {
            underTest.call(mock);
            expect(d3.behavior.drag).toHaveBeenCalled();
        });

        it("should return a drag object", function () {
            var result = underTest.call(mock);
            expect(result).toBeDefined();
        });

        it("should invoke origin on the drag instance returned", function () {
            var result = underTest.call(mock);
            expect(result.origin).toHaveBeenCalled();
        });

        it("should pass the datum back to the origin property", function () {
            var result = underTest.call(mock),
                fn = result.origin.mostRecentCall.args[0];
            expect(fn("passed in value")).toEqual("passed in value");
        });

        it("should call the resize start function on drag start", function () {
            var result = underTest.call(mock);
            expect(result.eventHandlers.dragstart).toBeDefined();
            expect(interaction.columnResizeStart).not.toHaveBeenCalled();
            result.eventHandlers.dragstart('datum value');
            expect(d3.select).toHaveBeenCalled();
            expect(interaction.columnResizeStart).toHaveBeenCalledWith(d3.returnValues.select);
        });

        it("should call the resizing function on drag", function () {
            var result = underTest.call(mock, 'invert value');
            expect(result.eventHandlers.drag).toBeDefined();
            expect(interaction.columnResizing).not.toHaveBeenCalled();
            result.eventHandlers.drag('datum value');
            expect(d3.select).toHaveBeenCalled();
            expect(interaction.columnResizing).toHaveBeenCalledWith(d3.returnValues.select, 'datum value');
        });

        it("should call the resize end function on drag end", function () {
            var result = underTest.call(mock);
            expect(result.eventHandlers.dragend).toBeDefined();
            expect(interaction.columnResizeEnd).not.toHaveBeenCalled();
            result.eventHandlers.dragend('datum value');
            expect(d3.select).toHaveBeenCalled();
            expect(interaction.columnResizeEnd).toHaveBeenCalledWith(d3.returnValues.select);
        });

    });

});