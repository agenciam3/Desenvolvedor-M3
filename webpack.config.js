const path = require("path");

module.exports = (paths) => ({
  devtool:"source-map",
  entry: {
    main: path.resolve(__dirname, paths.scripts.src),
  },
  output: {
    path: path.resolve(__dirname, paths.dest),
    filename: "bundle.js",
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        include: path.resolve(__dirname, paths.scripts.src),
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  resolve:{
    extensions: [".js", ".jsx"],
  }
});
