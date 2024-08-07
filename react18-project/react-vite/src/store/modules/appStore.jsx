import { createSlice } from "@reduxjs/toolkit";

const appStore = createSlice({
  name: "app",
  initialState: {
    isMobile: window.innerWidth < 1024, //是否移动端
    defaultOpenKeys: localStorage.getItem("defaultOpenKeys") || "/app1", //当前路由指向
  },
  reducers: {
    setIsMobile: (state, action) => {
      // console.log("action.payload", action.payload);
      state.isMobile = action.payload;
    },
    setDefaultOpenKeys(state, action) {
      // console.log("action",action)
      localStorage.setItem("defaultOpenKeys", action.payload);
      state.defaultOpenKeys = action.payload;
    },
  },
});

const { setIsMobile, setDefaultOpenKeys } = appStore.actions;

const reducer = appStore.reducer;
export { setIsMobile, setDefaultOpenKeys };
export default reducer;
