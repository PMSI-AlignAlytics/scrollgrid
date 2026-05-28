// React wrapper for Scrollgrid.
//
// Usage:
//   import { Scrollgrid } from 'scrollgrid/react';
//
//   <Scrollgrid
//       data={rows}
//       headerRows={1}
//       formatRules={[{ row: '1', column: '*', alignment: 'center' }]}
//       onCellClick={(event, cell) => console.log(cell)}
//       style={{ height: 400, width: '100%' }}
//   />

import React, { useEffect, useImperativeHandle, useRef } from 'react';

import { Scrollgrid as ScrollgridCore } from './scrollgrid.js';

/**
 * Options recognised by the underlying Scrollgrid constructor.  Anything
 * inside these keys is forwarded.  Anything not in this list (e.g. `style`,
 * `className`, the `onCell*` event props, `gridRef`) belongs to the React
 * wrapper.
 */
const OPTION_KEYS = new Set([
    'rowHeight', 'dragHandleWidth', 'headerRowHeight', 'footerRowHeight',
    'defaultColumnWidth', 'cellPadding',
    'allowColumnResizing', 'allowSorting',
    'headerRows', 'footerRows', 'headerColumns', 'footerColumns',
    'formatRules', 'cellWaitText', 'sortIconSize',
    'autoResize', 'verticalAlignment',
]);

function splitProps(props) {
    const options = {};
    for (const key of Object.keys(props)) {
        if (OPTION_KEYS.has(key)) options[key] = props[key];
    }
    return options;
}

/**
 * The list of `onCell<EventName>` props the wrapper recognises.  Each
 * becomes a Scrollgrid `on(...)` registration internally.
 */
const EVENT_PROP_MAP = {
    onCellClick: 'click',
    onCellDblClick: 'dblclick',
    onCellMouseDown: 'mousedown',
    onCellMouseUp: 'mouseup',
    onCellMouseOver: 'mouseover',
    onCellMouseOut: 'mouseout',
    onCellMouseMove: 'mousemove',
    onCellContextMenu: 'contextmenu',
};

export const Scrollgrid = React.forwardRef(function ScrollgridReact(props, ref) {
    const {
        data, style, className,
        gridRef: _legacyGridRef,
        ...rest
    } = props;

    const containerRef = useRef(null);
    const gridInstance = useRef(null);

    // Imperative handle: lets callers invoke `.refresh()`, `.formatRules(x)`
    // etc. without reaching into the DOM themselves.
    useImperativeHandle(ref, () => gridInstance.current, [gridInstance.current]);

    // Mount/unmount lifecycle — runs once.  Subsequent prop changes are
    // pushed through dedicated effects below.
    useEffect(() => {
        const options = splitProps(rest);
        const grid = new ScrollgridCore({
            ...options,
            target: containerRef.current,
            data,
        });
        gridInstance.current = grid;

        for (const [propName, eventType] of Object.entries(EVENT_PROP_MAP)) {
            const handler = rest[propName];
            if (handler) grid.on(eventType, handler);
        }
        grid.refresh();

        return () => grid.destroy?.();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Push data updates through the imperative API.
    useEffect(() => {
        if (gridInstance.current && data !== undefined) {
            gridInstance.current.data(data);
        }
    }, [data]);

    // Push format-rule updates similarly.
    useEffect(() => {
        if (gridInstance.current && rest.formatRules) {
            gridInstance.current.formatRules(rest.formatRules);
        }
    }, [rest.formatRules]);

    return <div ref={containerRef} className={className} style={style} />;
});

export default Scrollgrid;
