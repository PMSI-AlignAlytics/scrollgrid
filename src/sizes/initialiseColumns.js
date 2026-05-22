import { matchRule } from '../render/matchRule.js';

export function initialiseColumns(self) {
    const { properties: props } = self;
    self.columns = self.columns ?? [];

    for (let i = 0; i < props.virtualOuterWidth; i += 1) {
        self.columns[i] = self.columns[i] ?? {};
        self.columns[i].width = self.columns[i].width ?? props.defaultColumnWidth;

        if (props.formatRules?.length) {
            for (const rule of props.formatRules) {
                if (matchRule(rule.column, i + 1, props.virtualOuterWidth)) {
                    self.columns[i] = {
                        width: rule.columnWidth ?? self.columns[i].width,
                        index: i,
                        sort: rule.sort ?? self.columns[i].sort,
                        compareFunction: rule.compareFunction ?? self.columns[i].compareFunction,
                    };
                }
            }
        }
    }
}
