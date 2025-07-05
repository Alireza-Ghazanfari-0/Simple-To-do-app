import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    countOperation: (state, action) => {
      state.value += 1;
    },
  },
});
export default counterSlice.reducer;
export const { countOperation } = counterSlice.actions;
