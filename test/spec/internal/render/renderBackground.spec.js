define(['d3', 'scrollgrid_actual', 'scrollgrid_mock'], function (d3, actual, mock) {
    "use strict";

    describe("cropText", function () {

        var underTest = actual.prototype.internal.render.renderBackground,
            target,
            data;

        beforeEach(function () {
            mock.init();
            d3.init();
            target = new d3.shape();
            data = {
                backgroundStyle: "Background Style",
                boxWidth: "Box Width",
                boxHeight: "Box Height"
            };
            underTest.call(mock, target, data);
        });

        it("should append a rectangle to the target", function () {
            expect(target.children.rect).toBeDefined();
        });

        it("should apply the background style class", function () {
            expect(target.children.rect[0].attributes['class']).toEqual(data.backgroundStyle);
        });

        it("should set the box width", function () {
            expect(target.children.rect[0].attributes.width).toEqual(data.boxWidth);
        });

        it("should set the box height", function () {
            expect(target.children.rect[0].attributes.height).toEqual(data.boxHeight);
        });

    });

});