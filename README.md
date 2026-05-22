# Scrollgrid

Scrollgrid is an SVG-based grid control with a **virtual viewport**: only the
cells you can actually see are mounted in the DOM, so it stays fast on data
sets that would melt a normal `<table>`.

* **Virtual viewport** – tested with adapters representing a billion rows.
* **Multiple sticky headers / footers** on any side.
* **Custom cell renderers** – Scrollgrid is built on `d3-selection`, so you
  can drop sparklines, mini-bars or any other SVG into a cell.
* **Custom formatters** – pass any function (`Intl.NumberFormat`,
  `d3-format`, your own) per cell, row, column or rule.
* **Column sorting** – built-in numeric / date / lex comparison, override
  with a custom comparator.
* **React wrapper** – ships as a separate entry point (`scrollgrid/react`).

## Install

```bash
npm install scrollgrid d3-selection d3-drag
```

`d3-selection` and `d3-drag` are peer dependencies so you can dedupe them
with anything else in your tree.

## Quick start (vanilla JS)

```js
import { Scrollgrid } from 'scrollgrid';
import 'scrollgrid/style.css'; // optional default styling

Scrollgrid.init('#myTable', {
    data: [
        ['Header A', 'Header B', 'Header C'],
        [100, 200, 300],
        [400, 500, 600],
    ],
    headerRows: 1,
    autoResize: true,
});
```

## Quick start (React)

```jsx
import { Scrollgrid } from 'scrollgrid/react';
import 'scrollgrid/style.css';

export function MyGrid({ rows }) {
    return (
        <Scrollgrid
            data={rows}
            headerRows={1}
            autoResize
            onCellClick={(_event, cell) => console.log(cell)}
            style={{ height: 400, width: '100%' }}
        />
    );
}
```

The component exposes the underlying instance through `ref`, so you can call
`ref.current.refresh()`, `ref.current.formatRules([...])`, etc.

## Data adapters

The shortest path is to pass a 2-D array — the bundled `simpleAdapter` is
used automatically. For records, use the JSON adapter:

```js
import { Scrollgrid, jsonAdapter } from 'scrollgrid';

const grid = Scrollgrid.init('#myTable', {
    data: jsonAdapter(records),     // first row becomes the auto-detected header
    headerRows: 1,
});
```

For very large or remote data, supply your own adapter:

```js
const adapter = {
    rowCount: () => totalRows,
    columnCount: () => totalCols,
    sort(column, headers, footers, descending, compareFn) { /* ... */ },
    loadDataRange({ top, bottom, left, right }, callback) {
        fetch(`/api/cells?...`).then((r) => r.json()).then(callback);
    },
};
```

## Format rules

```js
Scrollgrid.init('#myTable', {
    data,
    headerRows: 1,
    formatRules: [
        { row: '1', column: '*', alignment: 'center' },     // header row centred
        { row: '*', column: '-1', formatter: (v) => `£${v.toFixed(2)}` },
        { row: '2(2)-1', column: '*', backgroundStyle: 'striped' },
        { row: '1', rowHeight: 48 },                       // taller header
        { row: '*', column: '3', columnWidth: 200 },       // wider column
    ],
});
```

Row / column selectors support `*`, single indices (`3`), ranges (`3:5`),
negative offsets (`-1`, `-2:-1`), every-nth (`1(2)-1`) and any combination
separated by commas. See [docs/gridOptions.md](docs/gridOptions.md) for the
full option list.

`rowHeight` on a rule mirrors `columnWidth`: the rule's `column` is
ignored for height purposes — only the `row` selector matters, and the
last matching rule wins. Layout uses a cumulative-offset prefix sum so
scroll-position lookup stays O(log rowCount) regardless of how many
rules vary the row height.

## Custom cell rendering

Inside a format rule you can override the SVG that gets drawn for matching
cells. The callback runs with `this === scrollgrid` and receives the cell's
group selection (`d3-selection`) plus a metadata object.

```js
formatRules: [{
    row: '*', column: '3',
    renderForeground(group, cell) {
        group.append('rect')
            .attr('width', (cell.value / max) * cell.boxWidth)
            .attr('height', cell.boxHeight - 4)
            .attr('y', 2)
            .attr('fill', '#0a66c2');
    },
}]
```

## Building from source

```bash
npm install
npm run dev      # Vite dev server with examples
npm test         # Vitest
npm run build    # emits dist/scrollgrid.js (ESM), dist/scrollgrid.umd.cjs (UMD), and dist/react.{js,cjs}
```

## What changed from the 0.x line

* Distributed as ES modules; UMD bundle still available for `<script>` use.
* Built against **`d3-selection` 3.x and `d3-drag` 3.x** instead of the
  bundled D3 v3. Side-effect: there's no longer a need to pull in the full
  `d3` package — only `d3-selection` and `d3-drag` are required.
* `Scrollgrid.adapters.simple` / `.json` are still available, plus the new
  named exports `simpleAdapter` / `jsonAdapter` for tree-shakable builds.
* `Scrollgrid.destroy()` cleans up the resize listener and DOM (no more
  clobbered `window.onresize`).
* Cell-level pointer events go through `document.elementFromPoint` instead
  of the (now-removed) `SVGSVGElement.getIntersectionList` API.
* React component at `scrollgrid/react`.

The public API is otherwise unchanged: the same instance methods
(`data`, `refresh`, `on`, `formatRules`, `addFormatRules`, …) and the same
options object.

## Licence

MIT — see [MIT-LICENCE.txt](MIT-LICENCE.txt).
