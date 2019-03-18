const gulp = require('gulp'),
  autoprefixer = require('gulp-autoprefixer');

function styles() {
  return gulp.src('app/assets/css/test.css')
    .pipe(autoprefixer())
    .on('error', (err) => {
      console.log(err.toString());
      this.emit('end');
    })
    .pipe(gulp.dest('app/dist/css'));
}

exports.styles = styles;