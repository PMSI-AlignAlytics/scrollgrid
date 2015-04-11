
var tests = [],
    file;

for (file in window.__karma__.files) {
    if (window.__karma__.files.hasOwnProperty(file)) {
        if (/\.spec\.js$/.test(file)) {
            tests.push(file);
        }
    }
}

requirejs.config({

    // Karma serves files from '/base'
    baseUrl: '/base/src',

    paths: {
        'scrollgrid_actual': '../tmp/scrollgrid',
        'scrollgrid_mock': '../test/mock/scrollgrid',
        'd3': '../test/mock/d3'
    },

    // ask Require.js to load these files (all our tests)
    deps: tests,

    // start test run, once Require.js is done
    callback: window.__karma__.start

});