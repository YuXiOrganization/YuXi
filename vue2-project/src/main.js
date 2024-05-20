import '@/assets/styles/overallSituation.scss'

import Vue from 'vue'
import App from './App.vue'

import store from './store'
import router from './router'
import '@/router/routerGuard'

import directive from '@/utils/directive'
Vue.use(directive)

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import CommonPage from "@/components/common/CommonPage.vue";
// 创建Vue应用实例之前，使用Vue.component()方法注册全局组件
Vue.component('CommonPage', CommonPage);

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')