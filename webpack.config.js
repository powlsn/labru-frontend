var path = require('path');

module.exports = {
  mode: "none",
  entry: "./app/assets/js/app.js",
  output: {
    path: path.resolve(__dirname, "./app/temp/js"),
    filename: "[name].js"
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }]
  },
}