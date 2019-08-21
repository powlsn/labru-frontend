const { watch, series } = require("gulp");
const browsersync = require("browser-sync").create();
const {
  sassCmp,
  styles
} = require("./styles");
const { scripts } = require("./script");
const { modernize } = require("./modernize");

const paths = {
  html: 'app/index.html',
  js: 'app/assets/js/**/*.js',
  css: 'app/assets/css/**/*.css',
  sass: 'app/assets/sass/**/*.scss'
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

// BrowserSync Reload 
function browserSyncReload(done) {
  browsersync.reload();
  done();
}

// WATCH
function watchFiles() {
  watch(paths.sass, sassCmp);
  watch(paths.css, styles);
  watch(paths.js, series(modernize, scripts));
  watch(paths.html, browserSyncReload);
}

module.exports = {
  watchFiles,
  browserSync
};