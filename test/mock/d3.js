define(function () {
    "use strict";
    var d3 = {};
    d3.shape = function (defaults) {
        var self = this;
        defaults = defaults || {};
        self.attributes = {};
        self.styles = {};
        self.eventHandlers = {};
        self.children = {};
        self.nodeObject = {
            offsetHeight: defaults.nodeOffsetHeight || 1,
            offsetWidth: defaults.nodeOffsetWidth || 2,
            clientHeight: defaults.nodeClientHeight || 3,
            clientWidth: defaults.nodeClientWidth || 5
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
        self.classed = jasmine.createSpy("classed");
        self.append = jasmine.createSpy("append").andCallFake(function (child) {
            var returnVal = new d3.shape();
            self.children[child] = self.children[child] || [];
            self.children[child].push(returnVal);
            return returnVal;
        });
        self.selectAll = jasmine.createSpy("selectAll").andCallFake(function (selector) {
            var returnVal = new d3.shape();
            self.selections[selector] = self.selections[selector] || [];
            self.selections[selector].push(returnVal);
            return returnVal;
        });
        self.remove = jasmine.createSpy("remove").andReturn(self);
        self.enter = jasmine.createSpy("enter").andReturn(self);
        self.exit = jasmine.createSpy("exit").andReturn(self);
        self.data = jasmine.createSpy("data").andReturn(self);
        self.call = jasmine.createSpy("call").andReturn(self);
    };
    d3.init = function () {
        d3.returnValues = {
            select: new d3.shape()
        };
        d3.select = jasmine.createSpy("d3.select").andReturn(d3.returnValues.select);
        d3.event = {
            sourceEvent : {
                stopPropagation : jasmine.createSpy("stopPropagation")
            }
        };
    };
    return d3;
});
