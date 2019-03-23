const gulp = require("gulp"),
  del = require('del'),
  autoprefixer = require('gulp-autoprefixer'),
  browserSync = require("browser-sync"),
  postcss = require('gulp-postcss'),
  cssvars = require('postcss-simple-vars'),
  nested = require('postcss-nested'),
  cssImport = require('postcss-import'),
  mixins = require('postcss-mixins'),
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
    src: 'app/assets/css/*.css',
    dest: 'app/temp/css/'
  },
  sass: {
    src: 'app/assets/sass/vendor.scss',
    dest: 'app/assets/css/'
  },
  cssWatch: {
    src: 'app/assets/css/**/*.css'
  },
  sassWatch: {
    src: 'app/assets/sass/**/*.scss'
  },
  js: {
    src: '',
    dest: ''
  }
}

const clean = () => del(['app/temp']);

// ### --- SASS TASK --- ###
function sassCompile() {
  return gulp.src(paths.sass.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(paths.sass.dest));
}
// ### --- SASS TASK END --- ###


// ### --- CSS TASK --- ###
function styles() {
  return gulp.src(paths.css.src)
    .pipe(postcss([cssImport, mixins, cssvars, nested, autoprefixer]))
    .on('error', function (error) {
      console.log(error.toString());
      this.emit('end');
    })
    .pipe(gulp.dest(paths.css.dest));
}
// ### --- CSS TASK END --- ###


// ### --- BROWSER SYNC --- ###
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
// ### --- BROWSER SYNC END --- ###


// ### --- WATCH TASK --- ###
function watchFiles() {
  gulp.watch(paths.sassWatch.src, sassCompile);
  gulp.watch(paths.cssWatch.src, gulp.series(styles, reload));
  gulp.watch(paths.html.src, reload);
}
// ### --- WATCH TASK END --- ###

exports.watch = gulp.series(clean, sassCompile, styles, serve, watchFiles);
