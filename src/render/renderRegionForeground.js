import { select } from 'd3-selection';

export function renderRegionForeground(self, bounds, cells) {
    self.adapter.loadDataRange.call(self, bounds, (data) => {
        cells.each(function (d) {
            const group = select(this);
            d.value = data[d.visibleRow][d.visibleColumn];

            if (d.renderBetween) d.renderBetween.call(self, group, d);
            if (d.renderForeground) d.renderForeground.call(self, group, d);
        });
    });
}
