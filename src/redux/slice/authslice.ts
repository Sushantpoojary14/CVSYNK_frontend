import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../Store";


interface authMState {
  value: boolean;
}
const initialState: authMState = {
  value: false,
};

type loginnup = { token: string | null; user: string  | null };

const userString = localStorage.getItem("user");
const tokenString = localStorage.getItem("token");
const LLinitialState: loginnup = {
  token: userString ? JSON.parse(userString) : null,
  user: tokenString ? tokenString : null,
};

export const authSlice = createSlice({
  name: "authModal",
  initialState,
  reducers: {
    OCAuthModel: (state) => {
      state.value = !state.value;
    },
  },
});

export const { OCAuthModel } = authSlice.actions;

export const selectCount = (state: RootState) => state.authReducer.value;
export const authReducer = authSlice.reducer;

export const loginSlice = createSlice({
  name: "login",
  initialState: LLinitialState,
  reducers: {
    login: (state, action: PayloadAction<loginnup>) => {
        const {user, token } = action.payload;

        localStorage.setItem("user", JSON.stringify(user));
          token && localStorage.setItem("token", token);

        state.user = user;
        state.token = token;
    
    },

    logout: (state) => {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      state.user = null;
      state.token = null;

      return state;
    },
  },
});
export const { login, logout } = loginSlice.actions;
export const loginReducers = loginSlice.reducer;
