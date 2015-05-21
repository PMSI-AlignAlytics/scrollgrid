define(['d3', 'scrollgrid_actual', 'scrollgrid_mock'], function (d3, actual, mock) {
    "use strict";

    describe("renderBackground", function () {

        var underTest = actual.prototype.internal.render.renderBackground,
            group,
            result,
            selection,
            fn;

        beforeEach(function () {
            mock.init();
            d3.init();
            group = new d3.shape();
            result = underTest.call(mock, group, "view data");
            selection = group.selections[".sg-no-style--background-selector"][0];
        });

        it("should call the background selector on the passed group", function () {
            expect(group.selectAll).toHaveBeenCalledWith(".sg-no-style--background-selector");
        });

        it("should return the selection from the group", function () {
            expect(result).toEqual(selection);
        });

        it("should call data on the selection from the group", function () {
            expect(selection.data).toHaveBeenCalled();
            expect(selection.data.mostRecentCall.args[0]).toEqual("view data");
            fn = selection.data.mostRecentCall.args[1];
            expect(fn({ key: 123 })).toEqual(123);
        });

        it("should call enter on the selection", function () {
            expect(selection.enter).toHaveBeenCalled();
        });

        it("should append a rectangle to the selection", function () {
            expect(selection.append).toHaveBeenCalledWith("rect");
        });

        it("should class the rectangle with the background selector", function () {
            expect(selection.children.rect[0].attributes["class"]).toBeDefined();
            fn = selection.children.rect[0].attributes["class"];
            expect(fn({ backgroundStyle: 'my-test-class' })).toContain('sg-no-style--background-selector');
            expect(fn({ backgroundStyle: 'my-test-class' })).toContain('my-test-class');
        });

        it("should set the x value from the data", function () {
            expect(selection.attributes.x).toBeDefined();
            fn = selection.attributes.x;
            expect(fn({ x: 234 })).toEqual(234);
        });

        it("should set the y value from the data", function () {
            expect(selection.attributes.y).toBeDefined();
            fn = selection.attributes.y;
            expect(fn({ y: 345 })).toEqual(345);
        });

        it("should set the width value from the box width of the data", function () {
            expect(selection.attributes.width).toBeDefined();
            fn = selection.attributes.width;
            expect(fn({ boxWidth: 456 })).toEqual(456);
        });

        it("should set the height value from the box height of the data", function () {
            expect(selection.attributes.height).toBeDefined();
            fn = selection.attributes.height;
            expect(fn({ boxHeight: 567 })).toEqual(567);
        });

        it("should call exit on the selection", function () {
            expect(selection.exit).toHaveBeenCalled();
        });

        it("should call remove on the selection", function () {
            expect(selection.remove).toHaveBeenCalled();
        });

    });

});