import { createSlice } from "@reduxjs/toolkit";

const appStore = createSlice({
  name: "app",
  initialState: {
    isMobile: window.innerWidth < 1024,
  },
  reducers: {
    setIsMobile: (state, action) => {
      // console.log("action.payload", action.payload);
      state.isMobile = action.payload;
    },
  },
});

const { setIsMobile } = appStore.actions;

const reducer = appStore.reducer;
export { setIsMobile };
export default reducer;
