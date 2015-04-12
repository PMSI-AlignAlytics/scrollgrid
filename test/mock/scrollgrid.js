(function () {
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
        totalInnerWidth: 43
    };

    scrollgrid.shape = function () {
        var self = this;
        self.attributes = {};
        self.styles = {};
        self.eventHandlers = {};
        self.children = {};
        self.nodeObject = {
            offsetHeight: scrollgrid.vals.nodeOffsetHeight,
            offsetWidth: scrollgrid.vals.nodeOffsetWidth,
            clientHeight: scrollgrid.vals.nodeClientHeight,
            clientWidth: scrollgrid.vals.nodeClientWidth
        };
        self.selections = {};
        self.attr = jasmine.createSpy("attr").andCallFake(function (key, value) {
            self.attributes[key] = value;
            return self;
        });
        self.style = jasmine.createSpy("style").andCallFake(function (key, value) {
            self.styles[key] = value;
            return self;
        });
        self.node = jasmine.createSpy("node").andCallFake(function () {
            return self.nodeObject;
        });
        self.on = jasmine.createSpy("on").andCallFake(function (key, value) {
            self.eventHandlers[key] = value;
            return self;
        });
        self.append = jasmine.createSpy("append").andCallFake(function (child) {
            var returnVal = new scrollgrid.shape();
            self.children[child] = self.children[child] || [];
            self.children[child].push(returnVal);
            return returnVal;
        });
        self.selectAll = jasmine.createSpy("selectAll").andCallFake(function (selector) {
            var returnVal = new scrollgrid.shape();
            self.selections[selector] = self.selections[selector] || [];
            self.selections[selector].push(returnVal);
            return returnVal;
        });
        self.remove = jasmine.createSpy("remove").andReturn(self);
        self.enter = jasmine.createSpy("enter").andReturn(self);
        self.data = jasmine.createSpy("data").andReturn(self);
        self.call = jasmine.createSpy("call").andReturn(self);
    };

    scrollgrid.panel = function () {
        var self = this;
        self.style = null;
        self.svg = new scrollgrid.shape();
        self.transform = new scrollgrid.shape();
        self.content = new scrollgrid.shape();
        self.left = {
            svg: new scrollgrid.shape(),
            transform: new scrollgrid.shape(),
            content: new scrollgrid.shape()
        };
        self.right = {
            svg: new scrollgrid.shape(),
            transform: new scrollgrid.shape(),
            content: new scrollgrid.shape()
        };
        self.viewport = new scrollgrid.shape();
        self.scroller = new scrollgrid.shape();
    };

    scrollgrid.init = function () {
        scrollgrid.internal = {
            sizes: {
                physical: {
                    verticalAlignment: scrollgrid.vals.gridAlignment,
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
                calculatePhysicalBounds: jasmine.createSpy("calculatePhysicalBounds")
            },
            dom: {
                parent: new scrollgrid.shape(),
                container: new scrollgrid.shape(),
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
                getColumnResizer: jasmine.createSpy("getColumnResizer").andReturn("column resizer")
            },
            render: {
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
        return scrollgrid;
    };

    if (typeof define === "function" && define.amd) {
        define(scrollgrid);
    } else if (typeof module === "object" && module.exports) {
        module.exports = scrollgrid;
    } else {
        this.scrollgrid = scrollgrid;
    }

}());