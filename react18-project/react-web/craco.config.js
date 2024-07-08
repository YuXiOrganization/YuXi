const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    configure: (webpackConfig) => {
      webpackConfig.output = {
        ...webpackConfig.output,
        filename: "assetsDir/js/[name].js",
        chunkFilename: "assetsDir/js/[name].chunk.js",
        assetModuleFilename: "assetsDir/media/[name].[hash][ext]",
      };

      webpackConfig.module.rules.forEach((rule) => {
        if (rule.oneOf) {
          rule.oneOf.forEach((one) => {
            if (
              one.options &&
              one.options.name &&
              one.options.name.includes("static/media/")
            ) {
              one.options.name = "assetsDir/media/[name].[hash:8].[ext]";
            }
          });
        }
      });

      webpackConfig.plugins.forEach((plugin) => {
        if (plugin.options && plugin.options.filename) {
          if (plugin.options.filename.includes("static/css/")) {
            plugin.options.filename = "assetsDir/css/[name].css";
            plugin.options.chunkFilename = "assetsDir/css/[name].chunk.css";
          } else if (plugin.options.filename.includes("static/js/")) {
            plugin.options.filename = "assetsDir/js/[name].js";
            plugin.options.chunkFilename = "assetsDir/js/[name].chunk.js";
          }
        }
      });

      return webpackConfig;
    },
  },
};
