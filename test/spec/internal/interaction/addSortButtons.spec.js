define(['d3', 'mock', 'interaction/addSortButtons'], function (d3, mock) {
    "use strict";

    describe("addSortButtons", function () {

        var underTest = Scrollgrid.prototype.internal.interaction.addSortButtons,
            target,
            viewData;

        beforeEach(function () {
            d3.init();
            mock.init();
            target = new d3.shape(mock.vals);
            viewData = {
                boxWidth: 7,
                boxHeight: 9,
                columnIndex: 11
            };
            underTest.call(mock, target, viewData);
        });

        it("should append a rectangle to the target panel", function () {
            expect(target.children.rect).toBeDefined();
            expect(target.children.rect.length).toEqual(1);
        });

        it("should set the width using the boxWidth of the viewData", function () {
            expect(target.children.rect[0].attributes.width).toEqual(7);
        });

        it("should set the height using the boxHeight of the viewData", function () {
            expect(target.children.rect[0].attributes.height).toEqual(9);
        });

        it("should set the opacity to 0 as this is only for handling the click", function () {
            expect(target.children.rect[0].styles.opacity).toEqual(0);
        });

        it("should set the opacity to 0 as this is only for handling the click", function () {
            expect(target.children.rect[0].styles.cursor).toEqual("pointer");
        });

        it("should sort the column on click", function () {
            expect(target.children.rect[0].eventHandlers.click).toBeDefined();
            target.children.rect[0].eventHandlers.click();
            expect(mock.internal.interaction.sortColumn).toHaveBeenCalledWith(11, true);
        });

    });

});