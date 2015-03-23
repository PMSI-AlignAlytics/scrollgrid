
    // Copyright: 2015 AlignAlytics
    // License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
    // Source: /src/internal/render/setDefaultStyles.js
    Scrollgrid.prototype.internal.render.setDefaultStyles = function () {

        // Define default classes, these are kept external as users might want to use their own
        this.style = {
            left: {
                panel: 'gi-fixed gi-left'
            },
            top: {
                panel: 'gi-fixed gi-top',
                left: {
                    panel: 'gi-fixed gi-top-left'
                },
                right: {
                    panel: 'gi-fixed gi-top-right'
                }
            },
            right: {
                panel: 'gi-fixed gi-right',
                left: {
                    panel: 'gi-fixed gi-top-left'
                }
            },
            bottom: {
                panel: 'gi-fixed gi-bottom',
                left: {
                    panel: 'gi-fixed gi-bottom-left'
                },
                right: {
                    panel: 'gi-fixed gi-bottom-right'
                }
            },
            main: {
                panel: 'gi-grid'
            },
            resizeHandle: 'gi-resize-handle',
            cellBackgroundPrefix: 'gi-cell-background-',
            cellForegroundPrefix: 'gi-cell-foreground-'
        };

    };