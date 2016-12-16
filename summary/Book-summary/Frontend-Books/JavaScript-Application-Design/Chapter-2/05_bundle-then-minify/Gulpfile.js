'use strict';
var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var pump = require('pump');

gulp.task('concat:js', function () {
  return gulp.src('public/js/**/*.js')
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('build/js/'))
});

gulp.task('uglify:bundle', function (cb) {
  pump([
    gulp.src('build/js/bundle.js'),
    uglify(),
    rename('bundle.min.js'),
    gulp.dest('build/js/')
  ], cb);
});
