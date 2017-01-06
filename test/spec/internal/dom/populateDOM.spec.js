define(['d3', 'mock', 'dom/populateDOM'], function (d3, mock) {
    "use strict";

    describe("populateDOM", function () {

        var underTest,
            elems,
            int;

        beforeEach(function () {
            mock.init();
            d3.init();

            underTest = Scrollgrid.prototype.internal.dom.populateDOM;
            int = mock.internal;
            elems = mock.elements;
        });

        it("should select the target and set as parent", function () {
            underTest.call(mock);
            expect(d3.select).toHaveBeenCalledWith(mock.vals.target);
            expect(elems.parent).toBe(d3.returnValues.select);
        });

        it("should add a div to the parent and store it in container", function () {
            underTest.call(mock);
            expect(elems.parent.children.div[0]).toBeDefined();
            expect(elems.container).toEqual(elems.parent.children.div[0]);
        });

        it("should add a div to the container and store it in main viewport", function () {
            underTest.call(mock);
            expect(elems.container.children.div[0]).toBeDefined();
            expect(elems.main.viewport).toEqual(elems.container.children.div[0]);
        });

        it("should add a div to the viewport and store it in scroller", function () {
            underTest.call(mock);
            expect(elems.main.viewport.children.div[0]).toBeDefined();
            expect(elems.main.scroller).toEqual(elems.main.viewport.children.div[0]);
        });

        it("should use populate panel for each panel in the dom", function () {
            underTest.call(mock);
            expect(int.dom.populatePanel).toHaveBeenCalled();
            expect(int.dom.populatePanel.calls.count()).toEqual(9);
        });

        it("should populate the top left panel and store in the dom", function () {
            underTest.call(mock);
            expect(elems.top.left).toBeDefined();
        });

        it("should populate the top panel and store in the dom", function () {
            underTest.call(mock);
            expect(elems.top).toBeDefined();
        });

        it("should populate the top right panel and store in the dom", function () {
            underTest.call(mock);
            expect(elems.top.right).toBeDefined();
        });

        it("should populate the left panel and store in the dom", function () {
            underTest.call(mock);
            expect(elems.left).toBeDefined();
        });

        it("should populate the main panel and store in the dom", function () {
            underTest.call(mock);
            expect(elems.main).toBeDefined();
        });

        it("should populate the right panel and store in the dom", function () {
            underTest.call(mock);
            expect(elems.right).toBeDefined();
        });

        it("should populate the bottom left panel and store in the dom", function () {
            underTest.call(mock);
            expect(elems.bottom.left).toBeDefined();
        });

        it("should populate the bottom panel and store in the dom", function () {
            underTest.call(mock);
            expect(elems.bottom).toBeDefined();
        });

        it("should populate the bottom right panel and store in the dom", function () {
            underTest.call(mock);
            expect(elems.bottom.right).toBeDefined();
        });
    });

});
