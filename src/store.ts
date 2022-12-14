import {combineReducers, configureStore} from "@reduxjs/toolkit";
import mainSlice from "./reducers/MainSlice";

const rootReducer = combineReducers({mainSlice});
export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
