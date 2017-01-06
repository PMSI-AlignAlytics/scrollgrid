define(['d3', 'mock', 'render/draw'], function (d3, mock) {
    "use strict";

    describe("draw", function () {

        var underTest = Scrollgrid.prototype.internal.render.draw,
            vals,
            int,
            props,
            elems,
            hLeft,
            hMiddle,
            hRight,
            vTop,
            vMiddle,
            vBottom,
            totalWidth,
            totalHeight,
            clearCache,
            reviewSize;

        beforeEach(function () {
            mock.init();
            d3.init();
            int = mock.internal;
            props = mock.properties;
            elems = mock.elements;
            vals = mock.vals;
            clearCache = "Clear Cache";
            reviewSize = true;
            hLeft = { left: 0, right: vals.virtLeft };
            hMiddle = { left: vals.virtLeft + vals.viewAreaVirtLeft, right: vals.virtLeft + vals.viewAreaVirtRight };
            hRight = { left: vals.virtOuterWidth - vals.virtRight, right: vals.virtOuterWidth };
            vTop = { top: 0, bottom: vals.virtTop };
            vMiddle = { top: vals.virtTop + vals.viewAreaVirtTop, bottom: vals.virtTop + vals.viewAreaVirtBottom };
            vBottom = { top: vals.virtOuterHeight - vals.virtBottom, bottom: vals.virtOuterHeight };
            totalWidth = props.physicalLeft + props.physicalTotalInnerWidth + props.physicalRight + props.verticalScrollbarWidth;
            totalHeight = props.physicalTop + props.physicalTotalInnerHeight + props.physicalBottom + props.horizontalScrollbarHeight;
        });

        it("should call the getVisibleRegion method to get the physical view area", function () {
            underTest.call(mock, clearCache, reviewSize);
            expect(int.render.getVisibleRegion).toHaveBeenCalled();
        });

        it("should call the getDataBounds method process the visible view area against the data", function () {
            underTest.call(mock, clearCache, reviewSize);
            expect(int.render.getDataBounds).toHaveBeenCalledWith("visible region");
        });

        it("should call render region for the top left panel", function () {
            underTest.call(mock, clearCache, reviewSize);
            expect(int.render.renderRegion).toHaveBeenCalledWith(elems.top.left, {}, hLeft, vTop, clearCache);
        });

        it("should call render region for the top middle panel", function () {
            underTest.call(mock, clearCache, reviewSize);
            expect(int.render.renderRegion).toHaveBeenCalledWith(elems.top, { x: vals.viewAreaPhysX }, hMiddle, vTop, clearCache);
        });

        it("should call render region for the top right panel", function () {
            underTest.call(mock, clearCache, reviewSize);
            expect(int.render.renderRegion).toHaveBeenCalledWith(elems.top.right, {}, hRight, vTop, clearCache);
        });

        it("should call render region for the middle left panel", function () {
            underTest.call(mock, clearCache, reviewSize);
            expect(int.render.renderRegion).toHaveBeenCalledWith(elems.left, { y: vals.viewAreaPhysY }, hLeft, vMiddle, clearCache);
        });

        it("should call render region for the center panel", function () {
            underTest.call(mock, clearCache, reviewSize);
            expect(int.render.renderRegion).toHaveBeenCalledWith(elems.main, { x: vals.viewAreaPhysX, y: vals.viewAreaPhysY }, hMiddle, vMiddle, clearCache);
        });

        it("should call render region for the middle right panel", function () {
            underTest.call(mock, clearCache, reviewSize);
            expect(int.render.renderRegion).toHaveBeenCalledWith(elems.right, { y: vals.viewAreaPhysY }, hRight, vMiddle, clearCache);
        });

        it("should call render region for the bottom left panel", function () {
            underTest.call(mock, clearCache, reviewSize);
            expect(int.render.renderRegion).toHaveBeenCalledWith(elems.bottom.left, {}, hLeft, vBottom, clearCache);
        });

        it("should call render region for the bottom middle panel", function () {
            underTest.call(mock, clearCache, reviewSize);
            expect(int.render.renderRegion).toHaveBeenCalledWith(elems.bottom, { x: vals.viewAreaPhysX }, hMiddle, vBottom, clearCache);
        });

        it("should call render region for the bottom right panel", function () {
            underTest.call(mock, clearCache, reviewSize);
            expect(int.render.renderRegion).toHaveBeenCalledWith(elems.bottom.right, {}, hRight, vBottom, clearCache);
        });

        it("should not call add resize handles if column resizing is off", function () {
            props.allowColumnResizing = false;
            underTest.call(mock, clearCache, reviewSize);
            expect(int.interaction.addResizeHandles).not.toHaveBeenCalled();
        });

        it("should call add resize handles for the top left panel if column resizing is on", function () {
            props.allowColumnResizing = true;
            underTest.call(mock, clearCache, reviewSize);
            expect(int.interaction.addResizeHandles).toHaveBeenCalledWith(elems.top.left, hLeft);
        });

        it("should call add resize handles for the top middle panel if column resizing is on", function () {
            props.allowColumnResizing = true;
            underTest.call(mock, clearCache, reviewSize);
            expect(int.interaction.addResizeHandles).toHaveBeenCalledWith(elems.top, hMiddle, vals.viewAreaPhysX);
        });

        it("should call add resize handles for the top right panel if column resizing is on", function () {
            props.allowColumnResizing = true;
            underTest.call(mock, clearCache, reviewSize);
            expect(int.interaction.addResizeHandles).toHaveBeenCalledWith(elems.top.right, hRight);
        });

        it("should not call layoutDOM if reviewSize is not set", function () {
            underTest.call(mock, clearCache, false);
            expect(int.dom.layoutDOM).not.toHaveBeenCalled();
        });

        it("should call layoutDOM with a null fixed width if the grid is smaller than the total width", function () {
            elems.parent.nodeObject.offsetWidth = totalWidth - 1;
            underTest.call(mock, clearCache, reviewSize);
            expect(int.dom.layoutDOM.calls.argsFor(0)[0].width).toBeNull();
        });

        it("should call layoutDOM with a null fixed width if the grid width is equal to the total width", function () {
            elems.parent.nodeObject.offsetWidth = totalWidth;
            underTest.call(mock, clearCache, reviewSize);
            expect(int.dom.layoutDOM.calls.argsFor(0)[0].width).toBeNull();
        });

        it("should call layoutDOM with a fixed width if the grid is larger than the total width", function () {
            elems.parent.nodeObject.offsetWidth = totalWidth + 1;
            underTest.call(mock, clearCache, reviewSize);
            expect(int.dom.layoutDOM.calls.argsFor(0)[0].width).toEqual(totalWidth);
        });

        it("should call layoutDOM with a null fixed height if the grid is smaller than the total height", function () {
            elems.parent.nodeObject.offsetHeight = totalHeight - 1;
            underTest.call(mock, clearCache, reviewSize);
            expect(int.dom.layoutDOM.calls.argsFor(0)[0].height).toBeNull();
        });

        it("should call layoutDOM with a null fixed height if the grid height is equal to the total height", function () {
            elems.parent.nodeObject.offsetHeight = totalHeight;
            underTest.call(mock, clearCache, reviewSize);
            expect(int.dom.layoutDOM.calls.argsFor(0)[0].height).toBeNull();
        });

        it("should call layoutDOM with a fixed height if the grid is larger than the total height", function () {
            elems.parent.nodeObject.offsetHeight = totalHeight + 1;
            underTest.call(mock, clearCache, reviewSize);
            expect(int.dom.layoutDOM.calls.argsFor(0)[0].height).toEqual(totalHeight);
        });

    });

});
