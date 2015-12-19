define(['d3', 'mock', 'render/renderRegion'], function (d3, mock) {
    "use strict";

    describe("renderRegion", function () {

        var underTest = Scrollgrid.prototype.internal.render.renderRegion,
            target,
            physicalOffset,
            xVirtual,
            yVirtual;

        beforeEach(function () {
            mock.init();
            d3.init();
            target = new mock.panel();
            physicalOffset = {
                x: 2,
                y: 3
            };
            xVirtual = {
                left: 5,
                right: 7
            };
            yVirtual = {
                top: 11,
                bottom: 13
            };
        });

        it("should call getDataInBounds if right and left don't match, and top and bottom don't match", function () {
            underTest.call(mock, target, physicalOffset, xVirtual, yVirtual, true);
            expect(mock.internal.render.getDataInBounds).toHaveBeenCalled();
        });

        it("should not call getDataInBounds if right and left match", function () {
            xVirtual.left = xVirtual.right;
            underTest.call(mock, target, physicalOffset, xVirtual, yVirtual, true);
            expect(mock.internal.render.getDataInBounds).not.toHaveBeenCalled();
        });

        it("should not call getDataInBounds if right is zero and left is undefined", function () {
            xVirtual.right = 0;
            xVirtual.left = undefined;
            underTest.call(mock, target, physicalOffset, xVirtual, yVirtual, true);
            expect(mock.internal.render.getDataInBounds).not.toHaveBeenCalled();
        });

        it("should not call getDataInBounds if right is undefined and left is zero", function () {
            xVirtual.right = undefined;
            xVirtual.left = 0;
            underTest.call(mock, target, physicalOffset, xVirtual, yVirtual, true);
            expect(mock.internal.render.getDataInBounds).not.toHaveBeenCalled();
        });

        it("should not call getDataInBounds if top and bottom match", function () {
            yVirtual.top = yVirtual.bottom;
            underTest.call(mock, target, physicalOffset, xVirtual, yVirtual, true);
            expect(mock.internal.render.getDataInBounds).not.toHaveBeenCalled();
        });

        it("should not call getDataInBounds if top is zero and bottom is undefined", function () {
            yVirtual.top = 0;
            yVirtual.bottom = undefined;
            underTest.call(mock, target, physicalOffset, xVirtual, yVirtual, true);
            expect(mock.internal.render.getDataInBounds).not.toHaveBeenCalled();
        });

        it("should not call getDataInBounds if top is undefined and bottom is zero", function () {
            yVirtual.top = undefined;
            yVirtual.bottom = 0;
            underTest.call(mock, target, physicalOffset, xVirtual, yVirtual, true);
            expect(mock.internal.render.getDataInBounds).not.toHaveBeenCalled();
        });

        it("should call getDataInBounds with passed parameters", function () {
            underTest.call(mock, target, physicalOffset, xVirtual, yVirtual, true);
            expect(mock.internal.render.getDataInBounds).toHaveBeenCalledWith({
                startX: physicalOffset.x,
                startY: physicalOffset.y,
                top: yVirtual.top,
                bottom: yVirtual.bottom,
                left: xVirtual.left,
                right: xVirtual.right
            });
        });

        it("should call getDataInBounds with zero startX if missing", function () {
            physicalOffset.x = undefined;
            underTest.call(mock, target, physicalOffset, xVirtual, yVirtual, true);
            expect(mock.internal.render.getDataInBounds).toHaveBeenCalledWith({
                startX: 0,
                startY: physicalOffset.y,
                top: yVirtual.top,
                bottom: yVirtual.bottom,
                left: xVirtual.left,
                right: xVirtual.right
            });
        });

        it("should call getDataInBounds with zero startY if missing", function () {
            physicalOffset.y = undefined;
            underTest.call(mock, target, physicalOffset, xVirtual, yVirtual, true);
            expect(mock.internal.render.getDataInBounds).toHaveBeenCalledWith({
                startX: physicalOffset.x,
                startY: 0,
                top: yVirtual.top,
                bottom: yVirtual.bottom,
                left: xVirtual.left,
                right: xVirtual.right
            });
        });

        it("should call getDataInBounds with zero top if missing", function () {
            yVirtual.top = undefined;
            underTest.call(mock, target, physicalOffset, xVirtual, yVirtual, true);
            expect(mock.internal.render.getDataInBounds).toHaveBeenCalledWith({
                startX: physicalOffset.x,
                startY: physicalOffset.y,
                top: 0,
                bottom: yVirtual.bottom,
                left: xVirtual.left,
                right: xVirtual.right
            });
        });

        it("should call getDataInBounds with zero bottom if missing", function () {
            yVirtual.bottom = undefined;
            underTest.call(mock, target, physicalOffset, xVirtual, yVirtual, true);
            expect(mock.internal.render.getDataInBounds).toHaveBeenCalledWith({
                startX: physicalOffset.x,
                startY: physicalOffset.y,
                top: yVirtual.top,
                bottom: 0,
                left: xVirtual.left,
                right: xVirtual.right
            });
        });

        it("should call getDataInBounds with zero left if missing", function () {
            xVirtual.left = undefined;
            underTest.call(mock, target, physicalOffset, xVirtual, yVirtual, true);
            expect(mock.internal.render.getDataInBounds).toHaveBeenCalledWith({
                startX: physicalOffset.x,
                startY: physicalOffset.y,
                top: yVirtual.top,
                bottom: yVirtual.bottom,
                left: 0,
                right: xVirtual.right
            });
        });

        it("should call getDataInBounds with zero right if missing", function () {
            xVirtual.right = undefined;
            underTest.call(mock, target, physicalOffset, xVirtual, yVirtual, true);
            expect(mock.internal.render.getDataInBounds).toHaveBeenCalledWith({
                startX: physicalOffset.x,
                startY: physicalOffset.y,
                top: yVirtual.top,
                bottom: yVirtual.bottom,
                left: xVirtual.left,
                right: 0
            });
        });

        it("should clear the content if clearCache is true", function () {
            underTest.call(mock, target, physicalOffset, xVirtual, yVirtual, true);
            expect(target.content.selections[".sg-no-style--cell-selector"].length).toEqual(2);
            expect(target.content.selections[".sg-no-style--cell-selector"][0].remove).toHaveBeenCalled();
        });

        it("should not clear the content if clearCache is false", function () {
            underTest.call(mock, target, physicalOffset, xVirtual, yVirtual, false);
            expect(target.content.selections[".sg-no-style--cell-selector"].length).toEqual(1);
        });

        describe("created cells", function () {

            var selection;

            beforeEach(function () {
                underTest.call(mock, target, physicalOffset, xVirtual, yVirtual, false);
                selection = target.content.selections[".sg-no-style--cell-selector"][0];
            });

            it("should make the selection", function () {
                expect(selection).toBeDefined();
            });

            it("should call data", function () {
                expect(selection.data).toHaveBeenCalled();
            });

            it("should pass the result of getDataInBounds and a callback", function () {
                expect(selection.data).toHaveBeenCalledWith("data in bounds", jasmine.any(Function));
            });

            it("should get the key from the view data", function () {
                expect(selection.data.calls.argsFor(0)[1]({ key: "My Key" })).toEqual("My Key");
            });

            it("should call enter on the cells", function () {
                expect(selection.enter).toHaveBeenCalled();
            });

            it("should append the cells as groups", function () {
                expect(selection.children.g[0]).toBeDefined();
            });

            it("should set the selector class on the appended groups", function () {
                expect(selection.children.g[0].attributes["class"]).toEqual("sg-no-style--cell-selector");
            });

            describe("each function", function () {

                var group,
                    each,
                    datum;

                beforeEach(function () {
                    group = selection.children.g[0];
                    each = group.each.calls.argsFor(0)[0];
                    datum  = {
                        sortIcon: "Sort Icon",
                        rowIndex: 7,
                        columnIndex: 11
                    };
                });

                it("should call renderBackground if it is assigned to the datum", function () {
                    datum.renderBackground = jasmine.createSpy("renderBackground");
                    each(datum);
                    expect(datum.renderBackground).toHaveBeenCalled();
                });

                it("should call renderBetween if it is assigned to the datum", function () {
                    datum.renderBetween = jasmine.createSpy("renderBetween");
                    each(datum);
                    expect(datum.renderBetween).toHaveBeenCalled();
                });

                it("should call renderForeground if it is assigned to the datum", function () {
                    datum.renderForeground = jasmine.createSpy("renderForeground");
                    each(datum);
                    expect(datum.renderForeground).toHaveBeenCalled();
                });

                it("should call renderSortIcon", function () {
                    each(datum);
                    expect(mock.internal.render.renderSortIcon).toHaveBeenCalled();
                });

                it("should not add sort buttons for unspecified panels", function () {
                    each(datum);
                    expect(mock.internal.interaction.addSortButtons).not.toHaveBeenCalled();
                });

                it("should call addEventHandlers", function () {
                    each(datum);
                    expect(mock.internal.events.addEventHandlers).toHaveBeenCalled();
                });

            });

            it("should set the transform to offset the x and y", function () {
                expect(selection.attributes.transform({ x: 2, y: 3 })).toEqual("translate(2,3)");
            });

            it("should call exit", function () {
                expect(selection.exit).toHaveBeenCalled();
            });

            it("should call remove exit items", function () {
                expect(selection.remove).toHaveBeenCalled();
            });

        });

        it("should add sort buttons to the top left panel", function () {
            var panel;
            panel = mock.internal.dom.top.left;
            underTest.call(mock, panel, physicalOffset, xVirtual, yVirtual, false);
            panel.content.selections[".sg-no-style--cell-selector"][0].children.g[0].each.calls.argsFor(0)[0]({
                sortIcon: "Sort Icon",
                rowIndex: 7,
                columnIndex: 11
            });
            expect(mock.internal.interaction.addSortButtons).toHaveBeenCalled();
        });

        it("should add sort buttons to the top panel", function () {
            var panel;
            panel = mock.internal.dom.top;
            underTest.call(mock, panel, physicalOffset, xVirtual, yVirtual, false);
            panel.content.selections[".sg-no-style--cell-selector"][0].children.g[0].each.calls.argsFor(0)[0]({
                sortIcon: "Sort Icon",
                rowIndex: 7,
                columnIndex: 11
            });
            expect(mock.internal.interaction.addSortButtons).toHaveBeenCalled();
        });

        it("should add sort buttons to the top right panel", function () {
            var panel;
            panel = mock.internal.dom.top.right;
            underTest.call(mock, panel, physicalOffset, xVirtual, yVirtual, false);
            panel.content.selections[".sg-no-style--cell-selector"][0].children.g[0].each.calls.argsFor(0)[0]({
                sortIcon: "Sort Icon",
                rowIndex: 7,
                columnIndex: 11
            });
            expect(mock.internal.interaction.addSortButtons).toHaveBeenCalled();
        });

    });

});
