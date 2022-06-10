import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { order } from '../../interfaces/order';

const initialState: { detail: order.order } = {
  detail: {
    name: '',
    number: -1
  }
};

export const orderDetailSlice = createSlice({
  name: 'orderDetail',
  initialState,
  reducers: {
    setIngredientDetail: (state, action: PayloadAction<order.order>) => {
      state.detail = action.payload;
    },
    reset: (state) => {
      state.detail = initialState.detail;
    }
  }
});

export const { setIngredientDetail, reset } = orderDetailSlice.actions;

export default orderDetailSlice.reducer;
