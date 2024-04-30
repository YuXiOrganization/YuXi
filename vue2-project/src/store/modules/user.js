const user = {
    namespaced: true,
    state: {
        token: localStorage.getItem("token") || null,
        rightList: JSON.parse(localStorage.getItem("rightList")) || null,
    },
    mutations: {
        SET_RIGHT_LIST: (state, status) => {
            state.rightList = status
        },
    },
    actions: {
        // 退出系统
        LogOut({
            commit,
            state
        }) {
            return new Promise((resolve, reject) => {
                // logout(state.token).then(() => {
                //     commit('SET_TOKEN', '')
                //     commit('SET_ROLES', [])
                //     commit('SET_PERMISSIONS', [])
                //     removeToken()
                //     resolve()
                // }).catch(error => {
                //     reject(error)
                // })
                localStorage.removeItem("token");
                resolve()
            })
        },
    }

}

export default user;