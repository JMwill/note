var gulp = require('gulp');
var filter = require('gulp-filter');
var del = require('del');
var concat = require('gulp-concat');
var concatJson = require('./src/concat.json');
var strip = require('gulp-strip-comments');
var minify = require('gulp-minify');

gulp.task('clean', function(cb) {
    del([ './dist/**' ])
    .then(function() {
       cb();
    });
});

gulp.task('compile-sass', function() {
    gulp.src('./src/sass/*.sass')
        //.pipe(sass())
        .pipe(gulp.dest('./src/stylesheets'));
});

gulp.task('concat-js', ['clean'], function() {
    return gulp.src(concatJson.js)
        .pipe(concat('app.js'))
        .pipe(minify({
            ext: {
                src: '-debug.js',
                min: '.min.js'
            }
        }))
        // .pipe(strip())
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('concat-css', ['clean'], function() {
    return gulp.src(concatJson.css)
        .pipe(concat('app.css'))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('move-html', ['clean'], function() {
    return gulp.src('./src/*.html')
        .pipe(gulp.dest('./dist'));
});

gulp.task('move-img', ['clean'], function() {
    gulp.dest('./dist/assets');
    return gulp.src('src/assets/**/*', { base: 'src' })
        .pipe(gulp.dest('./dist'));
});

gulp.task('filter-act', function() {
	var jsFilter = filter("**/*.js", { restore: true });
  	var cssFilter = filter("**/*.css", { restore: true });
  	var htmlFilter = filter('**/*.html', { restore: true });

    return gulp.src(['./src/**'])
        
        //合并html里面的js/css
        .pipe(htmlFilter)
        .pipe(htmlFilter.restore)

		//压缩js
        .pipe(jsFilter)
        .pipe(jsFilter.restore)

        //压缩css
        .pipe(cssFilter)
        .pipe(cssFilter.restore)

        //输出
        .pipe(gulp.dest('./dist'));
});

gulp.task('default', ['concat-css', 'concat-js', 'move-html', 'move-img']);

gulp.task('watch', function () {
   gulp.watch('./src/**', ['default']);
});
