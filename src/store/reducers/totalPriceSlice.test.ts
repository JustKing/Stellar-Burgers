import reducer, { calculateTotalPrice, resetTotalPrice } from './totalPriceSlice';

const initialState: { totalPrice: number } = {
  totalPrice: 0
};

describe('profile slice tests', () => {
  it('Should return the initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual(initialState);
  });
  describe('profile slice actions tests', () => {
    const ingredient = {
      _id: 'id',
      name: 'name',
      type: 'bun',
      proteins: 100,
      fat: 100,
      carbohydrates: 100,
      calories: 100,
      price: 5430,
      image: '',
      image_mobile: '',
      image_large: '',
      __v: 100
    };

    const burger = {
      bun: ingredient,
      main: [
        { ...ingredient, type: 'main' },
        { ...ingredient, price: 200, type: 'sauce' },
        { ...ingredient, price: 4500, type: 'main' }
      ]
    };

    it('Should calculate the total price', () => {
      expect(reducer(initialState, calculateTotalPrice(burger))).toEqual({ totalPrice: 20990 });
    });

    it('Should reset the total price', () => {
      const state = { totalPrice: 20990 };
      expect(reducer(state, resetTotalPrice())).toEqual(initialState);
    });
  });
});
