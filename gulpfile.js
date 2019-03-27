const gulp = require("gulp"),
  del = require('del'),
  autoprefixer = require('gulp-autoprefixer'),
  browsersync = require("browser-sync").create(),
  postcss = require('gulp-postcss'),
  cssvars = require('postcss-simple-vars'),
  nested = require('postcss-nested'),
  cssImport = require('postcss-import'),
  mixins = require('postcss-mixins'),
  sass = require('gulp-sass'),
  hexrgba = require('postcss-hexrgba'),
  cleanCSS = require('gulp-clean-css'),
  sourcemaps = require('gulp-sourcemaps'),
  concat = require('gulp-concat'),
  imagemin = require('gulp-imagemin'),
  changed = require('gulp-changed'),
  uglify = require('gulp-uglify'),
  lineec = require('gulp-line-ending-corrector'),
  webpack = require('webpack'),
  webpackconfig = require("./webpack.config.js"),
  webpackstream = require("webpack-stream");


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
  faSass: {
    src: 'node_modules/@fortawesome/fontawesome.scss',
    dest: 'app/assets/css/'
  },

  cssWatch: {
    src: 'app/assets/css/**/*.css'
  },
  sassWatch: {
    src: 'app/assets/sass/**/*.scss'
  },
  scriptsWatch: {
    src: 'app/assets/js/**/*.js'
  },
  js: {
    src: 'app/assets/js/**/*.js',
    dest: 'app/temp/js/'
  }
}

// Clean temp 
function clean() {
  return del(['./app/temp']);
}

// SASS TASK 
function sassCompile() {
  return gulp
    .src(paths.sass.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(paths.sass.dest));
}

// compile font awesome
function faSass() {
  return gulp
    .src(paths.faSass.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(paths.faSass.dest))
}

// CSS TASK 
function styles() {
  return gulp
    .src(paths.css.src)
    .pipe(postcss([cssImport, mixins, cssvars, nested, hexrgba, autoprefixer]))
    .on('error', function (error) {
      console.log(error.toString());
      this.emit('end');
    })
    .pipe(gulp.dest(paths.css.dest))
    .pipe(browsersync.stream());
}

// SCRIPTS TASK 
function scripts() {
  return (
    gulp
      .src(paths.js.src)
      .pipe(webpackstream(webpackconfig, webpack))
      .pipe(gulp.dest(paths.js.dest))
      .pipe(browsersync.stream())
  );
}

// BrowserSync Reload 
function browserSyncReload(done) {
  browsersync.reload();
  done();
}

// BrowserSync 
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: './app'
    },
    port: 3000
  });
  done();
}


// WATCH TASK 
function watchFiles() {
  gulp.watch(paths.sassWatch.src, sassCompile);
  gulp.watch(paths.cssWatch.src, styles);
  gulp.watch(paths.scriptsWatch.src, scripts);
  gulp.watch(paths.html.src, browserSyncReload);
}

const watch = gulp.parallel(watchFiles, browserSync);

exports.watch = watch;
