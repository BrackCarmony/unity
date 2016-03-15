module.exports = {
  entry: [
    'unity.js'
  ],
  output: {
    path: __dirname + "/public",
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel'
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  watch:true,
  devtool:"inline-source-map"
};
