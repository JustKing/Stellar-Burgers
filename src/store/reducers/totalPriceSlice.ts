import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { burger } from '../../interfaces/burger';

const initialState: { totalPrice: number } = {
  totalPrice: 0
};

export const totalPriceSlice = createSlice({
  name: 'totalPrice',
  initialState,
  reducers: {
    calculateTotalPrice(state, action: PayloadAction<burger.burger>) {
      if (action.payload.bun || action.payload.main.length > 0) {
        const mainPrice = action.payload.main.reduce((acc, ingredient) => acc + ingredient.price, 0);
        state.totalPrice = mainPrice + 2 * (action.payload.bun?.price || 0);
      } else {
        state.totalPrice = initialState.totalPrice;
      }
    },
    resetTotalPrice(state) {
      state.totalPrice = initialState.totalPrice;
    }
  }
});

export const { calculateTotalPrice, resetTotalPrice } = totalPriceSlice.actions;

export default totalPriceSlice.reducer;
