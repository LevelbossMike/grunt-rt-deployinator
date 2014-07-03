/*
 * grunt-rt-deployinator
 * https://github.com/michael/grunt-rt-deployinator
 *
 * Copyright (c) 2014 Michael Klein
 * Licensed under the MIT license.
 */

'use strict';

var Deploy = require('deployinator');

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('deploy', 'Grunt task for lightning fast deployments of JavaScript Apps.', function() {
    var done = this.async();

    var options = this.options({});

    var deploy = new Deploy(options);

    var success = function(value) {
      grunt.log.ok('Deploy: ' + deploy.timestamp +  ' successful!');
      done();
    };

    var error = function(error) {
      grunt.log.error('Error! Deploy not successful! Reason: '+ error);
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
      deploy.deploy(grunt.file.read(filepath))
        .then(success, error);
    };

    var deployFile = function(file) {
      file.src.filter(fileExists).forEach(deployFileContent);
    };

    this.files.forEach(deployFile);
  });

  grunt.registerMultiTask('listDeploys', 'Grunt task to list all <manifestSize> deploys', function() {
    var done = this.async();

    var options = this.options({});

    var deploy = new Deploy(options);

    var success = function(value) {
      grunt.log.ok('Last ' + deploy.manifestSize + ' deploys:\n\n' + value.join('\n'));
      done();
    };

    var error = function(error) {
      grunt.log.error('Error! Listing deploys failed: ' + error);
    };

    deploy.listDeploys()
      .then(success, error);
  });

};
