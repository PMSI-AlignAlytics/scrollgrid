// Copyright: 2017 AlignAlytics
// Copyright: 2026 AlignAlytics (ES module rewrite)
// License: MIT — see MIT-LICENCE.txt

import { select } from 'd3-selection';

import { raise } from './raise.js';
import { defaultStyles } from './defaultStyles.js';

import { populateDOM } from './dom/populateDOM.js';
import { layoutDOM } from './dom/layoutDOM.js';
import { setScrollerSize } from './dom/setScrollerSize.js';
import { setAutoResize } from './dom/setAutoResize.js';

import { draw } from './render/draw.js';
import { stylePanels } from './dom/stylePanels.js';

import { initialiseColumns } from './sizes/initialiseColumns.js';
import { buildRowOffsets } from './sizes/buildRowOffsets.js';
import { sortColumn } from './interaction/sortColumn.js';

import { simpleAdapter } from './adapters/simple.js';

const REQUIRED_TARGET_MSG =
    'target is a required field, please provide a selector string for the container. ' +
    'The selector string should identify a single div, e.g. "#tableContainer" where ' +
    'you have a div with id "tableContainer". You may also pass a DOM node directly.';

const MULTIPLE_TARGETS_MSG =
    'target should identify a single div, e.g. "#tableContainer" where you have a ' +
    'div with id "tableContainer". Please check that your selector matches exactly one div.';

export class Scrollgrid {
    constructor(options = {}) {
        if (!options.target) {
            raise(this, REQUIRED_TARGET_MSG);
            return;
        }

        const targetSelection = select(options.target);
        if (targetSelection.empty() || targetSelection.size() !== 1) {
            raise(this, MULTIPLE_TARGETS_MSG);
            return;
        }

        // Per-instance state — no more shared mutable prototype.
        this.elements = {};
        this.eventHandlers = [];
        this.properties = {};
        this.columns = [];

        const props = this.properties;

        // Display options
        props.rowHeight = options.rowHeight ?? 30;
        props.dragHandleWidth = options.dragHandleWidth ?? 8;
        props.headerRowHeight = options.headerRowHeight ?? props.rowHeight;
        props.footerRowHeight = options.footerRowHeight ?? props.rowHeight;
        props.defaultColumnWidth = options.defaultColumnWidth ?? 100;
        props.cellPadding = options.cellPadding ?? 6;

        // Interaction options.  The original code did `options.x || true` which
        // means an explicit `false` from the user was silently ignored.  Use
        // nullish coalescing so `false` is honoured.
        props.allowColumnResizing = options.allowColumnResizing ?? true;
        props.allowSorting = options.allowSorting ?? true;

        // Header / footer counts
        props.virtualTop = options.headerRows ?? 0;
        props.virtualBottom = options.footerRows ?? 0;
        props.virtualLeft = options.headerColumns ?? 0;
        props.virtualRight = options.footerColumns ?? 0;

        props.verticalAlignment = options.verticalAlignment ?? 'top';

        this.target = options.target;

        this.style = defaultStyles();

        props.formatRules = options.formatRules ?? [];
        props.cellWaitText = options.cellWaitText ?? 'loading...';
        props.sortIconSize = options.sortIconSize ?? 7;

        populateDOM(this);

        // Pass the data or adapter through to setData
        this.data(options.data ?? options.adapter);

        if (options.autoResize) {
            setAutoResize(this);
        }
    }

    static init(target, options = {}) {
        return new Scrollgrid({ ...options, target });
    }

    // ---------- Public API ----------

    /**
     * Replace the underlying data or adapter.  Passing an Array uses the
     * built-in {@link simpleAdapter}.  Passing an adapter object lets you
     * provide a custom source (e.g. lazy server-side paging).
     */
    data(data, silent) {
        const props = this.properties;
        if (data === undefined || data === null) {
            return this.adapter;
        }

        this.adapter = Array.isArray(data) ? simpleAdapter(data) : data;
        props.virtualOuterHeight = this.adapter.rowCount();
        props.virtualOuterWidth = this.adapter.columnCount();

        initialiseColumns(this);

        for (let c = 0; c < this.columns.length; c += 1) {
            if (this.columns[c].sort === 'asc' || this.columns[c].sort === 'desc') {
                sortColumn(this, c, false);
            }
        }

        props.virtualInnerWidth = props.virtualOuterWidth - props.virtualLeft - props.virtualRight;
        props.virtualInnerHeight = props.virtualOuterHeight - props.virtualTop - props.virtualBottom;

        if (!silent) this.refresh(false);
        return this.adapter;
    }

    /**
     * Force a full relayout and redraw.  Pass `true` to keep cached cells
     * (used during column resize for smoother updates).
     */
    refresh(maintainCache) {
        // Row heights can be set per-row via format rules, so the offset
        // array has to be rebuilt before layout reads it.  Cost is
        // proportional to virtualOuterHeight × rules-with-rowHeight, and
        // dwarfed by the DOM work below.
        buildRowOffsets(this);
        layoutDOM(this);
        draw(this, !maintainCache, true);
        setScrollerSize(this);
    }

    /** Register a DOM event handler that fires for any cell `<g>`. */
    on(type, listener, capture) {
        this.eventHandlers.push({ type, listener, capture });
        return this;
    }

    /** Replace and re-apply the styling map produced by {@link defaultStyles}. */
    styles(value) {
        if (value === undefined) return this.style;
        this.style = value;
        stylePanels(this);
        return this;
    }

    /** Cleanly remove the grid from the DOM and detach window listeners. */
    destroy() {
        if (this.detachResize) {
            this.detachResize();
            this.detachResize = null;
        }
        if (this.elements?.container) {
            this.elements.container.remove();
        }
        this.elements = {};
        this.eventHandlers = [];
    }
}

// Helper to create both getter and setter forms for simple property
// accessors.  `derive` is an optional callback invoked after the
// property is assigned (used to recompute virtualInnerWidth etc.).
function makeAccessor(name, key, { derive } = {}) {
    Scrollgrid.prototype[name] = function (value, silent) {
        const props = this.properties;
        if (value === undefined) return props[key];
        props[key] = value;
        if (derive) derive(props);
        if (!silent) this.refresh();
        return this;
    };
}

makeAccessor('rowHeight', 'rowHeight');
makeAccessor('headerRowHeight', 'headerRowHeight');
makeAccessor('footerRowHeight', 'footerRowHeight');
makeAccessor('cellPadding', 'cellPadding');
makeAccessor('dragHandleWidth', 'dragHandleWidth');
makeAccessor('sortIconSize', 'sortIconSize');
makeAccessor('allowColumnResizing', 'allowColumnResizing');
makeAccessor('allowSorting', 'allowSorting');

const recomputeWidth = (props) => {
    props.virtualInnerWidth = props.virtualOuterWidth - props.virtualLeft - props.virtualRight;
};
const recomputeHeight = (props) => {
    props.virtualInnerHeight = props.virtualOuterHeight - props.virtualTop - props.virtualBottom;
};

makeAccessor('headerColumns', 'virtualLeft', { derive: recomputeWidth });
makeAccessor('footerColumns', 'virtualRight', { derive: recomputeWidth });
makeAccessor('headerRows', 'virtualTop', { derive: recomputeHeight });
makeAccessor('footerRows', 'virtualBottom', { derive: recomputeHeight });

Scrollgrid.prototype.formatRules = function (value, silent) {
    const props = this.properties;
    if (value === undefined) return props.formatRules;
    props.formatRules = value;
    initialiseColumns(this);
    if (!silent) this.refresh();
    return this;
};

Scrollgrid.prototype.addFormatRules = function (rules, silent) {
    const props = this.properties;
    if (!rules) return props.formatRules;
    props.formatRules = props.formatRules.concat(rules);
    initialiseColumns(this);
    if (!silent) this.refresh();
    return props.formatRules;
};

// Keep the historical `Scrollgrid.adapters.simple`/`.json` lookup working
// for code that loaded the UMD bundle on a page.
import { jsonAdapter } from './adapters/json.js';
Scrollgrid.adapters = { simple: simpleAdapter, json: jsonAdapter };
