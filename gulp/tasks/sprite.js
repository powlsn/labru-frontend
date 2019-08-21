const {
  src,
  dest
} = require('gulp');
const svgSprite = require('gulp-svg-sprite');
const svg2png = require('gulp-svg2png');
const gulpRename = require('gulp-rename');
const del = require('del');

// SPRITE
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
  return src('./app/assets/images/svg/**/*.svg')
    .pipe(svgSprite(config))
    .pipe(dest('./app/temp/sprite'));
}

function createPNG() {
  return src('./app/temp/sprite/css/*.svg')
    .pipe(svg2png())
    .pipe(dest('./app/temp/sprite/css'));
}

function copySpriteCss() {
  return src('./app/temp/sprite/css/*.css')
    .pipe(gulpRename('_sprite.css'))
    .pipe(dest('./app/assets/css/modules'));
}

function copySpriteGraphic() {
  return src('./app/temp/sprite/css/**/*.{svg,png}')
    .pipe(dest('./app/assets/images/sprite'));
}

function cleanSpriteEnd() {
  return del(['./app/temp/sprite']);
}

module.exports = {
  cleanSpriteDir,
  createSprite,
  createPNG,
  copySpriteCss,
  copySpriteGraphic,
  cleanSpriteEnd
}