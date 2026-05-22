// Type declarations for Scrollgrid.  The source remains JavaScript so users
// don't need a TS toolchain to consume it, but these .d.ts files give
// editors (VS Code, JetBrains, etc.) full intellisense.

export interface FormatRule {
    /** Row selector, e.g. "1", "-1", "2:5", "1(2)10", "*". */
    row?: string | number;
    /** Column selector — same syntax as `row`. */
    column?: string | number;
    formatter?: (value: unknown) => string;
    alignment?: 'left' | 'right' | 'center';
    cellPadding?: number;
    backgroundStyle?: string;
    foregroundStyle?: string;
    columnWidth?: number;
    /**
     * Override the rendered height of every row matched by the rule's
     * `row` selector.  The rule's `column` is ignored for height — only
     * the `row` selector matters, mirroring how `columnWidth` works.
     * When multiple rules with `rowHeight` overlap, the last one wins.
     */
    rowHeight?: number;
    sort?: 'asc' | 'desc';
    compareFunction?: (a: unknown, b: unknown) => number;
    renderBackground?: (this: Scrollgrid, group: unknown, viewData: CellViewData) => void;
    renderForeground?: (this: Scrollgrid, group: unknown, viewData: CellViewData) => void;
    renderBetween?: (this: Scrollgrid, group: unknown, viewData: CellViewData) => void;
}

export interface CellViewData {
    x: number;
    y: number;
    rowIndex: number;
    columnIndex: number;
    visibleRow: number;
    visibleColumn: number;
    boxWidth: number;
    boxHeight: number;
    textWidth: number;
    textHeight: number;
    value: unknown;
    alignment: 'left' | 'right' | 'center';
    cellPadding: number;
    sortIcon: 'asc' | 'desc' | 'none';
    column: { width: number; index?: number; sort?: 'asc' | 'desc' };
}

export interface DataAdapter {
    rowCount(): number;
    columnCount(): number;
    sort(
        column: number,
        headers: number,
        footers: number,
        descending: boolean,
        compareFunction: (a: unknown, b: unknown) => number,
    ): void;
    loadDataRange(
        viewArea: { top: number; bottom: number; left: number; right: number },
        callback: (data: unknown[][]) => void,
    ): void;
}

export interface ScrollgridOptions {
    target: string | Element;
    data?: unknown[][] | DataAdapter;
    rowHeight?: number;
    headerRowHeight?: number;
    footerRowHeight?: number;
    defaultColumnWidth?: number;
    cellPadding?: number;
    dragHandleWidth?: number;
    sortIconSize?: number;
    allowColumnResizing?: boolean;
    allowSorting?: boolean;
    headerRows?: number;
    footerRows?: number;
    headerColumns?: number;
    footerColumns?: number;
    formatRules?: FormatRule[];
    cellWaitText?: string;
    autoResize?: boolean;
    verticalAlignment?: 'top' | 'middle' | 'bottom';
}

export class Scrollgrid {
    constructor(options: ScrollgridOptions);
    static init(target: string | Element, options?: Omit<ScrollgridOptions, 'target'>): Scrollgrid;
    static adapters: {
        simple: typeof simpleAdapter;
        json: typeof jsonAdapter;
    };

    target: string | Element;
    columns: Array<{ width: number; index?: number; sort?: 'asc' | 'desc' }>;
    adapter: DataAdapter;
    properties: Record<string, unknown>;

    data(data?: unknown[][] | DataAdapter, silent?: boolean): DataAdapter;
    refresh(maintainCache?: boolean): void;
    on(type: string, listener: (event: Event, datum: CellViewData) => void, capture?: boolean): this;
    destroy(): void;

    rowHeight(value?: number, silent?: boolean): number | this;
    headerRowHeight(value?: number, silent?: boolean): number | this;
    footerRowHeight(value?: number, silent?: boolean): number | this;
    cellPadding(value?: number, silent?: boolean): number | this;
    dragHandleWidth(value?: number, silent?: boolean): number | this;
    sortIconSize(value?: number, silent?: boolean): number | this;
    allowColumnResizing(value?: boolean, silent?: boolean): boolean | this;
    allowSorting(value?: boolean, silent?: boolean): boolean | this;
    headerRows(value?: number, silent?: boolean): number | this;
    footerRows(value?: number, silent?: boolean): number | this;
    headerColumns(value?: number, silent?: boolean): number | this;
    footerColumns(value?: number, silent?: boolean): number | this;

    formatRules(value?: FormatRule[], silent?: boolean): FormatRule[] | this;
    addFormatRules(rules: FormatRule[], silent?: boolean): FormatRule[];
}

export function simpleAdapter(data: unknown[][], options?: { rowSampleSize?: number }): DataAdapter;
export function jsonAdapter(
    data: Array<Record<string, unknown>>,
    columns?: string[],
    options?: { rowSampleSize?: number },
): DataAdapter;

export default Scrollgrid;
