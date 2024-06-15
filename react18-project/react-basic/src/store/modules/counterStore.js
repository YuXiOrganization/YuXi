import { createSlice } from "@reduxjs/toolkit";

const counterStore = createSlice({
  name: "counter",
  initialState: {
    count: 0,
  },
  reducers: {
    inscrement(state) {
      state.count++;
    },
    decrement(state, action) {
      console.log("action", action);
      state.count -= action.payload;
    },
  },
});

const { inscrement, decrement } = counterStore.actions;
const promiseFun = () => {
  return new Promise((resolve) => {
    resolve(20);
  });
};

const fetchChannlList = () => {
  return async (dispatch) => {
    const res = await promiseFun();
    dispatch(decrement(res))
  };
};

const reducer = counterStore.reducer;
export { inscrement, decrement,fetchChannlList };
export default reducer;
