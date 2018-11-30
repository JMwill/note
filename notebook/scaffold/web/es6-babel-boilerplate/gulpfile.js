var gulp            = require('gulp');
var babel           = require('gulp-babel');
var sourcemaps      = require('gulp-sourcemaps');
var concat          = require('gulp-concat');
// var browserify      = require('browserify');
// var watchify        = require('watchify');
// var babelify        = require('babelify');
var del             = require('del');
// var source          = require('vinyl-source-stream');
var browserSync     = require('browser-sync').create();

var config = {
    entryFile: './src/app.js',
    outputDir: './dest/',
    outputFile: 'app.js'
};

var paths = {
    scripts: ['src/js/**/*.js']
};

// babel process
gulp.task('babel', function() {
    return (
        gulp.src('src/**/*.js')
            .pipe(sourcemaps.init())
            .pipe(babel())
            .pipe(concat('all.js'))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest('dest/js/'))
    );
});

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
});

gulp.task('reload', ['babel'], function() {
    return browserSync.reload();
});
// clean the output directory
gulp.task('clean', function(cb){
    return del(paths.scripts)
});

gulp.task('watch', ['babel', 'browserSync'], function() {
    gulp.watch(paths.scripts, ['reload']);
    gulp.watch('index.html', ['reload']);
});

// WEB SERVER
gulp.task('serve', ['watch']);

/**
 * Backup
 */
// var bundler;
// function getBundler() {
//   if (!bundler) {
//     bundler = watchify(browserify(config.entryFile, _.extend({ debug: true }, watchify.args)));
//   }
//   return bundler;
// };

// function bundle() {
//   return getBundler()
//     .transform(babelify)
//     .bundle()
//     .on('error', function(err) { console.log('Error: ' + err.message); })
//     .pipe(source(config.outputFile))
//     .pipe(gulp.dest(config.outputDir))
//     .pipe(reload({ stream: true }));
// }

// gulp.task('build-persistent', ['clean'], function() {
//   return bundle();
// });

// gulp.task('build', ['build-persistent'], function() {
//   process.exit(0);
// });

// gulp.task('watch', ['build-persistent'], function() {
//
//   browserSync({
//     server: {
//       baseDir: './'
//     }
//   });
//
//   getBundler().on('update', function() {
//     gulp.start('build-persistent')
//   });
// });
//
// // WEB SERVER
// gulp.task('serve', function () {
//   browserSync({
//     server: {
//       baseDir: './'
//     }
//   });
// });
