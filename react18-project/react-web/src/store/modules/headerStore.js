import { createSlice } from "@reduxjs/toolkit";

const headerStore = createSlice({
  name: "header",
  initialState: {
    defaultOpenKeys: localStorage.getItem("defaultOpenKeys") || "/",
  },
  reducers: {
    setDefaultOpenKeys(state, action) {
      // console.log("action",action)
      localStorage.setItem("defaultOpenKeys", action.payload);
      state.defaultOpenKeys = action.payload;
    },
  },
});

const { setDefaultOpenKeys } = headerStore.actions;

const reducer = headerStore.reducer;
export { setDefaultOpenKeys };
export default reducer;
