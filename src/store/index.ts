import { configureStore, combineReducers } from '@reduxjs/toolkit';

import { ingredientsApi } from './services/ingredients';
import { ordersApi } from './services/orderDetail';
import { burgerConstructorSlice } from './reducers/burgerConstructorSlice';
import { ingredientDetailSlice } from './reducers/ingredientDetailSlice';
import { totalPriceSlice } from './reducers/totalPriceSlice';

const rootReducer = combineReducers({
  [ingredientsApi.reducerPath]: ingredientsApi.reducer,
  [ordersApi.reducerPath]: ordersApi.reducer,
  burger: burgerConstructorSlice.reducer,
  ingredientDetail: ingredientDetailSlice.reducer,
  totalPrice: totalPriceSlice.reducer
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ingredientsApi.middleware).concat(ordersApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
