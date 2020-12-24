const path = require('path');

const SRC_DIR = path.resolve(__dirname, 'src');
const OUT_DIR = path.resolve(__dirname, 'build');

module.exports = {
  entry: {
    'event-processor': path.resolve(SRC_DIR, 'function/event-processor.js'),
  },
  output: {
    path: `${OUT_DIR}`,
    filename: '[name]/[name].js',
    library: '[name]',
    libraryTarget: 'umd',
  },
  target: 'node',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/transform-runtime'],
          },
        },
      },
    ],
  },
};
