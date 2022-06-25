import { configureStore, combineReducers } from '@reduxjs/toolkit';

import { ingredientsApi } from './services/ingredients';
import { ordersApi } from './services/orderDetail';
import { authApi } from './services/auth';
import burgerConstructorSlice from './reducers/burgerConstructorSlice';
import ingredientDetailSlice from './reducers/ingredientDetailSlice';
import totalPriceSlice from './reducers/totalPriceSlice';
import orderDetailSlice from './reducers/orderDetailSlice';
import profileSlice from './reducers/profileSlice';
import baseSlice from './reducers/baseSlice';

const rootReducer = combineReducers({
  [ingredientsApi.reducerPath]: ingredientsApi.reducer,
  [ordersApi.reducerPath]: ordersApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  burger: burgerConstructorSlice,
  ingredientDetail: ingredientDetailSlice,
  totalPrice: totalPriceSlice,
  orderDetail: orderDetailSlice,
  profile: profileSlice,
  base: baseSlice
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
