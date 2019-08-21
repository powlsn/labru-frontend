const {
  src,
  dest
} = require("gulp");
const browsersync = require("browser-sync").create();
const webpack = require('webpack');
const webpackconfig = require("../../webpack.config.js");
const webpackstream = require("webpack-stream");

const paths = {
  js: {
    src: 'app/assets/js/**/*.js',
    dest: 'app/temp/js/'
  }
}

// SCRIPTS
function scripts() {
  return (
    src(paths.js.src)
    .pipe(webpackstream(webpackconfig, webpack))
    .pipe(dest(paths.js.dest))
    .pipe(browsersync.stream())
  );
}

module.exports = {
  scripts
};