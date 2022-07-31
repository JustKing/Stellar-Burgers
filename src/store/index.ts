import { configureStore, combineReducers } from '@reduxjs/toolkit';

import { ingredientsApi } from './services/ingredients';
import { ordersApi } from './services/orderDetail';
import { ordersWsApi } from './services/orders';
import { authApi } from './services/auth';
import burgerConstructorSlice from './reducers/burgerConstructorSlice';
import totalPriceSlice from './reducers/totalPriceSlice';
import orderDetailSlice from './reducers/orderDetailSlice';
import profileSlice from './reducers/profileSlice';
import baseSlice from './reducers/baseSlice';

const rootReducer = combineReducers({
  [ingredientsApi.reducerPath]: ingredientsApi.reducer,
  [ordersApi.reducerPath]: ordersApi.reducer,
  [ordersWsApi.reducerPath]: ordersWsApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  burger: burgerConstructorSlice,
  totalPrice: totalPriceSlice,
  orderDetail: orderDetailSlice,
  profile: profileSlice,
  base: baseSlice
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(ingredientsApi.middleware)
      .concat(ordersApi.middleware)
      .concat(authApi.middleware)
      .concat(ordersWsApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
