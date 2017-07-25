const del       = require('del');
const pump      = require('pump');
const gulp      = require('gulp');
const sass      = require('gulp-sass');
const uplify    = require('gulp-uglify');
const minify    = require('gulp-uglify/minifier');
const concat    = require('gulp-concat');

const config    = require('./gulpconfig.json');

gulp.task('del', ['move:backup'], () => {
    del(config.del.allPath, {dryRun: true})
    .then(paths => {
        console.info(`[del:all] Deleted files and folders: \n, ${paths.join('\n')}`);
    });
});

gulp.task('del:css', () => {
    del(config.del.cssPath, {dryRun: true})
    .then(paths => {
        console.info(`[del:css] Deleted files and folders: \n, ${paths.join('\n')}`);
    });
});

gulp.task('sass', config.sass.preTask, () => {
    var opt = {};
    if (config.sass.isCompress) { opt.outputStyle = 'compressed'; }
    return gulp.src(config.sass.inPath)
        .pipe(sass(opt).on('error', sass.logError))
        .pipe(gulp.dest(config.sass.outPath));
});

gulp.task('uglify', cb => {
    pump([
        gulp.src(config.uglify.inPath),
        uglify(),
        gulp.dest(config.uglify.outPath)
    ], cb);
});

gulp.task('concat:js', ["uglify"], () => {
    return gulp.src(config.concat.js.inPath)
        .pipe(concat(config.concat.js.concatName))
        .pipe(gulp.dest(config.concat.js.outPath));
});

gulp.task('concat:css', ["sass"], () => {
    return gulp.src(config.concat.css.inPath)
        .pipe(concat(config.concat.css.concatName))
        .pipe(gulp.dest(config.concat.css.outPath));
});

/**
 * move file to dist file
 */
gulp.task('move:html', () => {
    return gulp.src(config.move.html.inPath)
        .pipe(gulp.dest(config.move.html.outPath));
});
gulp.task('move:js', ["concat:js"], () => {
    return gulp.src(config.move.js.inPath)
        .pipe(gulp.dest(config.move.js.outPath));
});
gulp.task('move:css', ["concat:css"], () => {
    return gulp.src(config.move.css.inPath)
        .pipe(gulp.dest(config.move.css.outPath));
});
gulp.task('move:backup', () => {
    return gulp.src(config.move.backup.inPath)
        .pipe(gulp.dest(config.move.backup.outPath));
});
gulp.task('move:all', ["del"], () => {
    gulp.src(config.move.backup.inPath)
        .pipe(gulp.dest(config.move.backup.outPath));
    gulp.src(config.move.css.inPath)
        .pipe(gulp.dest(config.move.css.outPath));
    gulp.src(config.move.js.inPath)
        .pipe(gulp.dest(config.move.js.outPath));
});

/**
 * watch config
 */
gulp.task('dev', ["del", "build"], () => {
    const htmlWatcher = gulp.watch(config.watch.html.path, [config.watch.html.tasks]);
    const jsWatcher  = gulp.watch(config.watch.js.path, [config.watch.js.tasks]);
    const cssWatcher = gulp.watch(config.watch.css.path, [config.watch.css.tasks]);
});

gulp.task('build', ['move:all']);
gulp.task('default', ['build']);
