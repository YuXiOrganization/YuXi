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
    // 部署生产环境和开发环境下的URL。
    // 默认情况下，Vue CLI 会假设你的应用是被部署在一个域名的根路径上
    // 例如 https://www.ruoyi.vip/。如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。例如，如果你的应用被部署在 https://www.ruoyi.vip/admin/，则设置 baseUrl 为 /admin/。
    publicPath: process.env.NODE_ENV === "production" ? "/" : "/",
    // 在npm run build 或 yarn build 时 ，生成文件的目录名称（要和baseUrl的生产环境路径一致）（默认dist）
    outputDir: 'dist',
    // 用于放置生成的静态资源 (js、css、img、fonts) 的；（项目打包之后，静态资源会放在这个文件夹下）
    //注意nginx配置
    assetsDir: 'staticAdd',
    lintOnSave: false, // 关闭保存时的ESLint检查
    //指定 Vue CLI 是否应该转译依赖包,设置为 true 后会强制转译所有依赖
    transpileDependencies: true,

    devServer: {
        host: '0.0.0.0',
        port: 3000,
        open: true,
        proxy: {
            // detail: https://cli.vuejs.org/config/#devserver-proxy
            '/provider': {
                target: 'https://localhost:8080',
                ws: false,
                changeOrigin: true
            }
        },
        //绕过主机名检查
        // disableHostCheck: true
    },
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