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
        pushedTextBoundWidth: 213,
        pushedTextBoundHeight: 217
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
                physical: {
                    verticalScrollbarWidth: scrollgrid.vals.verticalScrollbarWidth,
                    horizontalScrollbarHeight: scrollgrid.vals.horizontalScrollbarHeight,
                    top: scrollgrid.vals.physTop,
                    left: scrollgrid.vals.physLeft,
                    right: scrollgrid.vals.physRight,
                    bottom: scrollgrid.vals.physBottom,
                    visibleInnerHeight: scrollgrid.vals.visibleInnerHeight,
                    visibleInnerWidth: scrollgrid.vals.visibleInnerWidth,
                    totalInnerHeight: scrollgrid.vals.totalInnerHeight,
                    totalInnerWidth: scrollgrid.vals.totalInnerWidth,
                    getRowHeight: jasmine.createSpy("getRowHeight").and.returnValue(scrollgrid.vals.physRowHeight),
                    initialiseColumns: jasmine.createSpy("initialiseColumns")
                },
                virtual: {
                    outerWidth: scrollgrid.vals.virtOuterWidth,
                    outerHeight: scrollgrid.vals.virtOuterHeight,
                    innerWidth: scrollgrid.vals.virtInnerWidth,
                    innerHeight: scrollgrid.vals.virtInnerHeight
                },
                calculatePhysicalBounds: jasmine.createSpy("calculatePhysicalBounds"),
                getExistingTextBound: jasmine.createSpy("getExistingTextBound").and.returnValue({ width: scrollgrid.vals.textBoundWidth }),
                pushTextBound: jasmine.createSpy("pushTextBound").and.returnValue({ width: scrollgrid.vals.pushedTextBoundWidth, height: scrollgrid.vals.pushedTextBoundHeight })
            },
            dom: {
                parent: new d3.shape(scrollgrid.vals),
                container: new d3.shape(scrollgrid.vals),
                top: new scrollgrid.panel(),
                left: new scrollgrid.panel(),
                main: new scrollgrid.panel(),
                right: new scrollgrid.panel(),
                bottom: new scrollgrid.panel(),
                getTopMargin: jasmine.createSpy("getTopMargin").and.returnValue(scrollgrid.vals.topMargin),
                setAbsolutePosition: jasmine.createSpy("setAbsolutePosition"),
                setRelativePosition: jasmine.createSpy("setRelativePosition"),
                setScrollerSize: jasmine.createSpy("setScrollerSize"),
                populatePanel: jasmine.createSpy("populatePanel").and.callFake(function (css) {
                    var returnPanel = new scrollgrid.panel();
                    returnPanel.style = css;
                    return returnPanel;
                }),
                layoutDOM: jasmine.createSpy("layoutDOM")
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
                getDataInBounds: jasmine.createSpy("getDataInBounds").and.returnValue("data in bounds"),
                renderRegion: jasmine.createSpy("renderRegion"),
                calculateCellAdjustments: jasmine.createSpy("calculateCellAdjustments").and.returnValue({
                    x: scrollgrid.vals.adjX,
                    y: scrollgrid.vals.adjY,
                    boxHeight: scrollgrid.vals.adjBoxHeight,
                    boxWidth: scrollgrid.vals.adjBoxWidth,
                    textHeight: scrollgrid.vals.adjTextHeight,
                    textWidth: scrollgrid.vals.adjTextWidth,
                    sortIcon:  scrollgrid.vals.sortIcon
                }),
                applyRules: jasmine.createSpy("applyRules"),
                getTextAnchor: jasmine.createSpy("getTextAnchor").and.returnValue("Text Anchor"),
                getTextPosition: jasmine.createSpy("getTextPosition").and.returnValue("Text Position"),
                renderText: jasmine.createSpy("renderText"),
                renderSortIcon: jasmine.createSpy("renderSortIcon"),
                cropText: jasmine.createSpy("cropText"),
                sortIcon: jasmine.createSpy("sortIcon")
            }
        };
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

        scrollgrid.dragHandleWidth = scrollgrid.vals.dragHandleWidth;
        scrollgrid.headerRows = scrollgrid.vals.virtTop;
        scrollgrid.headerColumns = scrollgrid.vals.virtLeft;
        scrollgrid.footerColumns = scrollgrid.vals.virtRight;
        scrollgrid.footerRows = scrollgrid.vals.virtBottom;
        scrollgrid.cellPadding = scrollgrid.vals.cellPadding;
        scrollgrid.verticalAlignment = scrollgrid.vals.gridAlignment;
        scrollgrid.cellWaitText = scrollgrid.vals.cellWaitText;
        scrollgrid.sortIconSize = scrollgrid.vals.sortIconSize;
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