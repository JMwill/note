var gulp = require('gulp');
var browserify = require('gulp-browserify');
var del = require('del');
var rename = require('rename');
var gutil = require('gulp-util');

gulp.task('clean:build', function () {
	return del(['build']);
});

var browserifySet = {
	debug: !gulp.env.production
};
gulp.task('browserify', function () {
	return browserify('build/js/bundle.js')
			.bundle()
			.on('error', gutil.log.bind(gutil, 'Browserify Error'))
			.pipe(gulp.dest('app/'));
});
gulp.task('browserify:debug', ['clean:build'], function () {
	return browserify('build/js/bundle.js', {debug: !gulp.env.production})
			.bundle()
			.on('error', gutil.log.bind(gutil, 'Browserify Error'))
			.pipe(gulp.dest('app/'));
});

gulp.task('watch:app', function () {
	return gulp.watch('app/**/*.js', ['browserify'])
});

gulp.task('build', ['browserify:debug']);
gulp.task('default', ['build', 'watch:app']);