import { createSlice } from "@reduxjs/toolkit";

const initialState = { 
    title:"",
    note:""
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
      toDoValue: (state, action) => {
        state.title = action.payload.title;
        state.note = action.payload.note;
      }
    },
  });
  export const { toDoValue } = userSlice.actions;
  export default userSlice.reducer;