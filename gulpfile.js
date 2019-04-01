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
  webpackstream = require("webpack-stream"),
  svgSprite = require('gulp-svg-sprite'),
  gulpRename = require('gulp-rename');


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

// SPRITE TASK
const config = {
  shape: {
    spacing: {
      padding: 1
    },
  },
  mode: {
    css: {
      sprite: 'sprite.svg',
      render: {
        css: {
          template: './gulp/template/sprite-template.css'
        }
      }
    }
  }
}

function cleanSpriteDir() {
  return del(['./app/temp/sprite', './app/assets/images/sprite']);
}

function createSprite() {
  return gulp
    .src('./app/assets/images/svg/**/*.svg')
    .pipe(svgSprite(config))
    .pipe(gulp.dest('./app/temp/sprite'));
}

function copySpriteCss() {
  return gulp
    .src('./app/temp/sprite/css/*.css')
    .pipe(gulpRename('_sprite.css'))
    .pipe(gulp.dest('./app/assets/css/modules'));
}

function copySpriteGraphic() {
  return gulp
    .src('./app/temp/sprite/css/**/*.svg')
    .pipe(gulp.dest('./app/assets/images/sprite'));
}

function cleanSpriteEnd() {
  return del(['./app/temp/sprite']);
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
const icons = gulp.series(
  cleanSpriteDir,
  createSprite,
  gulp.parallel(
    copySpriteCss,
    copySpriteGraphic
  ),
  cleanSpriteEnd
);

exports.watch = watch;
exports.createSprite = createSprite;
exports.icons = icons;
