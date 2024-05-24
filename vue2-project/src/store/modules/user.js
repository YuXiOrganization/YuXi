import {
    postFormAction,
    getAction
} from '@/api/currencyApi'
import {
    sortFun,
    handleTree
} from '@/utils/collectionMethods/arrayMethods'
import router, {
    dynamicRoutes
} from '@/router'
import {
    Message
} from 'element-ui'
const user = {
    namespaced: true,
    state: {
        token: localStorage.getItem("token") || null,
        rightList: JSON.parse(localStorage.getItem("rightList")) || null,
        userList: null,
        permissions: null,
        authCode: null
    },
    mutations: {
        SET_TOKEN: (state, status) => {
            localStorage.setItem("token", status)
            state.token = status
        },
        SET_RIGHT_LIST: (state, status) => {
            localStorage.setItem("rightList", JSON.stringify(status))
            state.rightList = status
        },
        SET_USER_LIST: (state, status) => {
            state.userList = status
        },
        SET_PERMISSIONS: (state, status) => {
            state.permissions = status
        },
        SET_AUTH_CODE: (state, status) => {
            state.authCode = status
        },
    },
    actions: {
        // 获取用户权限
        // role/queryAuthByCode
        GetQueryAuthByCode({
            commit,
            state
        }, data) {
            return new Promise(async(resolve, reject) => {
                try {
                    console.log("state.authCode", state.authCode + "===" + data)
                    if (state.authCode == data) {
                        resolve(state.permissions)
                    } else {
                        const res = await postFormAction("/role/queryAuthByCode", {
                            auth_code: data
                        })

                        console.log("获取resqueryAuthByCode", res)
                        if (res.success) {
                            let getAuth_code = res.data.map((item) => {
                                return item.auth_code
                            })

                            commit('SET_AUTH_CODE', data)
                            commit('SET_PERMISSIONS', getAuth_code)
                            resolve(getAuth_code)


                        } else {
                            LogOut()
                        }
                    }
                } catch (error) {
                    reject(error)
                }
            })
        },
        // 登录
        Login({
            commit
        }, data) {

            return new Promise(async(resolve, reject) => {
                try {
                    const res = await postFormAction("/login", data);
                    // console.log("data", data)
                    commit('SET_TOKEN', res.data)
                    console.log("res", res)
                    resolve(res)
                } catch (err) {
                    reject(error)
                }
            })
        },
        // 退出系统
        LogOut({
            commit,
            state
        }) {
            return new Promise(async(resolve, reject) => {

                const res = await postFormAction("/logout");
                localStorage.removeItem("token");
                router.replace({
                    path: '/'
                })
                resolve()
            })
        },
        // 获取用户信息
        GetInfo({
            commit,
            state
        }) {
            return new Promise(async(resolve, reject) => {
                try {
                    const getAdmin = await getAction("/queryAdmin")
                    if (getAdmin.success) {
                        commit('SET_USER_LIST', getAdmin.data)
                        resolve()
                    } else {
                        LogOut()
                    }

                } catch (error) {
                    reject(error)
                }
            })
        },
        // 生成路由
        GenerateRoutes({
            commit,
            state
        }) {
            return new Promise(async(resolve, reject) => {
                // 向后端请求路由数据
                try {
                    const getAuthList = await postFormAction("/role/queryAuthList", {
                        id: state.userList.id
                    })
                    let getData = sortFun(getAuthList.data, 'id')
                    let gethandleTree = handleTree(getData)
                        // console.log("gethandleTree", gethandleTree)
                        //  接口动态路由添加
                        // 有两种一种在现有路由中添加router.addRoute('home', route);
                        //一种新增路由 router.addRoute(route);
                        // https://v3.router.vuejs.org/zh/api/#router-addroutes
                    gethandleTree.forEach(route => {
                        router.addRoute(route);
                        // console.log("routevroute", route)
                    });
                    // //  动态路由添加
                    dynamicRoutes.forEach(route => {
                        router.addRoute(route);
                    });
                    // console.log("gethandleTree", gethandleTree)
                    // console.log("dynamicRoutes", dynamicRoutes)

                    commit('SET_RIGHT_LIST', gethandleTree)
                    resolve()
                } catch (error) {
                    reject(error)
                }

            })
        }



    }

}



export default user;