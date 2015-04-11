(function () {
    "use strict";
    var mock = require("scrollgrid_mock");
    var d3 = {};
    d3.init = function () {
        d3.returnValues = {
            select: new mock.shape()
        };
        d3.select = jasmine.createSpy("d3.select").andReturn(d3.returnValues.select);
    };
    if (typeof define === "function" && define.amd) {
        define(d3);
    } else if (typeof module === "object" && module.exports) {
        module.exports = d3;
    } else {
        this.d3 = d3;
    }
}());
