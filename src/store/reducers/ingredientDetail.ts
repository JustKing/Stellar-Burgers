import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ingredients } from '../../interfaces/ingredients';

const initialState: { detail: ingredients.ingredient } = {
  detail: {
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
  }
};

export const ingredientDetailSlice = createSlice({
  name: 'ingredientsDetail',
  initialState,
  reducers: {
    setIngredientDetail: (state, action: PayloadAction<ingredients.ingredient>) => {
      state.detail = action.payload;
    },
    reset: (state) => {
      state.detail = initialState.detail;
    }
  }
});

export const { setIngredientDetail, reset } = ingredientDetailSlice.actions;

export default ingredientDetailSlice.reducer;
