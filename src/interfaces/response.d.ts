import { ingredients } from './ingredients';

export namespace response {
  export interface ingredient {
    success: boolean;
    data: ingredients.ingredient[];
  }
  export interface order {
    name: string;
    order: {
      number: number;
    };
    success: boolean;
  }
}
