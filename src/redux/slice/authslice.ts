import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../Store';


interface CounterState {
    value: boolean
  }
  
  // Define the initial state using that type
  const initialState: CounterState = {
    value: false,
  }


  export const authSlice = createSlice({ 
    name:"authModal",
    initialState,
    reducers:{
        OCAuthModel:(state)=>{
            state.value = !state.value;
        }
    }
   });

   export const {OCAuthModel} =authSlice.actions;

   export const selectCount = (state: RootState) => state.authReducer.value
    export const  authReducer  = authSlice.reducer