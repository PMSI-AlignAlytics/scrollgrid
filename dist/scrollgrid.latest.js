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


// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/dom/getTopMargin.js
Scrollgrid.prototype.internal.dom.getTopMargin = function (containerSize, parent) {
    "use strict";

    var props = this.properties,
        topMargin = 0,
        parentHeight;

    if (containerSize && containerSize.height && parent) {
        if (props.verticalAlignment === 'middle') {
            // This is duplicated in the conditions rather than outside the if because
            // it is costly and will not be used for most tables
            parentHeight = parent.node().offsetHeight;
            topMargin = ((parentHeight - containerSize.height) / 2);
        } else if (props.verticalAlignment === 'bottom') {
            // This is duplicated in the conditions rather than outside the if because
            // it is costly and will not be used for most tables
            parentHeight = parent.node().offsetHeight;
            topMargin = parentHeight - containerSize.height - 1;
        }
    }

    return topMargin;

};


// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/dom/layoutDOM.js
Scrollgrid.prototype.internal.dom.layoutDOM = function (fixedSize) {
    "use strict";

    var self = this,
        int = self.internal,
        props = self.properties,
        elems = self.elements,
        topMargin;

    // This is required so content can size relative to it
    elems.parent
        .style('position', 'relative');

    topMargin = int.dom.getTopMargin.call(self, fixedSize, elems.parent);

    elems.container
        .style('position', 'relative')
        .style('width', (fixedSize && fixedSize.width ? fixedSize.width + 'px' : '100%'))
        .style('height', (fixedSize && fixedSize.height ? (fixedSize.height) + 'px' : '100%'))
        .style('padding-top', topMargin + 'px')
        .style('font-size', 0);

    // If the fixed size is too great, reset to 100%, this gives the effect of
    // pinning the edges when they reach the limit of available space
    if (elems.container.node().offsetWidth > elems.parent.node().offsetWidth) {
        elems.container.style('width', '100%');
    }
    if (elems.container.node().offsetHeight > elems.parent.node().offsetHeight) {
        elems.container
            .style('margin-top', '0px')
            .style('height', '100%');
    }

    // Set the physical dimensions of the various data elements in memory
    int.sizes.calculatePhysicalBounds.call(self, topMargin);

    // Set all panels
    int.dom.setAbsolutePosition.call(self, elems.left.svg, 0, props.physicalTop + topMargin, props.physicalLeft, props.physicalVisibleInnerHeight);
    int.dom.setRelativePosition.call(self, elems.top.svg, props.physicalLeft, props.physicalVisibleInnerWidth, props.physicalTop, 'hidden');
    int.dom.setRelativePosition.call(self, elems.main.viewport, props.physicalLeft, props.physicalVisibleInnerWidth, props.physicalVisibleInnerHeight, 'auto');
    int.dom.setAbsolutePosition.call(self, elems.right.svg, props.physicalLeft + props.physicalVisibleInnerWidth, props.physicalTop + topMargin, props.physicalRight, props.physicalVisibleInnerHeight);
    int.dom.setRelativePosition.call(self, elems.bottom.svg, props.physicalLeft, props.physicalVisibleInnerWidth, props.physicalBottom, 'hidden');
    int.dom.setAbsolutePosition.call(self, elems.top.left.svg, 0, topMargin, props.physicalLeft + props.dragHandleWidth / 2, props.physicalTop);
    int.dom.setAbsolutePosition.call(self, elems.top.right.svg, props.physicalLeft + props.physicalVisibleInnerWidth - props.dragHandleWidth / 2, topMargin, props.physicalRight + props.dragHandleWidth / 2, props.physicalTop);
    int.dom.setAbsolutePosition.call(self, elems.bottom.left.svg, 0, props.physicalTop + props.physicalVisibleInnerHeight + topMargin, props.physicalLeft, props.physicalBottom);
    int.dom.setAbsolutePosition.call(self, elems.bottom.right.svg, props.physicalLeft + props.physicalVisibleInnerWidth, props.physicalTop + props.physicalVisibleInnerHeight + topMargin,  props.physicalRight, props.physicalBottom);
    int.dom.setAbsolutePosition.call(self, elems.main.svg, props.physicalLeft, props.physicalTop + topMargin, props.physicalVisibleInnerWidth, props.physicalVisibleInnerHeight);

    // Style all panels
    int.dom.stylePanels.call(this, this.style);

    // Top right panel needs a small offset for the handle
    elems.top.right.transform.attr('transform', 'translate(' + props.dragHandleWidth / 2 + ', 0)');

    // Invoke draw on scroll
    elems.main.viewport.on('scroll', function () { int.render.draw.call(self, false, false); });

    // Invoke eventHandlers of the target group behind the main viewport
    int.dom.redirectViewportEvents.call(self);

    // Set the scrollable area
    int.dom.setScrollerSize.call(self);

    // Get the scroll bar bounds
    props.verticalScrollbarWidth = elems.main.viewport.node().offsetWidth - elems.main.viewport.node().clientWidth;
    props.horizontalScrollbarHeight = elems.main.viewport.node().offsetHeight - elems.main.viewport.node().clientHeight;

};


// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/dom/populateDOM.js
Scrollgrid.prototype.internal.dom.populateDOM = function () {
    "use strict";

    var int = this.internal,
        elems = this.elements;

    // Get the parent container
    elems.parent = d3.select(this.target);
    // Add a container to the target which will house everything
    elems.container = elems.parent.append('div');

    // Populate the 5 regions of the control
    elems.left = int.dom.populatePanel.call(this);
    elems.top = int.dom.populatePanel.call(this);
    elems.top.left = int.dom.populatePanel.call(this);
    elems.top.right = int.dom.populatePanel.call(this);
    elems.main = int.dom.populatePanel.call(this);

    // Add the viewport which is the fixed area with scroll bars
    elems.main.viewport = elems.container.append('div');

    elems.right = int.dom.populatePanel.call(this);
    elems.bottom = int.dom.populatePanel.call(this);
    elems.bottom.left = int.dom.populatePanel.call(this);
    elems.bottom.right = int.dom.populatePanel.call(this);

    // The scroller is going to be as large as the virtual size of
    // the data (as if it had all been rendered) this is so that
    // the scroll bars behave as expected
    elems.main.scroller = elems.main.viewport.append('div');

};


// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/dom/populatePanel.js
Scrollgrid.prototype.internal.dom.populatePanel = function () {
    "use strict";

    var elems = this.elements,
        panel = {};

    panel.svg = elems.container.append('svg');
    panel.transform = panel.svg.append('g');
    panel.content = panel.transform.append('g');

    return panel;
};


// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/dom/redirectViewportEvents.js
Scrollgrid.prototype.internal.dom.redirectViewportEvents = function () {
    "use strict";

    var self = this,
        elems = self.elements,
        j,
        getRedirectHandler;

    getRedirectHandler = function (elems, eventType) {
        return function () {
            var mouse,
                svg,
                rpos,
                list,
                target,
                g,
                targetEventHandler;

            mouse = d3.mouse(this);

            svg = elems.main.svg.node();
            rpos = svg.createSVGRect();
            rpos.x = mouse[0];
            rpos.y = mouse[1];
            rpos.width = 1;
            rpos.height = 1;

            list = svg.getIntersectionList(rpos, null);
            if (list.length) {
                target = list[0].parentNode;
                g = d3.select(target);
                targetEventHandler = g.on(eventType);
                if (targetEventHandler) {
                    targetEventHandler.call(target, g.datum());
                }
            }
        };
    };

    for (j = 0; j < this.eventHandlers.length; j += 1) {
        elems.main.viewport.on(this.eventHandlers[j].type, getRedirectHandler(elems, this.eventHandlers[j].type));
    }
};


// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/dom/setAbsolutePosition.js
Scrollgrid.prototype.internal.dom.setAbsolutePosition = function (element, x, y, width, height) {
    "use strict";

    return element
        .style('position', 'absolute')
        .style('overflow', 'hidden')
        .style('left', x + 'px')
        .style('top', y + 'px')
        .style('width', width + 'px')
        .style('height', height + 'px');
};

// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/dom/setAutoResize.js
Scrollgrid.prototype.internal.dom.setAutoResize = function () {
    "use strict";

    // Pick up any existing resize handlers
    var self = this,
        existingHandler = window.onresize;

    // Add a new handler
    window.onresize = function () {
        // Invoke the non-scrollgrid resize handlers
        if (existingHandler) {
            existingHandler();
        }
        // Call the instantiated layout refresh
        self.refresh(true);
    };

};

// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/dom/setRelativePosition.js
Scrollgrid.prototype.internal.dom.setRelativePosition = function (element, x, width, height, overflow) {
    "use strict";

    return element
        .style('overflow', overflow)
        .style('position', 'relative')
        .style('margin-left', x + 'px')
        .style('width', width + 'px')
        .style('height', height + 'px');
};

// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/dom/setScrollerSize.js
Scrollgrid.prototype.internal.dom.setScrollerSize = function () {
    "use strict";

    var elems = this.elements,
        props = this.properties;

    elems.main.scroller
        .style('width', props.physicalTotalInnerWidth + 'px')
        .style('height', props.physicalTotalInnerHeight + 'px');

};


// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/dom/stylePanels.js
Scrollgrid.prototype.internal.dom.stylePanels = function (style) {
    "use strict";

    var elems = this.elements;

    this.style = style || this.style;

    elems.left.svg.attr('class', this.style.left.panel);
    elems.top.svg.attr('class', this.style.top.panel);
    elems.right.svg.attr('class', this.style.right.panel);
    elems.bottom.svg.attr('class', this.style.bottom.panel);
    elems.top.left.svg.attr('class', this.style.top.left.panel);
    elems.top.right.svg.attr('class', this.style.top.right.panel);
    elems.bottom.left.svg.attr('class', this.style.bottom.left.panel);
    elems.bottom.right.svg.attr('class', this.style.bottom.right.panel);
    elems.main.svg.attr('class', this.style.main.panel);

};


// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/render/renderBackground.js
Scrollgrid.prototype.internal.events.addEventHandlers = function (g, viewData) {
    "use strict";

    var i;

    g.attr("data-row", viewData.rowIndex)
        .attr("data-col", viewData.columnIndex);

    for (i = 0; i < this.eventHandlers.length; i += 1) {
        g.on(this.eventHandlers[i].type, this.eventHandlers[i].listener, this.eventHandlers[i].capture);
    }
};


// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/interaction/addResizeHandles.js
Scrollgrid.prototype.internal.interaction.addResizeHandles = function (target, bounds, startX) {
    "use strict";

    var self = this,
        props = this.properties,
        style = this.style,
        int = this.internal,
        runningTotal = startX || 0;

    target.content
        .selectAll(".sg-no-style--handle-selector")
        .remove();

    target.content
        .selectAll(".sg-no-style--handle-selector")
        .data(this.columns.slice(bounds.left, bounds.right))
        .enter()
        .append("rect")
        .attr("class", "sg-no-style--handle-selector " + style.resizeHandle)
        .attr("transform", "translate(" + (-1 * props.dragHandleWidth / 2) + ", 0)")
        .attr("x", function (c) {
            runningTotal += c.width;
            c.x = runningTotal;
            return c.x;
        })
        .attr("y", 0)
        .attr("width", props.dragHandleWidth)
        .attr("height", props.physicalTop)
        .on("dblclick", function (c) { int.interaction.autoResizeColumn.call(self, c); })
        .call(int.interaction.getColumnResizer.call(self));

};


// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/interaction/addSortButtons.js
Scrollgrid.prototype.internal.interaction.addSortButtons = function (g, viewData) {
    "use strict";

    var self = this,
        int = this.internal;

    g.append("rect")
        .attr("width", viewData.boxWidth)
        .attr("height", viewData.boxHeight)
        .style("opacity", 0)
        .style("cursor", "pointer")
        .on("click", function () { return int.interaction.sortColumn.call(self, viewData.columnIndex, true); });

};


// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/interaction/autoResizeColumn.js
Scrollgrid.prototype.internal.interaction.autoResizeColumn = function (column) {
    "use strict";

    var int = this.internal,
        elems = this.elements,
        panels = [elems.top.left, elems.top, elems.top.right, elems.left, elems.main, elems.right, elems.bottom.left, elems.bottom, elems.bottom.right],
        i;

    // Do not allow the width to be less than 0
    column.width = 0;

    // Get the widest from the various panels (some panels may not apply to the given cell but those panels will return zero anyway)
    for (i = 0; i < panels.length; i += 1) {
        column.width = Math.max(column.width, int.sizes.getExistingTextBound.call(this, panels[i].svg, column.index).width);
    }

    // Update the container size because the width will have changed
    this.refresh(true);

};


// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/interaction/columnResizeEnd.js
Scrollgrid.prototype.internal.interaction.columnResizeEnd = function (shape) {
    "use strict";

    shape.classed('dragging', false);

};

// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/interaction/columnResizeStart.js
Scrollgrid.prototype.internal.interaction.columnResizeStart = function (shape) {
    "use strict";

    d3.event.sourceEvent.stopPropagation();
    shape.classed('dragging', true);

};

// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/interaction/columnResizing.js
Scrollgrid.prototype.internal.interaction.columnResizing = function (shape, column) {
    "use strict";

    // Some resize handle should be inverted
    column.width -= column.x - d3.event.x;

    // Update the x coordinate for the drag
    column.x = d3.event.x;

    // If the column width is below 0 reset it, negative widths cause problems
    if (column.width < 0) {
        column.width = 0;
    }

    // Move the drag handle itself
    shape.attr('x', column.x);

    // Redraw
    this.refresh(true);

};

// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/interaction/defaultComparer.js
Scrollgrid.prototype.internal.interaction.defaultComparer = function (a, b) {
    "use strict";

    var order;

    if (isNaN(a) || isNaN(b)) {
        order = (new Date(a)) - (new Date(b));
    } else {
        order = parseFloat(a) - parseFloat(b);
    }
    if (isNaN(order)) {
        order = (a < b ? -1 : (a > b ? 1 : 0));
    }

    return order;

};

// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/interaction/getColumnResizer.js
Scrollgrid.prototype.internal.interaction.getColumnResizer = function () {
    "use strict";

    var int = this.internal,
        self = this;

    return d3.behavior.drag()
        .origin(function (c) { return c; })
        .on('dragstart', function () { int.interaction.columnResizeStart.call(self, d3.select(this)); })
        .on('drag', function (c) { int.interaction.columnResizing.call(self, d3.select(this), c); })
        .on('dragend', function () { int.interaction.columnResizeEnd.call(self, d3.select(this)); });

};


// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/interaction/sortColumn.js
Scrollgrid.prototype.internal.interaction.sortColumn = function (index, toggle) {
    "use strict";

    var int = this.internal,
        props = this.properties,
        c;

    // Clear existing sorts and set the new one
    for (c = 0; c < this.columns.length; c += 1) {
        if (c !== index) {
            delete this.columns[c].sort;
        } else if (toggle) {
            this.columns[c].sort = (this.columns[c].sort === 'desc' ? 'asc' : 'desc');
        }
    }

    // Instruct the adapter to perform a sort
    this.adapter.sort(index, props.virtualTop, props.virtualBottom, this.columns[index].sort === 'desc', this.columns[index].compareFunction || int.interaction.defaultComparer);
    this.refresh(false);

};


// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/raise.js
Scrollgrid.prototype.internal.raise = function (err) {
    "use strict";

    var log = this.reporter || console;
    if (log && log.error) {
        log.error(err);
    } else {
        throw err;
    }

};

// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/render/applyRules.js
Scrollgrid.prototype.internal.render.applyRules = function (data) {
    "use strict";

    var int = this.internal,
        props = this.properties,
        rule,
        key,
        ruleDefinition = {},
        i,
        k,
        r,
        c;

    if (props.formatRules) {

        // Iterate the focus data
        for (i = 0; i < data.length; i += 1) {

            ruleDefinition = {};

            // Rules use 1 based indices for rows and columns, this is because they use negative
            // notation to refer to elements from the end e.g. row: -1 = last row.  This would be
            // inconsistent if 0 was the first row.
            r = data[i].rowIndex + 1;
            c = data[i].columnIndex + 1;

            for (k = 0; k < props.formatRules.length; k += 1) {
                rule = props.formatRules[k];
                if (int.render.matchRule.call(this, rule.row, r, props.virtualOuterHeight) && int.render.matchRule.call(this, rule.column, c, props.virtualOuterWidth)) {
                    // Iterate the rule properties and apply them to the object
                    for (key in rule) {
                        if (rule.hasOwnProperty(key) && key !== "row" && key !== "column") {
                            ruleDefinition[key] = rule[key];
                        }
                    }
                }
            }

            // Apply the combined rules
            if (ruleDefinition.formatter) {
                data[i].formatter = ruleDefinition.formatter;
            }
            if (ruleDefinition.alignment) {
                data[i].alignment = ruleDefinition.alignment;
            }
            if (ruleDefinition.cellPadding) {
                data[i].cellPadding = ruleDefinition.cellPadding;
            }
            if (ruleDefinition.backgroundStyle) {
                data[i].backgroundStyle += " " + ruleDefinition.backgroundStyle;
            }
            if (ruleDefinition.foregroundStyle) {
                data[i].foregroundStyle += " " + ruleDefinition.foregroundStyle;
            }
            if (ruleDefinition.renderBackground) {
                data[i].renderBackground = ruleDefinition.renderBackground;
            }
            if (ruleDefinition.renderBetween) {
                data[i].renderBetween = ruleDefinition.renderBetween;
            }
            if (ruleDefinition.renderForeground) {
                data[i].renderForeground = ruleDefinition.renderForeground;
            }
        }
    }
};


// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/render/calculateCellAdjustments.js
Scrollgrid.prototype.internal.render.calculateCellAdjustments = function (row, column) {
    "use strict";

    var props = this.properties,
        extension = {
            x: 0,
            y: 0,
            boxHeight: 0,
            boxWidth: 0,
            textHeight: 0,
            textWidth: 0
        };

    // If the cell is a columns header or footer and the column is the last in the dataset we need to extend the width
    // to remove the gap for the scrollbar
    if ((row < props.virtualTop || row >= props.virtualOuterHeight - props.virtualBottom) && column === props.virtualOuterWidth - props.virtualRight - 1) {
        extension.boxWidth += props.verticalScrollbarWidth;
    }
    // If the cell is a row header or footer and the row is the last in the dataset we need to extend the height to
    // remove the gap for the scrollbar
    if ((column < props.virtualLeft || column >= props.virtualOuterWidth - props.virtualRight) && row === props.virtualOuterHeight - props.virtualBottom - 1) {
        extension.boxHeight += props.horizontalScrollbarHeight;
    }
    // If the cell is the last column header reduce height by 1 to show the bottom gridline
    if (row === props.virtualTop - 1) {
        extension.boxHeight -= 1;
    }
    // If the cell is the first row after a column header and there is a column header extend it up to hide the top line
    if (row === props.virtualTop && row > 0) {
        extension.boxHeight += 1;
        extension.y -= 1;
    }
    // If the cell is the last row header reduce width by 1 to show the right gridline
    if (column === props.virtualLeft - 1) {
        extension.boxWidth -= 1;
    }
    // If the cell is the first column after a row header and there is a row header extend it left to hide the top line
    if (column === props.virtualLeft && column > 0) {
        extension.boxWidth += 1;
        extension.x -= 1;
    }
    // If the cell is in the last row shrink it to show the bottom line
    if (row === props.virtualOuterHeight - 1) {
        extension.boxHeight -= 1;
    }
    // If the cell is in the last column shrink it to show the right line
    if (column === props.virtualOuterWidth - 1) {
        extension.boxWidth -= 1;
    }
    // If the cell is in the last row of the column headers and the column is being sorted
    if (row === props.virtualTop - 1) {
        // Set the sort icon to that of the column
        extension.sortIcon = (this.columns[column] ? this.columns[column].sort : undefined);
    }

    return extension;

};


// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/render/cropText.js
Scrollgrid.prototype.internal.render.cropText = function (textShape, width) {
    "use strict";

    var textWidth = textShape.node().getBBox().width,
        text = textShape.text(),
        avgChar = textWidth / text.length,
        // Deliberately overestimate to start with and reduce toward target
        chars = Math.ceil(width / avgChar) + 1;

    // Store the unabbreviated text
    textShape.datum().originalText = text;

    // Handle cases where chars is < 0 (negative width) so it never enters while loop
    if (chars <= 0) {
        textShape.text("");
    }

    while (textWidth > width && chars >= 0) {
        if (chars === 0) {
            textShape.text("");
        } else {
            textShape.text(text.substring(0, chars));
        }
        textWidth = textShape.node().getBBox().width;
        chars -= 1;
    }

};

// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/render/draw.js
Scrollgrid.prototype.internal.render.draw = function (clearCache, reviewSize) {
    "use strict";

    var int = this.internal,
        props = this.properties,
        elems = this.elements,
        physicalViewArea = int.render.getVisibleRegion.call(this),
        viewArea = int.render.getDataBounds.call(this, physicalViewArea),
        totalWidth,
        totalHeight,
        fixedSize = {},
        p = viewArea.physical,
        v = viewArea.virtual,
        y = {
            top: { top: 0, bottom: props.virtualTop },
            middle: { top: props.virtualTop + v.top, bottom: props.virtualTop + v.bottom },
            bottom: { top: props.virtualOuterHeight - props.virtualBottom, bottom: props.virtualOuterHeight }
        },
        x = {
            left: { left: 0, right: props.virtualLeft },
            middle: { left: props.virtualLeft + v.left, right: props.virtualLeft + v.right },
            right: { left: props.virtualOuterWidth - props.virtualRight, right: props.virtualOuterWidth }
        };

    // Draw the separate regions
    int.render.renderRegion.call(this, elems.top.left, {}, x.left, y.top, clearCache);
    int.render.renderRegion.call(this, elems.top, { x: p.x }, x.middle, y.top, clearCache);
    int.render.renderRegion.call(this, elems.top.right, {}, x.right, y.top, clearCache);
    int.render.renderRegion.call(this, elems.left, { y: p.y }, x.left, y.middle, clearCache);
    int.render.renderRegion.call(this, elems.main, { x: p.x, y: p.y }, x.middle, y.middle, clearCache);
    int.render.renderRegion.call(this, elems.right, { y: p.y }, x.right, y.middle, clearCache);
    int.render.renderRegion.call(this, elems.bottom.left, {}, x.left, y.bottom, clearCache);
    int.render.renderRegion.call(this, elems.bottom, { x: p.x }, x.middle, y.bottom, clearCache);
    int.render.renderRegion.call(this, elems.bottom.right, {}, x.right, y.bottom, clearCache);

    // Add resize handles
    if (props.allowColumnResizing) {
        int.interaction.addResizeHandles.call(this, elems.top.left, x.left);
        int.interaction.addResizeHandles.call(this, elems.top, x.middle, p.x);
        int.interaction.addResizeHandles.call(this, elems.top.right, x.right);
    }

    // Calculate if the rendering means that the width of the
    // whole table should change and layout accordingly, this only runs if the flag is set
    // this is because it can be slow to run when scrolling
    if (reviewSize) {
        totalWidth = (props.physicalLeft + props.physicalTotalInnerWidth + props.physicalRight + props.verticalScrollbarWidth);
        fixedSize.width = (totalWidth < elems.parent.node().offsetWidth ? totalWidth : null);
        totalHeight = (props.physicalTop + props.physicalTotalInnerHeight + props.physicalBottom + props.horizontalScrollbarHeight);
        fixedSize.height = (totalHeight < elems.parent.node().offsetHeight ? totalHeight : null);
        int.dom.layoutDOM.call(this, fixedSize);
    }

};


// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/render/getClipPath.js
Scrollgrid.prototype.internal.render.getClipPath = function (viewData) {
    "use strict";
    var right = (viewData.textWidth - viewData.cellPadding - (!(!viewData.sortIcon || viewData.sortIcon === 'none') ? this.properties.sortIconSize + viewData.cellPadding : 0)) + "px",
        bottom = (viewData.textHeight - viewData.cellPadding) + "px";
    return "polygon(0px 0px, " + right + " 0px, " + right + " " + bottom + ", 0px " + bottom + ")";
};


// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/render/getDataBounds.js
Scrollgrid.prototype.internal.render.getDataBounds = function (physicalViewArea) {
    "use strict";

    var i,
        props = this.properties,
        cols = this.columns,
        runningX = 0,
        columnWidth,
        left,
        right,
        bounds = {
            physical: {
                x: 0,
                y: 0
            },
            virtual: {
                top: Math.max(Math.floor(props.virtualInnerHeight * (physicalViewArea.top / props.physicalTotalInnerHeight) - 1), 0),
                bottom: Math.min(Math.ceil(props.virtualInnerHeight * (physicalViewArea.bottom / props.physicalTotalInnerHeight) + 1), props.virtualInnerHeight)
            }
        };

    bounds.physical.y = bounds.virtual.top * props.rowHeight - physicalViewArea.top;
    for (i = 0; i < props.virtualInnerWidth; i += 1) {
        columnWidth = cols[i + props.virtualLeft].width;
        if (left === undefined && (i === props.virtualInnerWidth - 1 || runningX + columnWidth > physicalViewArea.left)) {
            left = i;
            bounds.physical.x = runningX - physicalViewArea.left;
        }
        if (right === undefined && (i === props.virtualInnerWidth - 1 || runningX + columnWidth > physicalViewArea.right)) {
            right = i + 1;
            break;
        }
        runningX += columnWidth;
    }

    bounds.virtual.left = Math.max(Math.floor(left), 0);
    bounds.virtual.right = Math.min(Math.ceil(right + 1), props.virtualInnerWidth);

    return bounds;

};


// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/render/getDataInBounds.js
Scrollgrid.prototype.internal.render.getDataInBounds = function (viewArea) {
    "use strict";

    var i, r, c, x, vc, vr = 0,
        int = this.internal,
        props = this.properties,
        cols = this.columns,
        column,
        runningX,
        runningY,
        rowHeight = 0,
        visibleData = [],
        adjustments;

    runningY = viewArea.startY;

    for (r = viewArea.top || 0, i = 0; r < viewArea.bottom || 0; r += 1) {
        rowHeight = int.sizes.getRowHeight.call(this, r);
        runningX = viewArea.startX || 0;
        vc = 0;
        for (c = viewArea.left || 0; c < viewArea.right || 0; c += 1, i += 1) {
            // Get any measurement modifiers based on cell position
            adjustments = int.render.calculateCellAdjustments.call(this, r, c);
            // Get the column definition
            column = cols[c];
            // Get the x position of the cell
            x = Math.floor(runningX) + adjustments.x + 0.5;
            // Using direct assignment for speed
            visibleData[i] = {
                x: x,
                y: Math.floor(runningY) + adjustments.y + 0.5,
                visibleRow: vr,
                visibleColumn: vc,
                boxWidth: Math.ceil(column.width) + adjustments.boxWidth,
                boxHeight: Math.ceil(rowHeight) + adjustments.boxHeight,
                textWidth: Math.ceil(column.width) + adjustments.textWidth,
                textHeight: Math.ceil(rowHeight) + adjustments.textHeight,
                backgroundStyle: this.style.cellBackgroundPrefix + 'r' + (r + 1) + ' ' + this.style.cellBackgroundPrefix + 'c' + (c + 1),
                foregroundStyle: this.style.cellForegroundPrefix + 'r' + (r + 1) + ' ' + this.style.cellForegroundPrefix + 'c' + (c + 1),
                sortIcon: adjustments.sortIcon || 'none',
                cellPadding: props.cellPadding,
                alignment: 'left',
                rowIndex: r,
                columnIndex: c,
                column: column,
                formatter: null,
                renderForeground: int.render.renderForeground,
                renderBetween: null,
                renderBackground: int.render.renderBackground
            };
            // We abuse the key here, cells will be rendered on enter only, we therefore
            // want to key by any value which should result in a redraw of a particular cell,
            // this has huge performance benefits.  The
            visibleData[i].key = visibleData[i].columnIndex + '_' + visibleData[i].rowIndex + "_" + visibleData[i].boxHeight + "_" + visibleData[i].boxWidth + "_" + visibleData[i].sortIcon;
            vc += 1;
            runningX += column.width;
        }
        vr += 1;
        runningY += rowHeight;
    }

    // Modify the data based on the user rules
    int.render.applyRules.call(this, visibleData);

    return visibleData;

};


// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/render/getTextAnchor.js
Scrollgrid.prototype.internal.render.getTextAnchor = function (d) {
    "use strict";

    var anchor = 'start';

    if (d.alignment === 'center') {
        anchor = 'middle';
    } else if (d.alignment === 'right') {
        anchor = 'end';
    }

    return anchor;

};

// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/render/getTextPosition.js
Scrollgrid.prototype.internal.render.getTextPosition = function (d) {
    "use strict";

    var props = this.properties,
        x = 0;

    if (d.alignment === 'center') {
        x += d.textWidth / 2;
    } else if (d.alignment === 'right') {
        x += d.textWidth - d.cellPadding;
    } else {
        x += d.cellPadding;
        if (d.sortIcon && d.sortIcon !== 'none') {
            x += props.sortIconSize + d.cellPadding;
        }
    }

    return x;

};


// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/render/getVisibleRegion.js
Scrollgrid.prototype.internal.render.getVisibleRegion = function () {
    "use strict";

    var elems = this.elements,
        visibleRegion;

    visibleRegion = {};

    visibleRegion.left = elems.main.viewport.node().scrollLeft;
    visibleRegion.top = elems.main.viewport.node().scrollTop;
    visibleRegion.right = visibleRegion.left + elems.main.viewport.node().clientWidth;
    visibleRegion.bottom = visibleRegion.top + elems.main.viewport.node().clientHeight;

    return visibleRegion;

};


// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/render/matchRule.js
Scrollgrid.prototype.internal.render.matchRule = function (ruleSelector, toCompare, extremity) {
    "use strict";

    // Default for selection is to match.  So no row or column definition will match all
    var match = false,
        defs,
        rangeMarker,
        skipRange,
        skip,
        lhs,
        rhs,
        min,
        max,
        i;

    // Valid rule selectors are:
    //      "12"            Match 12th element of dimension
    //      "12,14"         Match 12th and 14th element of dimension
    //      "12:14"         Match 12th, 13th and 14th element of dimension
    //      "12:14,16"      Match 12th, 13th, 14th and 16th element of dimension
    //      "-1"            Match last element of dimension
    //      "-2:-1"         Match last two elements of dimension
    //      "2:-2"          Match all but first and last element
    //      "12(2)16"       Match every 2nd element from the 12th to the 16th.  i.e. 12th,14th,16th
    //      "*"             Match all elements (same as no selector
    if (!ruleSelector || ruleSelector === "*") {
        match = true;
    } else {
        // Split comma separated into an array, each sub-element can be processed as a rule on its own
        defs = ruleSelector.toString().replace(/\s/g, '').split(",");
        for (i = 0; i < defs.length; i += 1) {
            rangeMarker = defs[i].indexOf(":");
            // Find the pattern a(n)b where we want every nth cell
            skipRange = defs[i].match(/(\-{0,1}[0-9]+)\(([0-9]+)\)(\-{0,1}[0-9]+)/);
            if (rangeMarker !== -1) {
                // Handle ranges a:b
                lhs = parseFloat(defs[i].substring(0, rangeMarker));
                skip = 1;
                rhs = parseFloat(defs[i].substring(rangeMarker + 1));
            } else if (skipRange && skipRange.length === 4) {
                // Handle skip ranges a(n)b
                lhs = parseFloat(skipRange[1]);
                skip = Math.max(parseFloat(skipRange[2]), 1);
                rhs = parseFloat(skipRange[3]);
            } else {
                // Handle single values by creating as a range where both ends match
                lhs = parseFloat(defs[i]);
                skip = 1;
                rhs = lhs;
            }
            // Handle the requirement for negatives to come from the end of the set
            lhs = (lhs < 0 ? extremity + lhs + 1 : lhs);
            rhs = (rhs < 0 ? extremity + rhs + 1 : rhs);
            // Match them from min to max regardless of the way they are defined
            min = Math.min(lhs, rhs);
            max = Math.max(lhs, rhs);
            // Check that the cell is in the range and not skipped
            match = (min <= toCompare && max >= toCompare) && ((toCompare - min) % skip === 0);
            // If any match the rule passes
            if (match) {
                break;
            }
        }
    }

    return match;

};


// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/render/renderBackground.js
Scrollgrid.prototype.internal.render.renderBackground = function (g, viewData) {
    "use strict";

    g.append("rect")
        .attr("class", viewData.backgroundStyle)
        .attr("width", viewData.boxWidth)
        .attr("height", viewData.boxHeight);

};

// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/render/renderForeground.js
Scrollgrid.prototype.internal.render.renderForeground = function (g, viewData) {
    "use strict";

    var self = this,
        int = this.internal,
        props = this.properties,
        path,
        text;

    // Clear any existing text
    g.selectAll(".sg-no-style--text-selector").remove();

    text = g.append("text")
        .attr("class", "sg-no-style--text-selector " + viewData.foregroundStyle)
        .attr("dy", "0.35em")
        .attr("x", int.render.getTextPosition.call(self, viewData))
        .attr("y", viewData.textHeight / 2)
        .style("text-anchor", int.render.getTextAnchor.call(self, viewData))
        .style("clip-path", int.render.getClipPath.call(self, viewData));

    if (viewData.formatter) {
        text.text(viewData.formatter(viewData.value));
    } else {
        text.text(viewData.value);
    }

    path = text.node().style.clipPath;
    // If the new clip path css doesn't work (I'm looking at you IE and Firefox) revert to the slower method
    if (!path || path === "") {
        int.render.cropText.call(self, text, viewData.textWidth - viewData.cellPadding - (!(!viewData.sortIcon || viewData.sortIcon === 'none') ? props.sortIconSize + viewData.cellPadding : 0));
    }
};


// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/render/renderRegion.js
Scrollgrid.prototype.internal.render.renderRegion = function (target, physicalOffset, xVirtual, yVirtual, clearCache) {
    "use strict";

    var self = this,
        int = this.internal,
        props = this.properties,
        elems = this.elements,
        cells,
        metadata,
        bounds;

    if ((xVirtual.left || 0) !== (xVirtual.right || 0) && (yVirtual.top || 0) !== (yVirtual.bottom || 0)) {

        bounds = {
            startX: physicalOffset.x || 0,
            startY: physicalOffset.y || 0,
            top: yVirtual.top || 0,
            bottom: yVirtual.bottom || 0,
            left: xVirtual.left || 0,
            right: xVirtual.right || 0
        };

        metadata = int.render.getDataInBounds.call(self, bounds);

        // On refresh we will clear and redraw everything.  This can
        // be invoked externally or internally on full grid changes.  On scroll or resize
        // we don't want to clear the cache because affected cells will be redrawn anyway
        if (clearCache) {
            target.content
                .selectAll(".sg-no-style--cell-selector")
                .remove();
        }

        cells = target.content
            .selectAll(".sg-no-style--cell-selector")
            .data(metadata, function (d) {
                return d.key;
            });

        // We use the cell key to invoke an enter if the cell needs a render
        // for any reason, this means everything here happens on enter.
        cells.enter()
            .append("g")
            .attr("class", "sg-no-style--cell-selector")
            .each(function (d) {
                var group = d3.select(this);
                if (d.renderBackground) {
                    d.renderBackground.call(self, group, d);
                }
                int.render.renderSortIcon.call(self, d, group, !(!d.sortIcon || d.sortIcon === 'none'));
                // Add some interaction to the headers
                if (props.allowSorting && (target === elems.top || target === elems.top.left || target === elems.top.right)) {
                    int.interaction.addSortButtons.call(self, group, d);
                }

                // Register events
                int.events.addEventHandlers.call(self, group, d);
            });

        // Draw the foreground separately to allow for asynchronous adapters
        int.render.renderRegionForeground.call(this, bounds, cells);

        cells.attr("transform", function (d) {
            return "translate(" + d.x + "," + d.y + ")";
        });

        cells.exit()
            .remove();

    }
};


// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/render/renderRegionForeground.js
Scrollgrid.prototype.internal.render.renderRegionForeground = function (bounds, cells) {
    "use strict";

    var self = this;

    this.adapter.loadDataRange.call(this, bounds, function (data) {
        cells.each(function (d) {
            var group = d3.select(this);

            // Get the value from the visible range and set it in the data object
            d.value = data[d.visibleRow][d.visibleColumn];

            if (d.renderBetween) {
                d.renderBetween.call(self, group, d);
            }
            if (d.renderForeground) {
                d.renderForeground.call(self, group, d);
            }
        });
    });
};

// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/render/renderSortIcon.js
Scrollgrid.prototype.internal.render.renderSortIcon = function (d, target, sorted) {
    "use strict";

    var self = this,
        int = this.internal,
        props = this.properties;

    if (sorted && d.textWidth > d.cellPadding + props.sortIconSize) {
        target.append("g")
            .datum(d.sortIcon)
            .attr("class", "sg-no-style--sort-icon-selector")
            .attr("transform", "translate(" + (d.cellPadding + props.sortIconSize / 2) + "," + (d.textHeight / 2) + ")")
            .call(function (d) { return int.render.sortIcon.call(self, d); });
    }

};


// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/render/setDefaultStyles.js
Scrollgrid.prototype.internal.render.setDefaultStyles = function () {
    "use strict";

    // Define default classes, these are kept external as users might want to use their own
    this.style = {
        left: {
            panel: 'sg-grid sg-fixed sg-left'
        },
        top: {
            panel: 'sg-grid sg-fixed sg-top',
            left: {
                panel: 'sg-grid sg-fixed sg-top sg-left'
            },
            right: {
                panel: 'sg-grid sg-fixed sg-top sg-right'
            }
        },
        right: {
            panel: 'sg-grid sg-fixed sg-right'
        },
        bottom: {
            panel: 'sg-grid sg-fixed sg-bottom',
            left: {
                panel: 'sg-grid sg-fixed sg-bottom sg-left'
            },
            right: {
                panel: 'sg-grid sg-fixed sg-bottom sg-right'
            }
        },
        main: {
            panel: 'sg-grid'
        },
        resizeHandle: 'sg-resize-handle',
        cellBackgroundPrefix: 'sg-cell-background-',
        cellForegroundPrefix: 'sg-cell-foreground-',
        sortIcon: 'sg-sort-icon'
    };

};

// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/render/sortIcon.js
Scrollgrid.prototype.internal.render.sortIcon = function (group) {
    "use strict";

    var icon = group.append("path").attr("class", this.style.sortIcon),
        props = this.properties,
        size = props.sortIconSize;

    if (group.datum() === 'asc') {
        icon.attr("d", "M " + (size / 2) + " 0 L " + size + " " + size + " L 0 " + size + " z");
    } else if (group.datum() === 'desc') {
        icon.attr("d", "M 0 0 L " + size + " 0 L " + (size / 2) + " " + size + " z");
    }

    // Center it around zero
    icon.attr("transform", "translate(" + icon.node().getBBox().width / -2 + "," + icon.node().getBBox().height / -2 + ")");

};


// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/sizes/calculatePhysicalBounds.js
Scrollgrid.prototype.internal.sizes.calculatePhysicalBounds = function (topMargin) {
    "use strict";

    var props = this.properties,
        elems = this.elements,
        i;

    // Variable column widths mean horizontal sizes cost O(n) to calculate
    props.physicalLeft = 0;
    for (i = 0; i < props.virtualLeft; i += 1) {
        props.physicalLeft += this.columns[i].width;
    }
    props.physicalTotalInnerWidth = 0;
    for (i = props.virtualLeft; i < props.virtualOuterWidth - props.virtualRight; i += 1) {
        props.physicalTotalInnerWidth += this.columns[i].width;
    }
    props.physicalRight = 0;
    for (i = props.virtualOuterWidth - props.virtualRight; i < props.virtualOuterWidth; i += 1) {
        props.physicalRight += this.columns[i].width;
    }

    // Keeping static row height means vertical position calculations can stay O(1)
    props.physicalTop = props.virtualTop * props.headerRowHeight;
    props.physicalBottom = props.virtualBottom * props.footerRowHeight;
    props.physicalVisibleInnerWidth = elems.container.node().offsetWidth - props.physicalLeft - props.physicalRight;
    props.physicalVisibleInnerHeight = elems.container.node().offsetHeight - props.physicalTop - props.physicalBottom - topMargin;
    props.physicalTotalInnerHeight = props.virtualInnerHeight * props.rowHeight;

};


// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/sizes/calculateTextBound.js
Scrollgrid.prototype.internal.sizes.calculateTextBound = function (surface, text) {
    "use strict";

    var toMeasure,
        bounds,
        returnBounds = { width: 0, height: 0 };

    // Append some text for measuring
    toMeasure = surface.append('text').text(text);
    // Get the bounds
    bounds = toMeasure.node().getBBox();
    // Parse into a simpler object because the BBox object
    // has some IE restrictions
    returnBounds.width = bounds.width;
    returnBounds.height = bounds.height;
    // Remove from the dom
    toMeasure.remove();

    return returnBounds;

};

// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/sizes/getExistingTextBound.js
Scrollgrid.prototype.internal.sizes.getExistingTextBound = function (surface, column, row) {
    "use strict";

    var int = this.internal,
        props = this.properties,
        returnBounds = { width: 0, height: 0 };

    surface.selectAll("text")
        .filter(function (d) {
            return (column === undefined || d.columnIndex === column) && (row === undefined || d.rowIndex === row);
        })
        .each(function (d) {
            var sortIconSize = (d.sortIcon && d.sortIcon !== 'none' ? props.sortIconSize + d.cellPadding : 0);
            returnBounds = int.sizes.pushTextBound(returnBounds, d3.select(this), d.cellPadding, sortIconSize);
        });

    return returnBounds;

};


// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/sizes/getRowHeight.js
Scrollgrid.prototype.internal.sizes.getRowHeight = function (row) {
    "use strict";

    var props = this.properties,
        rowHeight = 0;

    if (row < props.virtualTop) {
        rowHeight = props.headerRowHeight;
    } else if (row < props.virtualOuterHeight - props.virtualBottom) {
        rowHeight = props.rowHeight;
    } else {
        rowHeight = props.footerRowHeight;
    }

    return rowHeight;

};


// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/sizes/initialiseColumns.js
Scrollgrid.prototype.internal.sizes.initialiseColumns = function () {
    "use strict";

    var i,
        int = this.internal,
        props = this.properties,
        rule;

    // Initialise the columns if required
    this.columns = this.columns || [];

    for (i = 0; i < props.virtualOuterWidth; i += 1) {
        // Initialise with a default to ensure we always have a width
        this.columns[i] = this.columns[i] || {};
        this.columns[i].width = this.columns[i].width || props.defaultColumnWidth;

        if (props.formatRules && props.formatRules.length > 0) {
            for (rule = 0; rule < props.formatRules.length; rule += 1) {
                if (int.render.matchRule.call(this, props.formatRules[rule].column, i + 1, props.virtualOuterWidth)) {
                    this.columns[i] = {
                        width: props.formatRules[rule].columnWidth || this.columns[i].width,
                        index: i,
                        sort: props.formatRules[rule].sort || this.columns[i].sort,
                        compareFunction: props.formatRules[rule].compareFunction || this.columns[i].compareFunction
                    };
                }
            }
        }
    }

};


// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/sizes/pushTextBound.js
Scrollgrid.prototype.internal.sizes.pushTextBound = function (currentBounds, shape, cellPadding, sortIconSize) {
    "use strict";

    var cellText = shape.text(),
        b;

    // Remove any abbreviation
    shape.text(shape.datum().originalText || shape.text());

    // Get the bounds
    b = shape.node().getBBox();
    if (b.width + 2 * cellPadding + sortIconSize > currentBounds.width) {
        currentBounds.width = b.width + 2 * cellPadding + sortIconSize;
    }
    if (b.height > currentBounds.height) {
        currentBounds.height = b.height;
    }
    // Reapply abbreviation
    shape.text(cellText);

    // Return the newly stretched bounds
    return currentBounds;

};

// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/external/adapters/json.js
Scrollgrid.adapters.json = function (data, columns, options) {
    "use strict";

    options = options || {};

    var columnLookup = {},
        headRow = {},
        cols = columns || [],
        table = data,
        key,
        sampleSize = options.rowSampleSize || 100,
        i;

    // If columns aren't provided find them from the data
    if (cols.length === 0) {
        for (i = 0; i < Math.min(table.length, sampleSize); i += 1) {
            for (key in table[i]) {
                if (table[i].hasOwnProperty(key)) {
                    if (columnLookup[key] === undefined) {
                        columnLookup[key] = cols.length;
                        cols.push(key);
                    }
                }
            }
        }
    }

    for (i = 0; i < cols.length; i += 1) {
        headRow[cols[i]] = cols[i];
    }

    table.splice(0, 0, headRow);

    return {
        rowCount: function () { return table.length; },
        columnCount: function () { return cols.length; },
        sort: function (column, headers, footers, descending, compareFunction) {
            var heads = table.splice(0, headers),
                foots = table.splice(table.length - footers),
                j;
            table.sort(function (a, b) {
                return compareFunction(a[cols[column]], b[cols[column]]) * (descending ? -1 : 1);
            });
            for (j = heads.length - 1; j >= 0; j -= 1) {
                table.splice(0, 0, heads[j]);
            }
            for (j = 0; j < foots.length; j += 1) {
                table.push(foots[j]);
            }
        },
        loadDataRange: function (viewArea, callback) {
            var r, c, row, d = [];
            for (r = viewArea.top; r < viewArea.bottom; r += 1) {
                row = [];
                for (c = viewArea.left; c < viewArea.right; c += 1) {
                    row.push(table[r][cols[c]]);
                }
                d.push(row);
            }
            callback(d);
        }
    };
};

// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/external/adapters/simple.js
Scrollgrid.adapters.simple = function (data, options) {
    "use strict";

    options = options || {};

    var columnCount = 0,
        table = data,
        sampleSize = options.rowSampleSize || 100,
        i;

    // Find the longest length of the data sub arrays
    for (i = 0; i < Math.min(table.length, sampleSize); i += 1) {
        if (table[i] && Object.prototype.toString.call(table[i]) === '[object Array]') {
            if (table[i].length > columnCount) {
                columnCount = table[i].length;
            }
        }
    }

    return {
        rowCount: function () { return table.length; },
        columnCount: function () { return columnCount; },
        sort: function (column, headers, footers, descending, compareFunction) {
            var heads = table.splice(0, headers),
                foots = table.splice(table.length - footers),
                j;
            table.sort(function (a, b) {
                return compareFunction(a[column], b[column]) * (descending ? -1 : 1);
            });
            for (j = heads.length - 1; j >= 0; j -= 1) {
                table.splice(0, 0, heads[j]);
            }
            for (j = 0; j < foots.length; j += 1) {
                table.push(foots[j]);
            }
        },
        loadDataRange: function (viewArea, callback) {
            var r, c, row, d = [];
            for (r = viewArea.top; r < viewArea.bottom; r += 1) {
                row = [];
                for (c = viewArea.left; c < viewArea.right; c += 1) {
                    row.push(table[r][c]);
                }
                d.push(row);
            }
            callback(d);
        }
    };

};

// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/external/addFormatRules.js
Scrollgrid.prototype.addFormatRules = function (rules, silent) {
    "use strict";

    var props = this.properties,
        int = this.internal;
    if (rules) {
        // Set the value and redraw but return self for chaining
        props.formatRules = props.formatRules.concat(rules);
        int.sizes.initialiseColumns.call(this);
        if (!silent) {
            this.refresh();
        }
    }

    return props.formatRules;

};


// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/external/allowColumnResizing.js
Scrollgrid.prototype.allowColumnResizing = function (value, silent) {
    "use strict";

    var props = this.properties,
        result;

    if (value === undefined) {
        result = props.allowColumnResizing;
    } else {
        // Set the value and redraw but return self for chaining
        props.allowColumnResizing = value;
        result = this;
        if (!silent) {
            this.refresh();
        }
    }

    return result;

};


// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/external/allowSorting.js
Scrollgrid.prototype.allowSorting = function (value, silent) {
    "use strict";

    var props = this.properties,
        result;

    if (value === undefined) {
        result = props.allowSorting;
    } else {
        // Set the value and redraw but return self for chaining
        props.allowSorting = value;
        result = this;
        if (!silent) {
            this.refresh();
        }
    }

    return result;

};


// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/external/cellPadding.js
Scrollgrid.prototype.cellPadding = function (value, silent) {
    "use strict";

    var props = this.properties,
        result;

    if (value === undefined) {
        result = props.cellPadding;
    } else {
        // Set the value and redraw but return self for chaining
        props.cellPadding = value;
        result = this;
        if (!silent) {
            this.refresh();
        }
    }

    return result;

};


// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/external/data.js
Scrollgrid.prototype.data = function (data, silent) {
    "use strict";

    var props = this.properties,
        int = this.internal,
        c;

    if (data) {

        // If the dataAdapter is an array, treat it as the data itself and instantiate with the default adapter
        if (Object.prototype.toString.call(data) === '[object Array]') {
            this.adapter = Scrollgrid.adapters.simple(data);
        } else {
            this.adapter = data;
        }
        props.virtualOuterHeight = this.adapter.rowCount();
        props.virtualOuterWidth = this.adapter.columnCount();

        // Set up the columns
        int.sizes.initialiseColumns.call(this);

        // If any of the columns have a sort it should be applied
        for (c = 0; c < this.columns.length; c += 1) {
            if (this.columns[c].sort === 'asc' || this.columns[c].sort === 'desc') {
                int.interaction.sortColumn.call(this, c, false);
            }
        }

        // Calculate the bounds of the data displayable in the main grid
        props.virtualInnerWidth = props.virtualOuterWidth - props.virtualLeft - props.virtualRight;
        props.virtualInnerHeight = props.virtualOuterHeight - props.virtualTop - props.virtualBottom;

        // Render the control
        if (!silent) {
            this.refresh(false);
        }

    }

    return this.adapter;

};


// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/external/dragHandleWidth.js
Scrollgrid.prototype.dragHandleWidth = function (value, silent) {
    "use strict";

    var props = this.properties,
        result;

    if (value === undefined) {
        result = props.dragHandleWidth;
    } else {
        // Set the value and redraw but return self for chaining
        props.dragHandleWidth = value;
        result = this;
        if (!silent) {
            this.refresh();
        }
    }

    return result;

};


// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/external/footerColumns.js
Scrollgrid.prototype.footerColumns = function (value, silent) {
    "use strict";

    var props = this.properties,
        result;

    if (value === undefined) {
        result = props.virtualRight;
    } else {
        // Set the value and redraw but return self for chaining
        props.virtualRight = value;
        props.virtualInnerWidth = props.virtualOuterWidth - props.virtualLeft - props.virtualRight;
        result = this;
        if (!silent) {
            this.refresh();
        }
    }

    return result;

};


// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/external/footerRowHeight.js
Scrollgrid.prototype.footerRowHeight = function (value, silent) {
    "use strict";

    var props = this.properties,
        result;

    if (value === undefined) {
        result = props.footerRowHeight;
    } else {
        // Set the value and redraw but return self for chaining
        props.footerRowHeight = value;
        result = this;
        if (!silent) {
            this.refresh();
        }
    }

    return result;

};


// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/external/footerRows.js
Scrollgrid.prototype.footerRows = function (value, silent) {
    "use strict";

    var props = this.properties,
        result;

    if (value === undefined) {
        result = props.virtualBottom;
    } else {
        // Set the value and redraw but return self for chaining
        props.virtualBottom = value;
        props.virtualInnerHeight = props.virtualOuterHeight - props.virtualTop - props.virtualBottom;
        result = this;
        if (!silent) {
            this.refresh();
        }
    }

    return result;

};


// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/external/formatRules.js
Scrollgrid.prototype.formatRules = function (value, silent) {
    "use strict";

    var int = this.internal,
        props = this.properties,
        result;

    if (value === undefined) {
        result = props.formatRules;
    } else {
        // Set the value and redraw but return self for chaining
        props.formatRules = value;
        int.sizes.initialiseColumns.call(this);
        result = this;
        if (!silent) {
            this.refresh();
        }
    }

    return result;

};


// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/external/headerColumns.js
Scrollgrid.prototype.headerColumns = function (value, silent) {
    "use strict";

    var props = this.properties,
        result;

    if (value === undefined) {
        result = props.virtualLeft;
    } else {
        // Set the value and redraw but return self for chaining
        props.virtualLeft = value;
        props.virtualInnerWidth = props.virtualOuterWidth - props.virtualLeft - props.virtualRight;
        result = this;
        if (!silent) {
            this.refresh();
        }
    }

    return result;

};


// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/external/headerRowHeight.js
Scrollgrid.prototype.headerRowHeight = function (value, silent) {
    "use strict";

    var props = this.properties,
        result;

    if (value === undefined) {
        result = props.headerRowHeight;
    } else {
        // Set the value and redraw but return self for chaining
        props.headerRowHeight = value;
        result = this;
        if (!silent) {
            this.refresh();
        }
    }

    return result;

};


// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/external/headerRows.js
Scrollgrid.prototype.headerRows = function (value, silent) {
    "use strict";

    var props = this.properties,
        result;

    if (value === undefined) {
        result = props.virtualTop;
    } else {
        // Set the value and redraw but return self for chaining
        props.virtualTop = value;
        props.virtualInnerHeight = props.virtualOuterHeight - props.virtualTop - props.virtualBottom;
        result = this;
        if (!silent) {
            this.refresh();
        }
    }

    return result;

};


// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/external/on.js
Scrollgrid.prototype.on = function (type, listener, capture) {
    "use strict";

    this.eventHandlers.push({
        type: type,
        listener: listener,
        capture: capture
    });
};


// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/external/refresh.js
Scrollgrid.prototype.refresh = function (maintainCache) {
    "use strict";

    var int = this.internal;

    // Call the instantiated layout refresh
    int.dom.layoutDOM.call(this);
    int.render.draw.call(this, !maintainCache, true);
    int.dom.setScrollerSize.call(this);

};


// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/external/rowHeight.js
Scrollgrid.prototype.rowHeight = function (value, silent) {
    "use strict";

    var props = this.properties,
        result;

    if (value === undefined) {
        result = props.rowHeight;
    } else {
        // Set the value and redraw but return self for chaining
        props.rowHeight = value;
        result = this;
        if (!silent) {
            this.refresh();
        }
    }

    return result;

};


// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/external/sortIconSize.js
Scrollgrid.prototype.sortIconSize = function (value, silent) {
    "use strict";

    var props = this.properties,
        result;

    if (value === undefined) {
        result = props.sortIconSize;
    } else {
        // Set the value and redraw but return self for chaining
        props.sortIconSize = value;
        result = this;
        if (!silent) {
            this.refresh();
        }
    }

    return result;

};
