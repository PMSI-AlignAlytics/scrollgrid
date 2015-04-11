(function () {
    "use strict";

    var scrollgrid = {};

    scrollgrid.vals = {
        gridAlignment: "top",
        target: "testTarget",
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
        nodeClientHeight: 31,
        nodeClientWidth: 37,
        dragHandleWidth: 41
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
        self.attr = function (key, value) {
            self.attributes[key] = value;
            return self;
        };
        self.style = function (key, value) {
            self.styles[key] = value;
            return self;
        };
        self.node = function () {
            return self.nodeObject;
        };
        self.on = function (key, value) {
            self.eventHandlers[key] = value;
            return self;
        };
        self.append = function (child) {
            var returnVal = new scrollgrid.shape();
            self.children[child] = self.children[child] || [];
            self.children[child].push(returnVal);
            return returnVal;
        }
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
        self.viewport = new scrollgrid.shape()
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
                    dragHandleWidth: scrollgrid.vals.dragHandleWidth
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