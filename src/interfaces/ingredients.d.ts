export namespace ingredients {
  export type ingredientType = 'bun' | 'sauce' | 'main';
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
    uuid?: string;
  }
}
