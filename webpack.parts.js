const commonModules = {
  rules: [
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader'
      }
    },
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    },
    {
      test: /\.(png|jpe?g|gif)$/i,
      use: [
        {
          loader: 'file-loader'
        }
      ]
    },
    {
      test: /\.csv$/,
      loader: 'csv-loader',
      options: {
        dynamicTyping: true,
        header: true,
        skipEmptyLines: true
      }
    }

  ]
}

exports.devParts = ({ host, port, path } = {}) => ({
  entry: ['@babel/polyfill', './src/index.js'],
  output: {
    filename: 'project-name.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'eval',
  devServer: {
    stats: 'errors-only',
    host: process.env.HOST, // default: localhost
    port: process.env.PORT, // default: 8080
    open: true, // open page in browser
    overlay: true // error overlay
  },
  module: commonModules
})

exports.productionParts = () => ({
  module: commonModules
})
