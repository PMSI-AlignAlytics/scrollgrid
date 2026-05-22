# Scrollgrid + React

Scrollgrid ships a thin React wrapper at `scrollgrid/react`. The wrapper
creates a Scrollgrid on mount, forwards the underlying instance through
`ref`, and pushes prop changes through the imperative API on update.

## Install

```bash
npm install scrollgrid d3-selection d3-drag react react-dom
```

`react` and `react-dom` are optional peer dependencies — only required if
you import from `scrollgrid/react`.

## Basic usage

```jsx
import { useRef } from 'react';
import { Scrollgrid } from 'scrollgrid/react';
import 'scrollgrid/style.css';

export function CustomerGrid({ customers }) {
    const ref = useRef(null);

    return (
        <div style={{ height: 400 }}>
            <Scrollgrid
                ref={ref}
                data={customers}
                headerRows={1}
                autoResize
                onCellClick={(_event, cell) => {
                    console.log('clicked', cell.rowIndex, cell.columnIndex, cell.value);
                }}
                style={{ height: '100%', width: '100%' }}
            />
        </div>
    );
}
```

## Props

| Prop | Type | Notes |
|------|------|-------|
| `data` | `Array<Array<unknown>>` or `DataAdapter` | Same as `options.data` in the vanilla API. Updates re-fire `instance.data(...)`. |
| `headerRows`, `footerRows`, `headerColumns`, `footerColumns` | `number` | Sticky header / footer counts. |
| `rowHeight`, `headerRowHeight`, `footerRowHeight` | `number` | Per-band row heights in px. |
| `defaultColumnWidth`, `cellPadding`, `dragHandleWidth`, `sortIconSize` | `number` | Pixel sizes. |
| `allowColumnResizing`, `allowSorting` | `boolean` | Defaults to `true`. |
| `formatRules` | `FormatRule[]` | Re-applied when the prop changes. |
| `cellWaitText` | `string` | Placeholder shown while async adapters resolve. |
| `autoResize` | `boolean` | Subscribes to `window.resize`. |
| `verticalAlignment` | `'top' \| 'middle' \| 'bottom'` | Used when a fixed size leaves spare room. |
| `onCellClick`, `onCellDblClick`, `onCellMouseOver`, … | `(event, cell) => void` | Registered via `instance.on(...)`. |
| `style`, `className` | standard React props | Applied to the outer `<div>`. |

## Imperative API via `ref`

```jsx
const ref = useRef(null);
// ...
ref.current.refresh(true);                  // full redraw, keep cache
ref.current.formatRules([...newRules]);
ref.current.addFormatRules([{ row: '1', column: '*', backgroundStyle: 'hi' }]);
ref.current.data(newArray);                 // replace the data outside of props
```

`ref.current` is the live Scrollgrid instance — every public method is
available.

## Custom cell renderers in React

The renderer callback runs **outside** React, so don't return JSX from it.
Use `d3-selection` (the same selection object the grid hands you) to draw
into the SVG group:

```jsx
const formatRules = useMemo(() => [{
    row: '*', column: '3',
    renderForeground(group, cell) {
        group.selectAll('rect.bar').remove();
        group.append('rect')
            .attr('class', 'bar')
            .attr('width', (cell.value / 1000) * cell.boxWidth)
            .attr('height', cell.boxHeight - 4)
            .attr('y', 2)
            .attr('fill', '#0a66c2');
    },
}], []);

return <Scrollgrid data={rows} formatRules={formatRules} />;
```

Memoise the rule array so React doesn't reapply on every render.

## Bundling notes

The React wrapper is published as a separate entry point. Bundlers (Vite,
webpack, Next.js, Remix, etc.) tree-shake it cleanly:

* Importing from `'scrollgrid'` does **not** pull in React.
* Importing from `'scrollgrid/react'` adds the wrapper (~1 KB) plus the
  base Scrollgrid module.

Next.js / SSR: Scrollgrid measures the DOM, so it must render client-side.
Wrap the component with `next/dynamic` and `ssr: false`, or guard with a
mount effect.
