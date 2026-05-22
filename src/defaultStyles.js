export function defaultStyles() {
    return {
        left: { panel: 'sg-grid sg-fixed sg-left' },
        top: {
            panel: 'sg-grid sg-fixed sg-top',
            left: { panel: 'sg-grid sg-fixed sg-top sg-left' },
            right: { panel: 'sg-grid sg-fixed sg-top sg-right' },
        },
        right: { panel: 'sg-grid sg-fixed sg-right' },
        bottom: {
            panel: 'sg-grid sg-fixed sg-bottom',
            left: { panel: 'sg-grid sg-fixed sg-bottom sg-left' },
            right: { panel: 'sg-grid sg-fixed sg-bottom sg-right' },
        },
        main: { panel: 'sg-grid' },
        resizeHandle: 'sg-resize-handle',
        cellBackgroundPrefix: 'sg-cell-background-',
        cellForegroundPrefix: 'sg-cell-foreground-',
        sortIcon: 'sg-sort-icon',
    };
}
