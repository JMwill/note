'use strict';
var gulp = require('gulp');
var sprites = require('gulp.spritesmith');
var merge = require('merge-stream');

gulp.task('sprites:icons', function () {
  var spritesData =
    gulp
      .src('public/img/icons/*.png')
      .pipe(sprites({
        imgName: 'icons.png',
        cssName: 'icons.css'
      }));

  var imgStream =
    spritesData.img
    .pipe(gulp.dest('build/img/'));

  var cssStream =
    spritesData.css
    .pipe(gulp.dest('build/css/'));

  return merge(imgStream, cssStream);
});
