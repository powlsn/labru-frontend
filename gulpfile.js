"use strict";

const gulp = require("gulp"),
  browsersync = require("browser-sync").create();

function html(done) {
  console.log("saved html file and reload the browser");
  done();
}

// BrowserSync
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: "./app/"
    },
    port: 3000
  });
  done();
}

// BrowserSync Reload (callback)
function browserSyncReload(done) {
  browsersync.reload();
  done();
}

// watch files
function watchFiles() {
  gulp.watch("./app/index.html", gulp.series(html, browserSyncReload));
}

// complexe tasks
const watch = gulp.parallel(watchFiles, browserSync);


// export tasks
exports.watch = watch;