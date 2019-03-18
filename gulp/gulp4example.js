"use strict";
// Imports
const gulp = require("gulp"),
  autoprefixer = require('gulp-autoprefixer'),
  browserSync = require("browser-sync").create(),
  reload = browserSync.reload,
  sass = require('gulp-sass'),
  cleanCSS = require('gulp-clean-css'),
  sourcemaps = require('gulp-sourcemaps'),
  concat = require('gulp-concat'),
  imagemin = require('gulp-imagemin'),
  changed = require('gulp-changed'),
  uglify = require('gulp-uglify'),
  lineec = require('gulp-line-ending-corrector');

// Path variables
const root = '../app/',
  scss = root + 'assets/scss/',
  js = root + 'assets/js/',
  jsdist = root + 'dist/js/';

const styleWatchFiles = root + 'assets/css/**/*.css';

const jsSRC = [
  js + 'jquery-3.2.1.min.js',
  js + 'bootstrap.min.js',
  js + 'popper.min.js',
  js + 'aos.js',
];

const cssSRC = [
  root + 'vendor/css/bootstrap.css',
  root + 'vendor/css/aos.css'
];

const imgSRC = root + 'assets/images/*',
  imgDEST = root + 'dist/images';

function css() {
  return gulp.src([scss + 'app.scss'])
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sass({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(lineec())
    .pipe(gulp.dest('../app/dist/css/'));
}

function concatCSS() {
  return gulp.src(cssSRC)
    .pipe(sourcemaps.init({
      loadMaps: true,
      largeFile: true
    }))
    .pipe(concat('style.min.css'))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write())
    .pipe(lineec())
    .pipe(gulp.dest(scss));
}

function javascript() {
  return gulp.src(jsSRC)
    .pipe(concat('vendor.js'))
    .pipe(uglify())
    .pipe(lineec())
    .pipe(gulp.dest(jsdist));
}

function imgmin() {
  return gulp.src(imgSRC)
    .pipe(changed(imgDEST))
    .pipe(imagemin([
      imagemin.gifsicle({ interlaced: true }),
      imagemin.jpegtran({ progressive: true }),
      imagemin.optipng({ optimizationLevel: 5 })
    ]))
    .pipe(gulp.dest(imgDEST))
}

// watch files
function watch() {
  browserSync.init({
    // open: 'local',
    server: {
      baseDir: "../app/"
    },
    port: 3000
  });
  gulp.watch(styleWatchFiles, gulp.series(css, concatCSS));
  gulp.watch(jsSRC, javascript);
  gulp.watch(imgSRC, imgmin);
  gulp.watch("../app/index.html").on('change', reload);
}

exports.css = css;
exports.concatCSS = concatCSS;
exports.javascript = javascript;
exports.imgmin = imgmin;
exports.watch = watch;

const build = gulp.parallel(watch);
gulp.task('default', build);