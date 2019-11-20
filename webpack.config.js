const path = require('path')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin')
const parts = require('./webpack.parts')

process.on('unhandledRejection', err => {
  throw err
})

const commonConfig = merge([])

const productionConfig = merge([
  {
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: './index.html'
      })
    ]
  },
  {
    entry: ['./src/index.js']
  },
  {
    output: {
      filename: 'project-name.min.js',
      path: path.resolve(__dirname, 'dist')
    }
  },
  parts.productionParts()
])

const developmentConfig = merge([
  {
    plugins: [
      new ErrorOverlayPlugin(),
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: './index.html'
      })
    ]
  },
  parts.devParts({
    host: process.env.HOST,
    port: process.env.PORT,
    path: path
  })
])

module.exports = mode => {
  if (mode === 'production') {
    return merge(commonConfig, productionConfig, { mode })
  }
  return merge(commonConfig, developmentConfig, { mode })
}
