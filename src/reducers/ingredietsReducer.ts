import { ingredients } from '../interfaces/ingredients';

const initialState: ingredients.state = {
  ingredients: [],
  loading: false,
  error: ''
};

const reducer = (state: ingredients.state, action: ingredients.context.actions): ingredients.state => {
  switch (action.type) {
    case 'loading':
      return { ...state, loading: action.payload };
    case 'set-error':
      return { ...state, error: action.payload };
    case 'set-ingredients':
      return { ...state, ingredients: action.payload, error: '' };
    case 'reset':
      return initialState;
    default:
      throw new Error(`Wrong type of action`);
  }
};

export { initialState, reducer };
