import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
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
    __v: 0,
    uuid: ''
  },
  main: []
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    setBun: (state, action: PayloadAction<ingredients.ingredient>) => {
      const bun = {
        ...action.payload,
        uuid: uuidv4()
      };
      state.bun = bun;
    },
    setMain: (state, action: PayloadAction<ingredients.ingredient>) => {
      const main = {
        ...action.payload,
        uuid: uuidv4()
      };
      state.main = [...state.main, main];
    },
    moveMainIngredient: (state, action: PayloadAction<{ draggedUuid: string; hoveredUuid: string }>) => {
      let mainIngredients = state.main;
      const draggedElement = mainIngredients.find((ingredient) => ingredient.uuid === action.payload.draggedUuid);
      if (draggedElement) {
        const hoverIndex = mainIngredients.findIndex((ingredient) => ingredient.uuid === action.payload.hoveredUuid);
        mainIngredients = mainIngredients.filter((ingredient) => ingredient.uuid !== action.payload.draggedUuid);
        mainIngredients.splice(hoverIndex, 0, draggedElement);
      }
      state.main = mainIngredients;
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

export const { setBun, setMain, removeBun, removeMain, reset, moveMainIngredient } = burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;
