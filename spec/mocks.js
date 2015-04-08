(function () {
    "use strict";

    var mocks = {};

    mocks.vals = {
        gridAlignment: "top",
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

    mocks.shape = function () {
        var self = this;
        self.attributes = {};
        self.styles = {};
        self.eventHandlers = {};
        self.nodeObject = {
            offsetHeight: mocks.vals.nodeOffsetHeight,
            offsetWidth: mocks.vals.nodeOffsetWidth,
            clientHeight: mocks.vals.nodeClientHeight,
            clientWidth: mocks.vals.nodeClientWidth
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
    };

    mocks.panel = function () {
        var self = this;
        self.svg = new mocks.shape();
        self.transform = new mocks.shape();
        self.content = new mocks.shape();
        self.left = {
            svg: new mocks.shape(),
            transform: new mocks.shape(),
            content: new mocks.shape()
        };
        self.right = {
            svg: new mocks.shape(),
            transform: new mocks.shape(),
            content: new mocks.shape()
        };
        self.viewport = new mocks.shape()
    };

    mocks.init = function () {
        mocks.scrollgrid = {
            internal: {
                sizes: {
                    physical: {
                        verticalAlignment: mocks.vals.gridAlignment,
                        top: mocks.vals.physTop,
                        left: mocks.vals.physLeft,
                        right: mocks.vals.physRight,
                        bottom: mocks.vals.physBottom,
                        visibleInnerHeight: mocks.vals.visibleInnerHeight,
                        visibleInnerWidth: mocks.vals.visibleInnerWidth,
                        dragHandleWidth: mocks.vals.dragHandleWidth
                    },
                    calculatePhysicalBounds: jasmine.createSpy("calculatePhysicalBounds")
                },
                dom: {
                    parent: new mocks.shape(),
                    container: new mocks.shape(),
                    top: new mocks.panel(),
                    left: new mocks.panel(),
                    main: new mocks.panel(),
                    right: new mocks.panel(),
                    bottom: new mocks.panel(),
                    getTopMargin: jasmine.createSpy("getTopMargin").andReturn(mocks.vals.topMargin),
                    setAbsolutePosition: jasmine.createSpy("setAbsolutePosition"),
                    setRelativePosition: jasmine.createSpy("setRelativePosition"),
                    setScrollerSize: jasmine.createSpy("setScrollerSize")
                },
                render: {
                    draw: jasmine.createSpy("draw")
                }
            }
        };
        return mocks;
    };

    if (typeof define === "function" && define.amd) {
        define(mocks);
    } else if (typeof module === "object" && module.exports) {
        module.exports = mocks;
    } else {
        this.mocks = mocks;
    }

}());