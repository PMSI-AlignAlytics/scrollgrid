import { matchRule } from './matchRule.js';

const COPYABLE_KEYS = [
    'formatter', 'alignment', 'cellPadding',
    'renderBackground', 'renderBetween', 'renderForeground',
];

export function applyRules(self, data) {
    const { properties: props } = self;
    if (!props.formatRules) return;

    for (const cell of data) {
        const r = cell.rowIndex + 1;
        const c = cell.columnIndex + 1;
        let combined = null;

        for (const rule of props.formatRules) {
            if (matchRule(rule.row, r, props.virtualOuterHeight) && matchRule(rule.column, c, props.virtualOuterWidth)) {
                if (!combined) combined = {};
                for (const key of Object.keys(rule)) {
                    if (key !== 'row' && key !== 'column') combined[key] = rule[key];
                }
            }
        }

        if (!combined) continue;

        for (const key of COPYABLE_KEYS) {
            if (combined[key] !== undefined) cell[key] = combined[key];
        }
        if (combined.backgroundStyle) cell.backgroundStyle += ` ${combined.backgroundStyle}`;
        if (combined.foregroundStyle) cell.foregroundStyle += ` ${combined.foregroundStyle}`;
    }
}
