var gulp 		= require('gulp');
var browserify 	= require('browserify');
var del 		= require('del');
var rename 		= require('gulp-rename');
var gutil 		= require('gulp-util');
var source 		= require('vinyl-source-stream');
var buffer 		= require('vinyl-buffer');
var sourcemaps 	= require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var handlebars	= require('gulp-handlebars');
var concat		= require('gulp-concat');
var declare		= require('gulp-declare');
var wrap		= require('gulp-wrap');

gulp.task('browserSync', ['build'], function () {
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
	alias: ['node_modules/rendr-handlebars/index.js:rendr-handlebars'],
	aliasMappings: [{
		cwd: 'app/',
		src: ['**/*.js'],
		dest: 'app/'
	}],
	shim: {
		jquery: {
			path: 'assets/vendor/jquery-1.9.1.min.js',
			exports: '$'
		}
	},
	app: {
		src: ['app/**/*.js'],
		dest: 'public/bundle.js'
	}
};
gulp.task('browserify', ['clean:build'], function () {
	return browserify('app.js', browserifySet)
			.bundle()
			.pipe(source('bundle.js'))
			.pipe(buffer())
			.pipe(sourcemaps.init({loadMaps: true}))
			.on('error', gutil.log.bind(gutil, 'Browserify Error'))
			.pipe(gulp.dest('public/'))
			.pipe(browserSync.reload({
				stream: true
			}));
});

gulp.task('handlebars:compile', function () {
	return gulp.src('app/templates/**/*.hbs')
		.pipe(handlebars({
			namespace: false,
			commonjs: true,
			processName: function (filename) {
				return filename.replace('app/templates/', '').replace('.hbs', '');
			}
		}))
		.pipe(wrap('Handlebars.template(<%= contents %>)'))
		.pipe(declare({
			noRedeclare: true
		}))
		.pipe(concat('compiledTemplates.js'))
		.pipe(gulp.dest('app/templates/'));
});

gulp.task('watch:app', function () {
	gulp.watch('app/**/*.js', ['browserify']);
	gulp.watch('app/**/*.mu', ['browserify']);
	gulp.watch('index.html', browserSync.reload);
});

gulp.task('build', ['browserify']);
gulp.task('default', ['browserSync', 'watch:app']);
