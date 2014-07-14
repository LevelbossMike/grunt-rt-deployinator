/*
 * grunt-rt-deployinator
 * https://github.com/michael/grunt-rt-deployinator
 *
 * Copyright (c) 2014 Michael Klein
 * Licensed under the MIT license.
 */

'use strict';

var Deploy = require('deployinator');
var RSVP = require('rsvp');

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('upload', 'Grunt task for lightning fast deployments of JavaScript Apps.', function() {
    var done = this.async();

    var options = this.options({});

    var deploy = new Deploy(options);

    var success = function() {
      grunt.log.ok('Upload: ' + deploy.key +  ' successful!');
      done();
    };

    var error = function() {
      grunt.log.error('Error! Upload not successful!');
      grunt.log.error('Did you try to upload a already uploaded SHA?');
      grunt.log.error('Please run `grunt listUploads` to investigate.');
      done();
    };

    var fileExists = function(filepath) {
      if (!grunt.file.exists(filepath)) {
        grunt.log.warn('Source file "' + filepath + '" not found.');
        return false;
      } else {
        return true;
      }
    };

    var deployFileContent = function(filepath) {
      deploy.upload(grunt.file.read(filepath))
        .then(success, error);
    };

    var deployFile = function(file) {
      file.src.filter(fileExists).forEach(deployFileContent);
    };

    this.files.forEach(deployFile);
  });

  grunt.registerMultiTask('listUploads', 'Grunt task to list all <manifestSize> deploys', function() {
    var done = this.async();

    var options = this.options({});

    var deploy = new Deploy(options);

    var promises = {
      uploads: deploy.listUploads(),
      current: deploy.getCurrent()
    };

    RSVP.hash(promises).then(function(results) {
      grunt.log.ok('Last ' + deploy.manifestSize + ' deploys:\n');
      grunt.log.ok('');
      grunt.log.ok('|    Git-SHA');
      grunt.log.ok('|');
      results.uploads.forEach(function(key) {
        var prefix = (key === results.current) ? '| => ' : '|    ';
        grunt.log.ok(prefix + key + '\n');
      });
      grunt.log.ok('');
      grunt.log.ok('# => - current');
      done();
    });
  });

  grunt.registerMultiTask('deploy', 'Deploy this shit', function(key) {
    var done = this.async();

    var options = this.options({});

    var deploy = new Deploy(options);

    var success = function() {
      grunt.log.ok('Deploy successfull!');
      grunt.log.ok('Run `grunt listUploads` to see which revision is current');
      done();
    };

    var error = function() {
      grunt.log.error('Deploy failed!');
      grunt.log.error('You have to specify a valid manifest...');
      grunt.log.error('Please run `grunt listUploads` to see valid options');
      done();
    };

    deploy.setCurrent(key)
      .then(success, error);
  });

  grunt.loadNpmTasks('grunt-git-describe');

};
