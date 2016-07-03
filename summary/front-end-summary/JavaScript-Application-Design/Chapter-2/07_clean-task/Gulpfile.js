'use strict';
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean');
var pump = require('pump');
var rename = require('gulp-rename');

gulp.task('concat:js', function () {
  return gulp.src('public/js/**/*.js')
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('build/js/'));
});

gulp.task('uglify:bundle', function (cb) {
  pump([
    gulp.src('build/js/bundle.js'),
    uglify(),
    rename('all.min.js'),
    gulp.dest('build/js/')
  ], cb);
});

gulp.task('clean:js', function() {
  return gulp.src('build/js')
            .pipe(clean());
});

