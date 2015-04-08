define(['scrollgrid', 'mocks'], function (scrollgrid, mocks) {
    "use strict";


    describe("layoutDOM", function () {

        var underTest = scrollgrid.prototype.internal.dom.layoutDOM,
            mockDom,
            mockSizes,
            mockRender;

        beforeEach(function () {
            mocks.init();
            mockDom = mocks.scrollgrid.internal.dom;
            mockSizes = mocks.scrollgrid.internal.sizes;
            mockRender = mocks.scrollgrid.internal.render;
        });

        it("should set parent container to relative positioning", function () {
            underTest.call(mocks.scrollgrid);
            expect(mockDom.parent.styles.position).toEqual("relative");
        });

        it("should set the container to relative positioning", function () {
            underTest.call(mocks.scrollgrid);
            expect(mockDom.container.styles.position).toEqual("relative");
        });

        it("should set container width to 100% if fixed size is not provided", function () {
            underTest.call(mocks.scrollgrid);
            expect(mockDom.container.styles.width).toEqual("100%");
        });

        it("should set container width to 100% if fixed size does not have a width", function () {
            underTest.call(mocks.scrollgrid, { height: 567 });
            expect(mockDom.container.styles.width).toEqual("100%");
        });

        it("should set container width to a passed fixed width", function () {
            underTest.call(mocks.scrollgrid, { width: 789 });
            expect(mockDom.container.styles.width).toEqual("789px");
        });

        it("should set container height to 100% if fixed size is not provided", function () {
            underTest.call(mocks.scrollgrid);
            expect(mockDom.container.styles.height).toEqual("100%");
        });

        it("should set container height to 100% if fixed size does not have a height", function () {
            underTest.call(mocks.scrollgrid, { width: 789 });
            expect(mockDom.container.styles.height).toEqual("100%");
        });

        it("should set container height to a passed fixed height", function () {
            underTest.call(mocks.scrollgrid, { height: 567 });
            expect(mockDom.container.styles.height).toEqual("567px");
        });

        it("should set the top padding of the container to the result of the topMargin function", function () {
            underTest.call(mocks.scrollgrid);
            expect(mockDom.container.styles["padding-top"]).toEqual(mocks.vals.topMargin + "px");
        });

        it("should set the container font size to 0 to avoid issues with gaps between elements", function () {
            underTest.call(mocks.scrollgrid);
            expect(mockDom.container.styles["font-size"]).toEqual(0);
        });

        it("should unfix width if the container is wider than its parent", function () {
            mockDom.parent.nodeObject.offsetWidth = 13;
            mockDom.container.nodeObject.offsetWidth = 17;
            underTest.call(mocks.scrollgrid, { height: 567, width: 789 });
            expect(mockDom.container.styles.width).toEqual("100%");
        });

        it("should unfix height if the container is taller than its parent", function () {
            mockDom.parent.nodeObject.offsetHeight = 13;
            mockDom.container.nodeObject.offsetHeight = 17;
            underTest.call(mocks.scrollgrid, { height: 567, width: 789 });
            expect(mockDom.container.styles.height).toEqual("100%");
        });

        it("should set top margin to zero if the container is taller than its parent", function () {
            mockDom.parent.nodeObject.offsetHeight = 13;
            mockDom.container.nodeObject.offsetHeight = 17;
            underTest.call(mocks.scrollgrid, { height: 567, width: 789 });
            expect(mockDom.container.styles["margin-top"]).toEqual("0px");
        });

        it("should calculate the physical bounds passing in the top margin", function () {
            underTest.call(mocks.scrollgrid);
            expect(mockSizes.calculatePhysicalBounds).toHaveBeenCalledWith(mocks.vals.topMargin);
        });

        it("should place the left svg with absolute position", function () {
            var svg = mockDom.left.svg,
                x = 0,
                y = mocks.vals.physTop + mocks.vals.topMargin,
                width = mocks.vals.physLeft,
                height = mocks.vals.visibleInnerHeight;
            underTest.call(mocks.scrollgrid);
            expect(mockDom.setAbsolutePosition).toHaveBeenCalledWith(svg, x, y, width, height)
        });

        it("should place the top svg with relative position", function () {
            var svg = mockDom.top.svg,
                x = mocks.vals.physLeft,
                width = mocks.vals.visibleInnerWidth,
                height = mocks.vals.physTop,
                overflow = 'hidden';
            underTest.call(mocks.scrollgrid);
            expect(mockDom.setRelativePosition).toHaveBeenCalledWith(svg, x, width, height, overflow)
        });

        it("should place the main viewport with relative position", function () {
            var svg = mockDom.main.viewport,
                x = mocks.vals.physLeft,
                width = mocks.vals.visibleInnerWidth,
                height = mocks.vals.visibleInnerHeight,
                overflow = 'auto';
            underTest.call(mocks.scrollgrid);
            expect(mockDom.setRelativePosition).toHaveBeenCalledWith(svg, x, width, height, overflow)
        });

        it("should place the right svg with absolute position", function () {
            var svg = mockDom.right.svg,
                x = mocks.vals.physLeft + mocks.vals.visibleInnerWidth,
                y = mocks.vals.physTop + mocks.vals.topMargin,
                width = mocks.vals.physRight,
                height = mocks.vals.visibleInnerHeight;
            underTest.call(mocks.scrollgrid);
            expect(mockDom.setAbsolutePosition).toHaveBeenCalledWith(svg, x, y, width, height)
        });

        it("should place the bottom svg with relative position", function () {
            var svg = mockDom.bottom.svg,
                x = mocks.vals.physLeft,
                width = mocks.vals.visibleInnerWidth,
                height = mocks.vals.physBottom,
                overflow = 'hidden';
            underTest.call(mocks.scrollgrid);
            expect(mockDom.setRelativePosition).toHaveBeenCalledWith(svg, x, width, height, overflow)
        });

        it("should place the top left svg with absolute position", function () {
            var svg = mockDom.top.left.svg,
                x = 0,
                y = mocks.vals.topMargin,
                width = mocks.vals.physLeft + mocks.vals.dragHandleWidth / 2,
                height = mocks.vals.physTop;
            underTest.call(mocks.scrollgrid);
            expect(mockDom.setAbsolutePosition).toHaveBeenCalledWith(svg, x, y, width, height)
        });

        it("should place the top right svg with absolute position", function () {
            var svg = mockDom.top.right.svg,
                x = mocks.vals.physLeft + mocks.vals.visibleInnerWidth - mocks.vals.dragHandleWidth / 2,
                y = mocks.vals.topMargin,
                width = mocks.vals.physRight + mocks.vals.dragHandleWidth / 2,
                height = mocks.vals.physTop;
            underTest.call(mocks.scrollgrid);
            expect(mockDom.setAbsolutePosition).toHaveBeenCalledWith(svg, x, y, width, height)
        });

        it("should place the bottom left svg with absolute position", function () {
            var svg = mockDom.bottom.left.svg,
                x = 0,
                y = mocks.vals.topMargin + mocks.vals.physTop + mocks.vals.visibleInnerHeight,
                width = mocks.vals.physLeft,
                height = mocks.vals.physBottom;
            underTest.call(mocks.scrollgrid);
            expect(mockDom.setAbsolutePosition).toHaveBeenCalledWith(svg, x, y, width, height)
        });

        it("should place the bottom right svg with absolute position", function () {
            var svg = mockDom.bottom.right.svg,
                x = mocks.vals.physLeft + mocks.vals.visibleInnerWidth,
                y = mocks.vals.topMargin + mocks.vals.physTop + mocks.vals.visibleInnerHeight,
                width = mocks.vals.physRight,
                height = mocks.vals.physBottom;
            underTest.call(mocks.scrollgrid);
            expect(mockDom.setAbsolutePosition).toHaveBeenCalledWith(svg, x, y, width, height)
        });

        it("should overlay the main svg with absolute position", function () {
            var svg = mockDom.main.svg,
                x = mocks.vals.physLeft,
                y = mocks.vals.topMargin + mocks.vals.physTop,
                width = mocks.vals.visibleInnerWidth,
                height = mocks.vals.visibleInnerHeight;
            underTest.call(mocks.scrollgrid);
            expect(mockDom.setAbsolutePosition).toHaveBeenCalledWith(svg, x, y, width, height);
        });

        it("should transform the top right panel because the extra drag handle width is included", function () {
            underTest.call(mocks.scrollgrid);
            expect(mockDom.top.right.transform.attributes.transform).toEqual("translate(" + (mocks.vals.dragHandleWidth / 2) + ", 0)")
        });

        it("should invoke draw on scroll", function () {
            underTest.call(mocks.scrollgrid);
            expect(mockDom.main.viewport.eventHandlers.scroll).toBeDefined();
            mockDom.main.viewport.eventHandlers.scroll();
            expect(mockRender.draw).toHaveBeenCalled();
        });

        it("should update the scroller bounds", function () {
            underTest.call(mocks.scrollgrid);
            expect(mockDom.setScrollerSize).toHaveBeenCalled();
        });

        it("should store the vertical scrollbar width", function () {
            underTest.call(mocks.scrollgrid);
            expect(mockSizes.physical.verticalScrollbarWidth).toEqual(mocks.vals.nodeOffsetWidth - mocks.vals.nodeClientWidth);
        });

        it("should store the vertical scrollbar height", function () {
            underTest.call(mocks.scrollgrid);
            expect(mockSizes.physical.horizontalScrollbarHeight).toEqual(mocks.vals.nodeOffsetHeight - mocks.vals.nodeClientHeight);
        });

    });
});