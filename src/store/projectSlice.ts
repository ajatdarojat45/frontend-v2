import { createSlice } from "@reduxjs/toolkit";

const projectSlice = createSlice({
  name: "project",
  initialState: {
    activeGroup: "ALL",
  },
  reducers: {
    setActiveGroup: (state, action) => {
      state.activeGroup = action.payload;
    },
  },
});

export const { setActiveGroup } = projectSlice.actions;

export const projectReducer = projectSlice.reducer;
