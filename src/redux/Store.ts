
import { configureStore } from "@reduxjs/toolkit"
import { authReducer, loginReducers, signupReducers } from "./slice/authslice"

export const store = configureStore({
  reducer: {
    authReducer:authReducer,
    signUpReducer:signupReducers,
    loginReducers:loginReducers,
  },
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch