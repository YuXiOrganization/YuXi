import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import router from '@/router'
import store from '@/store'
import {
    Message
} from 'element-ui'

NProgress.configure({
    showSpinner: false
})
const whiteList = ['/login', '/register']
router.beforeEach(async(to, from, next) => {
    NProgress.start()
    const getToken = localStorage.getItem("token") || null
        // 获取token，这里假设存储在localStorage中
        // console.log("路由守卫", whiteList.includes(to.path))
        // 判断当前要访问的路由是否在白名单内
    if (whiteList.includes(to.path)) {
        // 如果在白名单内，则直接放行
        next();
    } else {
        // console.log("getToken", to.path)
        // 如果不在白名单内且目标路由需要认证
        if (getToken) {
            // 如果存在token，则允许进入
            // console.log("路由经过", to)
            //获取当前页面权限
            if (to.meta.authCode) {
                await store.dispatch('user/GetQueryAuthByCode', to.meta.authCode)
            }


            if (!store.getters.userList) {
                store.dispatch('user/GetInfo').then(() => {
                    store.dispatch('user/GenerateRoutes').then(accessRoutes => {
                        // 根据roles权限生成可访问的路由表
                        //   router.addRoutes(accessRoutes) // 动态添加可访问路由表
                        // console.log("to", to)
                        next({
                                ...to,
                                replace: true
                            }) // hack方法 确保addRoutes已完成
                            // next();
                            // console.log("路由经过")
                    })
                }).catch(err => {
                    store.dispatch('user/LogOut')
                        // .then(() => {
                    Message.error(err)
                        //     next({
                        //         path: '/'
                        //     })
                        // })
                })

            } else {
                next();

            }


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