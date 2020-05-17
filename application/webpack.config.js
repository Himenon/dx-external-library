// @ts-check
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const resolvePkg = require("resolve-pkg");
const express = require("express");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");

module.exports = {
  mode: "development",
  target: "web",
  entry: {
    "application.production": "./src/index.tsx",
  },
  devServer: {
    before: (app) => {
      app.use("/scripts/react.development.js", express.static(resolvePkg("react/umd/react.development.js")));
      app.use("/scripts/react-dom.development.js", express.static(resolvePkg("react-dom/umd/react-dom.development.js")));
      app.use("/scripts/external.js", express.static(resolvePkg("my-external/dist/application.production.js")));
      app.use("/scripts/my-external.js", express.static(resolvePkg("my-external/umd/Component.js")));
      app.use("/scripts/my-external-private.js", express.static(resolvePkg("my-external/umd/PrivateComponent.js")));
    },
  },
  plugins: [
    new FriendlyErrorsWebpackPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "public/index.html",
      React: "/scripts/react.development.js",
      ReactDOM: "/scripts/react-dom.development.js",
      MyExternal: "/scripts/my-external.js",
      "MyExternal.PrivateComponent": "/scripts/my-external-private.js",
    }),
  ],
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js"
  },
  externals: {
    react: "React",              // Reactを別scriptに分離する場合に必須
    "react-dom": "ReactDOM",     // ReactDOMを別scriptに分離する場合に必須
    "my-external": "MyExternal.Component", // my-externalを別scriptに分離する場合に必須, my-externalのライブラリ名を右側に記述するびつ用がある
    "my-external/PrivateComponent": "MyExternal.PrivateComponent"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: "ts-loader" },
    ],
  },
};
