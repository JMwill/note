'use strict';
var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');


gulp.task('sass:compile', function () {
  return gulp
          .src('./public/**/*.scss')
          .pipe(sass().on('error', sass.logError))
          .pipe(concat('compiled.css'))
          .pipe(gulp.dest('./build/css'));
});

gulp.task('sass:design', function () {
  return gulp
          .src('./public/**/design.scss')
          .pipe(sass().on('error', sass.logError))
          .pipe(concat('design.css'))
          .pipe(gulp.dest('./build/css'));
});

gulp.task('sass:explicit', function () {
  return gulp
          .src(['./public/**/classes.scss', './public/**/design.scss'])
          .pipe(sass().on('error', sass.logError))
          .pipe(concat('explicit.css'))
          .pipe(gulp.dest('./build/css'));
})

