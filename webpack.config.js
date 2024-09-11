const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin"); // Pour générer automatiquement l'index.html
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";

  return {
    mode: isProduction ? "production" : "development",
    entry: "./src/index.js",
    output: {
      filename: isProduction ? "bundle.[contenthash].js" : "bundle.js", // Hash en production pour le cache busting
      path: path.resolve(__dirname, "dist"),
      publicPath: "./",
    },
    devServer: {
      static: {
        directory: path.resolve(__dirname, "src"),
      },
      compress: true,
      port: 9000,
      open: true,
      hot: true,
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: "./src/index.html", // Génére automatiquement le fichier HTML en sortie
        minify: isProduction // Minifie le fichier HTML en production
          ? {
              collapseWhitespace: true,
              removeComments: true,
              removeRedundantAttributes: true,
              useShortDoctype: true,
            }
          : false,
      }),
      new MiniCssExtractPlugin({
        filename: "style.css",
      }),
    ],
    optimization: isProduction
      ? {
          splitChunks: {
            chunks: "all",
          },
        }
      : {},
  };
};
