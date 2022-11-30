const path = require("path");
const webpack = require("webpack");

module.exports = (paths) => ({
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
        test: /\.(js|jsx|scss|css)$/,
        exclude: /(node_modules|bower_components)/,
        include: [
          // ------------------------------------------------------------------
          // Arquivos React precisam ser adicionados aqui
          path.resolve(__dirname, "src/js/index.jsx"),
          path.resolve(__dirname, "src/js/pages/HomePage.jsx"),
          path.resolve(__dirname, "src/js/components/Header/index.jsx"),
          path.resolve(__dirname, "src/js/components/Header/styles.scss"),
          path.resolve(__dirname, "src/js/components/Cards/index.jsx"),
          path.resolve(__dirname, "src/js/components/Card/index.jsx"),
          path.resolve(__dirname, "src/js/components/Filter/index.jsx"),
          path.resolve(__dirname, "src/js/components/Footer/index.jsx"),
          path.resolve(__dirname, "src/js/components/Checkbox/index.jsx"),
          // ------------------------------------------------------------------
        ],
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              // Adicionei a dependência que precisava para rodar React
              "@babel/preset-react",
              [
                "@babel/preset-env",
                { targets: { browsers: ["last 2 versions"] } },
              ],
            ],
            cacheDirectory: true,
          },
        },
      },
    ],
  },
  plugins: [new webpack.EnvironmentPlugin(["SERVER_API"])],
});
