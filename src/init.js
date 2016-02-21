(function (context, library) {
    "use strict";

    if (typeof exports === "object") {
        // CommonJS
        module.exports = library(require('d3'));
    } else {
        if (typeof define === "function" && define.amd) {
            // RequireJS | AMD
            define(["d3"], function (d3) {
                // publish scrollgrid to the global namespace for backwards compatibility
                // and define it as an AMD module
                context.Scrollgrid = library(d3);
                return context.Scrollgrid;
            });
        } else {
            // No AMD, expect d3 to exist in the current context and publish
            // dimple to the global namespace
            if (!context.d3) {
                if (console && console.warn) {
                    console.warn("scrollgrid requires d3 to run.  Are you missing a reference to the d3 library?");
                } else {
                    throw "scrollgrid requires d3 to run.  Are you missing a reference to the d3 library?";
                }
            } else {
                context.Scrollgrid = library(context.d3);
            }
        }
    }

}(this, function (d3) {
    "use strict";

    // Copyright: 2015 AlignAlytics
    // License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
    var Scrollgrid = function (options) {

        var self = this,
            int = self.internal,
            render = int.render,
            dom = int.dom;

        options = options || {};

        if (!options.target) {
            int.raise('target is a required field, please provide a selector string for the container. ' +
                'The selector string should be a d3/jquery selector identifying a single div.  E.g. "#tableContainer" ' +
                'where you have a div with id "tableContainer".');
        } else if (d3.select(options.target).length !== 1) {
            int.raise('target should be a d3/jquery selector identifying a single div.  E.g. "#tableContainer" ' +
                'where you have a div with id "tableContainer".  Please check that your selector is matching 1 and only 1 div.');
        } else {

            // Set the display options
            self.rowHeight = options.rowHeight || 30;
            self.dragHandleWidth  = options.dragHandleWidth || 8;
            self.headerRowHeight = options.headerRowHeight || self.rowHeight;
            self.footerRowHeight = options.footerRowHeight || self.rowHeight;
            self.defaultColumnWidth = options.defaultColumnWidth || 100;
            self.cellPadding = options.cellPadding || 6;
            self.verticalAlignment = options.verticalAlignment || 'top';

            // Set the interaction options
            self.allowColumnResizing = options.allowColumnResizing || true;
            self.allowSorting = options.allowSorting || true;

            // Set the number of header or footer rows or columns
            self.headerRows = options.headerRows || 0;
            self.footerRows = options.footerRows || 0;
            self.headerColumns = options.headerColumns || 0;
            self.footerColumns = options.footerColumns || 0;

            // Set a reference to the parent object
            self.target = options.target;

            render.setDefaultStyles.call(self);
            self.formatRules = options.formatRules || [];
            self.cellWaitText = options.cellWaitText || "loading...";
            self.sortIconSize = options.sortIconSize || 7;

            // Create the DOM shapes required
            dom.populateDOM.call(self);

            // Pass the data or adapter through to setData
            self.data(options.data || options.adapter);

            if (options.autoResize) {
                dom.setAutoResize.call(self);
            }
        }
    };

    Scrollgrid.init = function (target, options) {
        options.target = target;
        return new Scrollgrid(options);
    };

    // Build namespaces
    Scrollgrid.adapters = {};
    Scrollgrid.prototype.internal = {
        sizes: {
            virtual: {},
            physical: {}
        },
        interaction: {},
        dom: {},
        render: {}
    };

    return Scrollgrid;

}));
