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