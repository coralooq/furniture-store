const {src, dest, parallel, series, watch} = require('gulp');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass')(require('sass'));
const cleancss = require('gulp-clean-css');
const clean = require('gulp-clean');

function browsersync() {
    browserSync.init({
        server: {
            baseDir: ['public/', 'frontend/']
        }
    })
};

function scripts() {
    return src('frontend/js/*.js')
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(dest('./public/'))
    .pipe(browserSync.stream())
};

function styles () {
    return src('frontend/sass/*.sass')
    .pipe(sass())
    .pipe(concat('style.css'))
    .pipe(dest('./public/'))
    .pipe(browserSync.stream())
}

function startwatch() {
    watch('frontend/**/*.js', scripts);

    watch('frontend/sass/*.sass', styles);

    watch('public/*.html').on('change', browserSync.reload);
}

function cleandir() {
    return src('public', {allowEmpty: true}.pipe(clean()))
}

exports.styles = styles;
exports.scripts = scripts;
exports.browsersync = browsersync;
exports.cleandir = cleandir;

exports.build = series(cleandir, styles, scripts);
exports.default = parallel(styles, scripts, browsersync, startwatch);
