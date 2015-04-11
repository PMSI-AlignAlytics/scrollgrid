// Karma configuration
// Generated on Mon Apr 06 2015 00:05:46 GMT+0100 (GMT Daylight Time)

module.exports = function(config) {
    config.set({
      basepath: '',
      frameworks: ['jasmine', 'requirejs'],
      files: [
        'test/bootstrap.js',
        { pattern: 'lib/*.min.js', included: false },
        { pattern: 'tmp/*.js', included: false },
        { pattern: 'test/mock/*.js', included: false },
        { pattern: 'test/mock/**/*.js', included: false },
        { pattern: 'test/spec/**/*.spec.js', included: false }
      ],
      reporters: ['progress'],
      port: 9876,
      colors: true,
      browsers: ['PhantomJS']
    });
};
