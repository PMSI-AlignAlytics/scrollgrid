define(['d3', 'scrollgrid_actual', 'scrollgrid_mock'], function (d3, actual, mock) {
    "use strict";

    describe("renderForeground", function () {

        var underTest = actual.prototype.internal.render.renderForeground,
            render,
            group,
            result,
            selection,
            fn;

        beforeEach(function () {
            mock.init();
            d3.init();
            render = mock.internal.render;
            group = new d3.shape();
            result = underTest.call(mock, group, "view data");
            selection = group.selections[".sg-no-style--text-selector"][0];
        });

        it("should remove all sort selectors first", function () {
            expect(group.selectAll).toHaveBeenCalledWith(".sg-no-style--sort-icon-selector");
            expect(group.selections[".sg-no-style--sort-icon-selector"][0].remove).toHaveBeenCalled();
        });

        it("should call the background selector on the passed group", function () {
            expect(group.selectAll).toHaveBeenCalledWith(".sg-no-style--text-selector");
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

        it("should append a text to the selection", function () {
            expect(selection.append).toHaveBeenCalledWith("text");
        });

        it("should class the text with the foreground selector", function () {
            expect(selection.children.text[0].attributes["class"]).toBeDefined();
            fn = selection.children.text[0].attributes["class"];
            expect(fn({ foregroundStyle: 'my-test-class' })).toContain('sg-no-style--text-selector');
            expect(fn({ foregroundStyle: 'my-test-class' })).toContain('my-test-class');
        });

        it("should set the text anchor from the getTextAnchor method", function () {
            expect(selection.children.text[0].styles["text-anchor"]).toBeDefined();
            fn = selection.children.text[0].styles["text-anchor"];
            fn("datum value");
            expect(render.getTextAnchor).toHaveBeenCalledWith("datum value");
        });

        it("should set the dy to 0.35em for vertical centering", function () {
            expect(selection.children.text[0].attributes.dy).toEqual("0.35em");
        });

        it("should set the x value from the data", function () {
            expect(selection.attributes.x).toBeDefined();
            fn = selection.attributes.x;
            fn("datum value");
            expect(render.getTextPosition).toHaveBeenCalledWith("datum value");
        });

        it("should set the y value from the data", function () {
            expect(selection.attributes.y).toBeDefined();
            fn = selection.attributes.y;
            expect(fn({ y: 5, textHeight: 8 })).toEqual(5 + 8 / 2);
        });

        it("should render the text and sort icon for each cell", function () {
            expect(selection.each).toHaveBeenCalled();
        });

        it("should get the shape from the context", function () {
            fn = selection.each.mostRecentCall.args[0];
            fn.call("this context", {});
            expect(d3.select).toHaveBeenCalledWith("this context");
        });

        describe("for each cell", function () {

            var datum;

            beforeEach(function () {
                fn = selection.each.mostRecentCall.args[0];
            });

            it("should call renderText unsorted when no sort icon is specified", function () {
                datum = {};
                fn(datum);
                expect(render.renderText).toHaveBeenCalledWith(datum, d3.returnValues.select, false);
            });

            it("should call renderText unsorted when sort icon is 'none'", function () {
                datum = { sortIcon: 'none' };
                fn(datum);
                expect(render.renderText).toHaveBeenCalledWith(datum, d3.returnValues.select, false);
            });

            it("should call renderText sorted when sort icon is specified", function () {
                datum = { sortIcon: 'my-sort-icon' };
                fn(datum);
                expect(render.renderText).toHaveBeenCalledWith(datum, d3.returnValues.select, true);
            });

            it("should call renderSortIcon unsorted when no sort icon is specified", function () {
                datum = {};
                fn(datum);
                expect(render.renderSortIcon).toHaveBeenCalledWith(datum, group, false);
            });

            it("should call renderSortIcon unsorted when sort icon is 'none'", function () {
                datum = { sortIcon: 'none' };
                fn(datum);
                expect(render.renderSortIcon).toHaveBeenCalledWith(datum, group, false);
            });

            it("should call renderSortIcon sorted when sort icon is specified", function () {
                datum = { sortIcon: 'my-sort-icon' };
                fn(datum);
                expect(render.renderSortIcon).toHaveBeenCalledWith(datum, group, true);
            });

        });

    });

});