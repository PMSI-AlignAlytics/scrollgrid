define(["d3"], function (d3) {
    "use strict";

    var scrollgrid = {};

    scrollgrid.vals = {
        gridAlignment: "top",
        target: "testTarget",
        columnResizer: "column resizer",
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
        boundingBoxHeight: 97
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
                    verticalAlignment: scrollgrid.vals.gridAlignment,
                    verticalScrollbarWidth: scrollgrid.vals.verticalScrollbarWidth,
                    horizontalScrollbarHeight: scrollgrid.vals.horizontalScrollbarHeight,
                    top: scrollgrid.vals.physTop,
                    left: scrollgrid.vals.physLeft,
                    right: scrollgrid.vals.physRight,
                    bottom: scrollgrid.vals.physBottom,
                    visibleInnerHeight: scrollgrid.vals.visibleInnerHeight,
                    visibleInnerWidth: scrollgrid.vals.visibleInnerWidth,
                    dragHandleWidth: scrollgrid.vals.dragHandleWidth,
                    totalInnerHeight: scrollgrid.vals.totalInnerHeight,
                    totalInnerWidth: scrollgrid.vals.totalInnerWidth
                },
                virtual: {
                    top: scrollgrid.vals.virtTop,
                    left: scrollgrid.vals.virtLeft,
                    right: scrollgrid.vals.virtRight,
                    bottom: scrollgrid.vals.virtBottom
                },
                calculatePhysicalBounds: jasmine.createSpy("calculatePhysicalBounds"),
                getExistingTextBound: jasmine.createSpy("getExistingTextBound").andReturn({ width: scrollgrid.vals.textBoundWidth })
            },
            dom: {
                parent: new d3.shape(scrollgrid.vals),
                container: new d3.shape(scrollgrid.vals),
                top: new scrollgrid.panel(),
                left: new scrollgrid.panel(),
                main: new scrollgrid.panel(),
                right: new scrollgrid.panel(),
                bottom: new scrollgrid.panel(),
                getTopMargin: jasmine.createSpy("getTopMargin").andReturn(scrollgrid.vals.topMargin),
                setAbsolutePosition: jasmine.createSpy("setAbsolutePosition"),
                setRelativePosition: jasmine.createSpy("setRelativePosition"),
                setScrollerSize: jasmine.createSpy("setScrollerSize"),
                populatePanel: jasmine.createSpy("populatePanel").andCallFake(function (css) {
                    var returnPanel = new scrollgrid.panel();
                    returnPanel.style = css;
                    return returnPanel;
                })
            },
            interaction: {
                autoResizeColumn: jasmine.createSpy("autoResizeColumn"),
                getColumnResizer: jasmine.createSpy("getColumnResizer").andReturn("column resizer"),
                columnResizeStart: jasmine.createSpy("columnResizeStart"),
                columnResizing: jasmine.createSpy("columnResizing"),
                columnResizeEnd: jasmine.createSpy("columnResizeEnd"),
                sortColumn: jasmine.createSpy("sortColumn")
            },
            render: {
                matchRule: jasmine.createSpy("matchRule").andReturn(true),
                draw: jasmine.createSpy("draw")
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
        scrollgrid.target = scrollgrid.vals.target;
        scrollgrid.refresh = jasmine.createSpy("refresh");
        scrollgrid.columns = [
            { width: 11 },
            { width: 13 },
            { width: 17 }
        ];
        scrollgrid.adapter = {
            sort: jasmine.createSpy("sort")
        };
        scrollgrid.reporter = {
            error: jasmine.createSpy("error")
        };
        return scrollgrid;
    };

    return scrollgrid;

});