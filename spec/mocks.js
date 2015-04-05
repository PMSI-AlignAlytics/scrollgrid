(function () {
    "use strict";
    var mocks = {};
    mocks.init = function () {
        mocks.scrollgrid = {
            internal: {
                sizes: {
                    physical: {
                        verticalAlignment: "top"
                    }
                }
            }
        };
        mocks.node = {
            offsetHeight: 5
        };
        mocks.shape = {
            node: function () {
                return mocks.node;
            }
        };
        mocks.container = {
            height: 7
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