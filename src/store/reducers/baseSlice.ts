import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  offset: 0
};

export const baseSlice = createSlice({
  name: 'base',
  initialState,
  reducers: {
    setOffset(state, action: PayloadAction<number>) {
      state.offset = action.payload;
    },
    resetOffset(state) {
      state.offset = initialState.offset;
    }
  }
});

export const { setOffset, resetOffset } = baseSlice.actions;

export default baseSlice.reducer;
