
const HtmlWebpackPlugin    = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin           = require("copy-webpack-plugin");
const path                 = require('path');
 
 
module.exports = {
  mode: 'development',
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
    ],
  },
  entry: './src/index.js',
  output: {
    clean: true,
    path: path.resolve(__dirname, './dist'),
    filename: './main.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html'
    }),
    new MiniCssExtractPlugin({
      filename: './styles.css',
      ignoreOrder: false
    }),
    new CopyPlugin({
      patterns: [
        { from: "./src/assets", to: "assets/" },
      ],
    }),
  ],
};
    