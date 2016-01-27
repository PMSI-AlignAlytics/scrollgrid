### Grid Options

Grid options allow you to apply grid wide settings either in the initialisation or after initialisation.

##### Set Options During Initialisation

All of the options covered on this page can be set in the options parameter of the `Scrollgrid.init` method.  For example here is how to set 2 header rows and 3 footer columns:

    var sg = Scrollgrid.init('#gridContainer', { 
        data: data,
        headerRows: 2,
        footerColumns: 3
    });

##### Set Options After Initialisation

Options can also be set after initialisation however refresh must also be called in order to apply them:

    var sg = Scrollgrid.init('#gridContainer', { 
        data: data
    }); 
    sg.headerRows = 2;
    sg.footerColumns = 3;
    sg.refresh();
    
##### Header Rows 

Property: *headerRows*, Type: *integer*, Default: *0*

The headerRows option sets the number of fixed rows at the top of the grid.  If the grid fits inside its parent this option will not do anything, however if the grid scrolls, the number of rows specified here will remain in place:

    /* Set two fixed header rows */
    var sg = Scrollgrid.init('#gridContainer', { data: data,
        headerRows: 2
    });
    
##### Footer Rows 

Property: *footerRows*, Type: *integer*, Default: *0*

The footerRows option sets the number of fixed rows at the bottom of the grid.  If the grid fits inside its parent this option will not do anything, however if the grid scrolls, the number of rows specified here will remain in place:

    /* Set two fixed footer rows */
    var sg = Scrollgrid.init('#gridContainer', { data: data,
        footerRows: 2
    });
    
##### Header Columns
 
Property: *headerColumns*, Type: *integer*, Default: *0*

The headerColumns option sets the number of fixed columns at the left of the grid.  If the grid fits inside its parent this option will not do anything, however if the grid scrolls, the number of columns specified here will remain in place:

    /* Set two fixed header columns */
    var sg = Scrollgrid.init('#gridContainer', { data: data,
        headerColumns: 2
    });
    
##### Footer Columns 

Property: *footerColumns*, Type: *integer*, Default: *0* 

The footerColumns option sets the number of fixed rows at the right of the grid.  If the grid fits inside its parent this option will not do anything, however if the grid scrolls, the number of columns specified here will remain in place:

    /* Set two fixed footer columns */
    var sg = Scrollgrid.init('#gridContainer', { data: data,
        footerColumns: 2
    });

##### Auto Resize 

Property: *autoResize*, Type: *boolean*, Default: *true* 

If set to `true` Scrollgrid will attach an event to the window resize, causing grid to redraw.  This may interfere with the surrounding application's resize logic and might therefore need to be set to `false` and handled externally.  This property will not account for changes in the size of the surrounding elements - if this is possible within your application you will probably need to use custom resizing.
 
Here is an example of defining a custom override for the window resize.

    /* Switch off Scrollgrid's own auto resize logic */
    var sg = Scrollgrid.init('#gridContainer', { data: data,
        autoResize: false
    });

    /* Define a customResizeHandler to invoke from the relevant application code */
    function customResizeHandler () {
        // Passing true to this parameter means Scrollgrid will just redraw the layout - not accounting for any data changes.
        sg.refresh(true);
    }
    
##### Row Height

Property: *rowHeight*, Type: *integer*, Default: *30* 

The height of the rows in the main body of the table in pixels.  To set the height of any fixed header rows or fixed footer rows you should use the [headerRowHeight](#headerRowHeight) or [footerRowHeight](#footerRowHeight) properties as appropriate.

    /* Set row height to 45 pixels */
    var sg = Scrollgrid.init('#gridContainer', { data: data,
        rowHeight: 45
    });
    
##### Drag Handle Width

Property: *dragHandleWidth*, Type: *integer*, Default: *8* 

The width of the rectangle which receives the mouse events in pixels to begin dragging column widths.  This will usually be made invisible [via CSS](#otherElements) so can be adjusted to make the column dragging hit box larger - however if you also have column sorting (on by default) then be aware that increasing the size of the drag handle will decrease the area available to click for column sorting.
  
    /* Set a 15 pixel drag handle */
    var sg = Scrollgrid.init('#gridContainer', { data: data,
        dragHandleWidth: 15
    });
    
##### Header Row Height

Property: *headerRowHeight*, Type: *integer*, Default: *30* 

The height of any fixed header rows (defined with the [headerRows](#headerRows) property) in pixels.  To set the height of the grid body rows or fixed footer rows you should use the [rowHeight](#rowHeight) or [footerRowHeight](#footerRowHeight) properties as appropriate.

    /* Set header row height to 50 pixels */
    var sg = Scrollgrid.init('#gridContainer', { data: data,
        headerRowHeight: 50
    });
    
##### Footer Row Height

Property: *footerRowHeight*, Type: *integer*, Default: *30* 

The height of any fixed footer rows (defined with the [footerRows](#footerRows) property) in pixels.  To set the height of the grid body rows or fixed header rows you should use the [rowHeight](#rowHeight) or [headerRowHeight](#headerRowHeight) properties as appropriate.

    /* Set footer row height to 20 pixels */
    var sg = Scrollgrid.init('#gridContainer', { data: data,
        footerRowHeight: 20
    });
    
##### Default Column Width

Property: *defaultColumnWidth*, Type: *integer*, Default: *100* 

The starting width in pixels of each column, unless otherwise specified by the [columnWidth format rule](#columnWidth).  

    var sg = Scrollgrid.init('#gridContainer', { data: data,
        /* Set all columns to 200 pixels wide */
        defaultColumnWidth: 200,
        /* Set the first and last column to be 300 pixels wide */
        formatRules: [
            { row: "*", column: "1,-1", columnWidth: 300 }
        ]
    });
    
##### Cell Padding

Property: *cellPadding*, Type: *integer*, Default: *6* 

The default gap in pixels between the cell edge and its content.  This can be overridden for specific cells using the [cellPadding format rule](#cellPadding)  

    var sg = Scrollgrid.init('#gridContainer', { data: data,
        /* Set cell padding to 10 pixels wide */
        cellPadding: 10,
        /* Remove cell padding from the third row
        formatRules: [
            { row: "3", column: "*", columnWidth: 300 }
        ]
    });
     
##### Allow Column Resizing

Property: *allowColumnResizing*, Type: *boolean*, Default: *true*

If set to false, users will not ba able to interact with column widths for the table.

    /* Switch off column resizing */
    var sg = Scrollgrid.init('#gridContainer', { data: data,
        allowColumnResizing: false
    });

##### Allow Sorting

Property: *allowSorting*, Type: *boolean*, Default: *true*
         
If set to false, users will not ba able to sort table columns by clicking headers.
     
     /* Switch off sorting */
     var sg = Scrollgrid.init('#gridContainer', { data: data,
         allowSorting: false
     });