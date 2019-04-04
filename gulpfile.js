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
  // concat = require('gulp-concat'),
  rev = require('gulp-rev'),
  imagemin = require('gulp-imagemin'),
  uglify = require('gulp-uglify'),
  lineec = require('gulp-line-ending-corrector'),
  webpack = require('webpack'),
  webpackconfig = require("./webpack.config.js"),
  webpackstream = require("webpack-stream"),
  svgSprite = require('gulp-svg-sprite'),
  svg2png = require('gulp-svg2png'),
  gulpRename = require('gulp-rename'),
  modernizr = require('gulp-modernizr'),
  usemin = require('gulp-usemin');


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
      variables: {
        replaceSVGwithPNG: function () {
          return function (sprite, render) {
            return render(sprite).split('.svg').join('.png');
          }
        }
      },
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

function createPNG() {
  return gulp
    .src('./app/temp/sprite/css/*.svg')
    .pipe(svg2png())
    .pipe(gulp.dest('./app/temp/sprite/css'));
}

function copySpriteCss() {
  return gulp
    .src('./app/temp/sprite/css/*.css')
    .pipe(gulpRename('_sprite.css'))
    .pipe(gulp.dest('./app/assets/css/modules'));
}

function copySpriteGraphic() {
  return gulp
    .src('./app/temp/sprite/css/**/*.{svg,png}')
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

// modernir Task
function modernize() {
  return gulp
    .src(['./app/assets/css/**/*.css', './app/assets/js/**/*.js'])
    .pipe(modernizr({
      "options": [
        "setClasses"
      ]
    }))
    .pipe(gulp.dest('./app/temp/js/'));
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

// BUILD TASKS
function cleanBeginBuild() {
  return del(['./build']);
}

function optimizeImages() {
  return gulp
    .src(['./app/assets/images/**/*', '!./app/assets/images/svg', '!./app/assets/images/svg/**/*'])
    .pipe(imagemin({
      progressive: true,
      interlaced: true,
      multipass: true
    }))
    .pipe(gulp.dest('./build/assets/images'));
}

function minify() {
  return gulp
    .src('./app/index.html')
    .pipe(usemin(
      {
        css: [() => { return rev() }, () => { return cleanCSS({ compatibility: 'ie8' }) }],
        js: [
          () => { return rev() },
          () => { return lineec({ eolc: 'LF', encoding: 'utf8' }) },
          () => { return uglify() }
        ]
      }
    ))
    .pipe(gulp.dest('./build'));
}


// WATCH TASK 
function watchFiles() {
  gulp.watch(paths.sassWatch.src, sassCompile);
  gulp.watch(paths.cssWatch.src, styles);
  gulp.watch(paths.scriptsWatch.src, gulp.series(modernize, scripts));
  gulp.watch(paths.html.src, browserSyncReload);
}

// var tasks
const watch = gulp.parallel(watchFiles, browserSync);
const icons = gulp.series(
  cleanSpriteDir,
  createSprite,
  createPNG,
  gulp.parallel(
    copySpriteCss,
    copySpriteGraphic
  ),
  cleanSpriteEnd
);

// Build Tasks load line
const build = gulp.series(
  cleanBeginBuild,
  gulp.parallel(
    sassCompile,
    styles,
    gulp.series(
      modernize,
      scripts
    )
  ),
  gulp.parallel(
    minify,
    optimizeImages
  )
);

exports.watch = watch;
exports.modernize = modernize;
exports.icons = icons;
exports.build = build;