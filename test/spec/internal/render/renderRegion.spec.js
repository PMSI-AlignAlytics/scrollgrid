define(['d3', 'mock', 'render/renderRegion'], function (d3, mock) {
    "use strict";

    describe("renderRegion", function () {

        var underTest = Scrollgrid.prototype.internal.render.renderRegion,
            target;

        beforeEach(function () {
            mock.init();
            d3.init();
            target = new mock.panel();
        });

        it("should not call DataInBounds if the left and right columns match", function () {
            underTest.call(mock, target, { x: 1, y: 2 }, { left: 3, right: 3 }, { top: 7, bottom: 11 });
            expect(mock.internal.render.getDataInBounds).not.toHaveBeenCalled();
        });

        it("should not call DataInBounds if the top and bottom rows match", function () {
            underTest.call(mock, target, { x: 1, y: 2 }, { left: 3, right: 5 }, { top: 7, bottom: 7 });
            expect(mock.internal.render.getDataInBounds).not.toHaveBeenCalled();
        });

        it("should call DataInBounds if there are visible cells", function () {
            underTest.call(mock, target, { x: 1, y: 2 }, { left: 3, right: 5 }, { top: 7, bottom: 11 });
            expect(mock.internal.render.getDataInBounds).toHaveBeenCalledWith({
                startX: 1,
                startY: 2,
                left: 3,
                right: 5,
                top: 7,
                bottom: 11
            });
        });

        it("should treat undefined x as 0", function () {
            underTest.call(mock, target, { y: 2 }, { left: 3, right: 5 }, { top: 7, bottom: 11 });
            expect(mock.internal.render.getDataInBounds).toHaveBeenCalledWith({
                startX: 0,
                startY: 2,
                left: 3,
                right: 5,
                top: 7,
                bottom: 11
            });
        });

        it("should treat undefined y as 0", function () {
            underTest.call(mock, target, { x: 1 }, { left: 3, right: 5 }, { top: 7, bottom: 11 });
            expect(mock.internal.render.getDataInBounds).toHaveBeenCalledWith({
                startX: 1,
                startY: 0,
                left: 3,
                right: 5,
                top: 7,
                bottom: 11
            });
        });

        it("should treat undefined left as 0", function () {
            underTest.call(mock, target, { x: 1, y: 2 }, { right: 5 }, { top: 7, bottom: 11 });
            expect(mock.internal.render.getDataInBounds).toHaveBeenCalledWith({
                startX: 1,
                startY: 2,
                left: 0,
                right: 5,
                top: 7,
                bottom: 11
            });
        });

        it("should treat undefined right as 0", function () {
            underTest.call(mock, target, { x: 1, y: 2 }, { left: 3 }, { top: 7, bottom: 11 });
            expect(mock.internal.render.getDataInBounds).toHaveBeenCalledWith({
                startX: 1,
                startY: 2,
                left: 3,
                right: 0,
                top: 7,
                bottom: 11
            });
        });

        it("should treat undefined top as 0", function () {
            underTest.call(mock, target, { x: 1, y: 2 }, { left: 3, right: 5 }, { bottom: 11 });
            expect(mock.internal.render.getDataInBounds).toHaveBeenCalledWith({
                startX: 1,
                startY: 2,
                left: 3,
                right: 5,
                top: 0,
                bottom: 11
            });
        });

        it("should treat undefined bottom as 0", function () {
            underTest.call(mock, target, { x: 1, y: 2 }, { left: 3, right: 5 }, { top: 7 });
            expect(mock.internal.render.getDataInBounds).toHaveBeenCalledWith({
                startX: 1,
                startY: 2,
                left: 3,
                right: 5,
                top: 7,
                bottom: 0
            });
        });

        it("should initially clear the content if clearCache is true", function () {
            underTest.call(mock, target, { x: 1, y: 2 }, { left: 3, right: 5 }, { top: 7, bottom: 11 }, true);
            expect(target.content.selections['.sg-no-style--cell-selector'][0].remove).toHaveBeenCalled();
        });

        it("should apply a transform to the target", function () {
            underTest.call(mock, target, { x: 1, y: 2 }, { left: 3, right: 5 }, { top: 7, bottom: 11 }, true);
            expect(target.content.selections['.sg-no-style--cell-selector'][1].data.calls.argsFor(0)[0]).toEqual("data in bounds");
            expect(target.content.selections['.sg-no-style--cell-selector'][1].data.calls.argsFor(0)[1]({ key: "my key" })).toEqual("my key");
        });

        it("should iterate the groups in the content", function () {
            underTest.call(mock, target, { x: 1, y: 2 }, { left: 3, right: 5 }, { top: 7, bottom: 11 }, true);
            expect(target.content.selections['.sg-no-style--cell-selector'][1].children.g[0].attributes["class"]).toEqual("sg-no-style--cell-selector");
        });

        describe("iterator", function () {

            var iterator;

            beforeEach(function () {
                underTest.call(mock, target, { x: 1, y: 2 }, { left: 3, right: 5 }, { top: 7, bottom: 11 }, true);
                iterator = target.content.selections['.sg-no-style--cell-selector'][1].children.g[0].each.calls.argsFor(0)[0];
            });

            it("should render background if defined", function () {
                var back = jasmine.createSpy("renderBackground");
                iterator({ renderBackground: back });
                expect(back).toHaveBeenCalled();
            });

            it("should call render sort icon when an icon is defined", function () {
                iterator({ sortIcon: true });
                expect(mock.internal.render.renderSortIcon).toHaveBeenCalled();
            });

            it("should call render sort icon when an icon is not defined", function () {
                iterator({ sortIcon: 'false' });
                expect(mock.internal.render.renderSortIcon).toHaveBeenCalled();
            });

            it("should add sort buttons if sorting is defined and the top left dom is the target", function () {
                mock.internal.dom.top.left = target;
                mock.internal.interaction.allowSorting = true;
                iterator({});
                expect(mock.internal.interaction.addSortButtons).toHaveBeenCalled();
            });

            it("should add sort buttons if sorting is defined and the top dom is the target", function () {
                mock.internal.dom.top = target;
                mock.internal.interaction.allowSorting = true;
                iterator({});
                expect(mock.internal.interaction.addSortButtons).toHaveBeenCalled();
            });

            it("should add sort buttons if sorting is defined and the top right dom is the target", function () {
                mock.internal.dom.top.right = target;
                mock.internal.interaction.allowSorting = true;
                iterator({});
                expect(mock.internal.interaction.addSortButtons).toHaveBeenCalled();
            });
        });

        it("should apply the transform to the selection", function () {
            underTest.call(mock, target, { x: 1, y: 2 }, { left: 3, right: 5 }, { top: 7, bottom: 11 }, true);
            expect(target.content.selections['.sg-no-style--cell-selector'][1].attr.calls.argsFor(0)[0]).toEqual("transform");
            expect(target.content.selections['.sg-no-style--cell-selector'][1].attr.calls.argsFor(0)[1]({x: 1, y: 2})).toEqual("translate(1,2)");
        });

    });

});
