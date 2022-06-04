import { createContext } from 'react';
import { burger } from '../interfaces/burger';
import { ingredients } from '../interfaces/ingredients';
import { initialState as ingredientsInitialState } from '../reducers/ingredietsReducer';
import { initialState as burgerInitialState } from '../reducers/burgerReducer';

export const IngredientsContext = createContext<ingredients.context.context>({
  ingredients: ingredientsInitialState,
  ingredientsDispatcher: () => {}
});

export const BurgerContext = createContext<burger.context.context>({
  burger: burgerInitialState,
  burgerDispatcher: () => {}
});
