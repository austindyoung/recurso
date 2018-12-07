module.exports = {
  entry: {
    test: './dist/robo.js',
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
