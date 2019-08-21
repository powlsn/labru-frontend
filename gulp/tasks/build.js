const { src, dest } = require("gulp");
const del = require('del');
const imagemin = require('gulp-imagemin');
const usemin = require('gulp-usemin');
const rev = require('gulp-rev');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const lineec = require('gulp-line-ending-corrector');

// BUILD
function cleanBeginBuild() {
  return del(['./build']);
}

function optimizeImages() {
  return src(['./app/assets/images/**/*', '!./app/assets/images/svg', '!./app/assets/images/svg/**/*'])
    .pipe(imagemin({
      progressive: true,
      interlaced: true,
      multipass: true
    }))
    .pipe(dest('./build/assets/images'));
}

function minify() {
  return src('./app/index.html')
    .pipe(usemin({
      css: [() => {
        return rev()
      }, () => {
        return cleanCSS({
          compatibility: 'ie8'
        })
      }],
      js: [
        () => {
          return rev()
        },
        () => {
          return lineec({
            eolc: 'LF',
            encoding: 'utf8'
          })
        },
        () => {
          return uglify()
        }
      ]
    }))
    .pipe(dest('./build'));
}


module.exports = {
  cleanBeginBuild,
  optimizeImages,
  minify
}