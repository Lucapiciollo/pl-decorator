  const path = require('path');
  const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
  module.exports = {
    entry:  {
      'my-lib': './src/index.ts',
      'my-lib.min': './src/index.ts'
    },
    module: {
      rules: [{
        test: /\.tsx?$/,
        use: 'awesome-typescript-loader'
         
      }]
    },
    resolve: {
      extensions: [ '.tsx', '.ts', '.js' ],
    },
    devtool: 'source-map',
    plugins: [
      new UglifyJsPlugin()
    ],
    output: {
      path: path.resolve(__dirname, '_bundles'),
      filename: '[name].js',
      libraryTarget: 'umd',
      library: 'MyLib',
      umdNamedDefine: true
    },
  };