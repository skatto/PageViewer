
module.exports = {
  entry: __dirname + '/scripts/index.jsx',
  output: { path: __dirname, filename: 'bundle.js' },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react'],
        },
      },
      {
        test: /.css$/,
        loaders: ['style-loader', 'css-loader?modules'],
      },
    ],
  },
  resolve: {
    extensions: [
      '.js',
      '.jsx'
    ],
  },
};
