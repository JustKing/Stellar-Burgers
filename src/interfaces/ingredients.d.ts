import { Dispatch } from 'react';

export namespace ingredients {
  export type type = 'sauce' | 'main' | 'bun';

  export namespace context {
    type actions = { type: 'set'; payload: ingredients.ingredient[] } | { type: 'reset' };
    export interface context {
      ingredients: ingredient[];
      ingredientsDispatcher: Dispatch<actions>;
    }
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
