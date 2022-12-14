import {createSlice} from "@reduxjs/toolkit";
import {PayloadAction} from "@reduxjs/toolkit/dist/createAction";
import {onAuthStateChanged} from "firebase/auth";

interface authState {
  currentUser: any;
}
const initialState: authState = {
  currentUser: "not user",
};
export const userAuthSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    setCurrentUser: (state, action: any) => {
      state.currentUser = action.payload;
    },
  },
});
export default userAuthSlice.reducer;
