import { burger } from '../interfaces/burger';

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

const reducer = (state: burger.burger, action: burger.context.actions): burger.burger => {
  switch (action.type) {
    case 'set-bun':
      return { ...state, bun: action.payload };
    case 'set-main':
      return { ...state, main: [...state.main, action.payload] };
    case 'remove-bun':
      return { ...state, bun: initialState.bun };
    case 'remove-main':
      return { ...state, main: state.main.filter((id, key) => key !== action.payload) };
    case 'reset':
      return initialState;
    default:
      throw new Error(`Wrong type of action`);
  }
};

export { initialState, reducer };
