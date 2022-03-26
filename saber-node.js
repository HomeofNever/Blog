const webpack = require('webpack')

const fileLoaderExt = (names, chain) => {
  chain.module
    .rule("file load path")
    .test(new RegExp(`\.(${names.join('|')})$`))
    .use("file load path")
    .loader("file-loader")
    .options({
      name: "[path][name].[ext]",
    });
}

exports.chainWebpack = function(chain) {
  fileLoaderExt(["pdf", "tar.gz"], chain)
    
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