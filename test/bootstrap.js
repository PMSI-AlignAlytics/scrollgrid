
// Call init to build the name spaces.  Code under test is loaded for each test in turn
var tests = ["/base/src/init.js"],
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
        'mock': '../test/mock/scrollgrid',
        'd3': '../test/mock/d3',
        'init': '../src/init',
        'internal': '../src/internal',
        'dom': '../src/internal/dom',
        'interaction': '../src/internal/interaction',
        'render': '../src/internal/render',
        'sizes': '../src/internal/sizes',
        'events': '../src/internal/events',        
        'external': '../src/external',
        'adapters': '../src/external/adapters'
    },

    // ask Require.js to load these files (all our tests)
    deps: tests,

    // start test run, once Require.js is done
    callback: window.__karma__.start

});
