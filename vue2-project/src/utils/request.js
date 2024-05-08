import axios from 'axios'


// console.log("process.env.VUE_APP_API_BASE_URL= ", process.env.VUE_APP_BASE_API)
let apiBaseUrl = process.env.VUE_APP_BASE_API
    // console.log("apiBaseUrl= ", apiBaseUrl)
    // 创建 axios 实例
const service = axios.create({
    //baseURL: '/jeecg-boot',
    baseURL: apiBaseUrl, // api base_url
    timeout: 90000 // 请求超时时间
})

const err = (error) => {
    if (error.response) {
        let data = error.response.data
        const token = localStorage.getItem("token")
        console.log("------异常响应------", token)
        console.log("------异常响应------", error.response.status)
        switch (error.response.status) {
            case 403:
                //   Vue.prototype.$Jnotification.error({ message: '系统提示', description: '拒绝访问',duration: 4})
                break
            case 500:
                console.log("------error.response------", error.response)

                // update-end- --- author:liusq ------ date:20200910 ---- for:处理Blob情况----
                if (token && data.message.includes("Token失效")) {

                    // update-end- --- author:scott ------ date:20190225 ---- for:Token失效采用弹框模式，不直接跳转----
                }
                break
            case 404:
                // Vue.prototype.$Jnotification.error({ message: '系统提示', description:'很抱歉，资源未找到!',duration: 4})
                break
            case 504:
                //   Vue.prototype.$Jnotification.error({ message: '系统提示', description: '网络超时'})
                break
            case 401:
                //   Vue.prototype.$Jnotification.error({ message: '系统提示', description:'未授权，请重新登录',duration: 4})
                if (token) {
                    // store.dispatch('Logout').then(() => {
                    //   setTimeout(() => {
                    //     window.location.reload()
                    //   }, 1500)
                    // })
                }
                break
            default:
                //   Vue.prototype.$Jnotification.error({
                //     message: '系统提示',
                //     description: data.message,
                //     duration: 4
                //   })
                break
        }
    } else if (error.message) {
        if (error.message.includes('timeout')) {
            // Vue.prototype.$Jnotification.error({message: '系统提示', description: '网络超时'})
        } else {
            // Vue.prototype.$Jnotification.error({message: '系统提示', description: error.message})
        }
    }
    return Promise.reject(error)
};


// request interceptor
service.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    if (token) {
        config.headers['Admintoken'] = token // 让每个请求携带自定义 token 请根据实际情况自行修改
    }
    return config
}, (error) => {
    return Promise.reject(error)
})

// response interceptor
service.interceptors.response.use((response) => {
    return response.data
}, err)





export {
    service as axios
}