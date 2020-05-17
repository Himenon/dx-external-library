// @ts-check
const path = require("path");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const webpack = require("webpack");

module.exports = {
  mode: "development",
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
    library: "MyExternal", // externalsのvalueの値になる
    libraryTarget: "umd",  // ブラウザのライブラリとして利用する場合に必要
  },
  externals: {
    react: "React",          // 必須
    "react-dom": "ReactDOM", // 必須
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
