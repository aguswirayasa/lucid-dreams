import { configureStore } from "@reduxjs/toolkit";
import { promptSlice } from "./promptSlice";

export const store = configureStore({
  reducer: {
    prompt: promptSlice.reducer,
  },
});
