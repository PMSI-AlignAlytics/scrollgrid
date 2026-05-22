import { select } from 'd3-selection';

import { populatePanel } from './populatePanel.js';

export function populateDOM(self) {
    const elems = self.elements;

    elems.parent = select(self.target);
    elems.container = elems.parent.append('div');

    elems.left = populatePanel(self);
    elems.top = populatePanel(self);
    elems.top.left = populatePanel(self);
    elems.top.right = populatePanel(self);
    elems.main = populatePanel(self);

    elems.main.viewport = elems.container.append('div');

    elems.right = populatePanel(self);
    elems.bottom = populatePanel(self);
    elems.bottom.left = populatePanel(self);
    elems.bottom.right = populatePanel(self);

    // The scroller is sized to match the *virtual* (full) data area so the
    // native scroll-bars behave as if everything were rendered.
    elems.main.scroller = elems.main.viewport.append('div');
}
