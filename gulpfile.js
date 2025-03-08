const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const htmlmin = require('gulp-htmlmin');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const shell = require('gulp-shell');

gulp.task('styles', function() {
    return gulp.src('**/*.+(sass|scss|css)')
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(rename(function(path) {
            if (path.extname === '.sass' || path.extname === '.scss') {
                path.extname = '.css';
            }
        }))
        .pipe(gulp.dest(function(file) {
            return file.base;
        }));
});

gulp.task('html-minimizer', function() {
    return gulp.src('**/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(rename(function(path) {
            if (!path.basename.includes('-min')) {
                path.basename += '-min';
            }
        }))
        .pipe(gulp.dest(function(file) {
            return file.base;
        }));
});

gulp.task('minify-js', () => {
    return gulp.src(['**/*.js', '!node_modules/**', '!gulpfile.js'], { base: './' })
        .pipe(uglify())
        .pipe(rename(function(path) {
            if (!path.basename.includes('-min')) {
                path.basename += '-min';
            }
        }))
        .pipe(gulp.dest(function(file) {
            return file.base;
        }));
});

gulp.task('sync', gulp.series(
    shell.task([
        'cls'
    ]),
    'styles',
    'html-minimizer',
    'minify-js',
    shell.task([
        'python manage.py runserver'
    ])
));

gulp.task('async', gulp.series(
    shell.task([
        'cls'
    ]),
    'styles',
    'html-minimizer',
    'minify-js',
    shell.task([
        'uvicorn DjangoBlog.asgi:application --reload --port 8000'
    ])
));

gulp.task('default', gulp.series('sync'));