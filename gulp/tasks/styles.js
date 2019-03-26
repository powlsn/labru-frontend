var gulp = require('gulp'),
  postcss = require('gulp-postcss'),
  cssvars = require('postcss-simple-vars'),
  nested = require('postcss-nested'),
  cssImport = require('postcss-import'),
  mixins = require('postcss-mixins'),
  hexrgba = require('postcss-hexrgba'),
  autoprefixer = require('gulp-autoprefixer');


function styles() {
  return gulp.src(paths.css.src)
    .pipe(postcss([cssImport, mixins, cssvars, nested, hexrgba, autoprefixer]))
    .on('error', function (error) {
      console.log(error.toString());
      this.emit('end');
    })
    .pipe(gulp.dest(paths.css.dest));
}

module.exports = styles;