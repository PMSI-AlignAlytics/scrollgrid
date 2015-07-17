define(['d3', 'scrollgrid_actual', 'scrollgrid_mock'], function (d3, actual, mock) {
    "use strict";

    describe("setDefaultStyles", function () {

        var underTest = actual.prototype.internal.render.setDefaultStyles;

        beforeEach(function () {
            mock.init();
            d3.init();
            underTest.call(mock);
        });

        it("should set a style for the left panel", function () {
            expect(mock.style.left.panel).toEqual("sg-fixed sg-left");
        });
        it("should set a style for the top panel", function () {
            expect(mock.style.top.panel).toEqual("sg-fixed sg-top");
        });
        it("should set a style for the top left panel", function () {
            expect(mock.style.top.left.panel).toEqual("sg-fixed sg-top-left");
        });
        it("should set a style for the top right panel", function () {
            expect(mock.style.top.right.panel).toEqual("sg-fixed sg-top-right");
        });
        it("should set a style for the right panel", function () {
            expect(mock.style.right.panel).toEqual("sg-fixed sg-right");
        });
        it("should set a style for the bottom panel", function () {
            expect(mock.style.bottom.panel).toEqual("sg-fixed sg-bottom");
        });
        it("should set a style for the bottom left panel", function () {
            expect(mock.style.bottom.left.panel).toEqual("sg-fixed sg-bottom-left");
        });
        it("should set a style for the bottom right panel", function () {
            expect(mock.style.bottom.right.panel).toEqual("sg-fixed sg-bottom-right");
        });
        it("should set a style for the main panel", function () {
            expect(mock.style.main.panel).toEqual("sg-grid");
        });
        it("should set a style for the resize handle", function () {
            expect(mock.style.resizeHandle).toEqual("sg-resize-handle");
        });
        it("should set a prefix for cell background classes", function () {
            expect(mock.style.cellBackgroundPrefix).toEqual("sg-cell-background-");
        });
        it("should set a prefix for cell foreground classes", function () {
            expect(mock.style.cellForegroundPrefix).toEqual("sg-cell-foreground-");
        });
        it("should set a style for the sort icon", function () {
            expect(mock.style.resizeHandle).toEqual("sg-resize-handle");
        });


    });

});