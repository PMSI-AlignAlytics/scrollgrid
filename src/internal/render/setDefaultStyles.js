
// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/render/setDefaultStyles.js
Scrollgrid.prototype.internal.render.setDefaultStyles = function () {
    "use strict";

    // Define default classes, these are kept external as users might want to use their own
    this.style = {
        left: {
            panel: 'sg-grid sg-fixed sg-left'
        },
        top: {
            panel: 'sg-grid sg-fixed sg-top',
            left: {
                panel: 'sg-grid sg-fixed sg-top sg-left'
            },
            right: {
                panel: 'sg-grid sg-fixed sg-top sg-right'
            }
        },
        right: {
            panel: 'sg-grid sg-fixed sg-right'
        },
        bottom: {
            panel: 'sg-grid sg-fixed sg-bottom',
            left: {
                panel: 'sg-grid sg-fixed sg-bottom sg-left'
            },
            right: {
                panel: 'sg-grid sg-fixed sg-bottom sg-right'
            }
        },
        main: {
            panel: 'sg-grid'
        },
        resizeHandle: 'sg-resize-handle',
        cellBackgroundPrefix: 'sg-cell-background-',
        cellForegroundPrefix: 'sg-cell-foreground-',
        sortIcon: 'sg-sort-icon'
    };

};