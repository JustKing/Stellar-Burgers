import { burger } from '../../interfaces/burger';
import reducer, {
  setBun,
  setMain,
  removeBun,
  removeMain,
  resetBurgerConstructor,
  moveMainIngredient
} from './burgerConstructorSlice';

let mockUuidCounter = 0;

jest.mock('uuid', () => ({
  v4: () => {
    mockUuidCounter = mockUuidCounter + 1;
    return `1234-${5677 + mockUuidCounter}`;
  }
}));

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
    __v: 0,
    uuid: ''
  },
  main: []
};

const bun = {
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

const main = {
  _id: 'id',
  name: 'name',
  type: 'sauce',
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

describe('burger constructor slice tests', () => {
  it('Should return the initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual(initialState);
  });
  describe('burger constructor slice actions tests', () => {
    it('Should setting a bun', () => {
      expect(reducer(initialState, setBun(bun))).toEqual({
        ...initialState,
        bun: { ...bun, uuid: '1234-5678' }
      });
    });

    it('Should remove a bun', () => {
      const state = { ...initialState, bun: { ...initialState.bun, uuid: '1234-5678' } };
      expect(reducer(state, removeBun())).toEqual(initialState);
    });

    it('Should setting a main', () => {
      expect(reducer(initialState, setMain(main))).toEqual({
        ...initialState,
        main: [{ ...main, uuid: '1234-5679' }]
      });
    });

    it('Should remove a main', () => {
      const state = reducer(initialState, setMain(main));
      expect(reducer(state, removeMain(0))).toEqual(initialState);
    });

    it('Should reset a constructor', () => {
      let state = reducer(initialState, setMain(main));
      state = reducer(state, setBun(bun));
      expect(reducer(state, resetBurgerConstructor())).toEqual(initialState);
    });

    it('Should move ingredient', () => {
      let state = reducer(initialState, setMain(main));
      state = reducer(state, setMain(bun));
      state = reducer(state, setMain(bun));
      expect(
        reducer(
          state,
          moveMainIngredient({
            draggedUuid: state.main[0].uuid || '',
            hoveredUuid: state.main[2].uuid || ''
          })
        )
      ).toEqual({
        ...state,
        main: [state.main[1], state.main[2], state.main[0]]
      });
    });
  });
});
