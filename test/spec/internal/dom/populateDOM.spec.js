define(['d3', 'mock', 'dom/populateDOM'], function (d3, mock) {
    "use strict";

    describe("populateDOM", function () {

        var underTest,
            mockDom;

        beforeEach(function () {
            mock.init();
            d3.init();

            underTest = Scrollgrid.prototype.internal.dom.populateDOM;
            mockDom = mock.internal.dom;
        });

        it("should select the target and set as parent", function () {
            underTest.call(mock);
            expect(d3.select).toHaveBeenCalledWith(mock.vals.target);
            expect(mockDom.parent).toBe(d3.returnValues.select);
        });

        it("should add a div to the parent and store it in container", function () {
            underTest.call(mock);
            expect(mockDom.parent.children.div[0]).toBeDefined();
            expect(mockDom.container).toEqual(mockDom.parent.children.div[0]);
        });

        it("should add a div to the container and store it in main viewport", function () {
            underTest.call(mock);
            expect(mockDom.container.children.div[0]).toBeDefined();
            expect(mockDom.main.viewport).toEqual(mockDom.container.children.div[0]);
        });

        it("should add a div to the viewport and store it in scroller", function () {
            underTest.call(mock);
            expect(mockDom.main.viewport.children.div[0]).toBeDefined();
            expect(mockDom.main.scroller).toEqual(mockDom.main.viewport.children.div[0]);
        });

        it("should use populate panel for each panel in the dom", function () {
            underTest.call(mock);
            expect(mockDom.populatePanel).toHaveBeenCalled();
            expect(mockDom.populatePanel.calls.count()).toEqual(9);
        });

        it("should populate the top left panel and store in the dom", function () {
            underTest.call(mock);
            expect(mockDom.top.left).toBeDefined();
        });

        it("should populate the top panel and store in the dom", function () {
            underTest.call(mock);
            expect(mockDom.top).toBeDefined();
        });

        it("should populate the top right panel and store in the dom", function () {
            underTest.call(mock);
            expect(mockDom.top.right).toBeDefined();
        });

        it("should populate the left panel and store in the dom", function () {
            underTest.call(mock);
            expect(mockDom.left).toBeDefined();
        });

        it("should populate the main panel and store in the dom", function () {
            underTest.call(mock);
            expect(mockDom.main).toBeDefined();
        });

        it("should populate the right panel and store in the dom", function () {
            underTest.call(mock);
            expect(mockDom.right).toBeDefined();
        });

        it("should populate the bottom left panel and store in the dom", function () {
            underTest.call(mock);
            expect(mockDom.bottom.left).toBeDefined();
        });

        it("should populate the bottom panel and store in the dom", function () {
            underTest.call(mock);
            expect(mockDom.bottom).toBeDefined();
        });

        it("should populate the bottom right panel and store in the dom", function () {
            underTest.call(mock);
            expect(mockDom.bottom.right).toBeDefined();
        });
    });

});