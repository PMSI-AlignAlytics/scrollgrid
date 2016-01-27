### Advanced Styling

##### Grid Regions

You can use CSS for the general styling of your grid. For all styling it is important to remember that Scrollgrid is built in SVG and therefore some of the CSS attributes might differ from those you are used to.  Below is a list of all the main grid region classes, each of which relates to one or more SVG elements containing an area of the grid. 
    
*   `.sg-grid` refers to all of the main SVG elements containing grid components.  Style rules for the grid should usually appear first as this selector will apply equally to areas covered by all the other selectors below.
*   `.sg-fixed` refers to all the fixed elements of the grid.  This means any fixed row headers, row footers, column headers or column footers.  it does not apply to the scrollable area.  It should appear before any of the more specific selectors below.
*   `.sg-top` refers to any fixed header row.
*   `.sg-right` refers to any fixed footer row.
*   `.sg-left` refers to any fixed header column.
*   `.sg-right` refers to any fixed footer column.
*   `.sg-top.sg-left` combining these selectors in this way applies to just the intersection of the fixed header rows and fixed header columns.
*   `.sg-top.sg-right` combining these selectors in this way applies to just the intersection of the fixed header rows and fixed footer columns.
*   `.sg-bottom.sg-left` combining these selectors in this way applies to just the intersection of the fixed footer rows and fixed header columns.
*   `.sg-bottom.sg-right` combining these selectors in this way applies to just the intersection of the fixed footer rows and fixed footer columns.

Each of the selectors above will identify an SVG containing scrollgrid elements.  Therefore to use them they should be combined with a sub selector for either the cell background or the cell text, for example setting the background and text for a grand total in the bottom left would be done like this:

    .sg-bottom.sg-right rect {
        /* Set the grand total cell in the bottom right to have a red background with a yellow border - yuck! */
        fill: red;
        stroke: yellow;
    }
    .sg-bottom.sg-right text {
        /* Set the grand total text in the bottom right to be white and bold */
        fill: white;
        font-weight: 800;
    }
    
##### Specific Cells

As well as the styling for regions of the grid, it's possible to pick out specific cells or ranges in CSS using the following classes:

*   `.sg-cell-background-r%ROW_INDEX%` where `%ROW_INDEX%` is a 1-based row index. Refers to the cell background rectangles for a particular row.  For example to style just the 5th row of the table you would use `.sg-cell-background-r5`.
*   `.sg-cell-background-c%COL_INDEX%` where `%COL_INDEX%` is a 1-based column index. Refers to the cell background rectangles for a particular column.  For example to style just the 3rd column of the table you would use `.sg-cell-background-c3`.
*   `.sg-cell-background-r%ROW_INDEX%.sg-cell-background-c%COL_INDEX%` combining the two selectors above in this way refers to a single cell's background rectangle. For example to style the background of a single cell at row 5 and column 3 you would use `.sg-cell-background-r5.sg-cell-background-c3`.  
*   `.sg-cell-foreground-r%ROW_INDEX%` where `%ROW_INDEX%` is a 1-based row index. Refers to the cell foreground text for a particular row.  For example to style just the 5th row of the table you would use `.sg-cell-foreground-r5`.
*   `.sg-cell-foreground-c%COL_INDEX%` where `%COL_INDEX%` is a 1-based column index. Refers to the cell foreground text for a particular column.  For example to style just the 3rd column of the table you would use `.sg-cell-foreground-c3`.
*   `.sg-cell-foreground-r%ROW_INDEX%.sg-cell-background-c%COL_INDEX%` combining the two selectors above in this way refers to a single cell's foreground text. For example to style the text of a single cell at row 5 and column 3 you would use `.sg-cell-foreground-r5.sg-cell-foreground-c3`.  

Unlike the region selectors above, these refer directly to an SVG Rect object (in the case of the background selectors) or an SVG Text object (in the case of the foreground selectors) so should NOT be used with a sub selection.  Therefore in order to style the font and cell colour of a specific cell at column 7 and row 8 you would use:

    .sg-cell-background-r8.sg-cell-background-c7 {
        /* Style the cell with a grey background and a black border */
        fill: grey;
        stroke: black;
    }
    .sg-cell-foreground-r8.sg-cell-foreground-c7 {
        /* Style the text to be pink, sans-serif and massive */
        fill: pink;
        font-family: sans-serif;
        font-size: 30pt;
    }
    
##### Other Elements

The classes above apply to cell styling but it is also possible (and necessary) to style other element of the grid:

