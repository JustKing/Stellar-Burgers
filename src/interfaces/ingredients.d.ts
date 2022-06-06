import { Dispatch } from 'react';

export namespace ingredients {
  export type type = 'sauce' | 'main' | 'bun';

  export namespace context {
    type actions =
      | { type: 'set-ingredients'; payload: ingredients.ingredient[] }
      | { type: 'set-error'; payload: string }
      | { type: 'reset' }
      | { type: 'loading'; payload: boolean };
    export interface context {
      ingredients: state;
      ingredientsDispatcher: Dispatch<actions>;
    }
  }

  export interface state {
    ingredients: ingredient[];
    loading: boolean;
    error: string;
  }

  export interface ingredient {
    _id: string;
    name: string;
    type: type;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
  }
}
