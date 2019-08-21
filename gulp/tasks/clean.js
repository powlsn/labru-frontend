const del = require('del');

// Clean temp 
function clean() {
  return del(['./app/temp']);
}

module.exports = {
  clean
};