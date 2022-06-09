import { configureStore, combineReducers } from '@reduxjs/toolkit';

import { ingredientsApi } from './services/ingredients';
import { burgerConstructorSlice } from './reducers/burgerConstructor';

const rootReducer = combineReducers({
  [ingredientsApi.reducerPath]: ingredientsApi.reducer,
  burger: burgerConstructorSlice.reducer
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(ingredientsApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
