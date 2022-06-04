import { ingredients } from '../interfaces/ingredients';

const initialState: ingredients.ingredient[] = [];

const reducer = (state: ingredients.ingredient[], action: ingredients.context.actions): ingredients.ingredient[] => {
  switch (action.type) {
    case 'set':
      return action.payload;
    case 'reset':
      return initialState;
    default:
      throw new Error(`Wrong type of action`);
  }
};

export { initialState, reducer };
