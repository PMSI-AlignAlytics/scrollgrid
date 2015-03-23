### Scrollgrid ###

Scrollgrid is the first fully featured grid control for web built in SVG using [d3](http://d3js.org).  As well as the core behaviours you would expect of any grid control, Scrollgrid also offers:

* Dynamic viewport - meaning only the portion of the table you can see is rendered in the DOM.  This gives really high performance on large data sets.
* Multiple sticky and fixed headers and/or footers on rows and/or columns.
* Support for custom renderers - Scrollgrid is built in d3 (the language of charting on the web) so it has simple built in support for any d3 based cell graphics (sparklines etc).  It's dynamic viewport means that only a handful of cells will be rendered at a time, meaning graphics can be drawn for large datasets without any slow down.
* Custom number/date formatters - Provide a d3 formatter or write your own to manipulate number display however you like.
* Column sorting - Built in sorting is overridable by passing custom predicates.  This means you can even sort columns with row graphics.
