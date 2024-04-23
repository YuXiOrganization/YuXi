import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import user from '@/store/modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        rightList: JSON.parse(sessionStorage.getItem('rightList') || '[]'),
        username: sessionStorage.getItem('name1')
    },
    mutations: {
        setRightList(state, data) {
            state.rightList = data
            sessionStorage.setItem('rightList', JSON.stringify(data))
        },
        setUsername(state, data) {
            state.username = data
            sessionStorage.setItem('name1', data)
        },
    },
    modules: {
        app,
        user
    },
    getters
})

export default store