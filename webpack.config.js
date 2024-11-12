module.exports = {
  // 既存の設定
  module: {
    rules: [
      {
        test: /\.m?js$/,
        enforce: "pre",
        use: ["source-map-loader"],
        exclude: [
          // ソースマップ警告を無視するモジュール
          /node_modules\/@mediapipe\/tasks-vision/
        ],
      },
    ],
  },
};