*   `.sg-resize-handle` If you have resizable columns (which is default if there are fixed headers), Scrollgrid will create SVG rect objects with which you can interact.  These will by default be visible and not very attractive so it's a good idea to style them using this class.
*   `.sg-sort-icon` This refers to the up or down caret displayed in a header when sorting a column.  It refers an SVG path object so is only really useful for colouring.  In order to change the size you should use the [sort icon size](#sortIconSize) option, or to completely change the look of it you can override the [Scrollgrid.internal.render.sortIcon](#Scrollgrid.internal.render.sortIcon) function with your own d3 rendering.

So to format the resize handles to be hidden until you hover over them, you could set the CSS as follows:

    rect.sg-resize-handle {
        opacity: 0;
        cursor: col-resize;
        fill: grey;
        stroke: none;
    }
    rect.sg-resize-handle:hover {
        opacity: 0.5;
    }
    
NB. The `rect` prefix is included here to increase the specificity of the selector meaning it doesn't get overridden by any region selectors like `.sg-fixed rect`.
  
##### Overriding Default Classes

If the classes discussed above don't suit your needs it is possible to override them with whichever class(es) you desire once the scrollgrid is initialised.  Once set it is important to refresh, however passing `true` to the `maintainCache` parameter will mean this is a very lightweight redraw:
  
    var sg = Scrollgrid.init('#gridContainer', { 
        data: data,
        ...
    });
    sg.style.left.panel = 'my-custom-left-panel-class';
    sg.refresh(true);
    
As well as overriding default classes it's possible to add additional classes to either background or foreground shapes using format rules.  Format rules are the way that Scrollgrid allows you to identify a cell or range of cells in your table and customise it's behavior.

There is much more detail on how to apply and use format rules [here](#formatRules). As an example of how to set a specific class to a few cells, here is an example:
 
     var sg = Scrollgrid.init('#gridContainer', { 
         data: data,
         formatRules: [
             { row: "2,4:6", column: "6, 8", backgroundStyle: "my-custom-cell" },
             { row: "3:6", column: "2", foregroundStyle: "my-custom-text" },
             { row: "*", column: "*", foregroundStyle: "my-text-class-for-everything" }
         ],
         ...
     });
         
See the [format rules documentation](#formatRules) for greater detail on the selectors, but this example adds the `my-custom-cell` class to the SVG cell background rectangles for the cells at [2,6], [2,8], [4,6], [4,8], [5,6], [5,8], [6,6] and [6,8].  It also adds the class `my-custom-text` to the SVG text in the cells at [3,2], [4,2], [5,2] and [6,2].  It also adds the `my-text-class-for-everything` class to all cells.  Note that the cells identified by the second rule will have the standard classes, the `my-custom-text` class and the `my-text-class-for-everything` class.

By applying classes with the format rules it's possible to set classes based on the end of the grid as well as the start.  E.g.

     var sg = Scrollgrid.init('#gridContainer', { 
         data: data,
         formatRules: [
             { row: "-3:-1", column: "*", backgroundStyle: "last-three-rows" },
         ],
         ...
     });

Here we apply the `last-three-rows` class to (as you may have guessed) the last three rows, using the negative format rules.  This will apply regardless of how many rows are in the table - useful for data-sets where size is variable.

Using a range to a negative allows us to exclude a fixed number of rows/columns where we don't know the size of the table:

     var sg = Scrollgrid.init('#gridContainer', { 
         data: data,
         formatRules: [
             { row: "4:-4", column: "*", backgroundStyle: "middle-of-the-table" },
         ],
         ...
     });
         
Here the `middle-of-the-table` class is applied to every row EXCEPT the first 3 and the last 3 regardless of the number of rows in your data.

##### Going Beyond CSS

If you really want to make a grid like no other you can customise it using your own rendering for either the background, the foreground, or even a new layer inbetween.
  
All these are done using [format rules](#formatRules), meaning you can apply them to specific cells, ranges or the whole grid.  For example if you wanted to make the third column of your grid out of ellipses instead of rectangles, you can do so by specifying a custom background render:

     var sg = Scrollgrid.init('#gridContainer', { 
         data: data,
         formatRules: [{ 
             row: "*", 
             column: "3", 
             renderBackground: function (g, viewData) {
                 g.append("ellipse")
                     .attr("class", viewData.backgroundStyle)
                     .attr("width", viewData.boxWidth)
                     .attr("height", viewData.boxHeight);
             }
         }],
         ...
     });
     
Here the usual cell rectangle is replaced with an ellipse for every cell background in column 3.  The viewData parameter supplies all the information Scrollgrid has about the cell meaning you can - for example - set the cell background based on value.  For more information about using this please see the documentation on [renderBackground](#renderBackground), [renderForeground](#renderForeground) or [renderBetween](#renderBetween).
