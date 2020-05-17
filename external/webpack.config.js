// @ts-check
const path = require("path");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const webpack = require("webpack");

module.exports = {
  mode: "development",
  target: "web",
  entry: {
    "PrivateComponent": "./src/PrivateComponent/index.ts",
    "Component": "./src/Component/index.ts"
  },
  plugins: [
    new CleanWebpackPlugin(),
  ],
  output: {
    path: path.join(__dirname, "umd"),
    filename: "[name].js",
    // https://github.com/webpack/webpack/tree/master/examples/multi-part-library#webpackconfigjs
    library: ["MyExternal", "[name]"], // externalsのvalueの値になる
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
