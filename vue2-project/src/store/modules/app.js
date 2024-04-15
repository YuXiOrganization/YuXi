const state = {
    sidebar: {
        opened: sessionStorage.getItem("sidebarStatus") ? sessionStorage.getItem('sidebarStatus') == '1' ? true : false : true,
        withoutAnimation: false,
        hide: false
    },
    device: 'desktop',
    size: sessionStorage.getItem('size') || 'medium'
}

const mutations = {
    TOGGLE_SIDEBAR: state => {
        if (state.sidebar.hide) {
            return false;
        }
        state.sidebar.opened = !state.sidebar.opened
        state.sidebar.withoutAnimation = false
        if (state.sidebar.opened) {
            sessionStorage.setItem('sidebarStatus', 1)
        } else {
            sessionStorage.getItem('sidebarStatus', 0)
        }
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
        sessionStorage.getItem('sidebarStatus', 0)
        state.sidebar.opened = false
        state.sidebar.withoutAnimation = withoutAnimation
    },
    TOGGLE_DEVICE: (state, device) => {
        state.device = device
    },
    SET_SIZE: (state, size) => {
        state.size = size
        sessionStorage.getItem('size', size)
    },
    SET_SIDEBAR_HIDE: (state, status) => {
        state.sidebar.hide = status
    }
}

const actions = {
    toggleSideBar({
        commit
    }) {
        commit('TOGGLE_SIDEBAR')
    },
    closeSideBar({
        commit
    }, {
        withoutAnimation
    }) {
        commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    toggleDevice({
        commit
    }, device) {
        commit('TOGGLE_DEVICE', device)
    },
    setSize({
        commit
    }, size) {
        commit('SET_SIZE', size)
    },
    toggleSideBarHide({
        commit
    }, status) {
        commit('SET_SIDEBAR_HIDE', status)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}