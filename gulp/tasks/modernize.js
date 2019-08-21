const { src, dest } = require("gulp");
const modernizr = require('gulp-modernizr');


// modernir
function modernize() {
  return src(['./app/assets/css/**/*.css', './app/assets/js/**/*.js'])
    .pipe(modernizr({
      "options": [
        "setClasses"
      ]
    }))
    .pipe(dest('./app/temp/js/'));
}

module.exports = {
  modernize
};
