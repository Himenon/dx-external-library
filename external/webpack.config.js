// @ts-check
const path = require("path");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  mode: isProduction ? "production" : "development",
  target: "web",
  entry: {
    "PrivateComponent": "./src/PrivateComponent/index.ts",
    "Component": "./src/Component/index.ts"
  },
  plugins: [
    isProduction && new BundleAnalyzerPlugin({
      analyzerMode: "static",
      reportFilename: path.join(__dirname, "./docs/index.html"),
    }),
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
