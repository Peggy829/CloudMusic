module.exports = {
  lintOnSave: false,
  devServer: {
    // 项目运行时候的端口号
    port: 4000
  },
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.(html)$/,
          exclude: /node_modules/,
          use: {
            loader: 'html-loader',
            options: {
              minimize: true
            }
          }
        }
      ]
    }
  },

}