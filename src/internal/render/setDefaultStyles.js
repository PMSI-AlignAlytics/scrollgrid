
// Copyright: 2015 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/render/setDefaultStyles.js
Scrollgrid.prototype.internal.render.setDefaultStyles = function () {
    "use strict";

    // Define default classes, these are kept external as users might want to use their own
    this.style = {
        left: {
            panel: 'sg-fixed sg-left'
        },
        top: {
            panel: 'sg-fixed sg-top',
            left: {
                panel: 'sg-fixed sg-top-left'
            },
            right: {
                panel: 'sg-fixed sg-top-right'
            }
        },
        right: {
            panel: 'sg-fixed sg-right'
        },
        bottom: {
            panel: 'sg-fixed sg-bottom',
            left: {
                panel: 'sg-fixed sg-bottom-left'
            },
            right: {
                panel: 'sg-fixed sg-bottom-right'
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