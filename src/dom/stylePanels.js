export function stylePanels(self, style) {
    if (style) self.style = style;
    const { elements, style: s } = self;
    elements.left.svg.attr('class', s.left.panel);
    elements.top.svg.attr('class', s.top.panel);
    elements.right.svg.attr('class', s.right.panel);
    elements.bottom.svg.attr('class', s.bottom.panel);
    elements.top.left.svg.attr('class', s.top.left.panel);
    elements.top.right.svg.attr('class', s.top.right.panel);
    elements.bottom.left.svg.attr('class', s.bottom.left.panel);
    elements.bottom.right.svg.attr('class', s.bottom.right.panel);
    elements.main.svg.attr('class', s.main.panel);
}
