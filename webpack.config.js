const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: "development",
  entry: {
    main: path.resolve(__dirname, 'src/index.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    assetModuleFilename: './src/assets/images/[name].[ext]',
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|eot|ttf|woff)$/,
        type: 'asset/resource'
      },
      {
        test: /\.html$/,
        use: [
          'html-loader'
        ]
      },
    ],
  },
  devServer: {
    static: 'dist',
  },
  optimization: {
    runtimeChunk: 'single',
  },
}