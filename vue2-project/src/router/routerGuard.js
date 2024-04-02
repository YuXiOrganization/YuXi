import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import router from '@/router'

NProgress.configure({
    showSpinner: false
})
const whiteList = ['/login', '/register']
router.beforeEach((to, from, next) => {
    NProgress.start()
    const getToken = localStorage.getItem("token") || null
        // 获取token，这里假设存储在localStorage中
    console.log("路由守卫", whiteList.includes(to.path))
        // 判断当前要访问的路由是否在白名单内
    if (whiteList.includes(to.path)) {
        // 如果在白名单内，则直接放行
        next();
    } else {
        console.log("getToken", getToken)
            // 如果不在白名单内且目标路由需要认证
        if (getToken) {
            // 如果存在token，则允许进入
            next();
        } else {
            // 否则，重定向到登录页
            next({
                path: '/login',
                query: {
                    redirect: to.fullPath
                }
            });
            NProgress.done()
        }
    }

})

router.afterEach(() => {
    NProgress.done()
})