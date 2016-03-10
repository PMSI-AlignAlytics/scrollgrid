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

    });

});
