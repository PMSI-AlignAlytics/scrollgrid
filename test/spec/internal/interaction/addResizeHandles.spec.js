define(['d3', 'scrollgrid', 'interaction/addResizeHandles'], function (d3, mock) {
    "use strict";

    describe("addResizeHandles", function () {

        var underTest = Scrollgrid.prototype.internal.interaction.addResizeHandles,
            target,
            bounds,
            startX;

        beforeEach(function () {
            d3.init();
            mock.init();
            target = new mock.panel();
            bounds = {left: 3, right: 5};
            startX = 13;
        });

        describe("remove selection", function () {

            beforeEach(function () {
                underTest.call(mock, target, bounds);
            });

            it("should remove all first", function () {
                expect(target.content.selections[".sg-no-style--handle-selector"].length).toBeGreaterThan(0);
                expect(target.content.selections[".sg-no-style--handle-selector"][0].remove).toHaveBeenCalled();
            });

        });

        describe("enter selection", function () {

            beforeEach(function () {
                mock.columns = [1, 2, 3, 4, 5, 6];
                underTest.call(mock, target, bounds, startX);
            });

            it("should create a second selection for the enter", function () {
                expect(target.content.selections[".sg-no-style--handle-selector"].length).toBeGreaterThan(1);
            });

            it("should select the columns within the passed bounds", function () {
                expect(target.content.selections[".sg-no-style--handle-selector"][1].data).toHaveBeenCalledWith([4, 5]);
            });

            it("should pick entries only", function () {
                expect(target.content.selections[".sg-no-style--handle-selector"][1].enter).toHaveBeenCalled();
            });

            describe("rectangle", function () {

                var rect,
                    classes;

                beforeEach(function () {
                    rect = target.content.selections[".sg-no-style--handle-selector"][1].children.rect[0];
                    classes = rect.attributes["class"].split(" ");
                });

                it("should be appended to the selection", function () {
                    expect(rect).toBeDefined();
                });

                it("should class the rectangle with the selector", function () {
                    expect(classes).toContain("sg-no-style--handle-selector");
                });

                it("should apply the resize handle class", function () {
                    expect(classes).toContain("handle");
                });

                it("should offset by half the handle width", function () {
                    expect(rect.attributes.transform).toEqual("translate(-18.5, 0)");
                });

                it("should use the startX and the column width for x position", function () {
                    var xFunc = rect.attributes.x;
                    expect(xFunc({width: 17})).toEqual(13 + 17);
                });

                it("should set the x value on the column", function () {
                    var xFunc = rect.attributes.x,
                        column = {width: 17};
                    xFunc(column);
                    expect(column.x).toEqual(13 + 17);
                });

                it("should maintain a running total for x position", function () {
                    var xFunc = rect.attributes.x,
                        column1 = {width: 17},
                        column2 = {width: 23};
                    xFunc(column1);
                    xFunc(column2);
                    expect(column1.x).toEqual(13 + 17);
                    expect(column2.x).toEqual(13 + 17 + 23);
                });

                it("should set the y position to 0", function () {
                    expect(rect.attributes.y).toEqual(0);
                });

                it("should set the width to the drag handle width", function () {
                    expect(rect.attributes.width).toEqual(mock.vals.dragHandleWidth);
                });

                it("should set the height to the size of the fixed headers", function () {
                    expect(rect.attributes.height).toEqual(mock.vals.physTop);
                });

                it("should invoke autoResizeColumn on double click", function () {
                    expect(rect.eventHandlers.dblclick).toBeDefined();
                    rect.eventHandlers.dblclick("column object");
                    expect(mock.internal.interaction.autoResizeColumn).toHaveBeenCalledWith("column object");
                });

                it("should call the getColumnResizer method", function  () {
                    expect(rect.call).toHaveBeenCalled();
                    expect(mock.internal.interaction.getColumnResizer).toHaveBeenCalled();
                });

            });

        });

    });

});