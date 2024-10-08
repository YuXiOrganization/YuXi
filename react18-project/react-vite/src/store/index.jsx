import { configureStore } from "@reduxjs/toolkit";
import appStore from "./modules/appStore";
const store = configureStore({
  reducer: {
    app: appStore,
  },
});

export default store;