
    // Copyright: 2015 AlignAlytics
    // License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
    // Source: /src/internal/render/renderRegion.js
    Scrollgrid.prototype.internal.render.renderRegion = function (target, physicalOffset, xVirtual, yVirtual) {

        var int = this.internal,
            render = int.render,
            interaction = int.interaction,
            sizes = int.sizes,
            physical = sizes.physical,
            dom = int.dom,
            data = render.getDataInBounds.call(this, {
                startX: physicalOffset.x || 0,
                startY: physicalOffset.y || 0,
                top: yVirtual.top || 0,
                bottom: yVirtual.bottom || 0,
                left: xVirtual.left || 0,
                right: xVirtual.right || 0
            });

        render.renderBackground.call(this, target.content, data);
        render.renderForeground.call(this, target.content, data);

        // Add some interaction to the headers
        if (target === dom.top || target === dom.top.left || target === dom.top.right) {
            // Add sorting
            if (interaction.allowSorting) {
                interaction.addSortButtons.call(this, target.content, data);
            }
            // Add column resizing
            if (interaction.allowColumnResizing) {
                interaction.addResizeHandles.call(this, target.content, data, target === dom.top.right && physical.totalInnerWidth > physical.visibleInnerWidth);
            }
        }

    };