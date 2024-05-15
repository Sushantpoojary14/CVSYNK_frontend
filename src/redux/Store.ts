
import { configureStore } from "@reduxjs/toolkit"
import { authReducer, loginReducers } from "./slice/authslice"
import { jobListReducers } from "./slice/appslice"

export const store = configureStore({
  reducer: {
    authReducer:authReducer,
    loginReducers:loginReducers,
    jobListReducers:jobListReducers
  },
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch