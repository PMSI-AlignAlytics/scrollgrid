import { select as x } from "d3-selection";
import { drag as A } from "d3-drag";
function $(i, e) {
  const t = i.reporter ?? console;
  if (t != null && t.error)
    t.error(e);
  else
    throw new Error(e);
}
function N() {
  return {
    left: { panel: "sg-grid sg-fixed sg-left" },
    top: {
      panel: "sg-grid sg-fixed sg-top",
      left: { panel: "sg-grid sg-fixed sg-top sg-left" },
      right: { panel: "sg-grid sg-fixed sg-top sg-right" }
    },
    right: { panel: "sg-grid sg-fixed sg-right" },
    bottom: {
      panel: "sg-grid sg-fixed sg-bottom",
      left: { panel: "sg-grid sg-fixed sg-bottom sg-left" },
      right: { panel: "sg-grid sg-fixed sg-bottom sg-right" }
    },
    main: { panel: "sg-grid" },
    resizeHandle: "sg-resize-handle",
    cellBackgroundPrefix: "sg-cell-background-",
    cellForegroundPrefix: "sg-cell-foreground-",
    sortIcon: "sg-sort-icon"
  };
}
function y(i) {
  const e = i.elements.container.append("svg"), t = e.append("g"), o = t.append("g");
  return { svg: e, transform: t, content: o };
}
function _(i) {
  const e = i.elements;
  e.parent = x(i.target), e.container = e.parent.append("div"), e.left = y(i), e.top = y(i), e.top.left = y(i), e.top.right = y(i), e.main = y(i), e.main.viewport = e.container.append("div"), e.right = y(i), e.bottom = y(i), e.bottom.left = y(i), e.bottom.right = y(i), e.main.scroller = e.main.viewport.append("div");
}
function V(i, e) {
  const { properties: t, elements: o, columns: r } = i;
  t.physicalLeft = 0;
  for (let n = 0; n < t.virtualLeft; n += 1)
    t.physicalLeft += r[n].width;
  t.physicalTotalInnerWidth = 0;
  for (let n = t.virtualLeft; n < t.virtualOuterWidth - t.virtualRight; n += 1)
    t.physicalTotalInnerWidth += r[n].width;
  t.physicalRight = 0;
  for (let n = t.virtualOuterWidth - t.virtualRight; n < t.virtualOuterWidth; n += 1)
    t.physicalRight += r[n].width;
  const s = t.rowOffsets;
  if (s && s.length === t.virtualOuterHeight + 1) {
    const n = t.virtualOuterHeight - t.virtualBottom;
    t.physicalTop = s[t.virtualTop], t.physicalBottom = s[t.virtualOuterHeight] - s[n], t.physicalTotalInnerHeight = s[n] - s[t.virtualTop];
  } else
    t.physicalTop = t.virtualTop * t.headerRowHeight, t.physicalBottom = t.virtualBottom * t.footerRowHeight, t.physicalTotalInnerHeight = (t.virtualInnerHeight ?? 0) * t.rowHeight;
  t.physicalVisibleInnerWidth = o.container.node().offsetWidth - t.physicalLeft - t.physicalRight, t.physicalVisibleInnerHeight = o.container.node().offsetHeight - t.physicalTop - t.physicalBottom - e;
}
function j(i, e, t, o) {
  const r = e.text();
  e.text(e.datum().originalText ?? e.text());
  const s = e.node().getBBox(), n = s.width + 2 * t + o;
  return n > i.width && (i.width = n), s.height > i.height && (i.height = s.height), e.text(r), i;
}
function Y(i, e, t, o) {
  const { properties: r } = i;
  let s = { width: 0, height: 0 };
  return e.selectAll("text").filter((n) => (t === void 0 || n.columnIndex === t) && o === void 0).each(function(n) {
    const a = n.sortIcon && n.sortIcon !== "none" ? r.sortIconSize + n.cellPadding : 0;
    s = j(s, x(this), n.cellPadding, a);
  }), s;
}
function G(i, e) {
  const { elements: t } = i, o = [
    t.top.left,
    t.top,
    t.top.right,
    t.left,
    t.main,
    t.right,
    t.bottom.left,
    t.bottom,
    t.bottom.right
  ];
  e.width = 0;
  for (const r of o)
    e.width = Math.max(e.width, Y(i, r.svg, e.index).width);
  i.refresh(!0);
}
function X(i) {
  return A().subject((e, t) => t).on("start", function(e) {
    U(x(this), e);
  }).on("drag", function(e, t) {
    q(i, x(this), t, e);
  }).on("end", function() {
    K(x(this));
  });
}
function U(i, e) {
  var t, o;
  (o = (t = e.sourceEvent) == null ? void 0 : t.stopPropagation) == null || o.call(t), i.classed("dragging", !0);
}
function q(i, e, t, o) {
  t.width -= t.x - o.x, t.x = o.x, t.width < 0 && (t.width = 0), e.attr("x", t.x), i.refresh(!0);
}
function K(i) {
  i.classed("dragging", !1);
}
const O = ".sg-no-style--handle-selector";
function I(i, e, t, o) {
  const { properties: r, style: s, columns: n } = i;
  let a = o ?? 0;
  e.content.selectAll(O).remove(), e.content.selectAll(O).data(n.slice(t.left, t.right)).enter().append("rect").attr("class", `sg-no-style--handle-selector ${s.resizeHandle}`).attr("transform", `translate(${-1 * r.dragHandleWidth / 2}, 0)`).attr("x", (c) => (a += c.width, c.x = a, c.x)).attr("y", 0).attr("width", r.dragHandleWidth).attr("height", r.physicalTop).on("dblclick", (c, h) => G(i, h)).call(X(i));
}
function R(i, e, t) {
  if (!i || i === "*") return !0;
  const o = String(i).replace(/\s/g, "").split(",");
  for (const r of o) {
    const s = r.indexOf(":"), n = r.match(/(-?\d+)\((\d+)\)(-?\d+)/);
    let a, c, h = 1;
    s !== -1 ? (a = parseFloat(r.substring(0, s)), c = parseFloat(r.substring(s + 1))) : n && n.length === 4 ? (a = parseFloat(n[1]), h = Math.max(parseFloat(n[2]), 1), c = parseFloat(n[3])) : (a = parseFloat(r), c = a), a = a < 0 ? t + a + 1 : a, c = c < 0 ? t + c + 1 : c;
    const l = Math.min(a, c), u = Math.max(a, c);
    if (l <= e && u >= e && (e - l) % h === 0)
      return !0;
  }
  return !1;
}
function Q(i) {
  const { properties: e } = i, t = e.virtualOuterHeight ?? 0;
  if (t <= 0) {
    e.rowOffsets = new Float64Array(1);
    return;
  }
  const o = (e.formatRules ?? []).filter((h) => h.rowHeight !== void 0), r = new Float64Array(t + 1), { virtualTop: s = 0, virtualBottom: n = 0 } = e, a = t - n;
  let c = 0;
  for (let h = 0; h < t; h += 1) {
    r[h] = c;
    let l;
    h < s ? l = e.headerRowHeight : h < a ? l = e.rowHeight : l = e.footerRowHeight;
    for (const u of o)
      R(u.row, h + 1, t) && (l = u.rowHeight);
    c += l;
  }
  r[t] = c, e.rowOffsets = r;
}
function L(i, e) {
  const { properties: t } = i, o = t.rowOffsets, r = t.virtualTop ?? 0, s = t.virtualBottom ?? 0, a = o[r] + e;
  let c = r, h = t.virtualOuterHeight - s;
  if (h <= c) return 0;
  for (; c < h; ) {
    const l = c + h + 1 >>> 1;
    o[l] <= a ? c = l : h = l - 1;
  }
  return c - r;
}
function J(i, e) {
  const { properties: t, columns: o } = i, r = t.rowOffsets, s = L(i, e.top), n = L(i, e.bottom), a = {
    physical: { x: 0, y: 0 },
    virtual: {
      top: Math.max(s - 1, 0),
      bottom: Math.min(n + 1, t.virtualInnerHeight ?? 0)
    }
  }, c = r ? r[t.virtualTop ?? 0] : 0, h = (t.virtualTop ?? 0) + a.virtual.top, l = r ? r[h] - c : a.virtual.top * t.rowHeight;
  a.physical.y = l - e.top;
  let u = 0, p, d;
  for (let g = 0; g < t.virtualInnerWidth; g += 1) {
    const m = o[g + t.virtualLeft].width;
    if (p === void 0 && (g === t.virtualInnerWidth - 1 || u + m > e.left) && (p = g, a.physical.x = u - e.left), d === void 0 && (g === t.virtualInnerWidth - 1 || u + m > e.right)) {
      d = g + 1;
      break;
    }
    u += m;
  }
  return a.virtual.left = Math.max(Math.floor(p), 0), a.virtual.right = Math.min(Math.ceil(d + 1), t.virtualInnerWidth), a;
}
function Z(i) {
  const e = i.elements.main.viewport.node(), t = e.scrollLeft, o = e.scrollTop;
  return {
    left: t,
    top: o,
    right: t + e.clientWidth,
    bottom: o + e.clientHeight
  };
}
function D(i, e, t) {
  e.attr("data-row", t.rowIndex).attr("data-col", t.columnIndex);
  for (const { type: o, listener: r } of i.eventHandlers)
    e.on(o, r);
}
function tt(i, e) {
  let t;
  return Number.isNaN(Number(i)) || Number.isNaN(Number(e)) ? t = new Date(i) - new Date(e) : t = parseFloat(i) - parseFloat(e), Number.isNaN(t) && (t = i < e ? -1 : i > e ? 1 : 0), t;
}
function S(i, e, t) {
  const { columns: o, properties: r } = i;
  for (let s = 0; s < o.length; s += 1)
    s !== e ? delete o[s].sort : t && (o[s].sort = o[s].sort === "desc" ? "asc" : "desc");
  i.adapter.sort(
    e,
    r.virtualTop,
    r.virtualBottom,
    o[e].sort === "desc",
    o[e].compareFunction ?? tt
  ), i.refresh(!1);
}
function et(i, e, t) {
  e.append("rect").attr("width", t.boxWidth).attr("height", t.boxHeight).style("opacity", 0).style("cursor", "pointer").on("click", () => S(i, t.columnIndex, !0));
}
function ot(i, e) {
  const { properties: t } = i, o = t.rowOffsets;
  return o && o.length > e + 1 ? o[e + 1] - o[e] : e < t.virtualTop ? t.headerRowHeight : e < t.virtualOuterHeight - t.virtualBottom ? t.rowHeight : t.footerRowHeight;
}
const it = [
  "formatter",
  "alignment",
  "cellPadding",
  "renderBackground",
  "renderBetween",
  "renderForeground"
];
function rt(i, e) {
  const { properties: t } = i;
  if (t.formatRules)
    for (const o of e) {
      const r = o.rowIndex + 1, s = o.columnIndex + 1;
      let n = null;
      for (const a of t.formatRules)
        if (R(a.row, r, t.virtualOuterHeight) && R(a.column, s, t.virtualOuterWidth)) {
          n || (n = {});
          for (const c of Object.keys(a))
            c !== "row" && c !== "column" && (n[c] = a[c]);
        }
      if (n) {
        for (const a of it)
          n[a] !== void 0 && (o[a] = n[a]);
        n.backgroundStyle && (o.backgroundStyle += ` ${n.backgroundStyle}`), n.foregroundStyle && (o.foregroundStyle += ` ${n.foregroundStyle}`);
      }
    }
}
function nt(i, e, t) {
  var n;
  const { properties: o, columns: r } = i, s = {
    x: 0,
    y: 0,
    boxHeight: 0,
    boxWidth: 0,
    textHeight: 0,
    textWidth: 0
  };
  return (e < o.virtualTop || e >= o.virtualOuterHeight - o.virtualBottom) && t === o.virtualOuterWidth - o.virtualRight - 1 && (s.boxWidth += o.verticalScrollbarWidth), (t < o.virtualLeft || t >= o.virtualOuterWidth - o.virtualRight) && e === o.virtualOuterHeight - o.virtualBottom - 1 && (s.boxHeight += o.horizontalScrollbarHeight), e === o.virtualTop - 1 && (s.boxHeight -= 1), e === o.virtualTop && e > 0 && (s.boxHeight += 1, s.y -= 1), t === o.virtualLeft - 1 && (s.boxWidth -= 1), t === o.virtualLeft && t > 0 && (s.boxWidth += 1, s.x -= 1), e === o.virtualOuterHeight - 1 && (s.boxHeight -= 1), t === o.virtualOuterWidth - 1 && (s.boxWidth -= 1), e === o.virtualTop - 1 && (s.sortIcon = (n = r[t]) == null ? void 0 : n.sort), s;
}
function st(i, e) {
  i.append("rect").attr("class", e.backgroundStyle).attr("width", e.boxWidth).attr("height", e.boxHeight);
}
function lt(i, e) {
  let t = i.node().getBBox().width;
  const o = i.text(), r = t / o.length;
  let s = Math.ceil(e / r) + 1;
  if (i.datum().originalText = o, s <= 0) {
    i.text("");
    return;
  }
  for (; t > e && s >= 0; )
    i.text(s === 0 ? "" : o.substring(0, s)), t = i.node().getBBox().width, s -= 1;
}
function at(i, e) {
  const t = e.sortIcon && e.sortIcon !== "none" ? i.properties.sortIconSize + e.cellPadding : 0, o = `${e.textWidth - e.cellPadding - t}px`, r = `${e.textHeight - e.cellPadding}px`;
  return `polygon(0px 0px, ${o} 0px, ${o} ${r}, 0px ${r})`;
}
function ct(i) {
  return i.alignment === "center" ? "middle" : i.alignment === "right" ? "end" : "start";
}
function ht(i, e) {
  const { properties: t } = i;
  if (e.alignment === "center") return e.textWidth / 2;
  if (e.alignment === "right") return e.textWidth - e.cellPadding;
  let o = e.cellPadding;
  return e.sortIcon && e.sortIcon !== "none" && (o += t.sortIconSize + e.cellPadding), o;
}
const ut = ".sg-no-style--text-selector";
function dt(i, e) {
  const t = this, { properties: o } = t;
  i.selectAll(ut).remove();
  const r = i.append("text").attr("class", `sg-no-style--text-selector ${e.foregroundStyle}`).attr("dy", "0.35em").attr("x", ht(t, e)).attr("y", e.textHeight / 2).style("text-anchor", ct(e)).style("clip-path", at(t, e));
  if (r.text(e.formatter ? e.formatter(e.value) : e.value), !r.node().style.clipPath) {
    const n = e.sortIcon && e.sortIcon !== "none" ? o.sortIconSize + e.cellPadding : 0;
    lt(r, e.textWidth - e.cellPadding - n);
  }
}
function gt(i, e) {
  const { properties: t, columns: o } = i, r = [];
  let s = e.startY ?? 0, n = 0, a = 0;
  for (let c = e.top ?? 0; c < (e.bottom ?? 0); c += 1) {
    const h = ot(i, c);
    let l = e.startX ?? 0, u = 0;
    for (let p = e.left ?? 0; p < (e.right ?? 0); p += 1, n += 1) {
      const d = nt(i, c, p), g = o[p], b = {
        x: Math.floor(l) + d.x + 0.5,
        y: Math.floor(s) + d.y + 0.5,
        visibleRow: a,
        visibleColumn: u,
        boxWidth: Math.ceil(g.width) + d.boxWidth,
        boxHeight: Math.ceil(h) + d.boxHeight,
        textWidth: Math.ceil(g.width) + d.textWidth,
        textHeight: Math.ceil(h) + d.textHeight,
        backgroundStyle: `${i.style.cellBackgroundPrefix}r${c + 1} ${i.style.cellBackgroundPrefix}c${p + 1}`,
        foregroundStyle: `${i.style.cellForegroundPrefix}r${c + 1} ${i.style.cellForegroundPrefix}c${p + 1}`,
        sortIcon: d.sortIcon ?? "none",
        cellPadding: t.cellPadding,
        alignment: "left",
        rowIndex: c,
        columnIndex: p,
        column: g,
        formatter: null,
        renderForeground: dt,
        renderBetween: null,
        renderBackground: st
      };
      b.key = `${b.columnIndex}_${b.rowIndex}_${b.boxHeight}_${b.boxWidth}_${b.sortIcon}`, r[n] = b, u += 1, l += g.width;
    }
    a += 1, s += h;
  }
  return rt(i, r), r;
}
function pt(i, e, t) {
  i.adapter.loadDataRange.call(i, e, (o) => {
    t.each(function(r) {
      const s = x(this);
      r.value = o[r.visibleRow][r.visibleColumn], r.renderBetween && r.renderBetween.call(i, s, r), r.renderForeground && r.renderForeground.call(i, s, r);
    });
  });
}
function ft(i, e) {
  const t = e.append("path").attr("class", i.style.sortIcon), o = i.properties.sortIconSize;
  e.datum() === "asc" ? t.attr("d", `M ${o / 2} 0 L ${o} ${o} L 0 ${o} z`) : e.datum() === "desc" && t.attr("d", `M 0 0 L ${o} 0 L ${o / 2} ${o} z`);
  const r = t.node().getBBox();
  t.attr("transform", `translate(${r.width / -2},${r.height / -2})`);
}
function mt(i, e, t, o) {
  const { properties: r } = i;
  o && (e.textWidth <= e.cellPadding + r.sortIconSize || t.append("g").datum(e.sortIcon).attr("class", "sg-no-style--sort-icon-selector").attr("transform", `translate(${e.cellPadding + r.sortIconSize / 2},${e.textHeight / 2})`).call((s) => ft(i, s)));
}
const B = ".sg-no-style--cell-selector";
function v(i, e, t, o, r, s) {
  if ((o.left ?? 0) === (o.right ?? 0) || (r.top ?? 0) === (r.bottom ?? 0)) return;
  const { properties: n, elements: a } = i, c = {
    startX: t.x ?? 0,
    startY: t.y ?? 0,
    top: r.top ?? 0,
    bottom: r.bottom ?? 0,
    left: o.left ?? 0,
    right: o.right ?? 0
  }, h = gt(i, c);
  s && e.content.selectAll(B).remove();
  const l = e.content.selectAll(B).data(h, (d) => d.key), p = l.enter().append("g").attr("class", "sg-no-style--cell-selector").each(function(d) {
    const g = x(this);
    d.renderBackground && d.renderBackground.call(i, g, d), mt(i, d, g, !(d.sortIcon === void 0 || d.sortIcon === "none"));
    const m = e === a.top || e === a.top.left || e === a.top.right;
    n.allowSorting && m && et(i, g, d), D(i, g, d);
  }).merge(l);
  pt(i, c, p), p.attr("transform", (d) => `translate(${d.x},${d.y})`), l.exit().remove();
}
function P(i, e, t) {
  const { properties: o, elements: r } = i, s = Z(i), n = J(i, s), a = n.physical, c = n.virtual, h = {
    top: { top: 0, bottom: o.virtualTop },
    middle: { top: o.virtualTop + c.top, bottom: o.virtualTop + c.bottom },
    bottom: { top: o.virtualOuterHeight - o.virtualBottom, bottom: o.virtualOuterHeight }
  }, l = {
    left: { left: 0, right: o.virtualLeft },
    middle: { left: o.virtualLeft + c.left, right: o.virtualLeft + c.right },
    right: { left: o.virtualOuterWidth - o.virtualRight, right: o.virtualOuterWidth }
  };
  if (v(i, r.top.left, {}, l.left, h.top, e), v(i, r.top, { x: a.x }, l.middle, h.top, e), v(i, r.top.right, {}, l.right, h.top, e), v(i, r.left, { y: a.y }, l.left, h.middle, e), v(i, r.main, { x: a.x, y: a.y }, l.middle, h.middle, e), v(i, r.right, { y: a.y }, l.right, h.middle, e), v(i, r.bottom.left, {}, l.left, h.bottom, e), v(i, r.bottom, { x: a.x }, l.middle, h.bottom, e), v(i, r.bottom.right, {}, l.right, h.bottom, e), o.allowColumnResizing && (I(i, r.top.left, l.left), I(i, r.top, l.middle, a.x), I(i, r.top.right, l.right)), t) {
    const u = {}, p = o.physicalLeft + o.physicalTotalInnerWidth + o.physicalRight + o.verticalScrollbarWidth;
    u.width = p < r.parent.node().offsetWidth ? p : null;
    const d = o.physicalTop + o.physicalTotalInnerHeight + o.physicalBottom + o.horizontalScrollbarHeight;
    u.height = d < r.parent.node().offsetHeight ? d : null, k(i, u);
  }
}
function yt(i, e, t) {
  const { verticalAlignment: o } = i.properties;
  return !(e != null && e.height) || !t ? 0 : o === "middle" ? (t.node().offsetHeight - e.height) / 2 : o === "bottom" ? t.node().offsetHeight - e.height - 1 : 0;
}
function vt(i) {
  const { elements: e } = i;
  i._redirectorState || (i._redirectorState = { lastDatum: null });
  const t = i._redirectorState, o = /* @__PURE__ */ new Set([
    "click",
    "dblclick",
    "mousedown",
    "mouseup",
    "contextmenu"
  ]), r = (l) => {
    var m;
    const u = e.main.viewport.node(), p = u.style.pointerEvents;
    u.style.pointerEvents = "none";
    const d = document.elementFromPoint(l.clientX ?? 0, l.clientY ?? 0);
    if (u.style.pointerEvents = p, !d) return null;
    let g = d;
    for (; g && g !== document.body && !((m = g.hasAttribute) != null && m.call(g, "data-row")); )
      g = g.parentNode;
    return !g || g === document.body ? null : x(g).datum();
  }, s = (l, u) => l === u ? !0 : !l || !u ? !1 : l.rowIndex === u.rowIndex && l.columnIndex === u.columnIndex, n = (l, u, p) => {
    if (p)
      for (const { type: d, listener: g } of i.eventHandlers)
        d === l && g(u, p);
  }, a = (l) => {
    const u = r(l);
    s(u, t.lastDatum) || (t.lastDatum && n("mouseout", l, t.lastDatum), u && n("mouseover", l, u)), t.lastDatum = u, u && n("mousemove", l, u);
  }, c = (l) => {
    t.lastDatum && (n("mouseout", l, t.lastDatum), t.lastDatum = null);
  };
  e.main.viewport.on("mousemove", a), e.main.viewport.on("mouseleave", c);
  const h = /* @__PURE__ */ new Set();
  for (const { type: l } of i.eventHandlers)
    o.has(l) && !h.has(l) && (h.add(l), e.main.viewport.on(l, (u) => {
      const p = r(u);
      p && n(l, u, p);
    }));
}
function H(i, e, t, o, r) {
  return i.style("position", "absolute").style("overflow", "hidden").style("left", `${e}px`).style("top", `${t}px`).style("width", `${o}px`).style("height", `${r}px`);
}
function W(i, e, t, o, r) {
  return i.style("overflow", r).style("position", "relative").style("margin-left", `${e}px`).style("width", `${t}px`).style("height", `${o}px`);
}
function E(i) {
  const { elements: e, properties: t } = i;
  e.main.scroller.style("width", `${t.physicalTotalInnerWidth}px`).style("height", `${t.physicalTotalInnerHeight}px`);
}
function M(i, e) {
  const { elements: t, style: o } = i;
  t.left.svg.attr("class", o.left.panel), t.top.svg.attr("class", o.top.panel), t.right.svg.attr("class", o.right.panel), t.bottom.svg.attr("class", o.bottom.panel), t.top.left.svg.attr("class", o.top.left.panel), t.top.right.svg.attr("class", o.top.right.panel), t.bottom.left.svg.attr("class", o.bottom.left.panel), t.bottom.right.svg.attr("class", o.bottom.right.panel), t.main.svg.attr("class", o.main.panel);
}
function k(i, e) {
  const { properties: t, elements: o } = i;
  o.parent.style("position", "relative");
  const r = yt(i, e, o.parent);
  o.container.style("position", "relative").style("width", e != null && e.width ? `${e.width}px` : "100%").style("height", e != null && e.height ? `${e.height}px` : "100%").style("padding-top", `${r}px`).style("font-size", 0), o.container.node().offsetWidth > o.parent.node().offsetWidth && o.container.style("width", "100%"), o.container.node().offsetHeight > o.parent.node().offsetHeight && o.container.style("margin-top", "0px").style("height", "100%"), V(i, r), H(o.left.svg, 0, t.physicalTop + r, t.physicalLeft, t.physicalVisibleInnerHeight), W(o.top.svg, t.physicalLeft, t.physicalVisibleInnerWidth, t.physicalTop, "hidden"), W(o.main.viewport, t.physicalLeft, t.physicalVisibleInnerWidth, t.physicalVisibleInnerHeight, "auto"), H(o.right.svg, t.physicalLeft + t.physicalVisibleInnerWidth, t.physicalTop + r, t.physicalRight, t.physicalVisibleInnerHeight), W(o.bottom.svg, t.physicalLeft, t.physicalVisibleInnerWidth, t.physicalBottom, "hidden"), H(o.top.left.svg, 0, r, t.physicalLeft + t.dragHandleWidth / 2, t.physicalTop), H(o.top.right.svg, t.physicalLeft + t.physicalVisibleInnerWidth - t.dragHandleWidth / 2, r, t.physicalRight + t.dragHandleWidth / 2, t.physicalTop), H(o.bottom.left.svg, 0, t.physicalTop + t.physicalVisibleInnerHeight + r, t.physicalLeft, t.physicalBottom), H(o.bottom.right.svg, t.physicalLeft + t.physicalVisibleInnerWidth, t.physicalTop + t.physicalVisibleInnerHeight + r, t.physicalRight, t.physicalBottom), H(o.main.svg, t.physicalLeft, t.physicalTop + r, t.physicalVisibleInnerWidth, t.physicalVisibleInnerHeight), M(i), o.top.right.transform.attr("transform", `translate(${t.dragHandleWidth / 2}, 0)`), o.main.viewport.on("scroll", () => P(i, !1, !1)), vt(i), E(i), t.verticalScrollbarWidth = o.main.viewport.node().offsetWidth - o.main.viewport.node().clientWidth, t.horizontalScrollbarHeight = o.main.viewport.node().offsetHeight - o.main.viewport.node().clientHeight;
}
function xt(i) {
  const e = () => i.refresh(!0);
  window.addEventListener("resize", e), i.detachResize = () => window.removeEventListener("resize", e);
}
function T(i) {
  var t;
  const { properties: e } = i;
  i.columns = i.columns ?? [];
  for (let o = 0; o < e.virtualOuterWidth; o += 1)
    if (i.columns[o] = i.columns[o] ?? {}, i.columns[o].width = i.columns[o].width ?? e.defaultColumnWidth, (t = e.formatRules) != null && t.length)
      for (const r of e.formatRules)
        R(r.column, o + 1, e.virtualOuterWidth) && (i.columns[o] = {
          width: r.columnWidth ?? i.columns[o].width,
          index: o,
          sort: r.sort ?? i.columns[o].sort,
          compareFunction: r.compareFunction ?? i.columns[o].compareFunction
        });
}
function z(i, e = {}) {
  const t = i, o = e.rowSampleSize ?? 100;
  let r = 0;
  const s = Math.min(t.length, o);
  for (let n = 0; n < s; n += 1)
    Array.isArray(t[n]) && t[n].length > r && (r = t[n].length);
  return {
    rowCount: () => t.length,
    columnCount: () => r,
    sort(n, a, c, h, l) {
      const u = t.splice(0, a), p = t.splice(t.length - c);
      t.sort((d, g) => l(d[n], g[n]) * (h ? -1 : 1));
      for (let d = u.length - 1; d >= 0; d -= 1) t.unshift(u[d]);
      for (const d of p) t.push(d);
    },
    loadDataRange(n, a) {
      const c = [];
      for (let h = n.top; h < n.bottom; h += 1) {
        const l = [];
        for (let u = n.left; u < n.right; u += 1)
          l.push(t[h][u]);
        c.push(l);
      }
      a(c);
    }
  };
}
function bt(i, e, t = {}) {
  const o = i, r = e ? [...e] : [], s = t.rowSampleSize ?? 100;
  if (r.length === 0) {
    const a = /* @__PURE__ */ new Set(), c = Math.min(o.length, s);
    for (let h = 0; h < c; h += 1)
      for (const l of Object.keys(o[h]))
        a.has(l) || (a.add(l), r.push(l));
  }
  const n = {};
  for (const a of r) n[a] = a;
  return o.splice(0, 0, n), {
    rowCount: () => o.length,
    columnCount: () => r.length,
    sort(a, c, h, l, u) {
      const p = o.splice(0, c), d = o.splice(o.length - h);
      o.sort((g, m) => u(g[r[a]], m[r[a]]) * (l ? -1 : 1));
      for (let g = p.length - 1; g >= 0; g -= 1) o.unshift(p[g]);
      for (const g of d) o.push(g);
    },
    loadDataRange(a, c) {
      const h = [];
      for (let l = a.top; l < a.bottom; l += 1) {
        const u = [];
        for (let p = a.left; p < a.right; p += 1)
          u.push(o[l][r[p]]);
        h.push(u);
      }
      c(h);
    }
  };
}
const Ht = 'target is a required field, please provide a selector string for the container. The selector string should identify a single div, e.g. "#tableContainer" where you have a div with id "tableContainer". You may also pass a DOM node directly.', wt = 'target should identify a single div, e.g. "#tableContainer" where you have a div with id "tableContainer". Please check that your selector matches exactly one div.';
class w {
  constructor(e = {}) {
    if (!e.target) {
      $(this, Ht);
      return;
    }
    const t = x(e.target);
    if (t.empty() || t.size() !== 1) {
      $(this, wt);
      return;
    }
    this.elements = {}, this.eventHandlers = [], this.properties = {}, this.columns = [];
    const o = this.properties;
    o.rowHeight = e.rowHeight ?? 30, o.dragHandleWidth = e.dragHandleWidth ?? 8, o.headerRowHeight = e.headerRowHeight ?? o.rowHeight, o.footerRowHeight = e.footerRowHeight ?? o.rowHeight, o.defaultColumnWidth = e.defaultColumnWidth ?? 100, o.cellPadding = e.cellPadding ?? 6, o.allowColumnResizing = e.allowColumnResizing ?? !0, o.allowSorting = e.allowSorting ?? !0, o.virtualTop = e.headerRows ?? 0, o.virtualBottom = e.footerRows ?? 0, o.virtualLeft = e.headerColumns ?? 0, o.virtualRight = e.footerColumns ?? 0, o.verticalAlignment = e.verticalAlignment ?? "top", this.target = e.target, this.style = N(), o.formatRules = e.formatRules ?? [], o.cellWaitText = e.cellWaitText ?? "loading...", o.sortIconSize = e.sortIconSize ?? 7, _(this), this.data(e.data ?? e.adapter), e.autoResize && xt(this);
  }
  static init(e, t = {}) {
    return new w({ ...t, target: e });
  }
  // ---------- Public API ----------
  /**
   * Replace the underlying data or adapter.  Passing an Array uses the
   * built-in {@link simpleAdapter}.  Passing an adapter object lets you
   * provide a custom source (e.g. lazy server-side paging).
   */
  data(e, t) {
    const o = this.properties;
    if (e == null)
      return this.adapter;
    this.adapter = Array.isArray(e) ? z(e) : e, o.virtualOuterHeight = this.adapter.rowCount(), o.virtualOuterWidth = this.adapter.columnCount(), T(this);
    for (let r = 0; r < this.columns.length; r += 1)
      (this.columns[r].sort === "asc" || this.columns[r].sort === "desc") && S(this, r, !1);
    return o.virtualInnerWidth = o.virtualOuterWidth - o.virtualLeft - o.virtualRight, o.virtualInnerHeight = o.virtualOuterHeight - o.virtualTop - o.virtualBottom, t || this.refresh(!1), this.adapter;
  }
  /**
   * Force a full relayout and redraw.  Pass `true` to keep cached cells
   * (used during column resize for smoother updates).
   */
  refresh(e) {
    Q(this), k(this), P(this, !e, !0), E(this);
  }
  /** Register a DOM event handler that fires for any cell `<g>`. */
  on(e, t, o) {
    return this.eventHandlers.push({ type: e, listener: t, capture: o }), this;
  }
  /** Replace and re-apply the styling map produced by {@link defaultStyles}. */
  styles(e) {
    return e === void 0 ? this.style : (this.style = e, M(this), this);
  }
  /** Cleanly remove the grid from the DOM and detach window listeners. */
  destroy() {
    var e;
    this.detachResize && (this.detachResize(), this.detachResize = null), (e = this.elements) != null && e.container && this.elements.container.remove(), this.elements = {}, this.eventHandlers = [];
  }
}
function f(i, e, { derive: t } = {}) {
  w.prototype[i] = function(o, r) {
    const s = this.properties;
    return o === void 0 ? s[e] : (s[e] = o, t && t(s), r || this.refresh(), this);
  };
}
f("rowHeight", "rowHeight");
f("headerRowHeight", "headerRowHeight");
f("footerRowHeight", "footerRowHeight");
f("cellPadding", "cellPadding");
f("dragHandleWidth", "dragHandleWidth");
f("sortIconSize", "sortIconSize");
f("allowColumnResizing", "allowColumnResizing");
f("allowSorting", "allowSorting");
const C = (i) => {
  i.virtualInnerWidth = i.virtualOuterWidth - i.virtualLeft - i.virtualRight;
}, F = (i) => {
  i.virtualInnerHeight = i.virtualOuterHeight - i.virtualTop - i.virtualBottom;
};
f("headerColumns", "virtualLeft", { derive: C });
f("footerColumns", "virtualRight", { derive: C });
f("headerRows", "virtualTop", { derive: F });
f("footerRows", "virtualBottom", { derive: F });
w.prototype.formatRules = function(i, e) {
  const t = this.properties;
  return i === void 0 ? t.formatRules : (t.formatRules = i, T(this), e || this.refresh(), this);
};
w.prototype.addFormatRules = function(i, e) {
  const t = this.properties;
  return i && (t.formatRules = t.formatRules.concat(i), T(this), e || this.refresh()), t.formatRules;
};
w.adapters = { simple: z, json: bt };
export {
  w as Scrollgrid,
  w as default,
  bt as jsonAdapter,
  z as simpleAdapter
};
//# sourceMappingURL=scrollgrid.js.map
