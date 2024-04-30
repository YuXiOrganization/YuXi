const getters = {
    sidebar: state => state.app.sidebar,
    device: state => state.app.device,
    isDark: state => state.app.isDark,
    rightList: state => state.user.rightList,
}
export default getters