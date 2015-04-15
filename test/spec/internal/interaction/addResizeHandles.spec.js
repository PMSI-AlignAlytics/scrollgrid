define(['d3', 'scrollgrid_actual', 'scrollgrid_mock'], function (d3, actual, mock) {
    "use strict";

    describe("addResizeHandles", function () {

        var underTest = actual.prototype.internal.interaction.addResizeHandles,
            target,
            handleClass = "sg-no-style--resize-handle-selector",
            handleSelector = "." + handleClass;

        beforeEach(function () {
            mock.init();
            target = new d3.shape();
        });

        it("should remove any existing resize handles", function () {
            underTest.call(mock, target);
            expect(target.selectAll).toHaveBeenCalledWith(handleSelector);
            expect(target.selections[handleSelector][0]).toBeDefined();
            expect(target.selections[handleSelector][0].remove).toHaveBeenCalled();
        });

        it("should use the selector for insertion", function () {
            underTest.call(mock, target);
            expect(target.selectAll).toHaveBeenCalledWith("." + handleClass);
            expect(target.selections[handleSelector][1]).toBeDefined();
        });

        it("should associate data with the selection", function () {
            var data = [1, 2, 3];
            underTest.call(mock, target, data);
            expect(target.selections[handleSelector][1].data).toHaveBeenCalled();
            expect(target.selections[handleSelector][1].data.mostRecentCall.args[0]).toEqual(data);
        });

        it("should get the key from the 'key' property of the data row", function () {
            var keyFn,
                key;
            underTest.call(mock, target);
            keyFn = target.selections[handleSelector][1].data.mostRecentCall.args[1];
            key = keyFn({ key: "abc" });
            expect(key).toEqual("abc");
        });

        it("should call enter on the selection", function () {
            underTest.call(mock, target);
            expect(target.selections[handleSelector][1].enter).toHaveBeenCalled();
        });

        it("should append rectangles to the selection", function () {
            underTest.call(mock, target);
            expect(target.selections[handleSelector][1].append).toHaveBeenCalledWith("rect");
            expect(target.selections[handleSelector][1].children.rect).toBeDefined();
        });

        describe("selection rectangles", function () {
            var selectionRect;

            beforeEach(function () {
                underTest.call(mock, target);
                selectionRect = target.selections[handleSelector][1].children.rect[0];
            });

            it("should have the selection class applied to it", function () {
                expect(selectionRect.attributes["class"]).toContain(handleClass);
            });

            it("should have the style class applied to it", function () {
                expect(selectionRect.attributes["class"]).toContain(mock.style.resizeHandle);
            });

            it("should horizontally center the handle on the given point", function () {
                expect(selectionRect.attributes.transform).toEqual("translate(" + (mock.vals.dragHandleWidth / -2) + ", 0)");
            });

            it("should offset the x position by box width if right aligned", function () {
                expect(selectionRect.attributes.x({x: 567, boxWidth: 234})).toEqual(567 + 234);
            });

            it("should set y position to zero", function () {
                expect(selectionRect.attributes.y).toEqual(0);
            });

            it("should set width to drag handle width", function () {
                expect(selectionRect.attributes.width).toEqual(mock.vals.dragHandleWidth);
            });

            it("should set height to full height of fixed header", function () {
                expect(selectionRect.attributes.height).toEqual(mock.vals.physTop);
            });

            it("should call auto resize column on double click", function () {
                expect(selectionRect.on).toHaveBeenCalled();
                expect(selectionRect.on.mostRecentCall.args[0]).toEqual("dblclick");
                selectionRect.on.mostRecentCall.args[1]("Parameter");
                expect(mock.internal.interaction.autoResizeColumn).toHaveBeenCalledWith("Parameter");
            });

            it("should call column resizer", function () {
                expect(mock.internal.interaction.getColumnResizer).toHaveBeenCalled();
                expect(selectionRect.call).toHaveBeenCalledWith(mock.vals.columnResizer);
            });
        });

        it("should not offset the x position if the box is left aligned", function () {
            underTest.call(mock, target, [], true);
            expect(target.selections[handleSelector][1].children.rect[0].attributes.x({x: 567, boxWidth: 234})).toEqual(567);
        });

    });
});