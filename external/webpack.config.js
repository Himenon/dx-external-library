// @ts-check
const path = require("path");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const webpack = require("webpack");

module.exports = {
  mode: "production",
  target: "web",
  entry: {
    "application.production": "./src/index.tsx",
  },
  plugins: [
    new CleanWebpackPlugin(),
  ],
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
    library: "App",
    libraryTarget: "umd",
  },
  externals: {
    react: "commonjs2",
    "react-dom": "commonjs2",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.tsx?$/, loader: "ts-loader" },
    ],
  },
};
