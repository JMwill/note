'use strict';
var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('concat:js', function () {
  return gulp.src('./public/js/**/*.js')
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('./build/js/'));
});
