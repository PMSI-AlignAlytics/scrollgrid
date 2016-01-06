define(['mock', 'dom/layoutDOM'], function (mock) {
    "use strict";

    describe("layoutDOM", function () {

        var underTest = Scrollgrid.prototype.internal.dom.layoutDOM,
            mockDom,
            mockSizes,
            mockRender;

        beforeEach(function () {
            mock.init();
            mockDom = mock.internal.dom;
            mockSizes = mock.internal.sizes;
            mockRender = mock.internal.render;
        });

        it("should set parent container to relative positioning", function () {
            underTest.call(mock);
            expect(mockDom.parent.styles.position).toEqual("relative");
        });

        it("should set the container to relative positioning", function () {
            underTest.call(mock);
            expect(mockDom.container.styles.position).toEqual("relative");
        });

        it("should set container width to 100% if fixed size is not provided", function () {
            underTest.call(mock);
            expect(mockDom.container.styles.width).toEqual("100%");
        });

        it("should set container width to 100% if fixed size does not have a width", function () {
            underTest.call(mock, { height: 567 });
            expect(mockDom.container.styles.width).toEqual("100%");
        });

        it("should set container width to a passed fixed width", function () {
            underTest.call(mock, { width: 789 });
            expect(mockDom.container.styles.width).toEqual("789px");
        });

        it("should set container height to 100% if fixed size is not provided", function () {
            underTest.call(mock);
            expect(mockDom.container.styles.height).toEqual("100%");
        });

        it("should set container height to 100% if fixed size does not have a height", function () {
            underTest.call(mock, { width: 789 });
            expect(mockDom.container.styles.height).toEqual("100%");
        });

        it("should set container height to a passed fixed height", function () {
            underTest.call(mock, { height: 567 });
            expect(mockDom.container.styles.height).toEqual("567px");
        });

        it("should set the top padding of the container to the result of the topMargin function", function () {
            underTest.call(mock);
            expect(mockDom.container.styles["padding-top"]).toEqual(mock.vals.topMargin + "px");
        });

        it("should set the container font size to 0 to avoid issues with gaps between elements", function () {
            underTest.call(mock);
            expect(mockDom.container.styles["font-size"]).toEqual(0);
        });

        it("should unfix width if the container is wider than its parent", function () {
            mockDom.parent.nodeObject.offsetWidth = 13;
            mockDom.container.nodeObject.offsetWidth = 17;
            underTest.call(mock, { height: 567, width: 789 });
            expect(mockDom.container.styles.width).toEqual("100%");
        });

        it("should unfix height if the container is taller than its parent", function () {
            mockDom.parent.nodeObject.offsetHeight = 13;
            mockDom.container.nodeObject.offsetHeight = 17;
            underTest.call(mock, { height: 567, width: 789 });
            expect(mockDom.container.styles.height).toEqual("100%");
        });

        it("should set top margin to zero if the container is taller than its parent", function () {
            mockDom.parent.nodeObject.offsetHeight = 13;
            mockDom.container.nodeObject.offsetHeight = 17;
            underTest.call(mock, { height: 567, width: 789 });
            expect(mockDom.container.styles["margin-top"]).toEqual("0px");
        });

        it("should calculate the physical bounds passing in the top margin", function () {
            underTest.call(mock);
            expect(mockSizes.calculatePhysicalBounds).toHaveBeenCalledWith(mock.vals.topMargin);
        });

        it("should place the left svg with absolute position", function () {
            var svg = mockDom.left.svg,
                x = 0,
                y = mock.vals.physTop + mock.vals.topMargin,
                width = mock.vals.physLeft,
                height = mock.vals.visibleInnerHeight;
            underTest.call(mock);
            expect(mockDom.setAbsolutePosition).toHaveBeenCalledWith(svg, x, y, width, height);
        });

        it("should place the top svg with relative position", function () {
            var svg = mockDom.top.svg,
                x = mock.vals.physLeft,
                width = mock.vals.visibleInnerWidth,
                height = mock.vals.physTop,
                overflow = 'hidden';
            underTest.call(mock);
            expect(mockDom.setRelativePosition).toHaveBeenCalledWith(svg, x, width, height, overflow);
        });

        it("should place the main viewport with relative position", function () {
            var svg = mockDom.main.viewport,
                x = mock.vals.physLeft,
                width = mock.vals.visibleInnerWidth,
                height = mock.vals.visibleInnerHeight,
                overflow = 'auto';
            underTest.call(mock);
            expect(mockDom.setRelativePosition).toHaveBeenCalledWith(svg, x, width, height, overflow);
        });

        it("should place the right svg with absolute position", function () {
            var svg = mockDom.right.svg,
                x = mock.vals.physLeft + mock.vals.visibleInnerWidth,
                y = mock.vals.physTop + mock.vals.topMargin,
                width = mock.vals.physRight,
                height = mock.vals.visibleInnerHeight;
            underTest.call(mock);
            expect(mockDom.setAbsolutePosition).toHaveBeenCalledWith(svg, x, y, width, height);
        });

        it("should place the bottom svg with relative position", function () {
            var svg = mockDom.bottom.svg,
                x = mock.vals.physLeft,
                width = mock.vals.visibleInnerWidth,
                height = mock.vals.physBottom,
                overflow = 'hidden';
            underTest.call(mock);
            expect(mockDom.setRelativePosition).toHaveBeenCalledWith(svg, x, width, height, overflow);
        });

        it("should place the top left svg with absolute position", function () {
            var svg = mockDom.top.left.svg,
                x = 0,
                y = mock.vals.topMargin,
                width = mock.vals.physLeft + mock.vals.dragHandleWidth / 2,
                height = mock.vals.physTop;
            underTest.call(mock);
            expect(mockDom.setAbsolutePosition).toHaveBeenCalledWith(svg, x, y, width, height);
        });

        it("should place the top right svg with absolute position", function () {
            var svg = mockDom.top.right.svg,
                x = mock.vals.physLeft + mock.vals.visibleInnerWidth - mock.vals.dragHandleWidth / 2,
                y = mock.vals.topMargin,
                width = mock.vals.physRight + mock.vals.dragHandleWidth / 2,
                height = mock.vals.physTop;
            underTest.call(mock);
            expect(mockDom.setAbsolutePosition).toHaveBeenCalledWith(svg, x, y, width, height);
        });

        it("should place the bottom left svg with absolute position", function () {
            var svg = mockDom.bottom.left.svg,
                x = 0,
                y = mock.vals.topMargin + mock.vals.physTop + mock.vals.visibleInnerHeight,
                width = mock.vals.physLeft,
                height = mock.vals.physBottom;
            underTest.call(mock);
            expect(mockDom.setAbsolutePosition).toHaveBeenCalledWith(svg, x, y, width, height);
        });

        it("should place the bottom right svg with absolute position", function () {
            var svg = mockDom.bottom.right.svg,
                x = mock.vals.physLeft + mock.vals.visibleInnerWidth,
                y = mock.vals.topMargin + mock.vals.physTop + mock.vals.visibleInnerHeight,
                width = mock.vals.physRight,
                height = mock.vals.physBottom;
            underTest.call(mock);
            expect(mockDom.setAbsolutePosition).toHaveBeenCalledWith(svg, x, y, width, height);
        });

        it("should overlay the main svg with absolute position", function () {
            var svg = mockDom.main.svg,
                x = mock.vals.physLeft,
                y = mock.vals.topMargin + mock.vals.physTop,
                width = mock.vals.visibleInnerWidth,
                height = mock.vals.visibleInnerHeight;
            underTest.call(mock);
            expect(mockDom.setAbsolutePosition).toHaveBeenCalledWith(svg, x, y, width, height);
        });

        it("should call stylePanels, passing in the default styles", function () {
            underTest.call(mock);
            expect(mockDom.stylePanels).toHaveBeenCalledWith(mock.style);
        });

        it("should transform the top right panel because the extra drag handle width is included", function () {
            underTest.call(mock);
            expect(mockDom.top.right.transform.attributes.transform).toEqual("translate(" + (mock.vals.dragHandleWidth / 2) + ", 0)");
        });

        it("should invoke draw on scroll", function () {
            underTest.call(mock);
            expect(mockDom.main.viewport.eventHandlers.scroll).toBeDefined();
            mockDom.main.viewport.eventHandlers.scroll();
            expect(mockRender.draw).toHaveBeenCalled();
        });

        it("should update the scroller bounds", function () {
            underTest.call(mock);
            expect(mockDom.setScrollerSize).toHaveBeenCalled();
        });

        it("should store the vertical scrollbar width", function () {
            underTest.call(mock);
            expect(mockSizes.physical.verticalScrollbarWidth).toEqual(mock.vals.nodeOffsetWidth - mock.vals.nodeClientWidth);
        });

        it("should store the vertical scrollbar height", function () {
            underTest.call(mock);
            expect(mockSizes.physical.horizontalScrollbarHeight).toEqual(mock.vals.nodeOffsetHeight - mock.vals.nodeClientHeight);
        });

    });
});