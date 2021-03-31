const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    src: './client/index.js'
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/env', '@babel/react']
        }
      }
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'client'),
    //compress: true,
    //port: 8080,
    publicPath: '/build',
    proxy: {
      '/api': 'http://localhost:3000'
    }
  }
}