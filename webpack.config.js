"use strict";
const webpack = require("webpack");
const { VueLoaderPlugin } = require("vue-loader");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const SpriteLoaderPlugin = require("svg-sprite-loader/plugin");
const path = require("path");
require("dotenv").config("./.env");

module.exports = {
  mode: "development",
  entry: ["./src/main.js"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[chunkhash].js",
    publicPath: "/",
  },
  devServer: {
    hot: true,
    historyApiFallback: true,
  },
  watchOptions: {
    poll: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: "vue-loader",
      },
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.s[ac]ss/i,
        use: [
          "vue-style-loader",
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.js$/,
        use: "babel-loader",
      },
      {
        test: /\.(svg)(\?.*)?$/,
        loader: "svg-sprite-loader",
        options: {
          extract: true,
          spriteFilename: "./sprite.svg",
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: true, // If you are using the options api.
      __VUE_PROD_DEVTOOLS__: false, // If you don't want people sneaking around your components in production.
    }),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public", "index.html"),
      favicon: path.resolve(__dirname, "public", "favicon.ico"),
    }),
    new SpriteLoaderPlugin({ plainSprite: true }),
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(process.env),
    }),
  ],
};
