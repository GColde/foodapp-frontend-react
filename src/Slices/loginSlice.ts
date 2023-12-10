import { createSlice } from "@reduxjs/toolkit";

export interface LoginState {
  sessionId: string;
}

const initialState: LoginState = {
  sessionId: "",
};

export const loginSlice = createSlice({
  name: "logIn",
  initialState,
  reducers: {
    setSessionId: (state, action) => {
      state.sessionId = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSessionId } = loginSlice.actions;

export default loginSlice.reducer;
