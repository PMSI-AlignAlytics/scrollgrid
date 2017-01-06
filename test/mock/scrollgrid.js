define(["d3"], function (d3) {
    "use strict";

    var scrollgrid = {};

    scrollgrid.vals = {
        gridAlignment: "top",
        target: "testTarget",
        columnResizer: "column resizer",
        sortIcon: "sort icon",
        nodeOffsetHeight: 1,
        nodeOffsetWidth: 2,
        topMargin: 3,
        containerHeight: 5,
        physTop: 7,
        physLeft: 11,
        physRight: 13,
        physBottom: 17,
        visibleInnerHeight: 19,
        visibleInnerWidth: 23,
        nodeClientHeight: 29,
        nodeClientWidth: 31,
        dragHandleWidth: 37,
        totalInnerHeight: 41,
        totalInnerWidth: 43,
        textBoundWidth: 47,
        virtTop: 53,
        virtLeft: 59,
        virtRight: 61,
        virtBottom: 67,
        verticalScrollbarWidth: 71,
        horizontalScrollbarHeight: 73,
        boundingBoxLeft: 79,
        boundingBoxTop: 83,
        boundingBoxWidth: 89,
        boundingBoxHeight: 97,
        viewAreaVirtLeft: 101,
        viewAreaVirtTop: 103,
        viewAreaVirtRight: 107,
        viewAreaVirtBottom: 109,
        viewAreaPhysX: 113,
        viewAreaPhysY: 127,
        virtOuterWidth: 131,
        virtOuterHeight: 137,
        virtInnerWidth: 139,
        virtInnerHeight: 149,
        physRowHeight: 151,
        adjX: 157,
        adjY: 163,
        adjBoxHeight: 167,
        adjBoxWidth: 173,
        adjTextHeight: 179,
        adjTextWidth: 181,
        cellPadding: 191,
        sortIconSize: 193,
        nodeScrollLeft: 197,
        nodeScrollTop: 199,
        cellWaitText: 211,
        pushedTextBoundWidth: 223,
        pushedTextBoundHeight: 227,
        footerRowHeight: 229,
        headerRowHeight: 233
    };

    scrollgrid.panel = function () {
        var self = this;
        self.style = null;
        self.svg = new d3.shape(scrollgrid.vals);
        self.transform = new d3.shape(scrollgrid.vals);
        self.content = new d3.shape(scrollgrid.vals);
        self.left = {
            svg: new d3.shape(scrollgrid.vals),
            transform: new d3.shape(scrollgrid.vals),
            content: new d3.shape(scrollgrid.vals)
        };
        self.right = {
            svg: new d3.shape(scrollgrid.vals),
            transform: new d3.shape(scrollgrid.vals),
            content: new d3.shape(scrollgrid.vals)
        };
        self.viewport = new d3.shape(scrollgrid.vals);
        self.scroller = new d3.shape(scrollgrid.vals);
    };

    scrollgrid.init = function () {
        scrollgrid.internal = {
            sizes: {
                initialiseColumns: jasmine.createSpy("initialiseColumns"),
                getRowHeight: jasmine.createSpy("getRowHeight").and.returnValue(scrollgrid.vals.physRowHeight),
                calculatePhysicalBounds: jasmine.createSpy("calculatePhysicalBounds"),
                getExistingTextBound: jasmine.createSpy("getExistingTextBound").and.returnValue({ width: scrollgrid.vals.textBoundWidth }),
                pushTextBound: jasmine.createSpy("pushTextBound").and.returnValue({ width: scrollgrid.vals.pushedTextBoundWidth, height: scrollgrid.vals.pushedTextBoundHeight })
            },
            dom: {
                getTopMargin: jasmine.createSpy("getTopMargin").and.returnValue(scrollgrid.vals.topMargin),
                setAbsolutePosition: jasmine.createSpy("setAbsolutePosition"),
                setRelativePosition: jasmine.createSpy("setRelativePosition"),
                setScrollerSize: jasmine.createSpy("setScrollerSize"),
                stylePanels: jasmine.createSpy("stylePanel"),
                populatePanel: jasmine.createSpy("populatePanel").and.callFake(function (css) {
                    var returnPanel = new scrollgrid.panel();
                    returnPanel.style = css;
                    return returnPanel;
                }),
                layoutDOM: jasmine.createSpy("layoutDOM"),
                redirectViewportEvents: jasmine.createSpy("redirectViewportEvents")
            },
            interaction: {
                addResizeHandles: jasmine.createSpy("addResizeHandles"),
                autoResizeColumn: jasmine.createSpy("autoResizeColumn"),
                getColumnResizer: jasmine.createSpy("getColumnResizer").and.returnValue("column resizer"),
                columnResizeStart: jasmine.createSpy("columnResizeStart"),
                columnResizing: jasmine.createSpy("columnResizing"),
                columnResizeEnd: jasmine.createSpy("columnResizeEnd"),
                sortColumn: jasmine.createSpy("sortColumn"),
                addSortButtons: jasmine.createSpy("addSortButtons")
            },
            render: {
                matchRule: jasmine.createSpy("matchRule").and.returnValue(true),
                draw: jasmine.createSpy("draw"),
                getVisibleRegion: jasmine.createSpy("getVisibleRegion").and.returnValue("visible region"),
                getDataBounds: jasmine.createSpy("getDataBounds").and.returnValue({
                    virtual: {
                        left: scrollgrid.vals.viewAreaVirtLeft,
                        top: scrollgrid.vals.viewAreaVirtTop,
                        right: scrollgrid.vals.viewAreaVirtRight,
                        bottom: scrollgrid.vals.viewAreaVirtBottom
                    },
                    physical: {
                        x: scrollgrid.vals.viewAreaPhysX,
                        y: scrollgrid.vals.viewAreaPhysY
                    }
                }),
                getClipPath: jasmine.createSpy("getClipPath").and.returnValue("polygon(0px 0px, 0px 10px, 10px 10px, 10px 0px)"),
                getDataInBounds: jasmine.createSpy("getDataInBounds").and.returnValue("data in bounds"),
                renderRegion: jasmine.createSpy("renderRegion"),
                calculateCellAdjustments: jasmine.createSpy("calculateCellAdjustments").and.returnValue({
                    x: scrollgrid.vals.adjX,
                    y: scrollgrid.vals.adjY,
                    boxHeight: scrollgrid.vals.adjBoxHeight,
                    boxWidth: scrollgrid.vals.adjBoxWidth,
                    textHeight: scrollgrid.vals.adjTextHeight,
                    textWidth: scrollgrid.vals.adjTextWidth,
                    sortIcon: scrollgrid.vals.sortIcon
                }),
                applyRules: jasmine.createSpy("applyRules"),
                getTextAnchor: jasmine.createSpy("getTextAnchor").and.returnValue("Text Anchor"),
                getTextPosition: jasmine.createSpy("getTextPosition").and.returnValue("Text Position"),
                renderText: jasmine.createSpy("renderText"),
                renderSortIcon: jasmine.createSpy("renderSortIcon"),
                renderRegionForeground: jasmine.createSpy("renderRegionForeground"),
                cropText: jasmine.createSpy("cropText"),
                sortIcon: jasmine.createSpy("sortIcon")
            },
            events: {
                addEventHandlers: jasmine.createSpy("addEventHandlers")
            }
        };
        scrollgrid.elements = {
            parent: new d3.shape(scrollgrid.vals),
            container: new d3.shape(scrollgrid.vals),
            top: new scrollgrid.panel(),
            left: new scrollgrid.panel(),
            main: new scrollgrid.panel(),
            right: new scrollgrid.panel(),
            bottom: new scrollgrid.panel(),
        };
        scrollgrid.properties = {
            allowColumnResizing: true,
            allowSorting: true,
            cellPadding: scrollgrid.vals.cellPadding,
            cellWaitText: scrollgrid.vals.cellWaitText,
            dragHandleWidth: scrollgrid.vals.dragHandleWidth,
            footerRowHeight: scrollgrid.vals.footerRowHeight,
            formatRules: ['A', 'B', 'C'],
            headerRowHeight: scrollgrid.vals.headerRowHeight,
            horizontalScrollbarHeight: scrollgrid.vals.horizontalScrollbarHeight,
            physicalBottom: scrollgrid.vals.physBottom,
            physicalLeft: scrollgrid.vals.physLeft,
            physicalRight: scrollgrid.vals.physRight,
            physicalTop: scrollgrid.vals.physTop,
            physicalTotalInnerHeight: scrollgrid.vals.totalInnerHeight,
            physicalTotalInnerWidth: scrollgrid.vals.totalInnerWidth,
            physicalVisibleInnerHeight: scrollgrid.vals.visibleInnerHeight,
            physicalVisibleInnerWidth: scrollgrid.vals.visibleInnerWidth,
            rowHeight: scrollgrid.vals.physRowHeight,
            sortIconSize: scrollgrid.vals.sortIconSize,
            verticalAlignment: scrollgrid.vals.gridAlignment,
            verticalScrollbarWidth: scrollgrid.vals.verticalScrollbarWidth,
            virtualBottom: scrollgrid.vals.virtBottom,
            virtualLeft: scrollgrid.vals.virtLeft,
            virtualRight: scrollgrid.vals.virtRight,
            virtualTop: scrollgrid.vals.virtTop,
            virtualInnerHeight: scrollgrid.vals.virtInnerHeight,
            virtualInnerWidth: scrollgrid.vals.virtInnerWidth,
            virtualOuterHeight: scrollgrid.vals.virtOuterHeight,
            virtualOuterWidth: scrollgrid.vals.virtOuterWidth,
        };
        scrollgrid.eventHandlers = [
            {
                type: 'click',
                handler: function() {
                    return 'clicked';
                },
                capture: false
            }
        ];
        scrollgrid.style = {
            left: { panel: 'left' },
            right: { panel: 'right' },
            top: { panel: 'top', left: { panel: 'top left' }, right: { panel: 'top right' } },
            bottom: { panel: 'bottom', left: { panel: 'bottom left' }, right: { panel: 'bottom right' } },
            main: { panel: 'main' },
            resizeHandle: 'handle',
            cellBackgroundPrefix: 'back-',
            cellForegroundPrefix: 'fore-',
            sortIcon: 'sort-icon'
        };
        scrollgrid.target = scrollgrid.vals.target;
        scrollgrid.refresh = jasmine.createSpy("refresh");
        scrollgrid.columns = [
            { width: 11 },
            { width: 13 },
            { width: 17 }
        ];
        scrollgrid.adapter = {
            sort: jasmine.createSpy("sort"),
            loadDataRange: jasmine.createSpy("loadDataRange").and.returnValue("getValue method")
        };
        scrollgrid.reporter = {
            error: jasmine.createSpy("error")
        };

        return scrollgrid;
    };

    return scrollgrid;

});
