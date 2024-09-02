const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9000,
    open: true,
    hot: true,
    historyApiFallback: true,
  },
  module: {
    // rules: [
    //   {
    //     test: /\.js$/,
    //     exclude: /node_modules/,
    //     use: {
    //       loader: 'babel-loader',
    //       options: {
    //         presets: ['@babel/preset-env']
    //       }
    //     }
    //   }
    // ]
  }
};
