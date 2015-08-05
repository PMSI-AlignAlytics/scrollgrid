define(['d3', 'scrollgrid', 'dom/populateDOM'], function (d3, mock) {
    "use strict";

    describe("populateDOM", function () {

        var underTest,
            mockDom,
            mockStyle;

        beforeEach(function () {
            mock.init();
            d3.init();

            underTest = Scrollgrid.prototype.internal.dom.populateDOM;
            mockDom = mock.internal.dom;
            mockStyle = mock.style;
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

        it("should populate the top left panel and store in the dom", function () {
            underTest.call(mock);
            expect(mockDom.populatePanel).toHaveBeenCalledWith(mockStyle.top.left.panel);
            expect(mockDom.top.left).toBeDefined();
            expect(mockDom.top.left.style).toEqual(mockStyle.top.left.panel);
        });

        it("should populate the top panel and store in the dom", function () {
            underTest.call(mock);
            expect(mockDom.populatePanel).toHaveBeenCalledWith(mockStyle.top.panel);
            expect(mockDom.top).toBeDefined();
            expect(mockDom.top.style).toEqual(mockStyle.top.panel);
        });

        it("should populate the top right panel and store in the dom", function () {
            underTest.call(mock);
            expect(mockDom.populatePanel).toHaveBeenCalledWith(mockStyle.top.right.panel);
            expect(mockDom.top.right).toBeDefined();
            expect(mockDom.top.right.style).toEqual(mockStyle.top.right.panel);
        });

        it("should populate the left panel and store in the dom", function () {
            underTest.call(mock);
            expect(mockDom.populatePanel).toHaveBeenCalledWith(mockStyle.left.panel);
            expect(mockDom.left).toBeDefined();
            expect(mockDom.left.style).toEqual(mockStyle.left.panel);
        });

        it("should populate the main panel and store in the dom", function () {
            underTest.call(mock);
            expect(mockDom.populatePanel).toHaveBeenCalledWith(mockStyle.main.panel);
            expect(mockDom.main).toBeDefined();
            expect(mockDom.main.style).toEqual(mockStyle.main.panel);
        });

        it("should populate the right panel and store in the dom", function () {
            underTest.call(mock);
            expect(mockDom.populatePanel).toHaveBeenCalledWith(mockStyle.right.panel);
            expect(mockDom.right).toBeDefined();
            expect(mockDom.right.style).toEqual(mockStyle.right.panel);
        });

        it("should populate the bottom left panel and store in the dom", function () {
            underTest.call(mock);
            expect(mockDom.populatePanel).toHaveBeenCalledWith(mockStyle.bottom.left.panel);
            expect(mockDom.bottom.left).toBeDefined();
            expect(mockDom.bottom.left.style).toEqual(mockStyle.bottom.left.panel);
        });

        it("should populate the bottom panel and store in the dom", function () {
            underTest.call(mock);
            expect(mockDom.populatePanel).toHaveBeenCalledWith(mockStyle.bottom.panel);
            expect(mockDom.bottom).toBeDefined();
            expect(mockDom.bottom.style).toEqual(mockStyle.bottom.panel);
        });

        it("should populate the bottom right panel and store in the dom", function () {
            underTest.call(mock);
            expect(mockDom.populatePanel).toHaveBeenCalledWith(mockStyle.bottom.right.panel);
            expect(mockDom.bottom.right).toBeDefined();
            expect(mockDom.bottom.right.style).toEqual(mockStyle.bottom.right.panel);
        });
    });

});