import { CSSProperties, ForwardRefExoticComponent, Ref, RefAttributes } from 'react';

import {
    CellViewData,
    DataAdapter,
    FormatRule,
    Scrollgrid as ScrollgridCore,
} from './scrollgrid.js';

export type CellEventHandler = (event: Event, datum: CellViewData) => void;

export interface ScrollgridProps {
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

    onCellClick?: CellEventHandler;
    onCellDblClick?: CellEventHandler;
    onCellMouseDown?: CellEventHandler;
    onCellMouseUp?: CellEventHandler;
    onCellMouseOver?: CellEventHandler;
    onCellMouseOut?: CellEventHandler;
    onCellContextMenu?: CellEventHandler;

    className?: string;
    style?: CSSProperties;
}

export const Scrollgrid: ForwardRefExoticComponent<
    ScrollgridProps & RefAttributes<ScrollgridCore>
>;

export default Scrollgrid;
