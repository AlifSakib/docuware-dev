import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  documents: [],
};

const documentSlice = createSlice({
  name: "documents",
  initialState,
  reducers: {},
});

// export const {} = documentSlice.actions;

export default documentSlice.reducer;
