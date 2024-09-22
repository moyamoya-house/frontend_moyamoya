module.exports = {
  devtool: false,
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
        exclude: [
          /node_modules\/@mediapipe/, 
          /node_modules\/@react-three\/drei/
        ], // @mediapipeと@react-three/dreiを無視
      },
    ],
  },
};
