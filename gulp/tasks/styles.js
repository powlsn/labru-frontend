const {
  src,
  dest
} = require('gulp');
const postcss = require('gulp-postcss');
const cssvars = require('postcss-simple-vars');
const nested = require('postcss-nested');
const cssImport = require('postcss-import');
const mixins = require('postcss-mixins');
const hexrgba = require('postcss-hexrgba');
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');
const browsersync = require("browser-sync").create();

const paths = {
  css: {
    src: 'app/assets/css/*.css',
    dest: 'app/temp/css/',
  },
  sass: {
    src: 'app/assets/sass/vendor.scss',
    dest: 'app/assets/css/'
  },
}

// SASS
function sassCmp() {
  return src(paths.sass.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(dest(paths.sass.dest));
}

// CSS
function styles() {
  return src(paths.css.src)
    .pipe(postcss([cssImport, mixins, cssvars, nested, hexrgba, autoprefixer]))
    .on('error', function (error) {
      console.log(error.toString());
      this.emit('end');
    })
    .pipe(dest(paths.css.dest))
    .pipe(browsersync.stream());
}

module.exports = {
  styles,
  sassCmp
};