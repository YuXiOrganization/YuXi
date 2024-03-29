const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    lintOnSave: false, // 关闭保存时的ESLint检查
    transpileDependencies: true
})