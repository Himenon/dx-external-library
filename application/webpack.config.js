// @ts-check
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const resolvePkg = require("resolve-pkg");
const express = require("express");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const isProduction = process.env.NODE_ENV === "production";

const externalAssets = {
  react: {
    name: "React",
    publicPath: "/scripts/react.js",
    staticPath: isProduction
      ? resolvePkg("react/umd/react.production.min.js")
      : resolvePkg("react/umd/react.development.js"),
  },
  "react-dom": {
    name: "ReactDOM",
    publicPath: "/scripts/react-dom.js",
    staticPath: isProduction
      ? resolvePkg("react-dom/umd/react-dom.production.min.js")
      : resolvePkg("react-dom/umd/react-dom.development.js"),
  },
  "my-external": {
    name: "MyExternal.Component",
    publicPath: "/scripts/my-external.js",
    staticPath: resolvePkg("my-external/umd/Component.js"),
  },
  "my-external/PrivateComponent": {
    name: "MyExternal.PrivateComponent",
    publicPath: "/scripts/my-external-private.js",
    staticPath: resolvePkg("my-external/umd/PrivateComponent.js"),
  },
};

const entryName = [
  "application",
  isProduction ? "production" : "development",
].join(".");

module.exports = {
  mode: isProduction ? "production" : "development",
  target: "web",
  entry: {
    [entryName]: "./src/index.tsx",
  },
  devServer: {
    before: (app) => {
      Object.values(externalAssets).forEach((config) => {
        app.use(config.publicPath, express.static(config.staticPath));
      });
    },
  },
  plugins: [
    new FriendlyErrorsWebpackPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "public/index.html",
      inject: "head",
      scriptLoading: "defer",
      ...Object.values(externalAssets).reduce(
        (all, current) => ({ ...all, [current.name]: current.publicPath }),
        {}
      ),
    }),
    new CopyWebpackPlugin({
      // @ts-ignore
      patterns: Object.values(externalAssets).map((config) => ({
        from: config.staticPath,
        to: path.join(".", config.publicPath),
      })),
    }),
    isProduction && new BundleAnalyzerPlugin({
      analyzerMode: "static",
      reportFilename: path.join(__dirname, "./docs/index.html"),
    }),
  ],
  output: {
    path: path.join(__dirname, "dist"),
    filename: "scripts/[name].js",
  },
  externals: Object.keys(externalAssets).reduce(
    (all, current) => ({
      ...all,
      [current]: externalAssets[current].name,
    }),
    {}
  ),
  // {
  //   react: "React", // Reactを別scriptに分離する場合に必須
  //   "react-dom": "ReactDOM", // ReactDOMを別scriptに分離する場合に必須
  //   "my-external": "MyExternal.Component", // my-externalを別scriptに分離する場合に必須, my-externalのライブラリ名を右側に記述するびつ用がある
  //   "my-external/PrivateComponent": "MyExternal.PrivateComponent",
  // },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [{ test: /\.tsx?$/, loader: "ts-loader" }],
  },
};
