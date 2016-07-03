'use strict';
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var pump = require('pump');
var rename = require('gulp-rename');


gulp.task('uglify', function (cb) {
  pump([
    gulp.src('public/js/foo.js'),
    uglify(),
    rename('foo.min.js'),
    gulp.dest('build/js')
  ], cb);
});
