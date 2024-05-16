import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { jobList } from "../../assets/type/homeType";


const initialState:jobList[]  = [];
  
export const jobListSlice = createSlice({
    name: "jobListSlice",
    initialState,
    reducers: {
      set_posts: (state,   action: PayloadAction<jobList[]>) => {
        console.log(action.payload);
        
        state =  action.payload;
        return state;
      },
    },
  });
  
  export const { set_posts } = jobListSlice.actions;
export const jobListReducers = jobListSlice.reducer;