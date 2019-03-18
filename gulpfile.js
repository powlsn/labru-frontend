const gulp = require("gulp"),
  del = require('del'),
  autoprefixer = require('gulp-autoprefixer'),
  browserSync = require("browser-sync"),
  postcss = require('gulp-postcss'),
  cssvars = require('postcss-simple-vars'),
  nested = require('postcss-nested'),
  cssImport = require('postcss-import'),
  sass = require('gulp-sass'),
  cleanCSS = require('gulp-clean-css'),
  sourcemaps = require('gulp-sourcemaps'),
  concat = require('gulp-concat'),
  imagemin = require('gulp-imagemin'),
  changed = require('gulp-changed'),
  uglify = require('gulp-uglify'),
  lineec = require('gulp-line-ending-corrector');


const server = browserSync.create();

const paths = {
  html: {
    src: 'app/index.html'
  },
  css: {
    src: 'app/assets/css/styles.css',
    dest: 'app/dist/css/'
  },
  cssWatch: {
    src: 'app/assets/css/**/*.css',
    dest: 'app/dist/css/'
  },
  js: {
    src: '',
    dest: ''
  }
}

const clean = () => del(['app/dist']);

function styles() {
  return gulp.src(paths.css.src)
    .pipe(postcss([cssImport, cssvars, nested, autoprefixer]))
    .pipe(gulp.dest(paths.css.dest));
}

function reload(done) {
  server.reload();
  done();
}

function serve(done) {
  server.init({
    server: {
      baseDir: './app'
    }
  });
  done();
}

function watch() {
  gulp.watch(paths.cssWatch.src, gulp.series(styles, reload));
  gulp.watch(paths.html.src, reload);
}

const dev = gulp.series(clean, styles, serve, watch);
exports.dev = dev;