import {combineReducers, configureStore} from "@reduxjs/toolkit";
import mainSlice from "./reducers/MainSlice";
import userAuthSlice from "./reducers/userAuthSlice";
import {getDefaultMiddleware} from "@reduxjs/toolkit";
const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

const rootReducer = combineReducers({mainSlice, userAuthSlice});
export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: customizedMiddleware,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
