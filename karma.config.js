module.exports = function(config) {
  config.set({
    basepath: '',
    frameworks: ['jasmine', 'requirejs'],
    files: [
      'test/bootstrap.js',
      { pattern: 'test/mock/*.js', included: false },
      { pattern: 'test/spec/**/*.spec.js', included: false },
      { pattern: 'src/*.js', included: false },
      { pattern: 'src/**/*.js', included: false }
    ],
    reporters: ['progress','coverage'],
    preprocessors: {
      'src/internal/**/*.js': ['coverage'],
      'src/external/**/*.js': ['coverage']
    },
    port: 9876,
    colors: true,
    browsers: ['PhantomJS'],
    coverageReporter: {
      reporters: [
        {
          type: 'lcov',
          dir: 'coverage/',
          subdir: '.',
          instrumenter: {
            '**/*.js': 'istanbul'
          }
        },
        {
          type: 'text-summary',
          instrumenter: {
            '**/*.js': 'istanbul'
          }
        }
      ]
    }
  });
};
