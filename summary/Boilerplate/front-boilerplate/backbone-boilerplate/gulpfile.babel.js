import gulp from 'gulp';
import BrowserSync from 'browser-sync';
import sourcemaps from 'gulp-sourcemaps';
import sass from 'gulp-sass';
import babel from 'gulp-babel';
import del from 'del';
import eslint from 'gulp-eslint';

const browserSync = BrowserSync.create();

gulp.task('browser-sync', () => {
    browserSync.init({
        server: {
            baseDir: './app'
        }
    });
});

gulp.task('sass', () =>
    gulp.src('app/src/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.stream())
);

gulp.task('babel', () =>
    gulp.src('app/src/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('app/dest/js'))
);

gulp.task('babel:lint', ['babel'], () =>
    gulp.src(['app/src/js/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
)
gulp.task('clean:build', () => {
    return del([
        'app/build/**'
    ]);
});

gulp.task('clean:dest', () => {
    return del([
        'app/dest/css/**',
        'app/dest/js/**'
    ]);
});

gulp.task('clean:all', ['clean:build', 'clean:dest']);
gulp.task('serve', ['sass', 'browser-sync'], () => {
    gulp.watch('app/src/scss/*.scss', ['sass']);
    gulp.watch('app/src/js/*.js', ['babel:lint']);
    gulp.watch('app/*.html').on('change', browserSync.reload);
});

gulp.task('serve:isclean', ['clean:all', 'serve']);
