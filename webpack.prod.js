
const HtmlWebpackPlugin    = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin           = require("copy-webpack-plugin");
const CssMinimizerPlugin   = require("css-minimizer-webpack-plugin");
const TerserPlugin         = require("terser-webpack-plugin");
const path                 = require('path');
 
 
module.exports = {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
        options: {
          sources: false
        }
      },
      {
        test: /\.css$/i,
        exclude: /styles.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /styles.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin(),
      new CssMinimizerPlugin()
    ]
  },
  entry: './src/index.js',
  output: {
    clean: true,
    path: path.resolve(__dirname, './dist'),
    filename: './main.[contenthash].js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[fullhash].css',
      ignoreOrder: false
    }),
    new CopyPlugin({
      patterns: [
        { from: "./src/assets", to: "assets/" },
      ],
    }),
  ],
};
    