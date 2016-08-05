import gulp from 'gulp';
import BrowserSync from 'browser-sync';
import sourcemaps from 'gulp-sourcemaps';
import sass from 'gulp-sass';
import babel from 'gulp-babel';
import del from 'del';
import eslint from 'gulp-eslint';
import scsslint from 'gulp-scss-lint';

const browserSync = BrowserSync.create();

gulp.task('browser-sync', ['clean:all'], () => {
    browserSync.init({
        server: {
            baseDir: './app'
        }
    });
});

gulp.task('sass', ['lint:css'], () =>
    gulp.src('app/src/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('app/dest/css'))
        .pipe(browserSync.stream())
);

gulp.task('babel', ['lint:js'], () =>
    gulp.src('app/src/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('app/dest/js'))
);

gulp.task('lint:js', () =>
    gulp.src('app/src/js/**/*.js')
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
);

gulp.task('lint:css', () =>
    gulp.src('app/src/scss/**/*.scss')
        .pipe(scsslint({
            config: '.scss-lint.yml',
            reporterOutput: 'scssReport.json'
        }))
);

gulp.task('clean:build', () =>
    del([
        'app/build/css/**',
        'app/build/js/**'
    ])
);

gulp.task('clean:dest', () =>
    del([
        'app/dest/css/**',
        'app/dest/js/**'
    ])
);

gulp.task('clean:all', ['clean:build', 'clean:dest']);
gulp.task('serve', ['babel', 'sass', 'browser-sync'], () => {
    gulp.watch('app/src/scss/**/*.scss', ['sass']);
    gulp.watch('app/src/js/**/*.js', ['babel']);
    gulp.watch('app/**/*.html').on('change', browserSync.reload);
});
