/*
 * grunt-rt-deployinator
 * https://github.com/michael/grunt-rt-deployinator
 *
 * Copyright (c) 2014 Michael Klein
 * Licensed under the MIT license.
 */

'use strict';

var manifestOptions = {
  manifest: 'runtastic',
  manifestSize: 10
};

var redisConfigDev = {
  host: 'localhost',
  port: 6379
};

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    deploy: {
      options: manifestOptions,

      dev: {
        options: {
          storeConfig: redisConfigDev
        },
        files: [
          { src: 'test/fixtures/index.html' }
        ]
      }
    },

    listDeploys: {
      options: manifestOptions,

      dev: {
        options: {
          storeConfig: redisConfigDev
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // By default, lint and run all tests.
  grunt.registerTask('default', ['deploy:dev']);
};
