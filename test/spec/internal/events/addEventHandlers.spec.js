define(['d3', 'mock', 'events/addEventHandlers'], function (d3, mock) {
    "use strict";

    describe("addDataAttrs", function () {

        var underTest = Scrollgrid.prototype.internal.events.addEventHandlers,
            target,
            data;

        beforeEach(function () {
            mock.init();
            d3.init();
            target = new d3.shape(mock.vals);
            data = {
                rowIndex: "Row Index",
                columnIndex: "Column Index"
            };
            underTest.call(mock, target, data);
        });

        it("should append data-row attribute to the target", function () {
            expect(target.attributes['data-row']).toEqual(data.rowIndex);
        });

        it("should append data-col attribute to the target", function () {
            expect(target.attributes['data-col']).toEqual(data.columnIndex);
        });

        it("should add event handlers to the target", function () {
            expect(target.on('click')).toBeDefined();
        });
    });

});
