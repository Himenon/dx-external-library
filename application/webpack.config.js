// @ts-check
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const resolvePkg = require("resolve-pkg");
const express = require("express");

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
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "public/index.html",
      React: "/scripts/react.development.js",
      ReactDOM: "/scripts/react-dom.development.js",
      MyExternal: "/scripts/external.js",
    }),
  ],
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
    library: "App",
    libraryTarget: "umd",
  },
  externals: {
    react: "React",
    "react-dom": "ReactDOM",
    "my-external": "MyExternal",
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
