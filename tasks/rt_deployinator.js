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

  grunt.registerMultiTask('rt_deployinator', 'Grunt task for lightning fast deployments of JavaScript Apps.', function() {
    var done = this.async();

    var options = this.options({});

    var deploy = new Deploy(options);

    var success = function(value) {
      console.log(value);
      grunt.log.ok('Deploy successful!');
      done();
    };

    var error = function() {
      grunt.log.error('Error: Deploy not successful!');
    };

    deploy.deploy('deployed with options')
      .then(success, error);

    // Iterate over all specified file groups.
    // this.files.forEach(function(f) {
      // // Concat specified files.
      // var src = f.src.filter(function(filepath) {
        // // Warn on and remove invalid source files (if nonull was set).
        // if (!grunt.file.exists(filepath)) {
          // grunt.log.warn('Source file "' + filepath + '" not found.');
          // return false;
        // } else {
          // return true;
        // }
      // }).map(function(filepath) {
        // // Read file source.
        // return grunt.file.read(filepath);
      // }).join(grunt.util.normalizelf(options.separator));

      // // Handle options.
      // src += options.punctuation;

      // // Write the destination file.
      // grunt.file.write(f.dest, src);

      // // Print a success message.
      // grunt.log.writeln('File "' + f.dest + '" created.');
    // });
  });

};
