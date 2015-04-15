define(['scrollgrid_actual', 'scrollgrid_mock'], function (actual, mock) {
    "use strict";

    describe("addSortButtons", function () {

        var underTest = actual.prototype.internal.interaction.addSortButtons,
            target,
            buttonClass = "sg-no-style--sort-button-selector",
            buttonSelector = "." + buttonClass;

        beforeEach(function () {
            mock.init();
            target = new mock.shape();
        });

        it("should select the buttons using the selector class", function () {
            underTest.call(mock, target);
            expect(target.selectAll).toHaveBeenCalledWith(buttonSelector);
            expect(target.selections[buttonSelector][0]).toBeDefined();
            expect(target.selections[buttonSelector][0].remove).toHaveBeenCalled();
        });

        it("should associate data with the selection", function () {
            var data = [1, 2, 3];
            underTest.call(mock, target, data);
            expect(target.selections[buttonSelector][0].data).toHaveBeenCalled();
            expect(target.selections[buttonSelector][0].data.mostRecentCall.args[0]).toEqual(data);
        });

        it("should get the key from the 'key' property of the data row", function () {
            var keyFn,
                key;
            underTest.call(mock, target);
            keyFn = target.selections[buttonSelector][0].data.mostRecentCall.args[1];
            key = keyFn({ key: "abc" });
            expect(key).toEqual("abc");
        });

        describe("enter", function () {
            var selection,
                selectionRect;

            beforeEach(function () {
                underTest.call(mock, target);
                selection = target.selections[buttonSelector][0];
                selectionRect = selection.children.rect[0];
            });

            it("should call enter on the selection", function () {
                underTest.call(mock, target);
                expect(selection.enter).toHaveBeenCalled();
            });

            it("should append rectangles to the selection", function () {
                underTest.call(mock, target);
                expect(selection.append).toHaveBeenCalledWith("rect");
                expect(selection.children.rect).toBeDefined();
            });

            it("should have the selection class applied to it", function () {
                expect(selectionRect.attributes["class"]).toContain(buttonClass);
            });

            it("should be created with no opacity", function () {
                expect(selectionRect.styles.opacity).toEqual(0);
            });

            it("should has the pointer cursor", function () {
                expect(selectionRect.styles.cursor).toEqual("pointer");
            });

            it("should call sort column on click", function () {
                expect(selectionRect.on).toHaveBeenCalled();
                expect(selectionRect.on.mostRecentCall.args[0]).toEqual("click");
                selectionRect.on.mostRecentCall.args[1]({ columnIndex: 345 });
                expect(mock.internal.interaction.sortColumn).toHaveBeenCalledWith(345, true);
            });

        });

        describe("update", function () {
            var selection;

            beforeEach(function () {
                underTest.call(mock, target);
                selection = target.selections[buttonSelector][0];
            });

            it("should set x from the data row", function () {
                expect(selection.attributes.x).toBeDefined();
                expect(selection.attributes.x({ x: 654 })).toEqual(654);
            });

            it("should set y from the data row", function () {
                expect(selection.attributes.y).toBeDefined();
                expect(selection.attributes.y({ y: 543 })).toEqual(543);
            });

            it("should set width from the data row boxWidth", function () {
                expect(selection.attributes.width).toBeDefined();
                expect(selection.attributes.width({ boxWidth: 123 })).toEqual(123);
            });

            it("should set height from the data row boxHeight", function () {
                expect(selection.attributes.height).toBeDefined();
                expect(selection.attributes.height({ boxHeight: 234 })).toEqual(234);
            });
        });

        describe("exit", function () {
            var selection;

            beforeEach(function () {
                underTest.call(mock, target);
                selection = target.selections[buttonSelector][0];
            });

            it("should call exit on the selection", function () {
                expect(selection.exit).toHaveBeenCalled();
            });

            it("should call remove on the selection", function () {
                expect(selection.remove).toHaveBeenCalledWith();
            });

        });

    });
});