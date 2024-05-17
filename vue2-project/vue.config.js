const {
    defineConfig
} = require('@vue/cli-service')
const CompressionPlugin = require('compression-webpack-plugin')
const path = require('path')
const resolve = (dir) => {
    return path.join(__dirname, dir)
}

const name = process.env.VUE_APP_TITLE || '真商助手管理系统' // 网页标题


module.exports = defineConfig({
    lintOnSave: false, // 关闭保存时的ESLint检查
    transpileDependencies: true,
    configureWebpack: {
        name: name,
        resolve: {
            alias: {
                '@': resolve('src')
            }
        },
        plugins: [
            // 这段配置的主要目的是启用gzip压缩，以减小静态资源文件的大小，从而加快网站的加载速度，同时保持原始文件以便于调试。
            // http://doc.ruoyi.vip/ruoyi-vue/other/faq.html#使用gzip解压缩静态文件
            new CompressionPlugin({
                test: /\.(js|css|html|jpe?g|png|gif|svg)$/i, // 压缩文件格式，修正了尾部不必要的问号
                filename: '[path][base].gz[query]', // 压缩后的文件名保持不变
                algorithm: 'gzip', // 使用gzip压缩
                threshold: 10240, // 添加了threshold选项，定义压缩前最小文件大小，单位字节，默认为10KB，这里作为示例保持
                minRatio: 0.8, // 压缩比例，小于 80% 的文件不会被压缩
                deleteOriginalAssets: false, // 压缩后保留原文件
            }),
        ],
    }
})