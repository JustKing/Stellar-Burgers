import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { order } from '../../interfaces/order';

const initialState: { detail: order.order } = {
  detail: {
    name: '',
    number: -1,
    error: ''
  }
};

export const orderDetailSlice = createSlice({
  name: 'orderDetail',
  initialState,
  reducers: {
    setOrderDetail: (state, action: PayloadAction<order.order>) => {
      state.detail = { ...action.payload, error: '' };
    },
    setOrderDetailError: (state, action: PayloadAction<string>) => {
      state.detail = { ...initialState.detail, error: action.payload };
    },
    resetOrderDetail: (state) => {
      state.detail = initialState.detail;
    }
  }
});

export const { setOrderDetail, setOrderDetailError, resetOrderDetail } = orderDetailSlice.actions;

export default orderDetailSlice.reducer;
