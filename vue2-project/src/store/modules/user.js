import {
    postFormAction,
    getAction
} from '@/api/currencyApi'
import {
    sortFun,
    handleTree
} from '@/utils/collectionMethods/arrayMethods'
import router from '@/router'
const user = {
    namespaced: true,
    state: {
        token: localStorage.getItem("token") || null,
        rightList: JSON.parse(localStorage.getItem("rightList")) || null,
        userList: null
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
    },
    actions: {
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
            return new Promise((resolve, reject) => {
                localStorage.removeItem("token");
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
                    commit('SET_USER_LIST', getAdmin.data)
                    resolve()
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
                    console.log("gethandleTree", gethandleTree)
                        // TODO 动态路由添加
                        // 有两种一种在现有路由中添加router.addRoute('home', route);
                        //一种新增路由 router.addRoute(route);
                        // https://v3.router.vuejs.org/zh/api/#router-addroutes
                    gethandleTree.forEach(route => {
                        router.addRoute(route);
                    });
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