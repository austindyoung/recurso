module.exports = {
  entry: {
    test: './dist/test.js',
  },
  output: { filename: 'bundle.js' },
  module: {
    rules: [
      {
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
}
