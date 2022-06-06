import { burger } from '../interfaces/burger';

const initialState = 0;

const reducer = (state: number, action: burger.context.priceActions): number => {
  switch (action.type) {
    case 'get':
      if (action.payload.bun || action.payload.main.length > 0) {
        const mainPrice = action.payload.main.reduce((acc, ingredient) => acc + ingredient.price, 0);
        return mainPrice + 2 * (action.payload.bun?.price || 0);
      }
      return 0;
    default:
      throw new Error(`Wrong type of action`);
  }
};

export { initialState, reducer };
