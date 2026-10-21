// Builds the Snow Globe into the folder the site serves: public/snowGlobe/bundle.js (+ source map).
module.exports = {
  entry: "./app/App.js",
  output: {
    path: __dirname + "/../public/snowGlobe",
    filename: "bundle.js"
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  },
  devtool: "source-map"
};
