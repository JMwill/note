'use strict';
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean');
var jshint = require('gulp-jshint');
var rename = require('gulp-rename');
var pump = require('pump');

gulp.task('concat:js', ['lint'], function () {
  return gulp.src('public/js/**/*.js')
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('build/js/'));
});

gulp.task('uglify:bundle', ['concat:js'], function (cb) {
  pump([
    gulp.src('build/js/bundle.js'),
    uglify(),
    rename('all.min.js'),
    gulp.dest('build/js/')
  ], cb);
});

gulp.task('clean:js', function () {
  return gulp.src('build/js')
    .pipe(clean());
});

gulp.task('lint', ['clean:js'], function () {
  return gulp.src('public/js/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('js', ['uglify:bundle'], function () {
  return console.log('Task done!');
});
