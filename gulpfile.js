const {src, dest, parallel, series, watch} = require('gulp');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass')(require('sass'));
const cleancss = require('gulp-clean-css');
const clean = require('gulp-clean');
const cssnano = require('gulp-cssnano');
const gulpPug = require('gulp-pug');


function browsersync() {
    browserSync.init({
        server: {
            baseDir: ['public/', 'frontend/']
        }
    })
};

function pug() {
    return src('frontend/pug/*.pug')
    .pipe(gulpPug())
    .pipe(dest('./public/'))
    .pipe(browserSync.stream())
}

function scripts() {
    return src('frontend/js/*.js')
    .pipe(concat('main.js'))
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
exports.pug = pug;

exports.build = series(cleandir, styles, scripts, pug);
exports.default = parallel(pug, styles, scripts, browsersync, startwatch);
