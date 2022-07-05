import { ingredients } from './ingredients';

export namespace burger {
  export interface burger {
    bun: ingredients.ingredient;
    main: ingredients.ingredient[];
  }
}
