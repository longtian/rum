const path = require('path');

module.exports = {
  entry: {
    "client": path.join(__dirname, 'src', 'client.es6'),
    "bundle": path.join(__dirname, 'src', 'entry.jsx')
  },
  output: {
    filename: "[name].js",
    path: path.join(__dirname, 'dist'),
    publicPath: "dist/"
  },
  module: {
    loaders: [
      {
        test: /(.es6|.jsx)$/,
        loader: "babel"
      },
      {
        test: /(.css)$/,
        loader: "style!css"
      },
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file-loader'
      }
    ]
  },
  resolve: {
    extensions: ["", ".js", ".es6", ".jsx"]
  }
}