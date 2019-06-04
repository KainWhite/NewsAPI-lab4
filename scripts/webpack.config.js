const merge = require('webpack-merge');
const common = require('./webpack.config.common.js');

module.exports = (env) => {
  return merge(common, env.production? require("./webpack.config.prod.js") : env.development? require("./webpack.config.dev.js") : require("./webpack.config.watch.js"))
};
