define(function () {
    "use strict";
    var d3 = {};
    d3.shape = function (defaults) {
        var self = this;
        defaults = defaults || {};
        self.dataPoint = {};
        self.textValue = "";
        self.characterWidth = 10;
        self.attributes = {};
        self.styles = {};
        self.eventHandlers = {};
        self.children = {};
        self.bounds = {
            x: defaults.boundingBoxLeft,
            y: defaults.boundingBoxTop,
            width: defaults.boundingBoxWidth,
            height: defaults.boundingBoxHeight
        };
        self.nodeObject = {
            offsetHeight: defaults.nodeOffsetHeight || 1,
            offsetWidth: defaults.nodeOffsetWidth || 2,
            clientHeight: defaults.nodeClientHeight || 3,
            clientWidth: defaults.nodeClientWidth || 5,
            scrollLeft: defaults.nodeScrollLeft || 7,
            scrollTop: defaults.nodeScrollTop || 11,
            style: {},
            getBBox: jasmine.createSpy("getBBox").and.returnValue(self.bounds)
        };
        self.selections = {};
        self.attr = jasmine.createSpy("attr").and.callFake(function (key, value) {
            var returnVal = self;
            if (value === undefined) {
                returnVal = self.attributes[key];
            } else {
                self.attributes[key] = value;
            }
            return returnVal;
        });
        self.style = jasmine.createSpy("style").and.callFake(function (key, value) {
            var returnVal = self;
            if (value === undefined) {
                returnVal = self.styles[key];
            } else {
                self.styles[key] = value;
                self.nodeObject.style[key.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); })] = value;
            }
            return returnVal;
        });
        self.node = jasmine.createSpy("node").and.callFake(function () {
            return self.nodeObject;
        });
        self.on = jasmine.createSpy("on").and.callFake(function (key, value) {
            self.eventHandlers[key] = value;
            return self;
        });
        self.text = jasmine.createSpy("text").and.callFake(function (t) {
            var returnVal = self;
            if (t === undefined) {
                returnVal = self.textValue;
            } else {
                self.bounds.width = t.length * self.characterWidth;
                self.textValue = t;
            }
            return returnVal;
        });
        self.classed = jasmine.createSpy("classed");
        self.append = jasmine.createSpy("append").and.callFake(function (child) {
            var returnVal = new d3.shape(defaults);
            self.children[child] = self.children[child] || [];
            self.children[child].push(returnVal);
            return returnVal;
        });
        self.selectAll = jasmine.createSpy("selectAll").and.callFake(function (selector) {
            var returnVal = new d3.shape(defaults);
            self.selections[selector] = self.selections[selector] || [];
            self.selections[selector].push(returnVal);
            return returnVal;
        });
        self.remove = jasmine.createSpy("remove").and.returnValue(self);
        self.enter = jasmine.createSpy("enter").and.returnValue(self);
        self.exit = jasmine.createSpy("exit").and.returnValue(self);
        self.data = jasmine.createSpy("data").and.returnValue(self);
        self.datum = jasmine.createSpy("datum").and.callFake(function (arg) {
            var returnValue = self;
            if (arg) {
                self.dataPoint = arg;
            } else {
                returnValue = self.dataPoint;
            }
            return returnValue;
        });
        self.call = jasmine.createSpy("call").and.returnValue(self);
        self.each = jasmine.createSpy("each").and.returnValue(self);
        self.filter = jasmine.createSpy("filter").and.returnValue(self);
    };
    d3.drag = function () {
        var self = this;
        self.eventHandlers = {};
        self.origin = jasmine.createSpy("origin").and.returnValue(self);
        self.on = jasmine.createSpy("on").and.callFake(function (key, value) {
            self.eventHandlers[key] = value;
            return self;
        });
    };
    d3.init = function () {
        d3.returnValues = {
            select: new d3.shape()
        };
        d3.select = jasmine.createSpy("d3.select").and.returnValue(d3.returnValues.select);
        d3.event = {
            sourceEvent : {
                stopPropagation : jasmine.createSpy("stopPropagation")
            }
        };
        d3.behavior = {
            drag: jasmine.createSpy("drag").and.returnValue(new d3.drag())
        }
        window.d3 = d3;
    };
    return d3;
});
