import { defaultComparer } from './defaultComparer.js';

export function sortColumn(self, index, toggle) {
    const { columns, properties: props } = self;

    for (let c = 0; c < columns.length; c += 1) {
        if (c !== index) {
            delete columns[c].sort;
        } else if (toggle) {
            columns[c].sort = columns[c].sort === 'desc' ? 'asc' : 'desc';
        }
    }

    self.adapter.sort(
        index,
        props.virtualTop,
        props.virtualBottom,
        columns[index].sort === 'desc',
        columns[index].compareFunction ?? defaultComparer,
    );
    self.refresh(false);
}
