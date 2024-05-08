const getters = {
    sidebar: state => state.app.sidebar,
    device: state => state.app.device,
    isDark: state => state.app.isDark,
    rightList: state => state.user.rightList,
    userList: state => state.user.userList,
}
export default getters