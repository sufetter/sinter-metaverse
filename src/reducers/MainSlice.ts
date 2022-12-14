import {createSlice} from "@reduxjs/toolkit";
import {PayloadAction} from "@reduxjs/toolkit/dist/createAction";

interface MainState {
  isOpen: string;
}
const initialState: MainState = {
  isOpen: "none",
};

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    changeMainOpen: (state, action: PayloadAction<string>) => {
      state.isOpen = action.payload;
    },
  },
});
export default mainSlice.reducer;
