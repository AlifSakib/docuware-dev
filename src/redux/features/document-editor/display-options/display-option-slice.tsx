import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  zoomIn: 1,
};

const displayOptionSlice = createSlice({
  name: "displayOptions",
  initialState,
  reducers: {
    zoomIn(state) {
      state.zoomIn += 0.1;
    },
  },
});

export const { zoomIn } = displayOptionSlice.actions;

export default displayOptionSlice.reducer;
