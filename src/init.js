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
            // scrollgrid to the global namespace
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

    // Copyright: 2017 AlignAlytics
    // License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
    var Scrollgrid = function (options) {

        var props,
            int = this.internal;

        options = options || {};

        if (!options.target) {
            int.raise('target is a required field, please provide a selector string for the container. ' +
                'The selector string should be a d3/jquery selector identifying a single div.  E.g. "#tableContainer" ' +
                'where you have a div with id "tableContainer".');
        } else if (d3.select(options.target).length !== 1) {
            int.raise('target should be a d3/jquery selector identifying a single div.  E.g. "#tableContainer" ' +
                'where you have a div with id "tableContainer".  Please check that your selector is matching 1 and only 1 div.');
        } else {

            // This will store the dom elements for this grid
            this.elements = {};
            // This will store the event handlers for this grid
            this.eventHandlers = [];
            // This will store the active properties for this grid
            this.properties = {};

            props = this.properties;

            // Set the display options
            props.rowHeight = options.rowHeight || 30;
            props.dragHandleWidth = options.dragHandleWidth || 8;
            props.headerRowHeight = options.headerRowHeight || props.rowHeight;
            props.footerRowHeight = options.footerRowHeight || props.rowHeight;
            props.defaultColumnWidth = options.defaultColumnWidth || 100;
            props.cellPadding = options.cellPadding || 6;

            // Set the interaction options
            props.allowColumnResizing = options.allowColumnResizing || true;
            props.allowSorting = options.allowSorting || true;

            // Set the number of header or footer rows or columns
            props.virtualTop = options.headerRows || 0;
            props.virtualBottom = options.footerRows || 0;
            props.virtualLeft = options.headerColumns || 0;
            props.virtualRight = options.footerColumns || 0;

            // Set a reference to the parent object
            this.target = options.target;

            int.render.setDefaultStyles.call(this);

            props.formatRules = options.formatRules || [];
            props.cellWaitText = options.cellWaitText || "loading...";
            props.sortIconSize = options.sortIconSize || 7;

            // Create the DOM shapes required
            int.dom.populateDOM.call(this);

            // Pass the data or adapter through to setData
            this.data(options.data || options.adapter);

            if (options.autoResize) {
                int.dom.setAutoResize.call(this);
            }
        }
    };

    Scrollgrid.init = function (target, options) {
        options = options || {};
        options.target = target;
        var scrollgrid = new Scrollgrid(options);
        return scrollgrid;
    };

    // Build namespaces
    Scrollgrid.adapters = {};
    Scrollgrid.prototype.internal = {
        sizes: {},
        events: {},
        interaction: {},
        dom: {},
        render: {}
    };

    return Scrollgrid;

}));
