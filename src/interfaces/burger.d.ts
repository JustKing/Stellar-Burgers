import { ingredients } from './ingredients';

export namespace burger {
  export namespace context {
    type priceActions = { type: 'get'; payload: burger };
    export interface priceContext {
      price: number;
      priceDispatcher: Dispatch<priceActions>;
    }
    type actions =
      | { type: 'set-bun'; payload: ingredients.ingredient }
      | { type: 'set-main'; payload: ingredients.ingredient }
      | { type: 'remove-bun' }
      | { type: 'remove-main'; payload: number }
      | { type: 'reset' }
      | { type: 'total-price' };
    export interface context {
      burger: burger;
      burgerDispatcher: Dispatch<actions>;
    }
  }

  export interface burger {
    bun: ingredients.ingredient;
    main: ingredients.ingredient[];
  }
}
