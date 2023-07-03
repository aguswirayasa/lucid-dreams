import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PromptState {
  data: any;
  error: string | null;
}

const initialState: PromptState = {
  data: null,
  error: null,
};

export const promptSlice = createSlice({
  name: "prompt",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setData, setError } = promptSlice.actions;

export const store = configureStore({
  reducer: {
    prompt: promptSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
