module.exports = function(grunt) {
    "use strict";
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            dist: {
                src: [
                    "src/begin.js",
                    "src/internal/**/*.js",
                    "src/external/**/*.js",
                    "src/end.js"
                ],
                dest: 'dist/<%= pkg.name %>.v<%= pkg.version %>.js'
            },
            test: {
                src: '<%= concat.dist.src %>',
                dest: 'tmp/<%= pkg.name %>.js'
            }
        },
        uglify: {
            dist: {
                files: {
                    'dist/<%= pkg.name %>.v<%= pkg.version %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },
        copy: {
            main: {
                files: [
                    { src: 'dist/<%= pkg.name %>.v<%= pkg.version %>.min.js', dest: 'dist/<%= pkg.name %>.latest.min.js'},
                    { src: 'dist/<%= pkg.name %>.v<%= pkg.version %>.js', dest: 'dist/<%= pkg.name %>.latest.js'}
                ]
            }
        },
        connect: {
            server: {
                options: {
                    port: 4001,
                    base: '.'
                }
            }
        },
        jslint: {
            files: [
                'Gruntfile.js',
                'test/spec/**/*.spec.js',
                'dist/<%= pkg.name %>.v<%= pkg.version %>.js'
            ],
            directives: {
                browser: true,
                predef: [
                    'd3',
                    'scrollgrid',
                    'module',
                    'console',
                    'jasmine',
                    'define',
                    'require',
                    'exports',
                    'describe',
                    'spyOn',
                    'expect',
                    'it',
                    'xdescribe',
                    'xit',
                    'beforeEach',
                    'afterEach'
                ]
            }
        },
        karma: {
            unit: {
                configFile: 'karma.config.js',
                singleRun: true
            },
            continuous: {
                configFile: 'karma.config.js',
                background: true
            }
        },
        watch: {
            src: {
                files: [
                    '<%= concat.test.src %>'
                ],
                tasks: ['concat:test', 'karma:continuous:run']
            },
            test: {
                files: [
                    'test/spec/**/*.spec.js',
                    'test/spec/*.spec.js'
                ],
                tasks: ['karma:continuous:run']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-jslint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-karma');

    // Default tasks
    grunt.registerTask('default', ['concat', 'jslint', 'concat:test', 'karma:unit', 'uglify', 'copy', 'connect']);
    grunt.registerTask('travis', ['concat', 'jslint', 'concat:test', 'karma:unit']);
    grunt.registerTask('test:unit', ['concat:test', 'karma:unit']);
    grunt.registerTask('test', ['karma:continuous:start', 'watch']);

};