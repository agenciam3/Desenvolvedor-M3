import { resolve } from "path";

export default (paths) => ({
  entry: {
    main: resolve( paths.scripts.src),
  },
  output: {
    path: resolve( paths.dest),
    filename: "bundle.js",
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        include: resolve( paths.scripts.src),
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                { targets: { browsers: ["last 2 versions"] } },
              ]
            ],
            plugins: ["@babel/plugin-transform-runtime"],
            cacheDirectory: true,
          },
        },
      },
    ],
  },
});
