const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        enforce: 'pre', // 前置类型
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: 'eslint-loader',
      },
      {
        test: /\.jsx?/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader'
          ]
        })
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'less-loader'
          ]
        })
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      }
    ]
  },
  // 代码模块路径解析的配置
  resolve: {
    alias: {
      utils: path.resolve(__dirname, 'src/utils'),
      log$: path.resolve(__dirname, 'src/utils/log.js')
    },
    modules: [
      path.resolve(__dirname, 'node_modules')
    ],
    extensions: [".js", ".json", ".jsx", ".css", ".less"]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html'
    }),
    new ExtractTextPlugin('[name].css'),
    new webpack.DefinePlugin({
      TWO: '1+1',
      CONSTANTS: {
        APP_VERSION: JSON.stringify('1.1.2')
      }
    }),
    new CopyWebpackPlugin([
      {from: 'src/assets/favicon.ico', to: 'favicon.ico'}
    ]),
    new webpack.ProvidePlugin({
      _: 'lodash'
    })
  ],
  devServer: {
    port: '1230',
    before(app) {
      app.get('/api/test.json', function(req, res) {
        res.json({code: 200, message: 'hellow world'})
      })
    }
  }
}