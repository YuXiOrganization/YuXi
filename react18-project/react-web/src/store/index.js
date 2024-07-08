import { configureStore } from "@reduxjs/toolkit";

import counterReducer from "./modules/counterStore";
import headerStore from "./modules/headerStore";
import appStore from "./modules/appStore.js";
const store = configureStore({
  reducer: {
    counter: counterReducer,
    header: headerStore,
    app: appStore,
  },
});

export default store;
