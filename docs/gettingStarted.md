### Getting Started

##### Setting up the HTML

The requirements for the HTML are very simple.  Scrollgrid occupies a single DIV which should be identifiable either by a unique class or an id, in the example below the grid can be referenced as `#gridContainer`.

    <html>
        <head>...</head>
        <body>
            ...
            <div id="gridContainer"></div>
        </body>
    </html>
    
In order to position and size the grid, simply set the usual properties of the parent `DIV`.  By default Scrollgrid will redraw whenever the window resize event is fired. i.e. whenever the browser size is changed. If this behaviour is not desired it can be switched off by setting the [Auto Resize option](#autoResize) to `false`.  In order to manually invoke a redraw from any of your own custom layout handling, simply call the [refresh](#Scrollgrid.refresh) function passing `true` to the `maintainCache` parameter.  

Because Scrollgrid relies on element measuring using `SVG`, it's essential that the parent `DIV` is not set to `display: none`, please use `visibility: hidden` instead.  If working with a third party library which sets `display: none` beyond your control, there is no option but to render Scrollgrid on a displayed surface (which could be set to `visibility: hidden`) and immediately move it to the hidden surface after rendering.  If taking this approach it is recommended that you set the [Auto Resize option](#autoResize) to `false` and handle resizing manually being sure to only draw when the surface is displayed.   

##### Initialising Scrollgrid

Once the target element is defined in your HTML you can initialise a Scrollgrid using the [init](#Scrollgrid.init) method.  To define an empty Scrollgrid in a `DIV` with an `id` of `gridContainer` just call `init` as follows:
   
    Scrollgrid.init('#gridContainer');
   
This will set up the DOM, and you will be able to inspect it in your browser's development tools but without data nothing will be visible.  The data can be inserted separately using the [Scrollgrid.data](Scrollgrid.data) function, or you can include them in the `options` parameter of the `init` call as follows:
 
    Scrollgrid.init('#gridContainer', {
        data: [
            ["My",  "Test", "Data],
            [100,   200,    300],
            [400,   500,    600],
            [700,   800,    900]
        ]
    });
    
As well as data, all [grid options](#options) can be set in the `options` parameter of the [init](#Scrollgrid.init) method. For example setting a single fixed header row could be done like this:
 
    Scrollgrid.init('#gridContainer', {
        data: [
            ["My",  "Test", "Data],
            [100,   200,    300],
            [400,   500,    600],
            [700,   800,    900]
        ],
        headerRows: 1
    });


##### Basic Styling

Scrollgrid doesn't enforce any styling by default so it will be necessary to include some style rules in your CSS.  When defining CSS for Scrollgrid, remember that it is NOT built with standard HTML elements, in order to achieve the flexible rendering options, every element is rendered in SVG and therefore requires SVG CSS, which differs the rules you may be used to.

All of the cells in the grid are inside SVG containers classed `sg-grid` so the most basic CSS selectors to style the grid are:

*   `sg-grid rect`: Applicable to the default background rectangle for each cell in the main scrollable area of the table. This is an SVG `rect` element so background color should be set with `fill` and line color with `stroke`.
*   `sg-grid text`: Applicable to the default foreground text for each cell in the main scrollable area of the table. This is an SVG `text` element so text color should be set with `fill`.     

Also the resize handles will be visible but unstyled by default, however these can be restyled using the `sg-resize-handle` class.  Again this is an SVG `rect` object so please be aware that SVG CSS will be required when styling.  

With no styles defined your grid will be black all over, so as a bare minimum you should use something like this in your site CSS:
    
    .sg-grid rect {
        fill: white;
        stroke: grey;
    }
    .sg-grid text {
        fill: black;
        font-family: sans-serif;
        font-size: 12px;
    }
    rect.sg-resize-handle {
        opacity: 0;
        cursor: col-resize;
        fill: grey;
        stroke: none;
    }
    rect.sg-resize-handle:hover {
        opacity: 0.5;
    }

This is of course just an example of the ways these classes can be used, also if you wish to style more specific areas there are a number of other classes which can be used, these are listed and described [here](#advancedStyling).

As well CSS styling, Scrollgrid allows you to completely customise your grid using your own [d3 rendering](#beyondCss) for any elements - including cell foregrounds and backgrounds.  These custom renderers can be easily applied to any specific cell(s) or range(s) using [format rules](#formatRules).

