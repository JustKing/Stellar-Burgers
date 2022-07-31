import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: { offset: number; isCenter: boolean } = {
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
    resetOffset(state) {
      state.offset = initialState.offset;
    },
    setIsCenter(state, action: PayloadAction<boolean>) {
      state.isCenter = action.payload;
    }
  }
});

export const { setOffset, resetOffset, setIsCenter } = baseSlice.actions;

export default baseSlice.reducer;
