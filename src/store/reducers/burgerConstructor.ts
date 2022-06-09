import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { burger } from '../../interfaces/burger';
import { ingredients } from '../../interfaces/ingredients';

const initialState: burger.burger = {
  bun: {
    _id: '',
    name: '',
    type: 'bun',
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0,
    price: 0,
    image: '',
    image_mobile: '',
    image_large: '',
    __v: 0
  },
  main: []
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    setBun: (state, action: PayloadAction<ingredients.ingredient>) => {
      state.bun = action.payload;
    },
    setMain: (state, action: PayloadAction<ingredients.ingredient>) => {
      state.main = [...state.main, action.payload];
    },
    removeBun: (state) => {
      state.bun = initialState.bun;
    },
    removeMain: (state, action: PayloadAction<number>) => {
      state.main = state.main.filter((ingredient, key) => key !== action.payload);
    },
    reset: (state) => {
      state = initialState;
    }
  }
});

export const { setBun, setMain, removeBun, removeMain, reset } = burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;
