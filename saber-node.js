const webpack = require('webpack')

exports.chainWebpack = function(chain) {
  chain.module
    .rule("pdf")
    .test(/\.pdf$/)
    .use("pdf")
    .loader("file-loader")
    .options({
      name: "[name].[ext]",
    });
    chain.module
    .rule("cool")
    .test(/\.cool$/)
    .use("cool")
    .loader("raw-loader")
    .options({
        esModule: false,
    })
};

exports.getWebpackConfig = function (config, opts) {
  // Inject state for disqus component
  const dp = new webpack.DefinePlugin({
      'process.env.isProduction': process.env.NODE_ENV === 'production'
  })

  config.plugins.push(dp)
  
  return config
}