var gulp            = require('gulp');
var eslint          = require('gulp-eslint');
var browserSync     = require('browser-sync').create();
var del             = require('del');

/**
 * handler error function let browserSync run
 */
function handleError(err) {
    console.log(err.toString());
    this.emit('end');
}

/**
 * Initial browserSync and regist task
 */
gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
});

/**
 * Initial eslint task
 */
gulp.task('lint', function () {
    return gulp.src(['app/**/*.js'])
                .pipe(eslint({
                    globals: [
                        'jQuery',
                        '$'
                    ],
                    envs: ['browser']
                }))
                .pipe(eslint.format())
                .pipe(eslint.failAfterError())
                .on('error', handleError);
});

// gulp.task('reload-after-lint', ['lint'], function () {
//     browserSync.reload();
// });

/**
 * Watch task
 */
gulp.task('watch:develop', ['lint'], function () {
    gulp.watch('app/**/*.js', ['lint', browserSync.reload]);
    gulp.watch('index.html', browserSync.reload);
});

/**
 * set default task
 */
gulp.task('default', ['browser-sync', 'watch:develop']);
