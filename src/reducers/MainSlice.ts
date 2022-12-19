import {createSlice} from "@reduxjs/toolkit";
import {PayloadAction} from "@reduxjs/toolkit/dist/createAction";

interface MainState {
  isOpen: string;
  currentChat: any;
}
const initialState: MainState = {
  isOpen: "none",
  currentChat: null,
};

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    changeMainOpen: (state, action: PayloadAction<string>) => {
      state.isOpen = action.payload;
    },
    changeCurrentChat: (state, action: PayloadAction<any>) => {
      state.currentChat = action.payload;
    },
  },
});
export default mainSlice.reducer;
