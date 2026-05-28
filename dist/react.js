import f, { useRef as d, useImperativeHandle as w, useEffect as u } from "react";
import { Scrollgrid as h } from "./scrollgrid.js";
const p = /* @__PURE__ */ new Set([
  "rowHeight",
  "dragHandleWidth",
  "headerRowHeight",
  "footerRowHeight",
  "defaultColumnWidth",
  "cellPadding",
  "allowColumnResizing",
  "allowSorting",
  "headerRows",
  "footerRows",
  "headerColumns",
  "footerColumns",
  "formatRules",
  "cellWaitText",
  "sortIconSize",
  "autoResize",
  "verticalAlignment"
]);
function v(c) {
  const n = {};
  for (const t of Object.keys(c))
    p.has(t) && (n[t] = c[t]);
  return n;
}
const M = {
  onCellClick: "click",
  onCellDblClick: "dblclick",
  onCellMouseDown: "mousedown",
  onCellMouseUp: "mouseup",
  onCellMouseOver: "mouseover",
  onCellMouseOut: "mouseout",
  onCellMouseMove: "mousemove",
  onCellContextMenu: "contextmenu"
}, y = f.forwardRef(function(n, t) {
  const {
    data: l,
    style: m,
    className: R,
    gridRef: S,
    ...r
  } = n, i = d(null), e = d(null);
  return w(t, () => e.current, [e.current]), u(() => {
    const g = v(r), o = new h({
      ...g,
      target: i.current,
      data: l
    });
    e.current = o;
    for (const [s, C] of Object.entries(M)) {
      const a = r[s];
      a && o.on(C, a);
    }
    return o.refresh(), () => {
      var s;
      return (s = o.destroy) == null ? void 0 : s.call(o);
    };
  }, []), u(() => {
    e.current && l !== void 0 && e.current.data(l);
  }, [l]), u(() => {
    e.current && r.formatRules && e.current.formatRules(r.formatRules);
  }, [r.formatRules]), /* @__PURE__ */ f.createElement("div", { ref: i, className: R, style: m });
});
export {
  y as Scrollgrid,
  y as default
};
//# sourceMappingURL=react.js.map
