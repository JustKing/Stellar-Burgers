export namespace ingredients {
  export interface ingredient {
    _id: string;
    name: string;
    type: string;
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

  export interface burger {
    topBun: string;
    main: string[];
    bottomBun: string;
  }
}
