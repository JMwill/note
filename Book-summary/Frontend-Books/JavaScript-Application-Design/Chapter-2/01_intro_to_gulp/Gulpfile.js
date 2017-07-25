/* jshint node: true */
'use strict';

var gulp = require('gulp');
var eslint = require('gulp-eslint');

gulp.task('eslint', function () {
	return gulp
			.src(['**/*.js', '!node_modules/**'])
			.pipe(eslint())
			.pipe(eslint.format())
			.pipe(eslint.failAfterError());
});

gulp.task('default', ['eslint']);