import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type InitialState = { offset: number; isCenter: boolean };

const initialState: InitialState = {
  offset: 0,
  isCenter: false
};

export const baseSlice = createSlice({
  name: 'base',
  initialState,
  reducers: {
    setOffset(state, action: PayloadAction<number>) {
      state.offset = action.payload;
    },
    setIsCenter(state, action: PayloadAction<boolean>) {
      state.isCenter = action.payload;
    },
    reset(state) {
      state.offset = initialState.offset;
      state.isCenter = initialState.isCenter;
    }
  }
});

export const { setOffset, reset, setIsCenter } = baseSlice.actions;

export default baseSlice.reducer;
