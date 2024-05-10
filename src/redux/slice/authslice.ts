import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../Store";

interface authMState {
  value: boolean;
}
interface sigUpState {
  fullname: string;
  email: string;
  password: string;
  phonenumber: string;
}
interface loginState {
  email: string;
  password: string;
}
// Define the initial state using that type
const initialState: authMState = {
  value: false,
};
type signup = { value: sigUpState[]; message: string };
type loginnup = { value: loginState | null; message: string };

const userDBString = localStorage.getItem("userDB");
const SUinitialState: signup = {
  value: userDBString ? JSON.parse(userDBString) : [],
  message: "",
};

const userString = localStorage.getItem("user");
const LLinitialState: loginnup = {
  value: userString ? JSON.parse(userString) : null,
  message: "",
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

export const signupSlice = createSlice({
  name: "signup",
  initialState: SUinitialState,
  reducers: {
    signup: (state, action: PayloadAction<sigUpState>) => {
      const exist = state.value.find((item: sigUpState) => {
        return item.email.toLowerCase == action.payload.email.toLowerCase;
      });

      if (exist) {
        state.message = "Already Exist";
      }
      state.value.push(action.payload);
      localStorage.setItem("userDB", JSON.stringify(state.value));
      state.message = "Success";

      return state;
    },
  },
});

export const { signup } = signupSlice.actions;
export const signupReducers = signupSlice.reducer;

export const loginSlice = createSlice({
  name: "login",
  initialState: LLinitialState,
  reducers: {
    login: (state, action: PayloadAction<loginState>) => {
      const value = userDBString ? JSON.parse(userDBString) : [];

      const data = value.find((item: sigUpState) => {
        return item.email.toLowerCase == action.payload.email.toLowerCase;
      });

      if (data && data.password == action.payload.password) {
        localStorage.setItem("user", JSON.stringify(data));
        state.message = "Successful Login ";
        state.value = data;
      }

      state.message = "Does not match";
      state.value = null;
      console.log({ message: state.message, value: state.value });
    },

    logout: (state) => {
      localStorage.removeItem("user");

      state.message = "Successful Logout";
      state.value = null;

      return state;
    },
  },
});
export const { login, logout } = loginSlice.actions;
export const loginReducers = loginSlice.reducer;
