const { task,  parallel, series } = require("gulp");
const { clean } = require("./gulp/tasks/clean");
const { scripts } = require("./gulp/tasks/script");
const { styles, sassCmp } = require("./gulp/tasks/styles");
const {
  cleanSpriteDir,
  createSprite,
  createPNG,
  copySpriteCss,
  copySpriteGraphic,
  cleanSpriteEnd
} = require("./gulp/tasks/sprite");
const { watchFiles, browserSync } = require("./gulp/tasks/watch");
const { cleanBeginBuild, optimizeImages, minify } = require("./gulp/tasks/build");
const { modernize } = require("./gulp/tasks/modernize");


// #################################
// ############# TASKS #############
// #################################

// TASK: Create Icons svg/png
task("icons", series(
  cleanSpriteDir,
  createSprite,
  createPNG,
  parallel(
    copySpriteCss,
    copySpriteGraphic
  ),
  cleanSpriteEnd
));

// TASK: build project
task('build',
  series(
    cleanBeginBuild,
    parallel(
      sassCmp,
      styles,
      series(
        modernize,
        scripts
      )
    ),
    parallel(
      minify,
      optimizeImages
    )
  )
);

// TASK: developement
task("dev", parallel(watchFiles, browserSync));

// TASK: clean temp
task("clr-t", clean);