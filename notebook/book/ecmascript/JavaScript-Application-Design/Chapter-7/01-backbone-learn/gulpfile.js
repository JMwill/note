var gulp 		= require('gulp');
var browserify 	= require('browserify');
var del 		= require('del');
var rename 		= require('gulp-rename');
var gutil 		= require('gulp-util');
var source 		= require('vinyl-source-stream');
var buffer 		= require('vinyl-buffer');
var sourcemaps 	= require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();

gulp.task('browserSync', function () {
	browserSync.init({
		server: {
			baseDir: './'
		}
	});
});

gulp.task('clean:build', function () {
	return del(['build/*']);
});

var browserifySet = {
	debug: !gulp.env.production,
	transform: ['brfs']
};
gulp.task('browserify', ['clean:build'], function () {
	return browserify('app/js/app.js', browserifySet)
			.bundle()
			.pipe(source('bundle.js'))
			.pipe(buffer())
			.pipe(sourcemaps.init({loadMaps: true}))
			.on('error', gutil.log.bind(gutil, 'Browserify Error'))
			.pipe(gulp.dest('build/js/'))
			.pipe(browserSync.reload({
				stream: true
			}));
});

gulp.task('watch:app', function () {
	gulp.watch('app/**/*.js', ['browserify']);
	gulp.watch('index.html', browserSync.reload);
});

gulp.task('build', ['browserify']);
gulp.task('default', ['build', 'browserSync', 'watch:app']);
